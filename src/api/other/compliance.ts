import type { EbayApiClient } from '@/api/client.js';
import {
  buildEndpointParams,
  type EbayApiError,
  type EndpointInputError,
  optionalNonNegativeNumberEffect,
  optionalPositiveNumberEffect,
  optionalStringEffect,
  requestGetEffect,
  requireObjectEffect,
} from '@/api/shared/request.js';
import type { SellComplianceComponents } from '@/types/sell-apps/other-apis/sellComplianceV1Oas3.js';
import { Effect } from 'effect';

/** Input accepted by getListingViolations. */
export interface GetListingViolationsInput {
  /** Compliance type filter, sent as compliance_type. */
  readonly complianceType?: string;
  /** Compliance state filter expression, sent as filter. */
  readonly filter?: string;
  /** Number of violations to skip. */
  readonly offset?: number;
  /** Number of violations to return. */
  readonly limit?: number;
}

/** Input accepted by getListingViolationsSummary. */
export interface GetListingViolationsSummaryInput {
  /** Compliance type filter, sent as compliance_type. */
  readonly complianceType?: string;
}

/**
 * Response returned by getListingViolations.
 *
 * @see https://developer.ebay.com/api-docs/sell/compliance/resources/listing_violation/methods/getListingViolations
 */
export type ListingViolationsResponse =
  SellComplianceComponents['schemas']['PagedComplianceViolationCollection'];

/**
 * Response returned by getListingViolationsSummary.
 *
 * @see https://developer.ebay.com/api-docs/sell/compliance/resources/listing_violation_summary/methods/getListingViolationsSummary
 */
export type ListingViolationsSummaryResponse =
  SellComplianceComponents['schemas']['ComplianceSummary'];

/** Compliance API - listing policy violation checks. */
export class ComplianceApi {
  private readonly basePath = '/sell/compliance/v1';

  public constructor(private readonly client: EbayApiClient) {}

  /**
   * Retrieves listing violations for supported compliance types.
   *
   * @param input - Optional compliance type, compliance state filter, and pagination params.
   * @returns An Effect that succeeds with eBay's PagedComplianceViolationCollection response.
   *
   * @example
   * ```ts
   * const violations = await Effect.runPromise(
   *   complianceApi.getListingViolations({ complianceType: 'PRODUCT_ADOPTION', limit: 10 }),
   * );
   * ```
   *
   * @see https://developer.ebay.com/api-docs/sell/compliance/resources/listing_violation/methods/getListingViolations
   */
  public getListingViolations = (
    input: GetListingViolationsInput = {},
  ): Effect.Effect<ListingViolationsResponse, EbayApiError | EndpointInputError> => {
    const client = this.client;
    const basePath = this.basePath;

    return Effect.gen(function* () {
      const validatedInput = yield* requireObjectEffect<GetListingViolationsInput>(input, 'input');
      const complianceType = yield* optionalStringEffect(
        validatedInput.complianceType,
        'complianceType',
      );
      const filter = yield* optionalStringEffect(validatedInput.filter, 'filter');
      const offset = yield* optionalNonNegativeNumberEffect(validatedInput.offset, 'offset');
      const limit = yield* optionalPositiveNumberEffect(validatedInput.limit, 'limit');
      const params = buildEndpointParams({
        complianceType: { wireName: 'compliance_type', value: complianceType },
        filter: { wireName: 'filter', value: filter },
        offset: { wireName: 'offset', value: offset },
        limit: { wireName: 'limit', value: limit },
      });

      return yield* requestGetEffect<ListingViolationsResponse>(
        client,
        `${basePath}/listing_violation`,
        params,
      );
    });
  };

  /**
   * Retrieves listing violation counts grouped by marketplace and compliance type.
   *
   * @param input - Optional compliance type filter.
   * @returns An Effect that succeeds with eBay's ComplianceSummary response.
   *
   * @example
   * ```ts
   * const summary = await Effect.runPromise(
   *   complianceApi.getListingViolationsSummary({ complianceType: 'PRODUCT_ADOPTION' }),
   * );
   * ```
   *
   * @see https://developer.ebay.com/api-docs/sell/compliance/resources/listing_violation_summary/methods/getListingViolationsSummary
   */
  public getListingViolationsSummary = (
    input: GetListingViolationsSummaryInput = {},
  ): Effect.Effect<ListingViolationsSummaryResponse, EbayApiError | EndpointInputError> => {
    const client = this.client;
    const basePath = this.basePath;

    return Effect.gen(function* () {
      const validatedInput = yield* requireObjectEffect<GetListingViolationsSummaryInput>(
        input,
        'input',
      );
      const complianceType = yield* optionalStringEffect(
        validatedInput.complianceType,
        'complianceType',
      );
      const params = buildEndpointParams({
        complianceType: { wireName: 'compliance_type', value: complianceType },
      });

      return yield* requestGetEffect<ListingViolationsSummaryResponse>(
        client,
        `${basePath}/listing_violation_summary`,
        params,
      );
    });
  };
}
