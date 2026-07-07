import { z } from '@/utils/effectSchema.js';
import { zodToJsonSchema } from 'zod-to-json-schema';

/**
 * Marketing API Schemas
 *
 * This file contains Effect-backed schemas for all Marketing API endpoints including:
 * - Campaign Management (create, get, update, pause, resume, end campaigns)
 * - Ad Operations (bulk and single ad operations)
 * - Ad Group Management
 * - Keyword Management
 * - Negative Keyword Management (campaign and ad group level)
 * - Targeting schemas
 * - Suggestion schemas (bids, keywords, budget)
 * - Reporting schemas
 * - Item Promotion schemas
 * - Recommendation schemas
 */

// ============================================================================
// Common/Shared Response Schemas
// ============================================================================

/**
 * Validates the Marketing API error model.
 */
export const errorSchema = z.object({
  errorId: z.number().optional(),
  domain: z.string().optional(),
  category: z.string().optional(),
  message: z.string().optional(),
  longMessage: z.string().optional(),
  subdomain: z.string().optional(),
  inputRefIds: z.array(z.string()).optional(),
  outputRefIds: z.array(z.string()).optional(),
  parameters: z
    .array(
      z.object({
        name: z.string().optional(),
        value: z.string().optional(),
      }),
    )
    .optional(),
});

/**
 * Validates the Marketing API error parameter model.
 */
export const errorParameterSchema = z.object({
  name: z.string().optional(),
  value: z.string().optional(),
});

/**
 * Validates the Marketing API amount model.
 */
export const amountSchema = z.object({
  currency: z.string().optional(),
  value: z.string().optional(),
});

/**
 * Validates the Marketing API alert model.
 */
export const alertSchema = z.object({
  alertId: z.string().optional(),
  message: z.string().optional(),
});

/**
 * Validates the Marketing API alert details model.
 */
export const alertDetailsSchema = z.object({
  alertId: z.string().optional(),
  details: z.string().optional(),
});

/**
 * Validates the Marketing API alert dimension model.
 */
export const alertDimensionSchema = z.object({
  dimensionKey: z.string().optional(),
  value: z.string().optional(),
});

/**
 * Validates the Marketing API base response payload.
 */
export const baseResponseSchema = z.object({
  warnings: z.array(errorSchema).optional(),
});

// ============================================================================
// Inventory Reference Schemas
// ============================================================================

/**
 * Validates the Marketing API marketing inventory item model.
 */
export const marketingInventoryItemSchema = z.object({
  inventoryReferenceId: z.string().optional(),
  inventoryReferenceType: z.string().optional(),
});

/**
 * Validates the Marketing API inventory reference model.
 */
export const inventoryReferenceSchema = z.object({
  inventoryReferenceId: z.string().optional(),
  inventoryReferenceType: z.string().optional(),
});

// ============================================================================
// Campaign Management Schemas
// ============================================================================

/**
 * Validates the Marketing API budget model.
 */
export const budgetSchema = z.object({
  amount: z.string().optional(),
  currency: z.string().optional(),
});

/**
 * Validates the Marketing API budget request model.
 */
export const budgetRequestSchema = z.object({
  amount: z.string().optional(),
  currency: z.string().optional(),
});

/**
 * Validates the Marketing API campaign budget model.
 */
export const campaignBudgetSchema = z.object({
  daily: budgetSchema.optional(),
});

/**
 * Validates the Marketing API campaign budget request model.
 */
export const campaignBudgetRequestSchema = z.object({
  daily: budgetRequestSchema.optional(),
});

/**
 * Validates the Marketing API funding strategy model.
 */
export const fundingStrategySchema = z.object({
  bidPercentage: z.string().optional(),
  fundingModel: z.string().optional(),
});

/**
 * Validates the Marketing API selection rule model.
 */
export const selectionRuleSchema = z.object({
  brands: z.array(z.string()).optional(),
  categoryIds: z.array(z.string()).optional(),
  categoryScope: z.string().optional(),
  listingConditionIds: z.array(z.string()).optional(),
  maxPrice: amountSchema.optional(),
  minPrice: amountSchema.optional(),
});

/**
 * Validates the Marketing API campaign criterion model.
 */
export const campaignCriterionSchema = z.object({
  autoSelectFutureInventory: z.boolean().optional(),
  criterionType: z.string().optional(),
  selectionRules: z.array(selectionRuleSchema).optional(),
});

/**
 * Validates the Marketing API campaign model.
 */
export const campaignSchema = z.object({
  alerts: z.array(alertSchema).optional(),
  budget: campaignBudgetSchema.optional(),
  campaignCriterion: campaignCriterionSchema.optional(),
  campaignId: z.string().optional(),
  campaignName: z.string().optional(),
  campaignStatus: z.string().optional(),
  campaignTargetingType: z.string().optional(),
  channels: z.array(z.string()).optional(),
  endDate: z.string().optional(),
  fundingStrategy: fundingStrategySchema.optional(),
  marketplaceId: z.string().optional(),
  startDate: z.string().optional(),
});

/**
 * Validates the Marketing API create campaign request model.
 */
export const createCampaignRequestSchema = z.object({
  campaignCriterion: campaignCriterionSchema.optional(),
  campaignName: z.string(),
  budget: campaignBudgetRequestSchema.optional(),
  channels: z.array(z.string()).optional(),
  endDate: z.string().optional(),
  fundingStrategy: fundingStrategySchema.optional(),
  marketplaceId: z.string(),
  startDate: z.string(),
});

/**
 * Validates the Marketing API clone campaign request model.
 */
export const cloneCampaignRequestSchema = z.object({
  campaignName: z.string(),
  endDate: z.string().optional(),
  fundingStrategy: fundingStrategySchema.optional(),
  startDate: z.string().optional(),
});

/**
 * Validates the Marketing API update campaign request model.
 */
export const updateCampaignRequestSchema = z.object({
  campaignName: z.string().optional(),
  endDate: z.string().optional(),
  fundingStrategy: fundingStrategySchema.optional(),
  startDate: z.string().optional(),
});

/**
 * Validates the Marketing API update campaign budget request model.
 */
export const updateCampaignBudgetRequestSchema = z.object({
  budget: campaignBudgetRequestSchema.optional(),
});

/**
 * Validates the Marketing API update campaign identification request model.
 */
export const updateCampaignIdentificationRequestSchema = z.object({
  campaignName: z.string().optional(),
});

/**
 * Validates the Marketing API update bid percentage request model.
 */
export const updateBidPercentageRequestSchema = z.object({
  bidPercentage: z.string(),
});

/**
 * Validates the Marketing API update bidding strategy request model.
 */
export const updateBiddingStrategyRequestSchema = z.object({
  bidPercentage: z.string().optional(),
  biddingStrategy: z.string().optional(),
});

/**
 * Validates the Marketing API update adrate strategy request model.
 */
export const updateAdrateStrategyRequestSchema = z.object({
  adRateStrategy: z.string().optional(),
});

/**
 * Validates the Marketing API campaign paged collection response payload.
 */
export const campaignPagedCollectionResponseSchema = z.object({
  campaigns: z.array(campaignSchema).optional(),
  href: z.string().optional(),
  limit: z.number().optional(),
  next: z.string().optional(),
  offset: z.number().optional(),
  prev: z.string().optional(),
  total: z.number().optional(),
});

/**
 * Validates the Marketing API campaigns model.
 */
export const campaignsSchema = z.object({
  campaigns: z.array(campaignSchema).optional(),
});

// ============================================================================
// Ad Group Management Schemas
// ============================================================================

/**
 * Validates the Marketing API ad group model.
 */
export const adGroupSchema = z.object({
  adGroupId: z.string().optional(),
  adGroupStatus: z.string().optional(),
  defaultBid: amountSchema.optional(),
  name: z.string().optional(),
});

/**
 * Validates the Marketing API create ad group request model.
 */
export const createAdGroupRequestSchema = z.object({
  defaultBid: amountSchema.optional(),
  name: z.string(),
});

/**
 * Validates the Marketing API update ad group request model.
 */
export const updateAdGroupRequestSchema = z.object({
  adGroupStatus: z.string().optional(),
  defaultBid: amountSchema.optional(),
  name: z.string().optional(),
});

/**
 * Validates the Marketing API ad group paged collection response payload.
 */
export const adGroupPagedCollectionResponseSchema = z.object({
  adGroups: z.array(adGroupSchema).optional(),
  href: z.string().optional(),
  limit: z.number().optional(),
  next: z.string().optional(),
  offset: z.number().optional(),
  prev: z.string().optional(),
  total: z.number().optional(),
});

// ============================================================================
// Ad Operations Schemas
// ============================================================================

/**
 * Validates the Marketing API ad model.
 */
export const adSchema = z.object({
  adGroupId: z.string().optional(),
  adId: z.string().optional(),
  adStatus: z.string().optional(),
  alerts: z.array(alertSchema).optional(),
  bidPercentage: z.string().optional(),
  inventoryReferenceId: z.string().optional(),
  inventoryReferenceType: z.string().optional(),
  listingId: z.string().optional(),
});

/**
 * Validates the Marketing API create ad request model.
 */
export const createAdRequestSchema = z.object({
  adGroupId: z.string().optional(),
  bidPercentage: z.string().optional(),
  listingId: z.string().optional(),
});

/**
 * Validates the Marketing API ads model.
 */
export const adsSchema = z.object({
  ads: z.array(createAdRequestSchema).optional(),
});

/**
 * Validates the Marketing API create ads by inventory reference request model.
 */
export const createAdsByInventoryReferenceRequestSchema = z.object({
  bidPercentage: z.string().optional(),
  inventoryReferenceId: z.string().optional(),
  inventoryReferenceType: z.string().optional(),
});

/**
 * Validates the Marketing API ad reference model.
 */
export const adReferenceSchema = z.object({
  adId: z.string().optional(),
  href: z.string().optional(),
});

/**
 * Validates the Marketing API ad references model.
 */
export const adReferencesSchema = z.object({
  ads: z.array(adReferenceSchema).optional(),
});

/**
 * Validates the Marketing API ad response payload.
 */
export const adResponseSchema = z.object({
  adGroupId: z.string().optional(),
  adId: z.string().optional(),
  errors: z.array(errorSchema).optional(),
  href: z.string().optional(),
  listingId: z.string().optional(),
  statusCode: z.number().optional(),
  warnings: z.array(errorSchema).optional(),
});

/**
 * Validates the Marketing API create ads by inventory reference response payload.
 */
export const createAdsByInventoryReferenceResponseSchema = z.object({
  ads: z.array(adResponseSchema).optional(),
  errors: z.array(errorSchema).optional(),
  inventoryReferenceId: z.string().optional(),
  inventoryReferenceType: z.string().optional(),
  statusCode: z.number().optional(),
  warnings: z.array(errorSchema).optional(),
});

/**
 * Validates the Marketing API ad paged collection response payload.
 */
export const adPagedCollectionResponseSchema = z.object({
  ads: z.array(adSchema).optional(),
  href: z.string().optional(),
  limit: z.number().optional(),
  next: z.string().optional(),
  offset: z.number().optional(),
  prev: z.string().optional(),
  total: z.number().optional(),
});

// Ad Update Schemas
/**
 * Validates the Marketing API update ad status request model.
 */
export const updateAdStatusRequestSchema = z.object({
  adStatus: z.string(),
});

/**
 * Validates the Marketing API update ad status by listing ID request model.
 */
export const updateAdStatusByListingIdRequestSchema = z.object({
  adStatus: z.string(),
  listingId: z.string(),
});

/**
 * Validates the Marketing API ad update status response payload.
 */
export const adUpdateStatusResponseSchema = z.object({
  adId: z.string().optional(),
  errors: z.array(errorSchema).optional(),
  href: z.string().optional(),
  statusCode: z.number().optional(),
});

/**
 * Validates the Marketing API ad update status by listing ID response payload.
 */
export const adUpdateStatusByListingIdResponseSchema = z.object({
  errors: z.array(errorSchema).optional(),
  href: z.string().optional(),
  listingId: z.string().optional(),
  statusCode: z.number().optional(),
});

/**
 * Validates the Marketing API ad update response payload.
 */
export const adUpdateResponseSchema = z.object({
  ads: z.array(adUpdateStatusResponseSchema).optional(),
});

// Bulk Ad Operations
/**
 * Validates the Marketing API bulk create ad request model.
 */
export const bulkCreateAdRequestSchema = z.object({
  requests: z.array(createAdRequestSchema).optional(),
});

/**
 * Validates the Marketing API bulk ad response payload.
 */
export const bulkAdResponseSchema = z.object({
  responses: z.array(adResponseSchema).optional(),
});

/**
 * Validates the Marketing API bulk create ads by inventory reference request model.
 */
export const bulkCreateAdsByInventoryReferenceRequestSchema = z.object({
  requests: z.array(createAdsByInventoryReferenceRequestSchema).optional(),
});

/**
 * Validates the Marketing API bulk create ads by inventory reference response payload.
 */
export const bulkCreateAdsByInventoryReferenceResponseSchema = z.object({
  responses: z.array(createAdsByInventoryReferenceResponseSchema).optional(),
});

/**
 * Validates the Marketing API bulk update ad status request model.
 */
export const bulkUpdateAdStatusRequestSchema = z.object({
  requests: z.array(updateAdStatusRequestSchema).optional(),
});

/**
 * Validates the Marketing API bulk update ad status by listing ID request model.
 */
export const bulkUpdateAdStatusByListingIdRequestSchema = z.object({
  requests: z.array(updateAdStatusByListingIdRequestSchema).optional(),
});

/**
 * Validates the Marketing API bulk ad update status response payload.
 */
export const bulkAdUpdateStatusResponseSchema = z.object({
  responses: z.array(adUpdateStatusResponseSchema).optional(),
});

/**
 * Validates the Marketing API bulk ad update status by listing ID response payload.
 */
export const bulkAdUpdateStatusByListingIdResponseSchema = z.object({
  responses: z.array(adUpdateStatusByListingIdResponseSchema).optional(),
});

/**
 * Validates the Marketing API bulk ad update response payload.
 */
export const bulkAdUpdateResponseSchema = z.object({
  responses: z.array(adUpdateResponseSchema).optional(),
});

// Delete Ad Schemas
/**
 * Validates the Marketing API ad IDs model.
 */
export const adIdsSchema = z.object({
  adIds: z.array(z.string()).optional(),
});

/**
 * Validates the Marketing API delete ad request model.
 */
export const deleteAdRequestSchema = z.object({
  adId: z.string().optional(),
});

/**
 * Validates the Marketing API delete ad response payload.
 */
export const deleteAdResponseSchema = z.object({
  adId: z.string().optional(),
  errors: z.array(errorSchema).optional(),
  listingId: z.string().optional(),
  statusCode: z.number().optional(),
});

/**
 * Validates the Marketing API bulk delete ad request model.
 */
export const bulkDeleteAdRequestSchema = z.object({
  requests: z.array(deleteAdRequestSchema).optional(),
});

/**
 * Validates the Marketing API bulk delete ad response payload.
 */
export const bulkDeleteAdResponseSchema = z.object({
  responses: z.array(deleteAdResponseSchema).optional(),
});

/**
 * Validates the Marketing API delete ads by inventory reference request model.
 */
export const deleteAdsByInventoryReferenceRequestSchema = z.object({
  inventoryReferenceId: z.string().optional(),
  inventoryReferenceType: z.string().optional(),
});

/**
 * Validates the Marketing API delete ads by inventory reference response payload.
 */
export const deleteAdsByInventoryReferenceResponseSchema = z.object({
  ads: z.array(deleteAdResponseSchema).optional(),
  errors: z.array(errorSchema).optional(),
  inventoryReferenceId: z.string().optional(),
  inventoryReferenceType: z.string().optional(),
  statusCode: z.number().optional(),
});

/**
 * Validates the Marketing API bulk delete ads by inventory reference request model.
 */
export const bulkDeleteAdsByInventoryReferenceRequestSchema = z.object({
  requests: z.array(deleteAdsByInventoryReferenceRequestSchema).optional(),
});

/**
 * Validates the Marketing API bulk delete ads by inventory reference response payload.
 */
export const bulkDeleteAdsByInventoryReferenceResponseSchema = z.object({
  responses: z.array(deleteAdsByInventoryReferenceResponseSchema).optional(),
});

/**
 * Validates the Marketing API update ads by inventory reference response payload.
 */
export const updateAdsByInventoryReferenceResponseSchema = z.object({
  ads: z.array(adUpdateStatusResponseSchema).optional(),
  errors: z.array(errorSchema).optional(),
  inventoryReferenceId: z.string().optional(),
  inventoryReferenceType: z.string().optional(),
  statusCode: z.number().optional(),
});

/**
 * Validates the Marketing API bulk update ads by inventory reference response payload.
 */
export const bulkUpdateAdsByInventoryReferenceResponseSchema = z.object({
  responses: z.array(updateAdsByInventoryReferenceResponseSchema).optional(),
});

// ============================================================================
// Keyword Management Schemas
// ============================================================================

/**
 * Validates the Marketing API keyword model.
 */
export const keywordSchema = z.object({
  adGroupId: z.string().optional(),
  bid: amountSchema.optional(),
  keywordId: z.string().optional(),
  keywordStatus: z.string().optional(),
  keywordText: z.string().optional(),
  matchType: z.string().optional(),
});

/**
 * Validates the Marketing API keyword request model.
 */
export const keywordRequestSchema = z.object({
  keywordText: z.string().optional(),
  matchType: z.string().optional(),
});

/**
 * Validates the Marketing API create keyword request model.
 */
export const createKeywordRequestSchema = z.object({
  adGroupId: z.string(),
  bid: amountSchema.optional(),
  keywordText: z.string(),
  matchType: z.string(),
});

/**
 * Validates the Marketing API keyword response payload.
 */
export const keywordResponseSchema = z.object({
  adGroupId: z.string().optional(),
  errors: z.array(errorSchema).optional(),
  href: z.string().optional(),
  keywordId: z.string().optional(),
  keywordText: z.string().optional(),
  matchType: z.string().optional(),
  statusCode: z.number().optional(),
  warnings: z.array(errorSchema).optional(),
});

/**
 * Validates the Marketing API update keyword request model.
 */
export const updateKeywordRequestSchema = z.object({
  bid: amountSchema.optional(),
  keywordStatus: z.string().optional(),
});

/**
 * Validates the Marketing API update keyword by keyword ID request model.
 */
export const updateKeywordByKeywordIdRequestSchema = z.object({
  bid: amountSchema.optional(),
  keywordStatus: z.string().optional(),
});

/**
 * Validates the Marketing API update keyword response payload.
 */
export const updateKeywordResponseSchema = z.object({
  errors: z.array(errorSchema).optional(),
  href: z.string().optional(),
  keywordId: z.string().optional(),
  statusCode: z.number().optional(),
  warnings: z.array(errorSchema).optional(),
});

/**
 * Validates the Marketing API keyword paged collection response payload.
 */
export const keywordPagedCollectionResponseSchema = z.object({
  href: z.string().optional(),
  keywords: z.array(keywordSchema).optional(),
  limit: z.number().optional(),
  next: z.string().optional(),
  offset: z.number().optional(),
  prev: z.string().optional(),
  total: z.number().optional(),
});

// Bulk Keyword Operations
/**
 * Validates the Marketing API bulk create keyword request model.
 */
export const bulkCreateKeywordRequestSchema = z.object({
  requests: z.array(createKeywordRequestSchema).optional(),
});

/**
 * Validates the Marketing API bulk create keyword response payload.
 */
export const bulkCreateKeywordResponseSchema = z.object({
  responses: z.array(keywordResponseSchema).optional(),
});

/**
 * Validates the Marketing API bulk update keyword request model.
 */
export const bulkUpdateKeywordRequestSchema = z.object({
  requests: z
    .array(
      z.object({
        keywordId: z.string(),
        bid: amountSchema.optional(),
        keywordStatus: z.string().optional(),
      }),
    )
    .optional(),
});

/**
 * Validates the Marketing API bulk update keyword response payload.
 */
export const bulkUpdateKeywordResponseSchema = z.object({
  responses: z.array(updateKeywordResponseSchema).optional(),
});

// ============================================================================
// Negative Keyword Management Schemas
// ============================================================================

/**
 * Validates the Marketing API negative keyword model.
 */
export const negativeKeywordSchema = z.object({
  adGroupId: z.string().optional(),
  campaignId: z.string().optional(),
  negativeKeywordId: z.string().optional(),
  negativeKeywordMatchType: z.string().optional(),
  negativeKeywordStatus: z.string().optional(),
  negativeKeywordText: z.string().optional(),
});

/**
 * Validates the Marketing API create negative keyword request model.
 */
export const createNegativeKeywordRequestSchema = z.object({
  adGroupId: z.string().optional(),
  campaignId: z.string().optional(),
  negativeKeywordMatchType: z.string(),
  negativeKeywordText: z.string(),
});

/**
 * Validates the Marketing API negative keyword response payload.
 */
export const negativeKeywordResponseSchema = z.object({
  adGroupId: z.string().optional(),
  campaignId: z.string().optional(),
  errors: z.array(errorSchema).optional(),
  href: z.string().optional(),
  negativeKeywordId: z.string().optional(),
  negativeKeywordMatchType: z.string().optional(),
  negativeKeywordText: z.string().optional(),
  statusCode: z.number().optional(),
  warnings: z.array(errorSchema).optional(),
});

/**
 * Validates the Marketing API update negative keyword request model.
 */
export const updateNegativeKeywordRequestSchema = z.object({
  negativeKeywordStatus: z.string().optional(),
});

/**
 * Validates the Marketing API update negative keyword ID request model.
 */
export const updateNegativeKeywordIdRequestSchema = z.object({
  negativeKeywordStatus: z.string().optional(),
});

/**
 * Validates the Marketing API update negative keyword response payload.
 */
export const updateNegativeKeywordResponseSchema = z.object({
  errors: z.array(errorSchema).optional(),
  href: z.string().optional(),
  negativeKeywordId: z.string().optional(),
  statusCode: z.number().optional(),
  warnings: z.array(errorSchema).optional(),
});

/**
 * Validates the Marketing API negative keyword paged collection response payload.
 */
export const negativeKeywordPagedCollectionResponseSchema = z.object({
  href: z.string().optional(),
  limit: z.number().optional(),
  negativeKeywords: z.array(negativeKeywordSchema).optional(),
  next: z.string().optional(),
  offset: z.number().optional(),
  prev: z.string().optional(),
  total: z.number().optional(),
});

// Bulk Negative Keyword Operations
/**
 * Validates the Marketing API bulk create negative keyword request model.
 */
export const bulkCreateNegativeKeywordRequestSchema = z.object({
  requests: z.array(createNegativeKeywordRequestSchema).optional(),
});

/**
 * Validates the Marketing API bulk create negative keyword response payload.
 */
export const bulkCreateNegativeKeywordResponseSchema = z.object({
  responses: z.array(negativeKeywordResponseSchema).optional(),
});

/**
 * Validates the Marketing API bulk update negative keyword request model.
 */
export const bulkUpdateNegativeKeywordRequestSchema = z.object({
  requests: z
    .array(
      z.object({
        negativeKeywordId: z.string(),
        negativeKeywordStatus: z.string().optional(),
      }),
    )
    .optional(),
});

/**
 * Validates the Marketing API bulk update negative keyword response payload.
 */
export const bulkUpdateNegativeKeywordResponseSchema = z.object({
  responses: z.array(updateNegativeKeywordResponseSchema).optional(),
});

// ============================================================================
// Targeting and Bid Schemas
// ============================================================================

/**
 * Validates the Marketing API targeted bid request model.
 */
export const targetedBidRequestSchema = z.object({
  bid: amountSchema.optional(),
  listingId: z.string().optional(),
});

/**
 * Validates the Marketing API targeted keyword request model.
 */
export const targetedKeywordRequestSchema = z.object({
  adGroupId: z.string().optional(),
  bid: amountSchema.optional(),
  keywordText: z.string().optional(),
  matchType: z.string().optional(),
});

/**
 * Validates the Marketing API targeted ads paged collection model.
 */
export const targetedAdsPagedCollectionSchema = z.object({
  ads: z.array(adSchema).optional(),
  href: z.string().optional(),
  limit: z.number().optional(),
  next: z.string().optional(),
  offset: z.number().optional(),
  prev: z.string().optional(),
  total: z.number().optional(),
});

/**
 * Validates the Marketing API targeted bids paged collection model.
 */
export const targetedBidsPagedCollectionSchema = z.object({
  bids: z.array(targetedBidRequestSchema).optional(),
  href: z.string().optional(),
  limit: z.number().optional(),
  next: z.string().optional(),
  offset: z.number().optional(),
  prev: z.string().optional(),
  total: z.number().optional(),
});

/**
 * Validates the Marketing API targeted keywords paged collection model.
 */
export const targetedKeywordsPagedCollectionSchema = z.object({
  href: z.string().optional(),
  keywords: z.array(targetedKeywordRequestSchema).optional(),
  limit: z.number().optional(),
  next: z.string().optional(),
  offset: z.number().optional(),
  prev: z.string().optional(),
  total: z.number().optional(),
});

/**
 * Validates the Marketing API targeting items model.
 */
export const targetingItemsSchema = z.object({
  inventoryCriterion: z
    .array(
      z.object({
        inventoryItems: z.array(marketingInventoryItemSchema).optional(),
        listingIds: z.array(z.string()).optional(),
      }),
    )
    .optional(),
});

// ============================================================================
// Suggestion Schemas (Bids, Keywords, Budget)
// ============================================================================

/**
 * Validates the Marketing API proposed bid model.
 */
export const proposedBidSchema = z.object({
  amount: amountSchema.optional(),
  basis: z.string().optional(),
});

/**
 * Validates the Marketing API suggested bids model.
 */
export const suggestedBidsSchema = z.object({
  keywordText: z.string().optional(),
  matchType: z.string().optional(),
  proposedBid: proposedBidSchema.optional(),
});

/**
 * Validates the Marketing API additional info data model.
 */
export const additionalInfoDataSchema = z.object({
  key: z.string().optional(),
  value: z.string().optional(),
});

/**
 * Validates the Marketing API additional info model.
 */
export const additionalInfoSchema = z.object({
  data: z.array(additionalInfoDataSchema).optional(),
  type: z.string().optional(),
});

/**
 * Validates the Marketing API suggested keywords model.
 */
export const suggestedKeywordsSchema = z.object({
  additionalInfo: z.array(additionalInfoSchema).optional(),
  keywordText: z.string().optional(),
  matchType: z.string().optional(),
});

/**
 * Validates the Marketing API budget recommendation response payload.
 */
export const budgetRecommendationResponseSchema = z.object({
  amount: amountSchema.optional(),
  type: z.string().optional(),
});

/**
 * Validates the Marketing API suggest budget response payload.
 */
export const suggestBudgetResponseSchema = z.object({
  suggestedBudget: z.array(budgetRecommendationResponseSchema).optional(),
});

/**
 * Validates the Marketing API max CPC model.
 */
export const maxCpcSchema = z.object({
  amount: amountSchema.optional(),
});

/**
 * Validates the Marketing API suggest max CPC request model.
 */
export const suggestMaxCpcRequestSchema = z.object({
  listingIds: z.array(z.string()).optional(),
  marketplaceId: z.string().optional(),
});

/**
 * Validates the Marketing API suggest max CPC response payload.
 */
export const suggestMaxCpcResponseSchema = z.object({
  amount: amountSchema.optional(),
  marketplaceId: z.string().optional(),
});

/**
 * Validates the Marketing API bid preference model.
 */
export const bidPreferenceSchema = z.object({
  bidPercentage: z.string().optional(),
});

/**
 * Validates the Marketing API dynamic ad rate preference model.
 */
export const dynamicAdRatePreferenceSchema = z.object({
  maxAdRate: z.string().optional(),
  minAdRate: z.string().optional(),
});

// Quick Setup Schema
/**
 * Validates the Marketing API quick setup request model.
 */
export const quickSetupRequestSchema = z.object({
  campaignName: z.string(),
  dailyBudget: amountSchema.optional(),
  endDate: z.string().optional(),
  fundingStrategy: fundingStrategySchema.optional(),
  listingIds: z.array(z.string()).optional(),
  marketplaceId: z.string(),
  startDate: z.string().optional(),
});

// ============================================================================
// Reporting Schemas
// ============================================================================

/**
 * Validates the Marketing API dimension model.
 */
export const dimensionSchema = z.object({
  dimensionKey: z.string().optional(),
  dimensionValues: z.array(z.string()).optional(),
});

/**
 * Validates the Marketing API dimension key annotation model.
 */
export const dimensionKeyAnnotationSchema = z.object({
  annotationKey: z.string().optional(),
  value: z.string().optional(),
});

/**
 * Validates the Marketing API dimension metadata model.
 */
export const dimensionMetadataSchema = z.object({
  annotations: z.array(dimensionKeyAnnotationSchema).optional(),
  dataType: z.string().optional(),
  dimensionKey: z.string().optional(),
});

/**
 * Validates the Marketing API metric metadata model.
 */
export const metricMetadataSchema = z.object({
  dataType: z.string().optional(),
  metricKey: z.string().optional(),
});

/**
 * Validates the Marketing API report metadata model.
 */
export const reportMetadataSchema = z.object({
  dimensionMetadata: z.array(dimensionMetadataSchema).optional(),
  maxNumberOfDimensionsToRequest: z.number().optional(),
  maxNumberOfMetricsToRequest: z.number().optional(),
  channel: z.string().optional(),
  metricMetadata: z.array(metricMetadataSchema).optional(),
  reportType: z.string().optional(),
});

/**
 * Validates the Marketing API report metadatas model.
 */
export const reportMetadatasSchema = z.object({
  reportMetadata: z.array(reportMetadataSchema).optional(),
});

/**
 * Validates the Marketing API create report task model.
 */
export const createReportTaskSchema = z.object({
  campaignIds: z.array(z.string()).optional(),
  channels: z.array(z.string()).optional(),
  dateFrom: z.string(),
  dateTo: z.string(),
  dimensions: z.array(dimensionSchema).optional(),
  fundingModels: z.array(z.string()).optional(),
  inventoryReferences: z.array(inventoryReferenceSchema).optional(),
  listingIds: z.array(z.string()).optional(),
  marketplaceId: z.string(),
  metricKeys: z.array(z.string()).optional(),
  reportFormat: z.string().optional(),
  reportType: z.string(),
});

/**
 * Validates the Marketing API report task model.
 */
export const reportTaskSchema = z.object({
  campaignIds: z.array(z.string()).optional(),
  channels: z.array(z.string()).optional(),
  dateFrom: z.string().optional(),
  dateTo: z.string().optional(),
  dimensions: z.array(dimensionSchema).optional(),
  fundingModels: z.array(z.string()).optional(),
  inventoryReferences: z.array(inventoryReferenceSchema).optional(),
  listingIds: z.array(z.string()).optional(),
  marketplaceId: z.string().optional(),
  metricKeys: z.array(z.string()).optional(),
  reportExpirationDate: z.string().optional(),
  reportFormat: z.string().optional(),
  reportHref: z.string().optional(),
  reportId: z.string().optional(),
  reportName: z.string().optional(),
  reportTaskCompletionDate: z.string().optional(),
  reportTaskCreationDate: z.string().optional(),
  reportTaskExpectedCompletionDate: z.string().optional(),
  reportTaskId: z.string().optional(),
  reportTaskStatus: z.string().optional(),
  reportTaskStatusMessage: z.string().optional(),
  reportType: z.string().optional(),
});

/**
 * Validates the Marketing API report task paged collection model.
 */
export const reportTaskPagedCollectionSchema = z.object({
  href: z.string().optional(),
  limit: z.number().optional(),
  next: z.string().optional(),
  offset: z.number().optional(),
  prev: z.string().optional(),
  total: z.number().optional(),
  reportTasks: z.array(reportTaskSchema).optional(),
});

/**
 * Validates the Marketing API summary report response payload.
 */
export const summaryReportResponseSchema = z.object({
  baseSale: amountSchema.optional(),
  lastUpdated: z.string().optional(),
  percentageSalesLift: z.string().optional(),
  promotionHref: z.string().optional(),
  promotionId: z.string().optional(),
  promotionReportId: z.string().optional(),
  promotionSale: amountSchema.optional(),
  totalDiscount: amountSchema.optional(),
  totalSale: amountSchema.optional(),
});

// ============================================================================
// Item Promotion (Discounts) Schemas
// ============================================================================

/**
 * Validates the Marketing API discount benefit model.
 */
export const discountBenefitSchema = z.object({
  amountOffItem: amountSchema.optional(),
  amountOffOrder: amountSchema.optional(),
  percentageOffItem: z.string().optional(),
  percentageOffOrder: z.string().optional(),
});

/**
 * Validates the Marketing API price range model.
 */
export const priceRangeSchema = z.object({
  maxPrice: amountSchema.optional(),
  minPrice: amountSchema.optional(),
});

/**
 * Validates the Marketing API discount specification model.
 */
export const discountSpecificationSchema = z.object({
  forEachAmount: amountSchema.optional(),
  forEachQuantity: z.number().optional(),
  minAmount: amountSchema.optional(),
  minQuantity: z.number().optional(),
  numberOfDiscountedItems: z.number().optional(),
});

/**
 * Validates the Marketing API discount rule model.
 */
export const discountRuleSchema = z.object({
  discountBenefit: discountBenefitSchema.optional(),
  discountSpecification: discountSpecificationSchema.optional(),
  ruleOrder: z.number().optional(),
});

/**
 * Validates the Marketing API inventory criterion model.
 */
export const inventoryCriterionSchema = z.object({
  inventoryCriterionType: z.string().optional(),
  inventoryItems: z.array(marketingInventoryItemSchema).optional(),
  listingIds: z.array(z.string()).optional(),
  ruleCriteria: z
    .object({
      excludeInventoryItems: z.array(marketingInventoryItemSchema).optional(),
      excludeListingIds: z.array(z.string()).optional(),
      markupInventoryItems: z.array(marketingInventoryItemSchema).optional(),
      markupListingIds: z.array(z.string()).optional(),
      selectionRules: z.array(selectionRuleSchema).optional(),
    })
    .optional(),
});

/**
 * Validates the Marketing API coupon configuration model.
 */
export const couponConfigurationSchema = z.object({
  couponCode: z.string().optional(),
  couponType: z.string().optional(),
  maxCouponRedemptionPerUser: z.number().optional(),
});

/**
 * Validates the Marketing API item promotion model.
 */
export const itemPromotionSchema = z.object({
  applyDiscountToSingleItemOnly: z.boolean().optional(),
  budget: amountSchema.optional(),
  couponConfiguration: couponConfigurationSchema.optional(),
  description: z.string().optional(),
  discountRules: z.array(discountRuleSchema).optional(),
  endDate: z.string().optional(),
  inventoryCriterion: inventoryCriterionSchema.optional(),
  marketplaceId: z.string().optional(),
  name: z.string().optional(),
  priority: z.string().optional(),
  promotionImageUrl: z.string().optional(),
  promotionStatus: z.string().optional(),
  promotionType: z.string().optional(),
  startDate: z.string().optional(),
});

/**
 * Validates the Marketing API item promotion response payload.
 */
export const itemPromotionResponseSchema = z.object({
  applyDiscountToSingleItemOnly: z.boolean().optional(),
  budget: amountSchema.optional(),
  couponConfiguration: couponConfigurationSchema.optional(),
  description: z.string().optional(),
  discountRules: z.array(discountRuleSchema).optional(),
  endDate: z.string().optional(),
  inventoryCriterion: inventoryCriterionSchema.optional(),
  marketplaceId: z.string().optional(),
  name: z.string().optional(),
  priority: z.string().optional(),
  promotionId: z.string().optional(),
  promotionImageUrl: z.string().optional(),
  promotionStatus: z.string().optional(),
  promotionType: z.string().optional(),
  startDate: z.string().optional(),
});

/**
 * Validates the Marketing API selected inventory discount model.
 */
export const selectedInventoryDiscountSchema = z.object({
  discountBenefit: discountBenefitSchema.optional(),
  discountId: z.string().optional(),
  inventoryCriterion: inventoryCriterionSchema.optional(),
  ruleOrder: z.number().optional(),
});

/**
 * Validates the Marketing API item markdown status model.
 */
export const itemMarkdownStatusSchema = z.object({
  listingPromotionStatus: z.string().optional(),
  timestamp: z.string().optional(),
});

/**
 * Validates the Marketing API listing detail model.
 */
export const listingDetailSchema = z.object({
  currentPrice: amountSchema.optional(),
  freeShipping: z.boolean().optional(),
  inventoryReferenceId: z.string().optional(),
  inventoryReferenceType: z.string().optional(),
  listingCategoryId: z.string().optional(),
  listingCondition: z.string().optional(),
  listingConditionId: z.string().optional(),
  listingId: z.string().optional(),
  listingPromotionStatuses: z.array(itemMarkdownStatusSchema).optional(),
  quantity: z.number().optional(),
  storeCategoryId: z.string().optional(),
  title: z.string().optional(),
});

/**
 * Validates the Marketing API items paged collection model.
 */
export const itemsPagedCollectionSchema = z.object({
  href: z.string().optional(),
  limit: z.number().optional(),
  listings: z.array(listingDetailSchema).optional(),
  next: z.string().optional(),
  offset: z.number().optional(),
  prev: z.string().optional(),
  total: z.number().optional(),
  warnings: z.array(errorSchema).optional(),
});

/**
 * Validates the Marketing API promotions paged collection model.
 */
export const promotionsPagedCollectionSchema = z.object({
  href: z.string().optional(),
  limit: z.number().optional(),
  next: z.string().optional(),
  offset: z.number().optional(),
  prev: z.string().optional(),
  promotions: z.array(itemPromotionResponseSchema).optional(),
  total: z.number().optional(),
});

/**
 * Validates the Marketing API promotion detail model.
 */
export const promotionDetailSchema = z.object({
  description: z.string().optional(),
  endDate: z.string().optional(),
  marketplaceId: z.string().optional(),
  name: z.string().optional(),
  priority: z.string().optional(),
  promotionId: z.string().optional(),
  promotionImageUrl: z.string().optional(),
  promotionStatus: z.string().optional(),
  promotionType: z.string().optional(),
  startDate: z.string().optional(),
});

/**
 * Validates the Marketing API promotion report detail model.
 */
export const promotionReportDetailSchema = z.object({
  averageItemDiscount: amountSchema.optional(),
  averageItemRevenue: amountSchema.optional(),
  averageOrderDiscount: amountSchema.optional(),
  averageOrderRevenue: amountSchema.optional(),
  averageOrderSize: z.string().optional(),
  baseSale: amountSchema.optional(),
  clicksToPromotion: z.number().optional(),
  impressionsToPromotion: z.number().optional(),
  numberOfItemsSoldInPromotion: z.number().optional(),
  numberOfOrdersWithPromotion: z.number().optional(),
  percentageSalesLift: z.string().optional(),
  promotionHref: z.string().optional(),
  promotionId: z.string().optional(),
  promotionReportId: z.string().optional(),
  promotionSale: amountSchema.optional(),
  totalDiscount: amountSchema.optional(),
  totalSale: amountSchema.optional(),
});

/**
 * Validates the Marketing API promotions report paged collection model.
 */
export const promotionsReportPagedCollectionSchema = z.object({
  href: z.string().optional(),
  limit: z.number().optional(),
  next: z.string().optional(),
  offset: z.number().optional(),
  prev: z.string().optional(),
  promotionReports: z.array(promotionReportDetailSchema).optional(),
  total: z.number().optional(),
});

// Item Price Markdown Schemas
/**
 * Validates the Marketing API item basis model.
 */
export const itemBasisSchema = z.object({
  itemIds: z.array(z.string()).optional(),
  priceRange: priceRangeSchema.optional(),
});

/**
 * Validates the Marketing API item price markdown model.
 */
export const itemPriceMarkdownSchema = z.object({
  applyFreeShipping: z.boolean().optional(),
  autoSelectFutureInventory: z.boolean().optional(),
  blockPriceIncreaseInItemRevision: z.boolean().optional(),
  description: z.string().optional(),
  endDate: z.string().optional(),
  marketplaceId: z.string().optional(),
  name: z.string().optional(),
  priority: z.string().optional(),
  promotionImageUrl: z.string().optional(),
  promotionStatus: z.string().optional(),
  selectedInventoryDiscounts: z.array(selectedInventoryDiscountSchema).optional(),
  startDate: z.string().optional(),
});

// ============================================================================
// Email Campaign Schemas
// ============================================================================

/**
 * Validates the Marketing API campaign audience model.
 */
export const campaignAudienceSchema = z.object({
  audienceType: z.string().optional(),
  code: z.string().optional(),
  name: z.string().optional(),
});

/**
 * Validates the Marketing API campaign DTO model.
 */
export const campaignDTOSchema = z.object({
  audiences: z.array(campaignAudienceSchema).optional(),
  creationDate: z.string().optional(),
  emailCampaignId: z.string().optional(),
  emailCampaignStatus: z.string().optional(),
  emailCampaignType: z.string().optional(),
  marketplaceId: z.string().optional(),
  modificationDate: z.string().optional(),
  scheduleDate: z.string().optional(),
  scheduleDateType: z.string().optional(),
  sentDate: z.string().optional(),
  subject: z.string().optional(),
});

/**
 * Validates the Marketing API create email campaign request model.
 */
export const createEmailCampaignRequestSchema = z.object({
  audiences: z.array(campaignAudienceSchema).optional(),
  emailCampaignType: z.string(),
  itemIds: z.array(z.string()).optional(),
  marketplaceId: z.string(),
  scheduleDate: z.string().optional(),
  scheduleDateType: z.string().optional(),
  subject: z.string().optional(),
});

/**
 * Validates the Marketing API create email campaign response payload.
 */
export const createEmailCampaignResponseSchema = z.object({
  emailCampaignId: z.string().optional(),
  href: z.string().optional(),
});

/**
 * Validates the Marketing API update email campaign response payload.
 */
export const updateEmailCampaignResponseSchema = z.object({
  emailCampaignId: z.string().optional(),
  href: z.string().optional(),
});

/**
 * Validates the Marketing API delete email campaign response payload.
 */
export const deleteEmailCampaignResponseSchema = z.object({
  emailCampaignId: z.string().optional(),
});

/**
 * Validates the Marketing API get email campaign response payload.
 */
export const getEmailCampaignResponseSchema = z.object({
  emailCampaign: campaignDTOSchema.optional(),
});

/**
 * Validates the Marketing API get email campaigns response payload.
 */
export const getEmailCampaignsResponseSchema = z.object({
  emailCampaigns: z.array(campaignDTOSchema).optional(),
  href: z.string().optional(),
  limit: z.number().optional(),
  next: z.string().optional(),
  offset: z.number().optional(),
  prev: z.string().optional(),
  total: z.number().optional(),
});

/**
 * Validates the Marketing API get email campaign audiences response payload.
 */
export const getEmailCampaignAudiencesResponseSchema = z.object({
  audiences: z.array(campaignAudienceSchema).optional(),
  href: z.string().optional(),
  limit: z.number().optional(),
  next: z.string().optional(),
  offset: z.number().optional(),
  prev: z.string().optional(),
  total: z.number().optional(),
});

/**
 * Validates the Marketing API get email preview response payload.
 */
export const getEmailPreviewResponseSchema = z.object({
  emailPreviewHtml: z.string().optional(),
});

/**
 * Validates the Marketing API get email report response payload.
 */
export const getEmailReportResponseSchema = z.object({
  clickRate: z.string().optional(),
  numberOfClicks: z.number().optional(),
  numberOfOpens: z.number().optional(),
  numberOfRecipients: z.number().optional(),
  numberOfUnsubscribes: z.number().optional(),
  openRate: z.string().optional(),
  unsubscribeRate: z.string().optional(),
});

// ============================================================================
// Recommendation Schemas (from sellRecommendationV1Oas3.ts)
// ============================================================================

/**
 * Validates the Marketing API bid percentages model.
 */
export const bidPercentagesSchema = z.object({
  basis: z.string().optional(),
  value: z.string().optional(),
});

/**
 * Validates the Marketing API ad recommendation model.
 */
export const adRecommendationSchema = z.object({
  bidPercentages: z.array(bidPercentagesSchema).optional(),
  promoteWithAd: z.string().optional(),
});

/**
 * Validates the Marketing API marketing recommendation model.
 */
export const marketingRecommendationSchema = z.object({
  ad: adRecommendationSchema.optional(),
  message: z.string().optional(),
});

/**
 * Validates the Marketing API listing recommendation model.
 */
export const listingRecommendationSchema = z.object({
  listingId: z.string().optional(),
  marketing: marketingRecommendationSchema.optional(),
});

/**
 * Validates the Marketing API paged listing recommendation collection model.
 */
export const pagedListingRecommendationCollectionSchema = z.object({
  href: z.string().optional(),
  limit: z.number().optional(),
  listingRecommendations: z.array(listingRecommendationSchema).optional(),
  next: z.string().optional(),
  offset: z.number().optional(),
  prev: z.string().optional(),
  total: z.number().optional(),
});

/**
 * Validates the Marketing API find listing recommendation request model.
 */
export const findListingRecommendationRequestSchema = z.object({
  listingIds: z.array(z.string()).optional(),
});

// ============================================================================
// Aspect Schema
// ============================================================================

/**
 * Validates the Marketing API aspect model.
 */
export const aspectSchema = z.object({
  aspectValues: z.array(z.string()).optional(),
  localizedAspectName: z.string().optional(),
});

// ============================================================================
// Email Campaign Request Schemas
// ============================================================================

/** Validates the Marketing API update email campaign request model. */
export const updateEmailCampaignRequestSchema = z.object({
  audienceCodes: z.array(z.string()).optional(),
  categoryId: z.string().optional(),
  categoryType: z.string().optional(),
  itemIds: z.array(z.string()).optional(),
  itemSelectMode: z.string().optional(),
  personalizedMessage: z.string().optional(),
  priceRange: priceRangeSchema.optional(),
  promotionId: z.string().optional(),
  promotionSelectModeEnum: z.string().optional(),
  scheduleDate: z.string().optional(),
  sort: z.string().optional(),
  subject: z.string().optional(),
});

// ============================================================================
// Endpoint Input Schemas (OpenAPI Operations)
// ============================================================================

/** Validates the Marketing API bulkCreateAdsByInventoryReference endpoint input. */
export const bulkCreateAdsByInventoryReferenceInputSchema = z.object({
  campaignId: z.string().describe('campaignId required endpoint parameter'),
  request: bulkCreateAdsByInventoryReferenceRequestSchema.describe(
    'Bulk create ads by inventory reference request body',
  ),
});

/** Validates the Marketing API bulkCreateAdsByListingId endpoint input. */
export const bulkCreateAdsByListingIdInputSchema = z.object({
  campaignId: z.string().describe('campaignId required endpoint parameter'),
  request: bulkCreateAdRequestSchema.describe('Bulk create ads by listing id request body'),
});

/** Validates the Marketing API bulkDeleteAdsByInventoryReference endpoint input. */
export const bulkDeleteAdsByInventoryReferenceInputSchema = z.object({
  campaignId: z.string().describe('campaignId required endpoint parameter'),
  request: bulkDeleteAdsByInventoryReferenceRequestSchema.describe(
    'Bulk delete ads by inventory reference request body',
  ),
});

/** Validates the Marketing API bulkDeleteAdsByListingId endpoint input. */
export const bulkDeleteAdsByListingIdInputSchema = z.object({
  campaignId: z.string().describe('campaignId required endpoint parameter'),
  request: bulkDeleteAdRequestSchema.describe('Bulk delete ads by listing id request body'),
});

/** Validates the Marketing API bulkUpdateAdsBidByInventoryReference endpoint input. */
export const bulkUpdateAdsBidByInventoryReferenceInputSchema = z.object({
  campaignId: z.string().describe('campaignId required endpoint parameter'),
  request: bulkCreateAdsByInventoryReferenceRequestSchema.describe(
    'Bulk update ads bid by inventory reference request body',
  ),
});

/** Validates the Marketing API bulkUpdateAdsBidByListingId endpoint input. */
export const bulkUpdateAdsBidByListingIdInputSchema = z.object({
  campaignId: z.string().describe('campaignId required endpoint parameter'),
  request: bulkCreateAdRequestSchema.describe('Bulk update ads bid by listing id request body'),
});

/** Validates the Marketing API bulkUpdateAdsStatus endpoint input. */
export const bulkUpdateAdsStatusInputSchema = z.object({
  campaignId: z.string().describe('campaignId required endpoint parameter'),
  request: bulkUpdateAdStatusRequestSchema.describe('Bulk update ads status request body'),
});

/** Validates the Marketing API bulkUpdateAdsStatusByListingId endpoint input. */
export const bulkUpdateAdsStatusByListingIdInputSchema = z.object({
  campaignId: z.string().describe('campaignId required endpoint parameter'),
  request: bulkUpdateAdStatusByListingIdRequestSchema.describe(
    'Bulk update ads status by listing id request body',
  ),
});

/** Validates the Marketing API getAds endpoint input. */
export const getAdsInputSchema = z.object({
  campaignId: z.string().describe('campaignId required endpoint parameter'),
  adGroupIds: z.string().describe('adGroupIds optional endpoint parameter').optional(),
  adStatus: z.string().describe('adStatus optional endpoint parameter').optional(),
  limit: z.number().describe('limit optional endpoint parameter').optional(),
  listingIds: z.string().describe('listingIds optional endpoint parameter').optional(),
  offset: z.number().describe('offset optional endpoint parameter').optional(),
});

/** Validates the Marketing API createAdByListingId endpoint input. */
export const createAdByListingIdInputSchema = z.object({
  campaignId: z.string().describe('campaignId required endpoint parameter'),
  request: createAdRequestSchema.describe('Create ad by listing id request body'),
});

/** Validates the Marketing API createAdsByInventoryReference endpoint input. */
export const createAdsByInventoryReferenceInputSchema = z.object({
  campaignId: z.string().describe('campaignId required endpoint parameter'),
  request: createAdsByInventoryReferenceRequestSchema.describe(
    'Create ads by inventory reference request body',
  ),
});

/** Validates the Marketing API getAd endpoint input. */
export const getAdInputSchema = z.object({
  adId: z.string().describe('adId required endpoint parameter'),
  campaignId: z.string().describe('campaignId required endpoint parameter'),
});

/** Validates the Marketing API deleteAd endpoint input. */
export const deleteAdInputSchema = z.object({
  adId: z.string().describe('adId required endpoint parameter'),
  campaignId: z.string().describe('campaignId required endpoint parameter'),
});

/** Validates the Marketing API deleteAdsByInventoryReference endpoint input. */
export const deleteAdsByInventoryReferenceInputSchema = z.object({
  campaignId: z.string().describe('campaignId required endpoint parameter'),
  request: deleteAdsByInventoryReferenceRequestSchema.describe(
    'Delete ads by inventory reference request body',
  ),
});

/** Validates the Marketing API getAdsByInventoryReference endpoint input. */
export const getAdsByInventoryReferenceInputSchema = z.object({
  campaignId: z.string().describe('campaignId required endpoint parameter'),
  inventoryReferenceId: z.string().describe('inventoryReferenceId required endpoint parameter'),
  inventoryReferenceType: z.string().describe('inventoryReferenceType required endpoint parameter'),
});

/** Validates the Marketing API updateBid endpoint input. */
export const updateBidInputSchema = z.object({
  adId: z.string().describe('adId required endpoint parameter'),
  campaignId: z.string().describe('campaignId required endpoint parameter'),
  request: updateBidPercentageRequestSchema.describe('Update bid request body'),
});

/** Validates the Marketing API getAdGroups endpoint input. */
export const getAdGroupsInputSchema = z.object({
  campaignId: z.string().describe('campaignId required endpoint parameter'),
  adGroupStatus: z.string().describe('adGroupStatus optional endpoint parameter').optional(),
  limit: z.number().describe('limit optional endpoint parameter').optional(),
  offset: z.number().describe('offset optional endpoint parameter').optional(),
});

/** Validates the Marketing API createAdGroup endpoint input. */
export const createAdGroupInputSchema = z.object({
  campaignId: z.string().describe('campaignId required endpoint parameter'),
  request: createAdGroupRequestSchema.describe('Create ad group request body'),
});

/** Validates the Marketing API getAdGroup endpoint input. */
export const getAdGroupInputSchema = z.object({
  adGroupId: z.string().describe('adGroupId required endpoint parameter'),
  campaignId: z.string().describe('campaignId required endpoint parameter'),
});

/** Validates the Marketing API updateAdGroup endpoint input. */
export const updateAdGroupInputSchema = z.object({
  adGroupId: z.string().describe('adGroupId required endpoint parameter'),
  campaignId: z.string().describe('campaignId required endpoint parameter'),
  request: updateAdGroupRequestSchema.describe('Update ad group request body'),
});

/** Validates the Marketing API suggestBids endpoint input. */
export const suggestBidsInputSchema = z.object({
  adGroupId: z.string().describe('adGroupId required endpoint parameter'),
  campaignId: z.string().describe('campaignId required endpoint parameter'),
  request: targetedBidRequestSchema.describe('Suggest bids request body'),
});

/** Validates the Marketing API suggestKeywords endpoint input. */
export const suggestKeywordsInputSchema = z.object({
  adGroupId: z.string().describe('adGroupId required endpoint parameter'),
  campaignId: z.string().describe('campaignId required endpoint parameter'),
  request: targetedKeywordRequestSchema.describe('Suggest keywords request body'),
});

/** Validates the Marketing API cloneCampaign endpoint input. */
export const cloneCampaignInputSchema = z.object({
  campaignId: z.string().describe('campaignId required endpoint parameter'),
  request: cloneCampaignRequestSchema.describe('Clone campaign request body'),
});

/** Validates the Marketing API getCampaigns endpoint input. */
export const getCampaignsInputSchema = z.object({
  campaignName: z.string().describe('campaignName optional endpoint parameter').optional(),
  campaignStatus: z.string().describe('campaignStatus optional endpoint parameter').optional(),
  campaignTargetingTypes: z
    .string()
    .describe('campaignTargetingTypes optional endpoint parameter')
    .optional(),
  channels: z.string().describe('channels optional endpoint parameter').optional(),
  endDateRange: z.string().describe('endDateRange optional endpoint parameter').optional(),
  fundingStrategy: z.string().describe('fundingStrategy optional endpoint parameter').optional(),
  limit: z.number().describe('limit optional endpoint parameter').optional(),
  offset: z.number().describe('offset optional endpoint parameter').optional(),
  startDateRange: z.string().describe('startDateRange optional endpoint parameter').optional(),
});

/** Validates the Marketing API createCampaign endpoint input. */
export const createCampaignInputSchema = z.object({
  request: createCampaignRequestSchema.describe('Create campaign request body'),
});

/** Validates the Marketing API getCampaign endpoint input. */
export const getCampaignInputSchema = z.object({
  campaignId: z.string().describe('campaignId required endpoint parameter'),
});

/** Validates the Marketing API deleteCampaign endpoint input. */
export const deleteCampaignInputSchema = z.object({
  campaignId: z.string().describe('campaignId required endpoint parameter'),
});

/** Validates the Marketing API endCampaign endpoint input. */
export const endCampaignInputSchema = z.object({
  campaignId: z.string().describe('campaignId required endpoint parameter'),
});

/** Validates the Marketing API findCampaignByAdReference endpoint input. */
export const findCampaignByAdReferenceInputSchema = z.object({
  inventoryReferenceId: z
    .string()
    .describe('inventoryReferenceId optional endpoint parameter')
    .optional(),
  inventoryReferenceType: z
    .string()
    .describe('inventoryReferenceType optional endpoint parameter')
    .optional(),
  listingId: z.string().describe('listingId optional endpoint parameter').optional(),
});

/** Validates the Marketing API getCampaignByName endpoint input. */
export const getCampaignByNameInputSchema = z.object({
  campaignName: z.string().describe('campaignName required endpoint parameter'),
});

/** Validates the Marketing API launchCampaign endpoint input. */
export const launchCampaignInputSchema = z.object({
  campaignId: z.string().describe('campaignId required endpoint parameter'),
});

/** Validates the Marketing API pauseCampaign endpoint input. */
export const pauseCampaignInputSchema = z.object({
  campaignId: z.string().describe('campaignId required endpoint parameter'),
});

/** Validates the Marketing API resumeCampaign endpoint input. */
export const resumeCampaignInputSchema = z.object({
  campaignId: z.string().describe('campaignId required endpoint parameter'),
});

/** Validates the Marketing API setupQuickCampaign endpoint input. */
export const setupQuickCampaignInputSchema = z.object({
  request: quickSetupRequestSchema.describe('Setup quick campaign request body'),
});

/** Validates the Marketing API suggestBudget endpoint input. */
export const suggestBudgetInputSchema = z.object({
  marketplaceId: z.string().describe('Marketplace ID sent as X-EBAY-C-MARKETPLACE-ID'),
});

/** Validates the Marketing API suggestItems endpoint input. */
export const suggestItemsInputSchema = z.object({
  campaignId: z.string().describe('campaignId required endpoint parameter'),
  categoryIds: z.string().describe('categoryIds optional endpoint parameter').optional(),
  limit: z.number().describe('limit optional endpoint parameter').optional(),
  offset: z.number().describe('offset optional endpoint parameter').optional(),
});

/** Validates the Marketing API suggestMaxCpc endpoint input. */
export const suggestMaxCpcInputSchema = z.object({
  request: suggestMaxCpcRequestSchema.describe('Suggest max cpc request body'),
});

/** Validates the Marketing API updateAdRateStrategy endpoint input. */
export const updateAdRateStrategyInputSchema = z.object({
  campaignId: z.string().describe('campaignId required endpoint parameter'),
  request: updateAdrateStrategyRequestSchema.describe('Update ad rate strategy request body'),
});

/** Validates the Marketing API updateBiddingStrategy endpoint input. */
export const updateBiddingStrategyInputSchema = z.object({
  campaignId: z.string().describe('campaignId required endpoint parameter'),
  request: updateBiddingStrategyRequestSchema.describe('Update bidding strategy request body'),
});

/** Validates the Marketing API updateCampaignBudget endpoint input. */
export const updateCampaignBudgetInputSchema = z.object({
  campaignId: z.string().describe('campaignId required endpoint parameter'),
  request: updateCampaignBudgetRequestSchema.describe('Update campaign budget request body'),
});

/** Validates the Marketing API updateCampaignIdentification endpoint input. */
export const updateCampaignIdentificationInputSchema = z.object({
  campaignId: z.string().describe('campaignId required endpoint parameter'),
  request: updateCampaignIdentificationRequestSchema.describe(
    'Update campaign identification request body',
  ),
});

/** Validates the Marketing API bulkCreateKeyword endpoint input. */
export const bulkCreateKeywordInputSchema = z.object({
  campaignId: z.string().describe('campaignId required endpoint parameter'),
  request: bulkCreateKeywordRequestSchema.describe('Bulk create keyword request body'),
});

/** Validates the Marketing API bulkUpdateKeyword endpoint input. */
export const bulkUpdateKeywordInputSchema = z.object({
  campaignId: z.string().describe('campaignId required endpoint parameter'),
  request: bulkUpdateKeywordRequestSchema.describe('Bulk update keyword request body'),
});

/** Validates the Marketing API getKeywords endpoint input. */
export const getKeywordsInputSchema = z.object({
  campaignId: z.string().describe('campaignId required endpoint parameter'),
  adGroupIds: z.string().describe('adGroupIds optional endpoint parameter').optional(),
  keywordStatus: z.string().describe('keywordStatus optional endpoint parameter').optional(),
  limit: z.number().describe('limit optional endpoint parameter').optional(),
  offset: z.number().describe('offset optional endpoint parameter').optional(),
});

/** Validates the Marketing API createKeyword endpoint input. */
export const createKeywordInputSchema = z.object({
  campaignId: z.string().describe('campaignId required endpoint parameter'),
  request: createKeywordRequestSchema.describe('Create keyword request body'),
});

/** Validates the Marketing API getKeyword endpoint input. */
export const getKeywordInputSchema = z.object({
  campaignId: z.string().describe('campaignId required endpoint parameter'),
  keywordId: z.string().describe('keywordId required endpoint parameter'),
});

/** Validates the Marketing API updateKeyword endpoint input. */
export const updateKeywordInputSchema = z.object({
  campaignId: z.string().describe('campaignId required endpoint parameter'),
  keywordId: z.string().describe('keywordId required endpoint parameter'),
  request: updateKeywordRequestSchema.describe('Update keyword request body'),
});

/** Validates the Marketing API bulkCreateNegativeKeyword endpoint input. */
export const bulkCreateNegativeKeywordInputSchema = z.object({
  request: bulkCreateNegativeKeywordRequestSchema.describe(
    'Bulk create negative keyword request body',
  ),
});

/** Validates the Marketing API bulkUpdateNegativeKeyword endpoint input. */
export const bulkUpdateNegativeKeywordInputSchema = z.object({
  request: bulkUpdateNegativeKeywordRequestSchema.describe(
    'Bulk update negative keyword request body',
  ),
});

/** Validates the Marketing API getNegativeKeywords endpoint input. */
export const getNegativeKeywordsInputSchema = z.object({
  adGroupIds: z.string().describe('adGroupIds optional endpoint parameter').optional(),
  campaignIds: z.string().describe('campaignIds optional endpoint parameter').optional(),
  limit: z.number().describe('limit optional endpoint parameter').optional(),
  negativeKeywordStatus: z
    .string()
    .describe('negativeKeywordStatus optional endpoint parameter')
    .optional(),
  offset: z.number().describe('offset optional endpoint parameter').optional(),
});

/** Validates the Marketing API createNegativeKeyword endpoint input. */
export const createNegativeKeywordInputSchema = z.object({
  request: createNegativeKeywordRequestSchema.describe('Create negative keyword request body'),
});

/** Validates the Marketing API getNegativeKeyword endpoint input. */
export const getNegativeKeywordInputSchema = z.object({
  negativeKeywordId: z.string().describe('negativeKeywordId required endpoint parameter'),
});

/** Validates the Marketing API updateNegativeKeyword endpoint input. */
export const updateNegativeKeywordInputSchema = z.object({
  negativeKeywordId: z.string().describe('negativeKeywordId required endpoint parameter'),
  request: updateNegativeKeywordRequestSchema.describe('Update negative keyword request body'),
});

/** Validates the Marketing API getReport endpoint input. */
export const getReportInputSchema = z.object({
  reportId: z.string().describe('reportId required endpoint parameter'),
});

/** Validates the Marketing API getReportMetadata endpoint input. */
export const getReportMetadataInputSchema = z.object({
  fundingModel: z.string().describe('fundingModel optional endpoint parameter').optional(),
  channel: z.string().describe('channel optional endpoint parameter').optional(),
});

/** Validates the Marketing API getReportMetadataForReportType endpoint input. */
export const getReportMetadataForReportTypeInputSchema = z.object({
  reportType: z.string().describe('reportType required endpoint parameter'),
  fundingModel: z.string().describe('fundingModel optional endpoint parameter').optional(),
  channel: z.string().describe('channel optional endpoint parameter').optional(),
});

/** Validates the Marketing API getReportTasks endpoint input. */
export const getReportTasksInputSchema = z.object({
  limit: z.number().describe('limit optional endpoint parameter').optional(),
  offset: z.number().describe('offset optional endpoint parameter').optional(),
  reportTaskStatuses: z
    .string()
    .describe('reportTaskStatuses optional endpoint parameter')
    .optional(),
});

/** Validates the Marketing API createReportTask endpoint input. */
export const createReportTaskInputSchema = z.object({
  request: createReportTaskSchema.describe('Create report task request body'),
});

/** Validates the Marketing API getReportTask endpoint input. */
export const getReportTaskInputSchema = z.object({
  reportTaskId: z.string().describe('reportTaskId required endpoint parameter'),
});

/** Validates the Marketing API deleteReportTask endpoint input. */
export const deleteReportTaskInputSchema = z.object({
  reportTaskId: z.string().describe('reportTaskId required endpoint parameter'),
});

/** Validates the Marketing API createItemPriceMarkdownPromotion endpoint input. */
export const createItemPriceMarkdownPromotionInputSchema = z.object({
  request: itemPriceMarkdownSchema.describe('Create item price markdown promotion request body'),
});

/** Validates the Marketing API getItemPriceMarkdownPromotion endpoint input. */
export const getItemPriceMarkdownPromotionInputSchema = z.object({
  promotionId: z.string().describe('promotionId required endpoint parameter'),
});

/** Validates the Marketing API updateItemPriceMarkdownPromotion endpoint input. */
export const updateItemPriceMarkdownPromotionInputSchema = z.object({
  promotionId: z.string().describe('promotionId required endpoint parameter'),
  request: itemPriceMarkdownSchema.describe('Update item price markdown promotion request body'),
});

/** Validates the Marketing API deleteItemPriceMarkdownPromotion endpoint input. */
export const deleteItemPriceMarkdownPromotionInputSchema = z.object({
  promotionId: z.string().describe('promotionId required endpoint parameter'),
});

/** Validates the Marketing API createItemPromotion endpoint input. */
export const createItemPromotionInputSchema = z.object({
  request: itemPromotionSchema.describe('Create item promotion request body'),
});

/** Validates the Marketing API getItemPromotion endpoint input. */
export const getItemPromotionInputSchema = z.object({
  promotionId: z.string().describe('promotionId required endpoint parameter'),
});

/** Validates the Marketing API updateItemPromotion endpoint input. */
export const updateItemPromotionInputSchema = z.object({
  promotionId: z.string().describe('promotionId required endpoint parameter'),
  request: itemPromotionSchema.describe('Update item promotion request body'),
});

/** Validates the Marketing API deleteItemPromotion endpoint input. */
export const deleteItemPromotionInputSchema = z.object({
  promotionId: z.string().describe('promotionId required endpoint parameter'),
});

/** Validates the Marketing API getListingSet endpoint input. */
export const getListingSetInputSchema = z.object({
  promotionId: z.string().describe('promotionId required endpoint parameter'),
  limit: z.number().describe('limit optional endpoint parameter').optional(),
  offset: z.number().describe('offset optional endpoint parameter').optional(),
  q: z.string().describe('q optional endpoint parameter').optional(),
  sort: z.string().describe('sort optional endpoint parameter').optional(),
  status: z.string().describe('status optional endpoint parameter').optional(),
});

/** Validates the Marketing API getPromotions endpoint input. */
export const getPromotionsInputSchema = z.object({
  limit: z.number().describe('limit optional endpoint parameter').optional(),
  marketplaceId: z.string().describe('marketplaceId required endpoint parameter'),
  offset: z.number().describe('offset optional endpoint parameter').optional(),
  promotionStatus: z.string().describe('promotionStatus optional endpoint parameter').optional(),
  promotionType: z.string().describe('promotionType optional endpoint parameter').optional(),
  q: z.string().describe('q optional endpoint parameter').optional(),
  sort: z.string().describe('sort optional endpoint parameter').optional(),
});

/** Validates the Marketing API pausePromotion endpoint input. */
export const pausePromotionInputSchema = z.object({
  promotionId: z.string().describe('promotionId required endpoint parameter'),
});

/** Validates the Marketing API resumePromotion endpoint input. */
export const resumePromotionInputSchema = z.object({
  promotionId: z.string().describe('promotionId required endpoint parameter'),
});

/** Validates the Marketing API getPromotionReports endpoint input. */
export const getPromotionReportsInputSchema = z.object({
  limit: z.number().describe('limit optional endpoint parameter').optional(),
  marketplaceId: z.string().describe('marketplaceId required endpoint parameter'),
  offset: z.number().describe('offset optional endpoint parameter').optional(),
  promotionStatus: z.string().describe('promotionStatus optional endpoint parameter').optional(),
  promotionType: z.string().describe('promotionType optional endpoint parameter').optional(),
  q: z.string().describe('q optional endpoint parameter').optional(),
});

/** Validates the Marketing API getPromotionSummaryReport endpoint input. */
export const getPromotionSummaryReportInputSchema = z.object({
  marketplaceId: z.string().describe('marketplaceId required endpoint parameter'),
});

/** Validates the Marketing API getEmailCampaigns endpoint input. */
export const getEmailCampaignsInputSchema = z.object({
  limit: z.number().describe('limit optional endpoint parameter').optional(),
  offset: z.number().describe('offset optional endpoint parameter').optional(),
  q: z.string().describe('q optional endpoint parameter').optional(),
  sort: z.string().describe('sort optional endpoint parameter').optional(),
});

/** Validates the Marketing API createEmailCampaign endpoint input. */
export const createEmailCampaignInputSchema = z.object({
  marketplaceId: z.string().describe('Marketplace ID sent as X-EBAY-C-MARKETPLACE-ID'),
  request: createEmailCampaignRequestSchema.describe('Create email campaign request body'),
});

/** Validates the Marketing API getEmailCampaign endpoint input. */
export const getEmailCampaignInputSchema = z.object({
  emailCampaignId: z.string().describe('emailCampaignId required endpoint parameter'),
});

/** Validates the Marketing API updateEmailCampaign endpoint input. */
export const updateEmailCampaignInputSchema = z.object({
  emailCampaignId: z.string().describe('emailCampaignId required endpoint parameter'),
  request: updateEmailCampaignRequestSchema.describe('Update email campaign request body'),
});

/** Validates the Marketing API deleteEmailCampaign endpoint input. */
export const deleteEmailCampaignInputSchema = z.object({
  emailCampaignId: z.string().describe('emailCampaignId required endpoint parameter'),
});

/** Validates the Marketing API getAudiences endpoint input. */
export const getAudiencesInputSchema = z.object({
  emailCampaignType: z.string().describe('emailCampaignType required endpoint parameter'),
  limit: z.number().describe('limit optional endpoint parameter').optional(),
  offset: z.number().describe('offset optional endpoint parameter').optional(),
});

/** Validates the Marketing API getEmailPreview endpoint input. */
export const getEmailPreviewInputSchema = z.object({
  emailCampaignId: z.string().describe('emailCampaignId required endpoint parameter'),
});

/** Validates the Marketing API getEmailReport endpoint input. */
export const getEmailReportInputSchema = z.object({
  endDate: z.string().describe('endDate required endpoint parameter'),
  startDate: z.string().describe('startDate required endpoint parameter'),
});

/** Validates the Recommendation API findListingRecommendations endpoint input. */
export const findListingRecommendationsInputSchema = z.object({
  requestBody: findListingRecommendationRequestSchema.optional(),
  filter: z.string().optional().describe('Recommendation filter expression'),
  limit: z.number().optional().describe('Maximum recommendations to return'),
  offset: z.number().optional().describe('Recommendations to skip before returning results'),
  marketplaceId: z.string().describe('Marketplace ID sent as X-EBAY-C-MARKETPLACE-ID'),
});
// ============================================================================
// JSON Schema Conversion Functions
// ============================================================================

/**
 * Converts Marketing API Effect-backed schemas to JSON Schema format for MCP tools.
 *
 * @returns Marketing API JSON schemas keyed by endpoint or shared model name.
 * @example
 * ```ts
 * const schemas = getMarketingJsonSchemas();
 * ```
 */
export const getMarketingJsonSchemas = () => {
  return {
    // Campaign Management
    getCampaignsOutput: zodToJsonSchema(
      campaignPagedCollectionResponseSchema,
      'getCampaignsOutput',
    ),
    getCampaignDetails: zodToJsonSchema(campaignSchema, 'getCampaignDetails'),
    createCampaignInput: zodToJsonSchema(createCampaignRequestSchema, 'createCampaignInput'),
    createCampaignOutput: zodToJsonSchema(
      z.object({
        campaignId: z.string().optional(),
        warnings: z.array(errorSchema).optional(),
      }),
      'createCampaignOutput',
    ),
    cloneCampaignInput: zodToJsonSchema(cloneCampaignRequestSchema, 'cloneCampaignInput'),
    updateCampaignInput: zodToJsonSchema(updateCampaignRequestSchema, 'updateCampaignInput'),
    updateCampaignBudgetInput: zodToJsonSchema(
      updateCampaignBudgetRequestSchema,
      'updateCampaignBudgetInput',
    ),
    updateBidPercentageInput: zodToJsonSchema(
      updateBidPercentageRequestSchema,
      'updateBidPercentageInput',
    ),

    // Ad Group Management
    getAdGroupsOutput: zodToJsonSchema(adGroupPagedCollectionResponseSchema, 'getAdGroupsOutput'),
    getAdGroupDetails: zodToJsonSchema(adGroupSchema, 'getAdGroupDetails'),
    createAdGroupInput: zodToJsonSchema(createAdGroupRequestSchema, 'createAdGroupInput'),
    updateAdGroupInput: zodToJsonSchema(updateAdGroupRequestSchema, 'updateAdGroupInput'),

    // Ad Operations
    getAdsOutput: zodToJsonSchema(adPagedCollectionResponseSchema, 'getAdsOutput'),
    getAdDetails: zodToJsonSchema(adSchema, 'getAdDetails'),
    createAdInput: zodToJsonSchema(createAdRequestSchema, 'createAdInput'),
    createAdOutput: zodToJsonSchema(adResponseSchema, 'createAdOutput'),
    createAdsByInventoryReferenceInput: zodToJsonSchema(
      createAdsByInventoryReferenceRequestSchema,
      'createAdsByInventoryReferenceInput',
    ),
    createAdsByInventoryReferenceOutput: zodToJsonSchema(
      createAdsByInventoryReferenceResponseSchema,
      'createAdsByInventoryReferenceOutput',
    ),
    updateAdStatusInput: zodToJsonSchema(updateAdStatusRequestSchema, 'updateAdStatusInput'),
    bulkCreateAdsInput: zodToJsonSchema(bulkCreateAdRequestSchema, 'bulkCreateAdsInput'),
    bulkCreateAdsOutput: zodToJsonSchema(bulkAdResponseSchema, 'bulkCreateAdsOutput'),
    bulkUpdateAdStatusInput: zodToJsonSchema(
      bulkUpdateAdStatusRequestSchema,
      'bulkUpdateAdStatusInput',
    ),
    bulkDeleteAdsInput: zodToJsonSchema(bulkDeleteAdRequestSchema, 'bulkDeleteAdsInput'),

    // Keyword Management
    getKeywordsOutput: zodToJsonSchema(keywordPagedCollectionResponseSchema, 'getKeywordsOutput'),
    getKeywordDetails: zodToJsonSchema(keywordSchema, 'getKeywordDetails'),
    createKeywordInput: zodToJsonSchema(createKeywordRequestSchema, 'createKeywordInput'),
    createKeywordOutput: zodToJsonSchema(keywordResponseSchema, 'createKeywordOutput'),
    updateKeywordInput: zodToJsonSchema(updateKeywordRequestSchema, 'updateKeywordInput'),
    bulkCreateKeywordsInput: zodToJsonSchema(
      bulkCreateKeywordRequestSchema,
      'bulkCreateKeywordsInput',
    ),
    bulkCreateKeywordsOutput: zodToJsonSchema(
      bulkCreateKeywordResponseSchema,
      'bulkCreateKeywordsOutput',
    ),
    bulkUpdateKeywordsInput: zodToJsonSchema(
      bulkUpdateKeywordRequestSchema,
      'bulkUpdateKeywordsInput',
    ),

    // Negative Keyword Management
    getNegativeKeywordsOutput: zodToJsonSchema(
      negativeKeywordPagedCollectionResponseSchema,
      'getNegativeKeywordsOutput',
    ),
    getNegativeKeywordDetails: zodToJsonSchema(negativeKeywordSchema, 'getNegativeKeywordDetails'),
    createNegativeKeywordInput: zodToJsonSchema(
      createNegativeKeywordRequestSchema,
      'createNegativeKeywordInput',
    ),
    createNegativeKeywordOutput: zodToJsonSchema(
      negativeKeywordResponseSchema,
      'createNegativeKeywordOutput',
    ),
    updateNegativeKeywordInput: zodToJsonSchema(
      updateNegativeKeywordRequestSchema,
      'updateNegativeKeywordInput',
    ),
    bulkCreateNegativeKeywordsInput: zodToJsonSchema(
      bulkCreateNegativeKeywordRequestSchema,
      'bulkCreateNegativeKeywordsInput',
    ),
    bulkCreateNegativeKeywordsOutput: zodToJsonSchema(
      bulkCreateNegativeKeywordResponseSchema,
      'bulkCreateNegativeKeywordsOutput',
    ),

    // Suggestions
    suggestBidsOutput: zodToJsonSchema(
      z.object({
        suggestedBids: z.array(suggestedBidsSchema).optional(),
      }),
      'suggestBidsOutput',
    ),
    suggestKeywordsOutput: zodToJsonSchema(
      z.object({
        suggestedKeywords: z.array(suggestedKeywordsSchema).optional(),
      }),
      'suggestKeywordsOutput',
    ),
    suggestBudgetOutput: zodToJsonSchema(suggestBudgetResponseSchema, 'suggestBudgetOutput'),
    suggestMaxCpcInput: zodToJsonSchema(suggestMaxCpcRequestSchema, 'suggestMaxCpcInput'),
    suggestMaxCpcOutput: zodToJsonSchema(suggestMaxCpcResponseSchema, 'suggestMaxCpcOutput'),

    // Reporting
    getReportMetadataOutput: zodToJsonSchema(reportMetadatasSchema, 'getReportMetadataOutput'),
    createReportTaskInput: zodToJsonSchema(createReportTaskSchema, 'createReportTaskInput'),
    createReportTaskOutput: zodToJsonSchema(
      z.object({
        reportTaskId: z.string().optional(),
        href: z.string().optional(),
      }),
      'createReportTaskOutput',
    ),
    getReportTasksOutput: zodToJsonSchema(reportTaskPagedCollectionSchema, 'getReportTasksOutput'),
    getReportTaskDetails: zodToJsonSchema(reportTaskSchema, 'getReportTaskDetails'),
    getSummaryReportOutput: zodToJsonSchema(summaryReportResponseSchema, 'getSummaryReportOutput'),

    // Item Promotions (Discounts)
    getPromotionsOutput: zodToJsonSchema(promotionsPagedCollectionSchema, 'getPromotionsOutput'),
    getPromotionDetails: zodToJsonSchema(itemPromotionResponseSchema, 'getPromotionDetails'),
    createItemPromotionInput: zodToJsonSchema(itemPromotionSchema, 'createItemPromotionInput'),
    createItemPromotionOutput: zodToJsonSchema(
      z.object({
        promotionId: z.string().optional(),
        href: z.string().optional(),
      }),
      'createItemPromotionOutput',
    ),
    updateItemPromotionInput: zodToJsonSchema(itemPromotionSchema, 'updateItemPromotionInput'),
    getPromotionListingsOutput: zodToJsonSchema(
      itemsPagedCollectionSchema,
      'getPromotionListingsOutput',
    ),
    getPromotionReportsOutput: zodToJsonSchema(
      promotionsReportPagedCollectionSchema,
      'getPromotionReportsOutput',
    ),
    createItemPriceMarkdownInput: zodToJsonSchema(
      itemPriceMarkdownSchema,
      'createItemPriceMarkdownInput',
    ),

    // Email Campaigns
    createEmailCampaignInput: zodToJsonSchema(
      createEmailCampaignRequestSchema,
      'createEmailCampaignInput',
    ),
    createEmailCampaignOutput: zodToJsonSchema(
      createEmailCampaignResponseSchema,
      'createEmailCampaignOutput',
    ),
    getEmailCampaignsOutput: zodToJsonSchema(
      getEmailCampaignsResponseSchema,
      'getEmailCampaignsOutput',
    ),
    getEmailCampaignDetails: zodToJsonSchema(
      getEmailCampaignResponseSchema,
      'getEmailCampaignDetails',
    ),
    getEmailCampaignAudiencesOutput: zodToJsonSchema(
      getEmailCampaignAudiencesResponseSchema,
      'getEmailCampaignAudiencesOutput',
    ),
    getEmailPreviewOutput: zodToJsonSchema(getEmailPreviewResponseSchema, 'getEmailPreviewOutput'),
    getEmailReportOutput: zodToJsonSchema(getEmailReportResponseSchema, 'getEmailReportOutput'),

    // Recommendations
    findListingRecommendationsInput: zodToJsonSchema(
      findListingRecommendationsInputSchema,
      'findListingRecommendationsInput',
    ),
    findListingRecommendationsOutput: zodToJsonSchema(
      pagedListingRecommendationCollectionSchema,
      'findListingRecommendationsOutput',
    ),
    listingRecommendationDetails: zodToJsonSchema(
      listingRecommendationSchema,
      'listingRecommendationDetails',
    ),

    // Quick Setup
    quickSetupInput: zodToJsonSchema(quickSetupRequestSchema, 'quickSetupInput'),

    // Common schemas
    error: zodToJsonSchema(errorSchema, 'error'),
    amount: zodToJsonSchema(amountSchema, 'amount'),
  };
};
