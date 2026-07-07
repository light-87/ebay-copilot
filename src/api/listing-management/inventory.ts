import type { EbayApiClient } from '@/api/client.js';
import {
  buildEndpointParams,
  type EbayApiError,
  type EndpointInputError,
  optionalNonNegativeNumberEffect,
  optionalPositiveNumberEffect,
  optionalStringEffect,
  requestDeleteEffect,
  requestGetEffect,
  requestPostEffect,
  requestPutEffect,
  requireObjectEffect,
  requireStringEffect,
} from '@/api/shared/request.js';
import type {
  components,
  operations,
} from '@/types/sell-apps/listing-management/sellInventoryV1Oas3.js';
import { Effect } from 'effect';

/** Input accepted by getInventoryItems and getInventoryLocations. */
export interface InventoryPaginationInput {
  /** Number of records to return. */
  readonly limit?: number;
  /** Number of records or pages to skip, depending on the endpoint. */
  readonly offset?: number;
}

/** Input accepted by inventory item SKU endpoints. */
export interface SkuInput {
  /** Seller-defined SKU value. */
  readonly sku: string;
}

/** Input accepted by createOrReplaceInventoryItem. */
export interface CreateOrReplaceInventoryItemInput {
  /** Seller-defined SKU value. */
  readonly sku: string;
  /** Generated InventoryItem body. */
  readonly body: InventoryItem;
}

/** Input accepted by product compatibility write endpoints. */
export interface CreateOrReplaceProductCompatibilityInput {
  /** Seller-defined SKU value. */
  readonly sku: string;
  /** Generated Compatibility body. */
  readonly body: ProductCompatibility;
}

/** Input accepted by inventory item group ID endpoints. */
export interface InventoryItemGroupKeyInput {
  /** Seller-defined inventory item group key. */
  readonly inventoryItemGroupKey: string;
}

/** Input accepted by createOrReplaceInventoryItemGroup. */
export interface CreateOrReplaceInventoryItemGroupInput {
  /** Seller-defined inventory item group key. */
  readonly inventoryItemGroupKey: string;
  /** Generated InventoryItemGroup body. */
  readonly body: InventoryItemGroup;
}

/** Input accepted by bulk inventory item endpoints. */
export interface BulkInventoryItemInput {
  /** Generated bulk inventory item body. */
  readonly body: BulkCreateOrReplaceInventoryItemRequest;
}

/** Input accepted by bulk get inventory item. */
export interface BulkGetInventoryItemInput {
  /** Generated bulk get inventory item body. */
  readonly body: BulkGetInventoryItemRequest;
}

/** Input accepted by bulk price and quantity updates. */
export interface BulkUpdatePriceQuantityInput {
  /** Generated bulk price and quantity body. */
  readonly body: BulkUpdatePriceQuantityRequest;
}

/** Input accepted by bulk listing migration. */
export interface BulkMigrateListingInput {
  /** Generated bulk migrate listing body. */
  readonly body: BulkMigrateListingRequest;
}

/** Input accepted by listing SKU location mapping ID endpoints. */
export interface SkuLocationMappingInput {
  /** eBay listing ID that owns the SKU. */
  readonly listingId: string;
  /** Seller-defined SKU value inside the listing. */
  readonly sku: string;
}

/** Input accepted by createOrReplaceSkuLocationMapping. */
export interface CreateOrReplaceSkuLocationMappingInput extends SkuLocationMappingInput {
  /** Generated LocationMapping body. */
  readonly body: LocationMapping;
}

/** Input accepted by getOffers. */
export interface GetOffersInput {
  /** Listing format filter sent as format. */
  readonly format?: string;
  /** Number of offers to return. */
  readonly limit?: number;
  /** Marketplace filter sent as marketplace_id. */
  readonly marketplaceId?: string;
  /** Offer page offset. */
  readonly offset?: number;
  /** Seller-defined SKU filter. */
  readonly sku?: string;
}

/** Input accepted by offer ID endpoints. */
export interface OfferIdInput {
  /** eBay offer identifier. */
  readonly offerId: string;
}

/** Input accepted by createOffer. */
export interface CreateOfferInput {
  /** Generated EbayOfferDetailsWithKeys body. */
  readonly body: CreateOfferRequest;
}

/** Input accepted by updateOffer. */
export interface UpdateOfferInput {
  /** eBay offer identifier. */
  readonly offerId: string;
  /** Generated EbayOfferDetailsWithId body. */
  readonly body: UpdateOfferRequest;
}

/** Input accepted by bulkCreateOffer. */
export interface BulkCreateOfferInput {
  /** Generated BulkEbayOfferDetailsWithKeys body. */
  readonly body: BulkCreateOfferRequest;
}

/** Input accepted by bulkPublishOffer. */
export interface BulkPublishOfferInput {
  /** Generated BulkOffer body. */
  readonly body: BulkPublishOfferRequest;
}

/** Input accepted by getListingFees. */
export interface GetListingFeesInput {
  /** Generated OfferKeysWithId body. */
  readonly body: GetListingFeesRequest;
}

/** Input accepted by publishOfferByInventoryItemGroup. */
export interface PublishOfferByInventoryItemGroupInput {
  /** Generated PublishByInventoryItemGroupRequest body. */
  readonly body: PublishOfferByInventoryItemGroupRequest;
}

/** Input accepted by withdrawOfferByInventoryItemGroup. */
export interface WithdrawOfferByInventoryItemGroupInput {
  /** Generated WithdrawByInventoryItemGroupRequest body. */
  readonly body: WithdrawOfferByInventoryItemGroupRequest;
}

/** Input accepted by inventory location ID endpoints. */
export interface MerchantLocationKeyInput {
  /** Seller-defined merchant location key. */
  readonly merchantLocationKey: string;
}

/** Input accepted by createInventoryLocation. */
export interface CreateInventoryLocationInput {
  /** Seller-defined merchant location key. */
  readonly merchantLocationKey: string;
  /** Generated InventoryLocationFull body. */
  readonly body: CreateInventoryLocationRequest;
}

/** Input accepted by updateInventoryLocation. */
export interface UpdateInventoryLocationInput {
  /** Seller-defined merchant location key. */
  readonly merchantLocationKey: string;
  /** Generated InventoryLocation body. */
  readonly body: UpdateInventoryLocationRequest;
}

/**
 * Request body accepted by bulkCreateOrReplaceInventoryItem.
 *
 * @see https://developer.ebay.com/api-docs/sell/inventory/resources/inventory_item/methods/bulkCreateOrReplaceInventoryItem
 */
export type BulkCreateOrReplaceInventoryItemRequest = components['schemas']['BulkInventoryItem'];

/**
 * Response returned by bulkCreateOrReplaceInventoryItem.
 *
 * @see https://developer.ebay.com/api-docs/sell/inventory/resources/inventory_item/methods/bulkCreateOrReplaceInventoryItem
 */
export type BulkCreateOrReplaceInventoryItemResponse =
  components['schemas']['BulkInventoryItemResponse'];

/**
 * Request body accepted by bulkGetInventoryItem.
 *
 * @see https://developer.ebay.com/api-docs/sell/inventory/resources/inventory_item/methods/bulkGetInventoryItem
 */
export type BulkGetInventoryItemRequest = components['schemas']['BulkGetInventoryItem'];

/**
 * Response returned by bulkGetInventoryItem.
 *
 * @see https://developer.ebay.com/api-docs/sell/inventory/resources/inventory_item/methods/bulkGetInventoryItem
 */
export type BulkGetInventoryItemResponse = components['schemas']['BulkGetInventoryItemResponse'];

/**
 * Request body accepted by bulkUpdatePriceQuantity.
 *
 * @see https://developer.ebay.com/api-docs/sell/inventory/resources/inventory_item/methods/bulkUpdatePriceQuantity
 */
export type BulkUpdatePriceQuantityRequest = components['schemas']['BulkPriceQuantity'];

/**
 * Response returned by bulkUpdatePriceQuantity.
 *
 * @see https://developer.ebay.com/api-docs/sell/inventory/resources/inventory_item/methods/bulkUpdatePriceQuantity
 */
export type BulkUpdatePriceQuantityResponse = components['schemas']['BulkPriceQuantityResponse'];

/**
 * Response returned by getInventoryItem.
 *
 * @see https://developer.ebay.com/api-docs/sell/inventory/resources/inventory_item/methods/getInventoryItem
 */
export type GetInventoryItemResponse = components['schemas']['InventoryItemWithSkuLocaleGroupid'];

/**
 * Request body accepted by createOrReplaceInventoryItem.
 *
 * @see https://developer.ebay.com/api-docs/sell/inventory/resources/inventory_item/methods/createOrReplaceInventoryItem
 */
export type InventoryItem = components['schemas']['InventoryItem'];

/**
 * Response returned by write endpoints that use BaseResponse.
 *
 * @see https://developer.ebay.com/api-docs/sell/inventory/resources/inventory_item/methods/createOrReplaceInventoryItem
 */
export type BaseResponse = components['schemas']['BaseResponse'];

/**
 * No-content response returned by deleteInventoryItem.
 *
 * @see https://developer.ebay.com/api-docs/sell/inventory/resources/inventory_item/methods/deleteInventoryItem
 */
export type DeleteInventoryItemResponse = void;

/**
 * Response returned by getInventoryItems.
 *
 * @see https://developer.ebay.com/api-docs/sell/inventory/resources/inventory_item/methods/getInventoryItems
 */
export type GetInventoryItemsResponse = components['schemas']['InventoryItems'];

/**
 * Generated compatibility body and response used by product compatibility endpoints.
 *
 * @see https://developer.ebay.com/api-docs/sell/inventory/resources/inventory_item/product_compatibility/methods/getProductCompatibility
 */
export type ProductCompatibility = components['schemas']['Compatibility'];

/**
 * No-content response returned by deleteProductCompatibility.
 *
 * @see https://developer.ebay.com/api-docs/sell/inventory/resources/inventory_item/product_compatibility/methods/deleteProductCompatibility
 */
export type DeleteProductCompatibilityResponse = void;

/**
 * Generated inventory item group body and response.
 *
 * @see https://developer.ebay.com/api-docs/sell/inventory/resources/inventory_item_group/methods/getInventoryItemGroup
 */
export type InventoryItemGroup = components['schemas']['InventoryItemGroup'];

/**
 * No-content response returned by deleteInventoryItemGroup.
 *
 * @see https://developer.ebay.com/api-docs/sell/inventory/resources/inventory_item_group/methods/deleteInventoryItemGroup
 */
export type DeleteInventoryItemGroupResponse = void;

/**
 * Request body accepted by bulkMigrateListing.
 *
 * @see https://developer.ebay.com/api-docs/sell/inventory/resources/inventory_item/methods/bulkMigrateListing
 */
export type BulkMigrateListingRequest = components['schemas']['BulkMigrateListing'];

/**
 * Response returned by bulkMigrateListing.
 *
 * @see https://developer.ebay.com/api-docs/sell/inventory/resources/inventory_item/methods/bulkMigrateListing
 */
export type BulkMigrateListingResponse = components['schemas']['BulkMigrateListingResponse'];

/**
 * Generated location mapping body and response.
 *
 * @see https://developer.ebay.com/api-docs/sell/inventory/resources/listing/methods/getSkuLocationMapping
 */
export type LocationMapping = components['schemas']['LocationMapping'];

/**
 * No-content response returned by createOrReplaceSkuLocationMapping.
 *
 * @see https://developer.ebay.com/api-docs/sell/inventory/resources/listing/methods/createOrReplaceSkuLocationMapping
 */
export type CreateOrReplaceSkuLocationMappingResponse = void;

/**
 * No-content response returned by deleteSkuLocationMapping.
 *
 * @see https://developer.ebay.com/api-docs/sell/inventory/resources/listing/methods/deleteSkuLocationMapping
 */
export type DeleteSkuLocationMappingResponse = void;

/**
 * Request body accepted by bulkCreateOffer.
 *
 * @see https://developer.ebay.com/api-docs/sell/inventory/resources/offer/methods/bulkCreateOffer
 */
export type BulkCreateOfferRequest = components['schemas']['BulkEbayOfferDetailsWithKeys'];

/**
 * Response returned by bulkCreateOffer.
 *
 * @see https://developer.ebay.com/api-docs/sell/inventory/resources/offer/methods/bulkCreateOffer
 */
export type BulkCreateOfferResponse = components['schemas']['BulkOfferResponse'];

/**
 * Request body accepted by bulkPublishOffer.
 *
 * @see https://developer.ebay.com/api-docs/sell/inventory/resources/offer/methods/bulkPublishOffer
 */
export type BulkPublishOfferRequest = components['schemas']['BulkOffer'];

/**
 * Response returned by bulkPublishOffer.
 *
 * @see https://developer.ebay.com/api-docs/sell/inventory/resources/offer/methods/bulkPublishOffer
 */
export type BulkPublishOfferResponse = components['schemas']['BulkPublishResponse'];

/**
 * Response returned by getOffers.
 *
 * @see https://developer.ebay.com/api-docs/sell/inventory/resources/offer/methods/getOffers
 */
export type GetOffersResponse = components['schemas']['Offers'];

/**
 * Request body accepted by createOffer.
 *
 * @see https://developer.ebay.com/api-docs/sell/inventory/resources/offer/methods/createOffer
 */
export type CreateOfferRequest = components['schemas']['EbayOfferDetailsWithKeys'];

/**
 * Response returned by createOffer.
 *
 * @see https://developer.ebay.com/api-docs/sell/inventory/resources/offer/methods/createOffer
 */
export type CreateOfferResponse = components['schemas']['OfferResponse'];

/**
 * Response returned by getOffer.
 *
 * @see https://developer.ebay.com/api-docs/sell/inventory/resources/offer/methods/getOffer
 */
export type GetOfferResponse = components['schemas']['EbayOfferDetailsWithAll'];

/**
 * Request body accepted by updateOffer.
 *
 * @see https://developer.ebay.com/api-docs/sell/inventory/resources/offer/methods/updateOffer
 */
export type UpdateOfferRequest = components['schemas']['EbayOfferDetailsWithId'];

/**
 * No-content response returned by deleteOffer.
 *
 * @see https://developer.ebay.com/api-docs/sell/inventory/resources/offer/methods/deleteOffer
 */
export type DeleteOfferResponse = void;

/**
 * Request body accepted by getListingFees.
 *
 * @see https://developer.ebay.com/api-docs/sell/inventory/resources/offer/methods/getListingFees
 */
export type GetListingFeesRequest = components['schemas']['OfferKeysWithId'];

/**
 * Response returned by getListingFees.
 *
 * @see https://developer.ebay.com/api-docs/sell/inventory/resources/offer/methods/getListingFees
 */
export type GetListingFeesResponse = components['schemas']['FeesSummaryResponse'];

/**
 * Response returned by publishOffer.
 *
 * @see https://developer.ebay.com/api-docs/sell/inventory/resources/offer/methods/publishOffer
 */
export type PublishOfferResponse = components['schemas']['PublishResponse'];

/**
 * Request body accepted by publishOfferByInventoryItemGroup.
 *
 * @see https://developer.ebay.com/api-docs/sell/inventory/resources/offer/methods/publishOfferByInventoryItemGroup
 */
export type PublishOfferByInventoryItemGroupRequest =
  components['schemas']['PublishByInventoryItemGroupRequest'];

/**
 * Response returned by withdrawOffer.
 *
 * @see https://developer.ebay.com/api-docs/sell/inventory/resources/offer/methods/withdrawOffer
 */
export type WithdrawOfferResponse = components['schemas']['WithdrawResponse'];

/**
 * Request body accepted by withdrawOfferByInventoryItemGroup.
 *
 * @see https://developer.ebay.com/api-docs/sell/inventory/resources/offer/methods/withdrawOfferByInventoryItemGroup
 */
export type WithdrawOfferByInventoryItemGroupRequest =
  components['schemas']['WithdrawByInventoryItemGroupRequest'];

/**
 * No-content response returned by withdrawOfferByInventoryItemGroup.
 *
 * @see https://developer.ebay.com/api-docs/sell/inventory/resources/offer/methods/withdrawOfferByInventoryItemGroup
 */
export type WithdrawOfferByInventoryItemGroupResponse = void;

/**
 * Response returned by getInventoryLocation.
 *
 * @see https://developer.ebay.com/api-docs/sell/inventory/resources/location/methods/getInventoryLocation
 */
export type GetInventoryLocationResponse = components['schemas']['InventoryLocationResponse'];

/**
 * Request body accepted by createInventoryLocation.
 *
 * @see https://developer.ebay.com/api-docs/sell/inventory/resources/location/methods/createInventoryLocation
 */
export type CreateInventoryLocationRequest = components['schemas']['InventoryLocationFull'];

/**
 * No-content response returned by createInventoryLocation.
 *
 * @see https://developer.ebay.com/api-docs/sell/inventory/resources/location/methods/createInventoryLocation
 */
export type CreateInventoryLocationResponse = void;

/**
 * No-content response returned by deleteInventoryLocation.
 *
 * @see https://developer.ebay.com/api-docs/sell/inventory/resources/location/methods/deleteInventoryLocation
 */
export type DeleteInventoryLocationResponse = void;

/**
 * Response returned by disableInventoryLocation.
 *
 * @see https://developer.ebay.com/api-docs/sell/inventory/resources/location/methods/disableInventoryLocation
 */
export type DisableInventoryLocationResponse =
  operations['disableInventoryLocation']['responses'][200]['content']['application/json'];

/**
 * Response returned by enableInventoryLocation.
 *
 * @see https://developer.ebay.com/api-docs/sell/inventory/resources/location/methods/enableInventoryLocation
 */
export type EnableInventoryLocationResponse =
  operations['enableInventoryLocation']['responses'][200]['content']['application/json'];

/**
 * Response returned by getInventoryLocations.
 *
 * @see https://developer.ebay.com/api-docs/sell/inventory/resources/location/methods/getInventoryLocations
 */
export type GetInventoryLocationsResponse = components['schemas']['LocationResponse'];

/**
 * Request body accepted by updateInventoryLocation.
 *
 * @see https://developer.ebay.com/api-docs/sell/inventory/resources/location/methods/updateInventoryLocation
 */
export type UpdateInventoryLocationRequest = components['schemas']['InventoryLocation'];

/**
 * No-content response returned by updateInventoryLocation.
 *
 * @see https://developer.ebay.com/api-docs/sell/inventory/resources/location/methods/updateInventoryLocation
 */
export type UpdateInventoryLocationResponse = void;

/** Inventory API - seller inventory, offers, locations, and SKU location mappings. */
export class InventoryApi {
  private readonly basePath = '/sell/inventory/v1';

  public constructor(private readonly client: EbayApiClient) {}

  /**
   * Retrieves paginated inventory items.
   *
   * @param input - Optional pagination controls.
   * @returns An Effect that succeeds with eBay's InventoryItems response.
   *
   * @example
   * ```ts
   * const items = await Effect.runPromise(inventoryApi.getInventoryItems({ limit: 25 }));
   * ```
   *
   * @see https://developer.ebay.com/api-docs/sell/inventory/resources/inventory_item/methods/getInventoryItems
   */
  public getInventoryItems = (
    input: InventoryPaginationInput = {},
  ): Effect.Effect<GetInventoryItemsResponse, EbayApiError | EndpointInputError> => {
    const client = this.client;
    const path = `${this.basePath}/inventory_item`;

    return Effect.gen(function* () {
      const validatedInput = yield* requireObjectEffect<InventoryPaginationInput>(input, 'input');
      const limit = yield* optionalPositiveNumberEffect(validatedInput.limit, 'limit');
      const offset = yield* optionalNonNegativeNumberEffect(validatedInput.offset, 'offset');
      const params = buildEndpointParams({
        limit: { wireName: 'limit', value: limit === undefined ? undefined : String(limit) },
        offset: { wireName: 'offset', value: offset === undefined ? undefined : String(offset) },
      });

      return yield* requestGetEffect<GetInventoryItemsResponse>(client, path, params);
    });
  };

  /**
   * Retrieves one inventory item by SKU.
   *
   * @param input - Seller-defined SKU value.
   * @returns An Effect that succeeds with eBay's InventoryItemWithSkuLocaleGroupid response.
   *
   * @example
   * ```ts
   * const item = await Effect.runPromise(inventoryApi.getInventoryItem({ sku: 'SKU-1' }));
   * ```
   *
   * @see https://developer.ebay.com/api-docs/sell/inventory/resources/inventory_item/methods/getInventoryItem
   */
  public getInventoryItem = (
    input: SkuInput,
  ): Effect.Effect<GetInventoryItemResponse, EbayApiError | EndpointInputError> => {
    const client = this.client;
    const basePath = this.basePath;

    return Effect.gen(function* () {
      const validatedInput = yield* requireObjectEffect<SkuInput>(input, 'input');
      const sku = yield* requireStringEffect(validatedInput.sku, 'sku');

      return yield* requestGetEffect<GetInventoryItemResponse>(
        client,
        `${basePath}/inventory_item/${sku}`,
      );
    });
  };

  /**
   * Creates or replaces one inventory item by SKU.
   *
   * @param input - Seller-defined SKU and generated InventoryItem body.
   * @returns An Effect that succeeds with eBay's BaseResponse.
   *
   * @example
   * ```ts
   * await Effect.runPromise(
   *   inventoryApi.createOrReplaceInventoryItem({ sku: 'SKU-1', body: { product: {} } }),
   * );
   * ```
   *
   * @see https://developer.ebay.com/api-docs/sell/inventory/resources/inventory_item/methods/createOrReplaceInventoryItem
   */
  public createOrReplaceInventoryItem = (
    input: CreateOrReplaceInventoryItemInput,
  ): Effect.Effect<BaseResponse, EbayApiError | EndpointInputError> => {
    const client = this.client;
    const basePath = this.basePath;

    return Effect.gen(function* () {
      const validatedInput = yield* requireObjectEffect<CreateOrReplaceInventoryItemInput>(
        input,
        'input',
      );
      const sku = yield* requireStringEffect(validatedInput.sku, 'sku');
      const body = yield* requireObjectEffect<InventoryItem>(validatedInput.body, 'body');

      return yield* requestPutEffect<BaseResponse>(
        client,
        `${basePath}/inventory_item/${sku}`,
        body,
      );
    });
  };

  /**
   * Deletes one inventory item by SKU.
   *
   * @param input - Seller-defined SKU value.
   * @returns An Effect that succeeds when eBay returns no content.
   *
   * @example
   * ```ts
   * await Effect.runPromise(inventoryApi.deleteInventoryItem({ sku: 'SKU-1' }));
   * ```
   *
   * @see https://developer.ebay.com/api-docs/sell/inventory/resources/inventory_item/methods/deleteInventoryItem
   */
  public deleteInventoryItem = (
    input: SkuInput,
  ): Effect.Effect<DeleteInventoryItemResponse, EbayApiError | EndpointInputError> => {
    const client = this.client;
    const basePath = this.basePath;

    return Effect.gen(function* () {
      const validatedInput = yield* requireObjectEffect<SkuInput>(input, 'input');
      const sku = yield* requireStringEffect(validatedInput.sku, 'sku');

      return yield* requestDeleteEffect<DeleteInventoryItemResponse>(
        client,
        `${basePath}/inventory_item/${sku}`,
      );
    });
  };

  /**
   * Creates or replaces up to 25 inventory items.
   *
   * @param input - Generated BulkInventoryItem body.
   * @returns An Effect that succeeds with eBay's BulkInventoryItemResponse.
   *
   * @example
   * ```ts
   * const result = await Effect.runPromise(
   *   inventoryApi.bulkCreateOrReplaceInventoryItem({ body: { requests: [] } }),
   * );
   * ```
   *
   * @see https://developer.ebay.com/api-docs/sell/inventory/resources/inventory_item/methods/bulkCreateOrReplaceInventoryItem
   */
  public bulkCreateOrReplaceInventoryItem = (
    input: BulkInventoryItemInput,
  ): Effect.Effect<BulkCreateOrReplaceInventoryItemResponse, EbayApiError | EndpointInputError> => {
    const client = this.client;
    const path = `${this.basePath}/bulk_create_or_replace_inventory_item`;

    return Effect.gen(function* () {
      const validatedInput = yield* requireObjectEffect<BulkInventoryItemInput>(input, 'input');
      const body = yield* requireObjectEffect<BulkCreateOrReplaceInventoryItemRequest>(
        validatedInput.body,
        'body',
      );

      return yield* requestPostEffect<BulkCreateOrReplaceInventoryItemResponse>(client, path, body);
    });
  };

  /**
   * Retrieves up to 25 inventory items by SKU.
   *
   * @param input - Generated BulkGetInventoryItem body.
   * @returns An Effect that succeeds with eBay's BulkGetInventoryItemResponse.
   *
   * @example
   * ```ts
   * const result = await Effect.runPromise(
   *   inventoryApi.bulkGetInventoryItem({ body: { requests: [{ sku: 'SKU-1' }] } }),
   * );
   * ```
   *
   * @see https://developer.ebay.com/api-docs/sell/inventory/resources/inventory_item/methods/bulkGetInventoryItem
   */
  public bulkGetInventoryItem = (
    input: BulkGetInventoryItemInput,
  ): Effect.Effect<BulkGetInventoryItemResponse, EbayApiError | EndpointInputError> => {
    const client = this.client;
    const path = `${this.basePath}/bulk_get_inventory_item`;

    return Effect.gen(function* () {
      const validatedInput = yield* requireObjectEffect<BulkGetInventoryItemInput>(input, 'input');
      const body = yield* requireObjectEffect<BulkGetInventoryItemRequest>(
        validatedInput.body,
        'body',
      );

      return yield* requestPostEffect<BulkGetInventoryItemResponse>(client, path, body);
    });
  };

  /**
   * Updates price and quantity for inventory items and offers.
   *
   * @param input - Generated BulkPriceQuantity body.
   * @returns An Effect that succeeds with eBay's BulkPriceQuantityResponse.
   *
   * @example
   * ```ts
   * const result = await Effect.runPromise(
   *   inventoryApi.bulkUpdatePriceQuantity({ body: { requests: [] } }),
   * );
   * ```
   *
   * @see https://developer.ebay.com/api-docs/sell/inventory/resources/inventory_item/methods/bulkUpdatePriceQuantity
   */
  public bulkUpdatePriceQuantity = (
    input: BulkUpdatePriceQuantityInput,
  ): Effect.Effect<BulkUpdatePriceQuantityResponse, EbayApiError | EndpointInputError> => {
    const client = this.client;
    const path = `${this.basePath}/bulk_update_price_quantity`;

    return Effect.gen(function* () {
      const validatedInput = yield* requireObjectEffect<BulkUpdatePriceQuantityInput>(
        input,
        'input',
      );
      const body = yield* requireObjectEffect<BulkUpdatePriceQuantityRequest>(
        validatedInput.body,
        'body',
      );

      return yield* requestPostEffect<BulkUpdatePriceQuantityResponse>(client, path, body);
    });
  };

  /**
   * Retrieves product compatibility for one SKU.
   *
   * @param input - Seller-defined SKU value.
   * @returns An Effect that succeeds with eBay's Compatibility response.
   *
   * @example
   * ```ts
   * const compatibility = await Effect.runPromise(
   *   inventoryApi.getProductCompatibility({ sku: 'SKU-1' }),
   * );
   * ```
   *
   * @see https://developer.ebay.com/api-docs/sell/inventory/resources/inventory_item/product_compatibility/methods/getProductCompatibility
   */
  public getProductCompatibility = (
    input: SkuInput,
  ): Effect.Effect<ProductCompatibility, EbayApiError | EndpointInputError> => {
    const client = this.client;
    const basePath = this.basePath;

    return Effect.gen(function* () {
      const validatedInput = yield* requireObjectEffect<SkuInput>(input, 'input');
      const sku = yield* requireStringEffect(validatedInput.sku, 'sku');

      return yield* requestGetEffect<ProductCompatibility>(
        client,
        `${basePath}/inventory_item/${sku}/product_compatibility`,
      );
    });
  };

  /**
   * Creates or replaces product compatibility for one SKU.
   *
   * @param input - Seller-defined SKU and generated Compatibility body.
   * @returns An Effect that succeeds with eBay's BaseResponse.
   *
   * @example
   * ```ts
   * await Effect.runPromise(
   *   inventoryApi.createOrReplaceProductCompatibility({ sku: 'SKU-1', body: {} }),
   * );
   * ```
   *
   * @see https://developer.ebay.com/api-docs/sell/inventory/resources/inventory_item/product_compatibility/methods/createOrReplaceProductCompatibility
   */
  public createOrReplaceProductCompatibility = (
    input: CreateOrReplaceProductCompatibilityInput,
  ): Effect.Effect<BaseResponse, EbayApiError | EndpointInputError> => {
    const client = this.client;
    const basePath = this.basePath;

    return Effect.gen(function* () {
      const validatedInput = yield* requireObjectEffect<CreateOrReplaceProductCompatibilityInput>(
        input,
        'input',
      );
      const sku = yield* requireStringEffect(validatedInput.sku, 'sku');
      const body = yield* requireObjectEffect<ProductCompatibility>(validatedInput.body, 'body');

      return yield* requestPutEffect<BaseResponse>(
        client,
        `${basePath}/inventory_item/${sku}/product_compatibility`,
        body,
      );
    });
  };

  /**
   * Deletes product compatibility for one SKU.
   *
   * @param input - Seller-defined SKU value.
   * @returns An Effect that succeeds when eBay returns no content.
   *
   * @example
   * ```ts
   * await Effect.runPromise(inventoryApi.deleteProductCompatibility({ sku: 'SKU-1' }));
   * ```
   *
   * @see https://developer.ebay.com/api-docs/sell/inventory/resources/inventory_item/product_compatibility/methods/deleteProductCompatibility
   */
  public deleteProductCompatibility = (
    input: SkuInput,
  ): Effect.Effect<DeleteProductCompatibilityResponse, EbayApiError | EndpointInputError> => {
    const client = this.client;
    const basePath = this.basePath;

    return Effect.gen(function* () {
      const validatedInput = yield* requireObjectEffect<SkuInput>(input, 'input');
      const sku = yield* requireStringEffect(validatedInput.sku, 'sku');

      return yield* requestDeleteEffect<DeleteProductCompatibilityResponse>(
        client,
        `${basePath}/inventory_item/${sku}/product_compatibility`,
      );
    });
  };

  /**
   * Retrieves one inventory item group.
   *
   * @param input - Seller-defined inventory item group key.
   * @returns An Effect that succeeds with eBay's InventoryItemGroup response.
   *
   * @example
   * ```ts
   * const group = await Effect.runPromise(
   *   inventoryApi.getInventoryItemGroup({ inventoryItemGroupKey: 'GROUP-1' }),
   * );
   * ```
   *
   * @see https://developer.ebay.com/api-docs/sell/inventory/resources/inventory_item_group/methods/getInventoryItemGroup
   */
  public getInventoryItemGroup = (
    input: InventoryItemGroupKeyInput,
  ): Effect.Effect<InventoryItemGroup, EbayApiError | EndpointInputError> => {
    const client = this.client;
    const basePath = this.basePath;

    return Effect.gen(function* () {
      const validatedInput = yield* requireObjectEffect<InventoryItemGroupKeyInput>(input, 'input');
      const inventoryItemGroupKey = yield* requireStringEffect(
        validatedInput.inventoryItemGroupKey,
        'inventoryItemGroupKey',
      );

      return yield* requestGetEffect<InventoryItemGroup>(
        client,
        `${basePath}/inventory_item_group/${inventoryItemGroupKey}`,
      );
    });
  };

  /**
   * Creates or replaces one inventory item group.
   *
   * @param input - Seller-defined inventory item group key and generated InventoryItemGroup body.
   * @returns An Effect that succeeds with eBay's BaseResponse.
   *
   * @example
   * ```ts
   * await Effect.runPromise(
   *   inventoryApi.createOrReplaceInventoryItemGroup({
   *     inventoryItemGroupKey: 'GROUP-1',
   *     body: { variantSKUs: ['SKU-1'] },
   *   }),
   * );
   * ```
   *
   * @see https://developer.ebay.com/api-docs/sell/inventory/resources/inventory_item_group/methods/createOrReplaceInventoryItemGroup
   */
  public createOrReplaceInventoryItemGroup = (
    input: CreateOrReplaceInventoryItemGroupInput,
  ): Effect.Effect<BaseResponse, EbayApiError | EndpointInputError> => {
    const client = this.client;
    const basePath = this.basePath;

    return Effect.gen(function* () {
      const validatedInput = yield* requireObjectEffect<CreateOrReplaceInventoryItemGroupInput>(
        input,
        'input',
      );
      const inventoryItemGroupKey = yield* requireStringEffect(
        validatedInput.inventoryItemGroupKey,
        'inventoryItemGroupKey',
      );
      const body = yield* requireObjectEffect<InventoryItemGroup>(validatedInput.body, 'body');

      return yield* requestPutEffect<BaseResponse>(
        client,
        `${basePath}/inventory_item_group/${inventoryItemGroupKey}`,
        body,
      );
    });
  };

  /**
   * Deletes one inventory item group.
   *
   * @param input - Seller-defined inventory item group key.
   * @returns An Effect that succeeds when eBay returns no content.
   *
   * @example
   * ```ts
   * await Effect.runPromise(
   *   inventoryApi.deleteInventoryItemGroup({ inventoryItemGroupKey: 'GROUP-1' }),
   * );
   * ```
   *
   * @see https://developer.ebay.com/api-docs/sell/inventory/resources/inventory_item_group/methods/deleteInventoryItemGroup
   */
  public deleteInventoryItemGroup = (
    input: InventoryItemGroupKeyInput,
  ): Effect.Effect<DeleteInventoryItemGroupResponse, EbayApiError | EndpointInputError> => {
    const client = this.client;
    const basePath = this.basePath;

    return Effect.gen(function* () {
      const validatedInput = yield* requireObjectEffect<InventoryItemGroupKeyInput>(input, 'input');
      const inventoryItemGroupKey = yield* requireStringEffect(
        validatedInput.inventoryItemGroupKey,
        'inventoryItemGroupKey',
      );

      return yield* requestDeleteEffect<DeleteInventoryItemGroupResponse>(
        client,
        `${basePath}/inventory_item_group/${inventoryItemGroupKey}`,
      );
    });
  };

  /**
   * Bulk migrates listings into the Inventory API model.
   *
   * @param input - Generated BulkMigrateListing body.
   * @returns An Effect that succeeds with eBay's BulkMigrateListingResponse.
   *
   * @example
   * ```ts
   * const result = await Effect.runPromise(
   *   inventoryApi.bulkMigrateListing({ body: { requests: [] } }),
   * );
   * ```
   *
   * @see https://developer.ebay.com/api-docs/sell/inventory/resources/inventory_item/methods/bulkMigrateListing
   */
  public bulkMigrateListing = (
    input: BulkMigrateListingInput,
  ): Effect.Effect<BulkMigrateListingResponse, EbayApiError | EndpointInputError> => {
    const client = this.client;
    const path = `${this.basePath}/bulk_migrate_listing`;

    return Effect.gen(function* () {
      const validatedInput = yield* requireObjectEffect<BulkMigrateListingInput>(input, 'input');
      const body = yield* requireObjectEffect<BulkMigrateListingRequest>(
        validatedInput.body,
        'body',
      );

      return yield* requestPostEffect<BulkMigrateListingResponse>(client, path, body);
    });
  };

  /**
   * Retrieves SKU location mappings for one listing/SKU pair.
   *
   * @param input - Listing ID and seller-defined SKU value.
   * @returns An Effect that succeeds with eBay's LocationMapping response.
   *
   * @example
   * ```ts
   * const mapping = await Effect.runPromise(
   *   inventoryApi.getSkuLocationMapping({ listingId: '123', sku: 'SKU-1' }),
   * );
   * ```
   *
   * @see https://developer.ebay.com/api-docs/sell/inventory/resources/listing/methods/getSkuLocationMapping
   */
  public getSkuLocationMapping = (
    input: SkuLocationMappingInput,
  ): Effect.Effect<LocationMapping, EbayApiError | EndpointInputError> => {
    const client = this.client;
    const basePath = this.basePath;

    return Effect.gen(function* () {
      const validatedInput = yield* requireObjectEffect<SkuLocationMappingInput>(input, 'input');
      const listingId = yield* requireStringEffect(validatedInput.listingId, 'listingId');
      const sku = yield* requireStringEffect(validatedInput.sku, 'sku');

      return yield* requestGetEffect<LocationMapping>(
        client,
        `${basePath}/listing/${listingId}/sku/${sku}/locations`,
      );
    });
  };

  /**
   * Creates or replaces SKU location mappings for one listing/SKU pair.
   *
   * @param input - Listing ID, SKU, and generated LocationMapping body.
   * @returns An Effect that succeeds when eBay returns no content.
   *
   * @example
   * ```ts
   * await Effect.runPromise(
   *   inventoryApi.createOrReplaceSkuLocationMapping({
   *     listingId: '123',
   *     sku: 'SKU-1',
   *     body: { locations: [] },
   *   }),
   * );
   * ```
   *
   * @see https://developer.ebay.com/api-docs/sell/inventory/resources/listing/methods/createOrReplaceSkuLocationMapping
   */
  public createOrReplaceSkuLocationMapping = (
    input: CreateOrReplaceSkuLocationMappingInput,
  ): Effect.Effect<
    CreateOrReplaceSkuLocationMappingResponse,
    EbayApiError | EndpointInputError
  > => {
    const client = this.client;
    const basePath = this.basePath;

    return Effect.gen(function* () {
      const validatedInput = yield* requireObjectEffect<CreateOrReplaceSkuLocationMappingInput>(
        input,
        'input',
      );
      const listingId = yield* requireStringEffect(validatedInput.listingId, 'listingId');
      const sku = yield* requireStringEffect(validatedInput.sku, 'sku');
      const body = yield* requireObjectEffect<LocationMapping>(validatedInput.body, 'body');

      return yield* requestPutEffect<CreateOrReplaceSkuLocationMappingResponse>(
        client,
        `${basePath}/listing/${listingId}/sku/${sku}/locations`,
        body,
      );
    });
  };

  /**
   * Deletes SKU location mappings for one listing/SKU pair.
   *
   * @param input - Listing ID and seller-defined SKU value.
   * @returns An Effect that succeeds when eBay returns no content.
   *
   * @example
   * ```ts
   * await Effect.runPromise(
   *   inventoryApi.deleteSkuLocationMapping({ listingId: '123', sku: 'SKU-1' }),
   * );
   * ```
   *
   * @see https://developer.ebay.com/api-docs/sell/inventory/resources/listing/methods/deleteSkuLocationMapping
   */
  public deleteSkuLocationMapping = (
    input: SkuLocationMappingInput,
  ): Effect.Effect<DeleteSkuLocationMappingResponse, EbayApiError | EndpointInputError> => {
    const client = this.client;
    const basePath = this.basePath;

    return Effect.gen(function* () {
      const validatedInput = yield* requireObjectEffect<SkuLocationMappingInput>(input, 'input');
      const listingId = yield* requireStringEffect(validatedInput.listingId, 'listingId');
      const sku = yield* requireStringEffect(validatedInput.sku, 'sku');

      return yield* requestDeleteEffect<DeleteSkuLocationMappingResponse>(
        client,
        `${basePath}/listing/${listingId}/sku/${sku}/locations`,
      );
    });
  };

  /**
   * Creates multiple offers.
   *
   * @param input - Generated BulkEbayOfferDetailsWithKeys body.
   * @returns An Effect that succeeds with eBay's BulkOfferResponse.
   *
   * @example
   * ```ts
   * const result = await Effect.runPromise(inventoryApi.bulkCreateOffer({ body: { requests: [] } }));
   * ```
   *
   * @see https://developer.ebay.com/api-docs/sell/inventory/resources/offer/methods/bulkCreateOffer
   */
  public bulkCreateOffer = (
    input: BulkCreateOfferInput,
  ): Effect.Effect<BulkCreateOfferResponse, EbayApiError | EndpointInputError> => {
    const client = this.client;
    const path = `${this.basePath}/bulk_create_offer`;

    return Effect.gen(function* () {
      const validatedInput = yield* requireObjectEffect<BulkCreateOfferInput>(input, 'input');
      const body = yield* requireObjectEffect<BulkCreateOfferRequest>(validatedInput.body, 'body');

      return yield* requestPostEffect<BulkCreateOfferResponse>(client, path, body);
    });
  };

  /**
   * Publishes multiple offers.
   *
   * @param input - Generated BulkOffer body.
   * @returns An Effect that succeeds with eBay's BulkPublishResponse.
   *
   * @example
   * ```ts
   * const result = await Effect.runPromise(inventoryApi.bulkPublishOffer({ body: { offers: [] } }));
   * ```
   *
   * @see https://developer.ebay.com/api-docs/sell/inventory/resources/offer/methods/bulkPublishOffer
   */
  public bulkPublishOffer = (
    input: BulkPublishOfferInput,
  ): Effect.Effect<BulkPublishOfferResponse, EbayApiError | EndpointInputError> => {
    const client = this.client;
    const path = `${this.basePath}/bulk_publish_offer`;

    return Effect.gen(function* () {
      const validatedInput = yield* requireObjectEffect<BulkPublishOfferInput>(input, 'input');
      const body = yield* requireObjectEffect<BulkPublishOfferRequest>(validatedInput.body, 'body');

      return yield* requestPostEffect<BulkPublishOfferResponse>(client, path, body);
    });
  };

  /**
   * Retrieves offers with optional filters.
   *
   * @param input - Optional offer filters and pagination controls.
   * @returns An Effect that succeeds with eBay's Offers response.
   *
   * @example
   * ```ts
   * const offers = await Effect.runPromise(
   *   inventoryApi.getOffers({ sku: 'SKU-1', marketplaceId: 'EBAY_US' }),
   * );
   * ```
   *
   * @see https://developer.ebay.com/api-docs/sell/inventory/resources/offer/methods/getOffers
   */
  public getOffers = (
    input: GetOffersInput = {},
  ): Effect.Effect<GetOffersResponse, EbayApiError | EndpointInputError> => {
    const client = this.client;
    const path = `${this.basePath}/offer`;

    return Effect.gen(function* () {
      const validatedInput = yield* requireObjectEffect<GetOffersInput>(input, 'input');
      const format = yield* optionalStringEffect(validatedInput.format, 'format');
      const limit = yield* optionalPositiveNumberEffect(validatedInput.limit, 'limit');
      const marketplaceId = yield* optionalStringEffect(
        validatedInput.marketplaceId,
        'marketplaceId',
      );
      const offset = yield* optionalNonNegativeNumberEffect(validatedInput.offset, 'offset');
      const sku = yield* optionalStringEffect(validatedInput.sku, 'sku');
      const params = buildEndpointParams({
        format: { wireName: 'format', value: format },
        limit: { wireName: 'limit', value: limit === undefined ? undefined : String(limit) },
        marketplaceId: { wireName: 'marketplace_id', value: marketplaceId },
        offset: { wireName: 'offset', value: offset === undefined ? undefined : String(offset) },
        sku: { wireName: 'sku', value: sku },
      });

      return yield* requestGetEffect<GetOffersResponse>(client, path, params);
    });
  };

  /**
   * Creates one offer.
   *
   * @param input - Generated EbayOfferDetailsWithKeys body.
   * @returns An Effect that succeeds with eBay's OfferResponse.
   *
   * @example
   * ```ts
   * const offer = await Effect.runPromise(inventoryApi.createOffer({ body: { sku: 'SKU-1' } }));
   * ```
   *
   * @see https://developer.ebay.com/api-docs/sell/inventory/resources/offer/methods/createOffer
   */
  public createOffer = (
    input: CreateOfferInput,
  ): Effect.Effect<CreateOfferResponse, EbayApiError | EndpointInputError> => {
    const client = this.client;
    const path = `${this.basePath}/offer`;

    return Effect.gen(function* () {
      const validatedInput = yield* requireObjectEffect<CreateOfferInput>(input, 'input');
      const body = yield* requireObjectEffect<CreateOfferRequest>(validatedInput.body, 'body');

      return yield* requestPostEffect<CreateOfferResponse>(client, path, body);
    });
  };

  /**
   * Retrieves one offer by ID.
   *
   * @param input - eBay offer identifier.
   * @returns An Effect that succeeds with eBay's EbayOfferDetailsWithAll response.
   *
   * @example
   * ```ts
   * const offer = await Effect.runPromise(inventoryApi.getOffer({ offerId: 'OFFER-1' }));
   * ```
   *
   * @see https://developer.ebay.com/api-docs/sell/inventory/resources/offer/methods/getOffer
   */
  public getOffer = (
    input: OfferIdInput,
  ): Effect.Effect<GetOfferResponse, EbayApiError | EndpointInputError> => {
    const client = this.client;
    const basePath = this.basePath;

    return Effect.gen(function* () {
      const validatedInput = yield* requireObjectEffect<OfferIdInput>(input, 'input');
      const offerId = yield* requireStringEffect(validatedInput.offerId, 'offerId');

      return yield* requestGetEffect<GetOfferResponse>(client, `${basePath}/offer/${offerId}`);
    });
  };

  /**
   * Updates one offer by ID.
   *
   * @param input - eBay offer identifier and generated EbayOfferDetailsWithId body.
   * @returns An Effect that succeeds with eBay's OfferResponse.
   *
   * @example
   * ```ts
   * await Effect.runPromise(
   *   inventoryApi.updateOffer({ offerId: 'OFFER-1', body: { offerId: 'OFFER-1' } }),
   * );
   * ```
   *
   * @see https://developer.ebay.com/api-docs/sell/inventory/resources/offer/methods/updateOffer
   */
  public updateOffer = (
    input: UpdateOfferInput,
  ): Effect.Effect<CreateOfferResponse, EbayApiError | EndpointInputError> => {
    const client = this.client;
    const basePath = this.basePath;

    return Effect.gen(function* () {
      const validatedInput = yield* requireObjectEffect<UpdateOfferInput>(input, 'input');
      const offerId = yield* requireStringEffect(validatedInput.offerId, 'offerId');
      const body = yield* requireObjectEffect<UpdateOfferRequest>(validatedInput.body, 'body');

      return yield* requestPutEffect<CreateOfferResponse>(
        client,
        `${basePath}/offer/${offerId}`,
        body,
      );
    });
  };

  /**
   * Deletes one offer by ID.
   *
   * @param input - eBay offer identifier.
   * @returns An Effect that succeeds when eBay returns no content.
   *
   * @example
   * ```ts
   * await Effect.runPromise(inventoryApi.deleteOffer({ offerId: 'OFFER-1' }));
   * ```
   *
   * @see https://developer.ebay.com/api-docs/sell/inventory/resources/offer/methods/deleteOffer
   */
  public deleteOffer = (
    input: OfferIdInput,
  ): Effect.Effect<DeleteOfferResponse, EbayApiError | EndpointInputError> => {
    const client = this.client;
    const basePath = this.basePath;

    return Effect.gen(function* () {
      const validatedInput = yield* requireObjectEffect<OfferIdInput>(input, 'input');
      const offerId = yield* requireStringEffect(validatedInput.offerId, 'offerId');

      return yield* requestDeleteEffect<DeleteOfferResponse>(
        client,
        `${basePath}/offer/${offerId}`,
      );
    });
  };

  /**
   * Retrieves listing fees for unpublished offers.
   *
   * @param input - Generated OfferKeysWithId body.
   * @returns An Effect that succeeds with eBay's FeesSummaryResponse.
   *
   * @example
   * ```ts
   * const fees = await Effect.runPromise(
   *   inventoryApi.getListingFees({ body: { offers: [{ offerId: 'OFFER-1' }] } }),
   * );
   * ```
   *
   * @see https://developer.ebay.com/api-docs/sell/inventory/resources/offer/methods/getListingFees
   */
  public getListingFees = (
    input: GetListingFeesInput,
  ): Effect.Effect<GetListingFeesResponse, EbayApiError | EndpointInputError> => {
    const client = this.client;
    const path = `${this.basePath}/offer/get_listing_fees`;

    return Effect.gen(function* () {
      const validatedInput = yield* requireObjectEffect<GetListingFeesInput>(input, 'input');
      const body = yield* requireObjectEffect<GetListingFeesRequest>(validatedInput.body, 'body');

      return yield* requestPostEffect<GetListingFeesResponse>(client, path, body);
    });
  };

  /**
   * Publishes one offer by ID.
   *
   * @param input - eBay offer identifier.
   * @returns An Effect that succeeds with eBay's PublishResponse.
   *
   * @example
   * ```ts
   * const publish = await Effect.runPromise(inventoryApi.publishOffer({ offerId: 'OFFER-1' }));
   * ```
   *
   * @see https://developer.ebay.com/api-docs/sell/inventory/resources/offer/methods/publishOffer
   */
  public publishOffer = (
    input: OfferIdInput,
  ): Effect.Effect<PublishOfferResponse, EbayApiError | EndpointInputError> => {
    const client = this.client;
    const basePath = this.basePath;

    return Effect.gen(function* () {
      const validatedInput = yield* requireObjectEffect<OfferIdInput>(input, 'input');
      const offerId = yield* requireStringEffect(validatedInput.offerId, 'offerId');

      return yield* requestPostEffect<PublishOfferResponse>(
        client,
        `${basePath}/offer/${offerId}/publish`,
      );
    });
  };

  /**
   * Publishes offers for one inventory item group.
   *
   * @param input - Generated PublishByInventoryItemGroupRequest body.
   * @returns An Effect that succeeds with eBay's PublishResponse.
   *
   * @example
   * ```ts
   * const publish = await Effect.runPromise(
   *   inventoryApi.publishOfferByInventoryItemGroup({
   *     body: { inventoryItemGroupKey: 'GROUP-1', marketplaceId: 'EBAY_US' },
   *   }),
   * );
   * ```
   *
   * @see https://developer.ebay.com/api-docs/sell/inventory/resources/offer/methods/publishOfferByInventoryItemGroup
   */
  public publishOfferByInventoryItemGroup = (
    input: PublishOfferByInventoryItemGroupInput,
  ): Effect.Effect<PublishOfferResponse, EbayApiError | EndpointInputError> => {
    const client = this.client;
    const path = `${this.basePath}/offer/publish_by_inventory_item_group`;

    return Effect.gen(function* () {
      const validatedInput = yield* requireObjectEffect<PublishOfferByInventoryItemGroupInput>(
        input,
        'input',
      );
      const body = yield* requireObjectEffect<PublishOfferByInventoryItemGroupRequest>(
        validatedInput.body,
        'body',
      );

      return yield* requestPostEffect<PublishOfferResponse>(client, path, body);
    });
  };

  /**
   * Withdraws one offer by ID.
   *
   * @param input - eBay offer identifier.
   * @returns An Effect that succeeds with eBay's WithdrawResponse.
   *
   * @example
   * ```ts
   * const withdraw = await Effect.runPromise(inventoryApi.withdrawOffer({ offerId: 'OFFER-1' }));
   * ```
   *
   * @see https://developer.ebay.com/api-docs/sell/inventory/resources/offer/methods/withdrawOffer
   */
  public withdrawOffer = (
    input: OfferIdInput,
  ): Effect.Effect<WithdrawOfferResponse, EbayApiError | EndpointInputError> => {
    const client = this.client;
    const basePath = this.basePath;

    return Effect.gen(function* () {
      const validatedInput = yield* requireObjectEffect<OfferIdInput>(input, 'input');
      const offerId = yield* requireStringEffect(validatedInput.offerId, 'offerId');

      return yield* requestPostEffect<WithdrawOfferResponse>(
        client,
        `${basePath}/offer/${offerId}/withdraw`,
      );
    });
  };

  /**
   * Withdraws offers for one inventory item group.
   *
   * @param input - Generated WithdrawByInventoryItemGroupRequest body.
   * @returns An Effect that succeeds when eBay returns no content.
   *
   * @example
   * ```ts
   * await Effect.runPromise(
   *   inventoryApi.withdrawOfferByInventoryItemGroup({
   *     body: { inventoryItemGroupKey: 'GROUP-1', marketplaceId: 'EBAY_US' },
   *   }),
   * );
   * ```
   *
   * @see https://developer.ebay.com/api-docs/sell/inventory/resources/offer/methods/withdrawOfferByInventoryItemGroup
   */
  public withdrawOfferByInventoryItemGroup = (
    input: WithdrawOfferByInventoryItemGroupInput,
  ): Effect.Effect<
    WithdrawOfferByInventoryItemGroupResponse,
    EbayApiError | EndpointInputError
  > => {
    const client = this.client;
    const path = `${this.basePath}/offer/withdraw_by_inventory_item_group`;

    return Effect.gen(function* () {
      const validatedInput = yield* requireObjectEffect<WithdrawOfferByInventoryItemGroupInput>(
        input,
        'input',
      );
      const body = yield* requireObjectEffect<WithdrawOfferByInventoryItemGroupRequest>(
        validatedInput.body,
        'body',
      );

      return yield* requestPostEffect<WithdrawOfferByInventoryItemGroupResponse>(
        client,
        path,
        body,
      );
    });
  };

  /**
   * Retrieves one inventory location by merchant location key.
   *
   * @param input - Seller-defined merchant location key.
   * @returns An Effect that succeeds with eBay's InventoryLocationResponse.
   *
   * @example
   * ```ts
   * const location = await Effect.runPromise(
   *   inventoryApi.getInventoryLocation({ merchantLocationKey: 'LOC-1' }),
   * );
   * ```
   *
   * @see https://developer.ebay.com/api-docs/sell/inventory/resources/location/methods/getInventoryLocation
   */
  public getInventoryLocation = (
    input: MerchantLocationKeyInput,
  ): Effect.Effect<GetInventoryLocationResponse, EbayApiError | EndpointInputError> => {
    const client = this.client;
    const basePath = this.basePath;

    return Effect.gen(function* () {
      const validatedInput = yield* requireObjectEffect<MerchantLocationKeyInput>(input, 'input');
      const merchantLocationKey = yield* requireStringEffect(
        validatedInput.merchantLocationKey,
        'merchantLocationKey',
      );

      return yield* requestGetEffect<GetInventoryLocationResponse>(
        client,
        `${basePath}/location/${merchantLocationKey}`,
      );
    });
  };

  /**
   * Creates one inventory location by merchant location key.
   *
   * @param input - Seller-defined merchant location key and generated InventoryLocationFull body.
   * @returns An Effect that succeeds when eBay returns no content.
   *
   * @example
   * ```ts
   * await Effect.runPromise(
   *   inventoryApi.createInventoryLocation({ merchantLocationKey: 'LOC-1', body: {} }),
   * );
   * ```
   *
   * @see https://developer.ebay.com/api-docs/sell/inventory/resources/location/methods/createInventoryLocation
   */
  public createInventoryLocation = (
    input: CreateInventoryLocationInput,
  ): Effect.Effect<CreateInventoryLocationResponse, EbayApiError | EndpointInputError> => {
    const client = this.client;
    const basePath = this.basePath;

    return Effect.gen(function* () {
      const validatedInput = yield* requireObjectEffect<CreateInventoryLocationInput>(
        input,
        'input',
      );
      const merchantLocationKey = yield* requireStringEffect(
        validatedInput.merchantLocationKey,
        'merchantLocationKey',
      );
      const body = yield* requireObjectEffect<CreateInventoryLocationRequest>(
        validatedInput.body,
        'body',
      );

      return yield* requestPostEffect<CreateInventoryLocationResponse>(
        client,
        `${basePath}/location/${merchantLocationKey}`,
        body,
      );
    });
  };

  /**
   * Deletes one inventory location by merchant location key.
   *
   * @param input - Seller-defined merchant location key.
   * @returns An Effect that succeeds when eBay returns no content.
   *
   * @example
   * ```ts
   * await Effect.runPromise(
   *   inventoryApi.deleteInventoryLocation({ merchantLocationKey: 'LOC-1' }),
   * );
   * ```
   *
   * @see https://developer.ebay.com/api-docs/sell/inventory/resources/location/methods/deleteInventoryLocation
   */
  public deleteInventoryLocation = (
    input: MerchantLocationKeyInput,
  ): Effect.Effect<DeleteInventoryLocationResponse, EbayApiError | EndpointInputError> => {
    const client = this.client;
    const basePath = this.basePath;

    return Effect.gen(function* () {
      const validatedInput = yield* requireObjectEffect<MerchantLocationKeyInput>(input, 'input');
      const merchantLocationKey = yield* requireStringEffect(
        validatedInput.merchantLocationKey,
        'merchantLocationKey',
      );

      return yield* requestDeleteEffect<DeleteInventoryLocationResponse>(
        client,
        `${basePath}/location/${merchantLocationKey}`,
      );
    });
  };

  /**
   * Disables one inventory location.
   *
   * @param input - Seller-defined merchant location key.
   * @returns An Effect that succeeds with eBay's empty disable response.
   *
   * @example
   * ```ts
   * await Effect.runPromise(
   *   inventoryApi.disableInventoryLocation({ merchantLocationKey: 'LOC-1' }),
   * );
   * ```
   *
   * @see https://developer.ebay.com/api-docs/sell/inventory/resources/location/methods/disableInventoryLocation
   */
  public disableInventoryLocation = (
    input: MerchantLocationKeyInput,
  ): Effect.Effect<DisableInventoryLocationResponse, EbayApiError | EndpointInputError> => {
    const client = this.client;
    const basePath = this.basePath;

    return Effect.gen(function* () {
      const validatedInput = yield* requireObjectEffect<MerchantLocationKeyInput>(input, 'input');
      const merchantLocationKey = yield* requireStringEffect(
        validatedInput.merchantLocationKey,
        'merchantLocationKey',
      );

      return yield* requestPostEffect<DisableInventoryLocationResponse>(
        client,
        `${basePath}/location/${merchantLocationKey}/disable`,
      );
    });
  };

  /**
   * Enables one inventory location.
   *
   * @param input - Seller-defined merchant location key.
   * @returns An Effect that succeeds with eBay's empty enable response.
   *
   * @example
   * ```ts
   * await Effect.runPromise(
   *   inventoryApi.enableInventoryLocation({ merchantLocationKey: 'LOC-1' }),
   * );
   * ```
   *
   * @see https://developer.ebay.com/api-docs/sell/inventory/resources/location/methods/enableInventoryLocation
   */
  public enableInventoryLocation = (
    input: MerchantLocationKeyInput,
  ): Effect.Effect<EnableInventoryLocationResponse, EbayApiError | EndpointInputError> => {
    const client = this.client;
    const basePath = this.basePath;

    return Effect.gen(function* () {
      const validatedInput = yield* requireObjectEffect<MerchantLocationKeyInput>(input, 'input');
      const merchantLocationKey = yield* requireStringEffect(
        validatedInput.merchantLocationKey,
        'merchantLocationKey',
      );

      return yield* requestPostEffect<EnableInventoryLocationResponse>(
        client,
        `${basePath}/location/${merchantLocationKey}/enable`,
      );
    });
  };

  /**
   * Retrieves paginated inventory locations.
   *
   * @param input - Optional pagination controls.
   * @returns An Effect that succeeds with eBay's LocationResponse.
   *
   * @example
   * ```ts
   * const locations = await Effect.runPromise(inventoryApi.getInventoryLocations({ limit: 50 }));
   * ```
   *
   * @see https://developer.ebay.com/api-docs/sell/inventory/resources/location/methods/getInventoryLocations
   */
  public getInventoryLocations = (
    input: InventoryPaginationInput = {},
  ): Effect.Effect<GetInventoryLocationsResponse, EbayApiError | EndpointInputError> => {
    const client = this.client;
    const path = `${this.basePath}/location`;

    return Effect.gen(function* () {
      const validatedInput = yield* requireObjectEffect<InventoryPaginationInput>(input, 'input');
      const limit = yield* optionalPositiveNumberEffect(validatedInput.limit, 'limit');
      const offset = yield* optionalNonNegativeNumberEffect(validatedInput.offset, 'offset');
      const params = buildEndpointParams({
        limit: { wireName: 'limit', value: limit === undefined ? undefined : String(limit) },
        offset: { wireName: 'offset', value: offset === undefined ? undefined : String(offset) },
      });

      return yield* requestGetEffect<GetInventoryLocationsResponse>(client, path, params);
    });
  };

  /**
   * Updates details for one inventory location.
   *
   * @param input - Seller-defined merchant location key and generated InventoryLocation body.
   * @returns An Effect that succeeds when eBay returns no content.
   *
   * @example
   * ```ts
   * await Effect.runPromise(
   *   inventoryApi.updateInventoryLocation({ merchantLocationKey: 'LOC-1', body: {} }),
   * );
   * ```
   *
   * @see https://developer.ebay.com/api-docs/sell/inventory/resources/location/methods/updateInventoryLocation
   */
  public updateInventoryLocation = (
    input: UpdateInventoryLocationInput,
  ): Effect.Effect<UpdateInventoryLocationResponse, EbayApiError | EndpointInputError> => {
    const client = this.client;
    const basePath = this.basePath;

    return Effect.gen(function* () {
      const validatedInput = yield* requireObjectEffect<UpdateInventoryLocationInput>(
        input,
        'input',
      );
      const merchantLocationKey = yield* requireStringEffect(
        validatedInput.merchantLocationKey,
        'merchantLocationKey',
      );
      const body = yield* requireObjectEffect<UpdateInventoryLocationRequest>(
        validatedInput.body,
        'body',
      );

      return yield* requestPostEffect<UpdateInventoryLocationResponse>(
        client,
        `${basePath}/location/${merchantLocationKey}/update_location_details`,
        body,
      );
    });
  };
}
