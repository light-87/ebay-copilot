import type { TradingApiClient } from '@/api/clientTrading.js';
import {
  type EbayApiError,
  type EndpointInputError,
  optionalPositiveNumberEffect,
  optionalStringEffect,
  requireObjectEffect,
  requireStringEffect,
} from '@/api/shared/request.js';
import type {
  createListingSchema,
  endListingSchema,
  getActiveListingsSchema,
  getListingSchema,
  relistItemSchema,
  reviseListingSchema,
} from '@/utils/trading/trading.js';
import { isRecord } from '@/utils/typeGuards.js';
import { Effect } from 'effect';
import type { z } from 'zod';

/** Input accepted by getActiveListings. */
type GetActiveListingsInput = z.infer<typeof getActiveListingsSchema>;
/** Input accepted by getListing. */
type GetListingInput = z.infer<typeof getListingSchema>;
/** Input accepted by createListing. */
type CreateListingInput = z.infer<typeof createListingSchema>;
/** Input accepted by reviseListing. */
type ReviseListingInput = z.infer<typeof reviseListingSchema>;
/** Input accepted by endListing. */
type EndListingInput = z.infer<typeof endListingSchema>;
/** Input accepted by relistItem. */
type RelistItemInput = z.infer<typeof relistItemSchema>;

const asRecord = (value: unknown): Record<string, unknown> | undefined =>
  isRecord(value) ? value : undefined;

const asRecordArray = (value: unknown): Record<string, unknown>[] => {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.filter(
    (entry): entry is Record<string, unknown> =>
      typeof entry === 'object' && entry !== null && !Array.isArray(entry),
  );
};

const stringValue = (value: unknown): string => {
  if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
    return String(value);
  }

  return '';
};

const numberValue = (value: unknown): number => {
  if (typeof value !== 'number' && typeof value !== 'string') {
    return 0;
  }

  const number = Number(value);
  return Number.isFinite(number) ? number : 0;
};

const priceValue = (value: unknown): number => {
  const price = asRecord(value);
  if (price && price['#text'] !== undefined) {
    return numberValue(price['#text']);
  }

  return numberValue(value);
};

/**
 * One active fixed-price listing summary extracted from GetMyeBaySelling.
 *
 * @see https://developer.ebay.com/devzone/xml/docs/reference/ebay/getmyebayselling.html
 */
export interface ListingSummary {
  /** eBay item identifier. */
  readonly itemId: string;
  /** Listing title returned by Trading API. */
  readonly title: string;
  /** Seller SKU returned by Trading API. */
  readonly sku: string;
  /** Total quantity listed. */
  readonly quantity: number;
  /** Remaining quantity available for purchase. */
  readonly quantityAvailable: number;
  /** Current listing price as a number. */
  readonly currentPrice: number;
  /** Number of buyers watching the listing. */
  readonly watchCount: number;
  /** Trading API listing type value. */
  readonly listingType: string;
}

/**
 * Active listing page returned by getActiveListings.
 *
 * @see https://developer.ebay.com/devzone/xml/docs/reference/ebay/getmyebayselling.html
 */
export interface ActiveListingsResult {
  /** Active fixed-price listing summaries on the requested page. */
  readonly listings: ListingSummary[];
  /** Total active listings reported by eBay. */
  readonly total: number;
  /** Total active-listing pages reported by eBay. */
  readonly totalPages: number;
}

/** Parsed Trading API object payload returned by listing write calls. */
export type TradingRecordResponse = Record<string, unknown>;

/**
 * High-level wrapper for seller listing operations backed by eBay Trading API calls.
 */
export class TradingApi {
  private readonly client: TradingApiClient;

  constructor(client: TradingApiClient) {
    this.client = client;
  }

  /**
   * Fetches active seller listings with Trading API pagination metadata.
   *
   * @param input - Optional page number and entries-per-page values.
   * @returns An Effect that succeeds with normalized active listing summaries.
   *
   * @example
   * ```ts
   * const active = await Effect.runPromise(
   *   tradingApi.getActiveListings({ page: 2, entriesPerPage: 25 }),
   * );
   * ```
   *
   * @see https://developer.ebay.com/devzone/xml/docs/reference/ebay/getmyebayselling.html
   */
  getActiveListings = (
    input: GetActiveListingsInput = {},
  ): Effect.Effect<ActiveListingsResult, EbayApiError | EndpointInputError> => {
    const tradingClient = this.client;

    return Effect.gen(function* () {
      const request = yield* requireObjectEffect<GetActiveListingsInput>(input, 'input');
      const inputPage = yield* optionalPositiveNumberEffect(request.page, 'page');
      const inputEntriesPerPage = yield* optionalPositiveNumberEffect(
        request.entriesPerPage,
        'entriesPerPage',
      );
      const page = inputPage === undefined ? 1 : inputPage;
      const entriesPerPage = inputEntriesPerPage === undefined ? 50 : inputEntriesPerPage;

      const result = yield* tradingClient.execute('GetMyeBaySelling', {
        ActiveList: {
          Sort: 'TimeLeft',
          Pagination: {
            EntriesPerPage: entriesPerPage,
            PageNumber: page,
          },
        },
      });

      const activeList = asRecord(result.ActiveList);
      const itemArray = asRecord(activeList?.ItemArray);
      const items = asRecordArray(itemArray?.Item);
      const pagination = asRecord(activeList?.PaginationResult);
      const listings: ListingSummary[] = items.map((item) => {
        const sellingStatus = asRecord(item.SellingStatus);

        return {
          itemId: stringValue(item.ItemID),
          title: stringValue(item.Title),
          sku: stringValue(item.SKU),
          quantity: numberValue(item.Quantity),
          quantityAvailable: numberValue(item.QuantityAvailable),
          currentPrice: priceValue(sellingStatus?.CurrentPrice),
          watchCount: numberValue(item.WatchCount),
          listingType: stringValue(item.ListingType),
        };
      });

      return {
        listings,
        total: numberValue(pagination?.TotalNumberOfEntries),
        totalPages: numberValue(pagination?.TotalNumberOfPages),
      };
    });
  };

  /**
   * Fetches a single listing by eBay item ID with full Trading API detail.
   *
   * @param input - eBay item identifier.
   * @returns An Effect that succeeds with the parsed Trading API item payload.
   *
   * @example
   * ```ts
   * const listing = await Effect.runPromise(tradingApi.getListing({ itemId: '12345' }));
   * ```
   *
   * @see https://developer.ebay.com/devzone/xml/docs/reference/ebay/getitem.html
   */
  getListing = (
    input: GetListingInput,
  ): Effect.Effect<TradingRecordResponse, EbayApiError | EndpointInputError> => {
    const tradingClient = this.client;

    return Effect.gen(function* () {
      const request = yield* requireObjectEffect<GetListingInput>(input, 'input');
      const itemId = yield* requireStringEffect(request.itemId, 'itemId');
      const result = yield* tradingClient.execute('GetItem', {
        ItemID: itemId,
        DetailLevel: 'ReturnAll',
      });
      const items = asRecordArray(result.Item);

      return items.length > 0 ? items[0] : result;
    });
  };

  /**
   * Creates a fixed-price listing using the supplied Trading API item payload.
   *
   * @param input - Trading API Item payload nested under `item`.
   * @returns An Effect that succeeds with the parsed AddFixedPriceItem response.
   *
   * @example
   * ```ts
   * const listing = await Effect.runPromise(
   *   tradingApi.createListing({ item: { Title: 'New item', StartPrice: 9.99 } }),
   * );
   * ```
   *
   * @see https://developer.ebay.com/devzone/xml/docs/reference/ebay/AddFixedPriceItem.html
   */
  createListing = (
    input: CreateListingInput,
  ): Effect.Effect<TradingRecordResponse, EbayApiError | EndpointInputError> => {
    const tradingClient = this.client;

    return Effect.gen(function* () {
      const request = yield* requireObjectEffect<CreateListingInput>(input, 'input');
      const item = yield* requireObjectEffect<Record<string, unknown>>(request.item, 'item');

      return yield* tradingClient.execute('AddFixedPriceItem', { Item: item });
    });
  };

  /**
   * Revises a fixed-price listing by merging changes with the eBay item ID.
   *
   * @param input - eBay item identifier plus Trading API Item fields to update.
   * @returns An Effect that succeeds with the parsed ReviseFixedPriceItem response.
   *
   * @example
   * ```ts
   * const listing = await Effect.runPromise(
   *   tradingApi.reviseListing({ itemId: '12345', fields: { Quantity: 10 } }),
   * );
   * ```
   *
   * @see https://developer.ebay.com/devzone/xml/docs/reference/ebay/ReviseFixedPriceItem.html
   */
  reviseListing = (
    input: ReviseListingInput,
  ): Effect.Effect<TradingRecordResponse, EbayApiError | EndpointInputError> => {
    const tradingClient = this.client;

    return Effect.gen(function* () {
      const request = yield* requireObjectEffect<ReviseListingInput>(input, 'input');
      const itemId = yield* requireStringEffect(request.itemId, 'itemId');
      const fields = yield* requireObjectEffect<Record<string, unknown>>(request.fields, 'fields');

      return yield* tradingClient.execute('ReviseFixedPriceItem', {
        Item: { ...fields, ItemID: itemId },
      });
    });
  };

  /**
   * Ends a fixed-price listing with the provided Trading API ending reason.
   *
   * @param input - eBay item identifier plus optional Trading API ending reason.
   * @returns An Effect that succeeds with the parsed EndFixedPriceItem response.
   *
   * @example
   * ```ts
   * await Effect.runPromise(
   *   tradingApi.endListing({ itemId: '12345', reason: 'NotAvailable' }),
   * );
   * ```
   *
   * @see https://developer.ebay.com/devzone/xml/docs/reference/ebay/endfixedpriceitem.html
   */
  endListing = (
    input: EndListingInput,
  ): Effect.Effect<TradingRecordResponse, EbayApiError | EndpointInputError> => {
    const tradingClient = this.client;

    return Effect.gen(function* () {
      const request = yield* requireObjectEffect<EndListingInput>(input, 'input');
      const itemId = yield* requireStringEffect(request.itemId, 'itemId');
      const inputReason = yield* optionalStringEffect(request.reason, 'reason');
      const reason = inputReason === undefined ? 'NotAvailable' : inputReason;

      return yield* tradingClient.execute('EndFixedPriceItem', {
        ItemID: itemId,
        EndingReason: reason,
      });
    });
  };

  /**
   * Relists an ended fixed-price item with optional listing modifications.
   *
   * @param input - eBay item identifier plus optional Trading API Item modifications.
   * @returns An Effect that succeeds with the parsed RelistFixedPriceItem response.
   *
   * @example
   * ```ts
   * const listing = await Effect.runPromise(
   *   tradingApi.relistItem({ itemId: '12345', modifications: { Quantity: 20 } }),
   * );
   * ```
   *
   * @see https://developer.ebay.com/devzone/xml/docs/reference/ebay/relistfixedpriceitem.html
   */
  relistItem = (
    input: RelistItemInput,
  ): Effect.Effect<TradingRecordResponse, EbayApiError | EndpointInputError> => {
    const tradingClient = this.client;

    return Effect.gen(function* () {
      const request = yield* requireObjectEffect<RelistItemInput>(input, 'input');
      const itemId = yield* requireStringEffect(request.itemId, 'itemId');
      let modifications: Record<string, unknown> = {};

      if (request.modifications !== undefined) {
        modifications = yield* requireObjectEffect<Record<string, unknown>>(
          request.modifications,
          'modifications',
        );
      }

      return yield* tradingClient.execute('RelistFixedPriceItem', {
        Item: { ...modifications, ItemID: itemId },
      });
    });
  };
}
