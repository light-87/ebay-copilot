import type { EbayApiClient, EbayRequestConfig } from '@/api/client.js';
import {
  buildEndpointParams,
  type EbayApiError,
  requestDeleteEffect,
  requestGetEffect,
  requestPostEffect,
  requestPutEffect,
} from '@/api/shared/request.js';
import type {
  bulkCreateAdsByInventoryReferenceInputSchema,
  bulkCreateAdsByListingIdInputSchema,
  bulkDeleteAdsByInventoryReferenceInputSchema,
  bulkDeleteAdsByListingIdInputSchema,
  bulkUpdateAdsBidByInventoryReferenceInputSchema,
  bulkUpdateAdsBidByListingIdInputSchema,
  bulkUpdateAdsStatusInputSchema,
  bulkUpdateAdsStatusByListingIdInputSchema,
  getAdsInputSchema,
  createAdByListingIdInputSchema,
  createAdsByInventoryReferenceInputSchema,
  getAdInputSchema,
  deleteAdInputSchema,
  deleteAdsByInventoryReferenceInputSchema,
  getAdsByInventoryReferenceInputSchema,
  updateBidInputSchema,
  getAdGroupsInputSchema,
  createAdGroupInputSchema,
  getAdGroupInputSchema,
  updateAdGroupInputSchema,
  suggestBidsInputSchema,
  suggestKeywordsInputSchema,
  cloneCampaignInputSchema,
  getCampaignsInputSchema,
  createCampaignInputSchema,
  getCampaignInputSchema,
  deleteCampaignInputSchema,
  endCampaignInputSchema,
  findCampaignByAdReferenceInputSchema,
  getCampaignByNameInputSchema,
  launchCampaignInputSchema,
  pauseCampaignInputSchema,
  resumeCampaignInputSchema,
  setupQuickCampaignInputSchema,
  suggestBudgetInputSchema,
  suggestItemsInputSchema,
  suggestMaxCpcInputSchema,
  updateAdRateStrategyInputSchema,
  updateBiddingStrategyInputSchema,
  updateCampaignBudgetInputSchema,
  updateCampaignIdentificationInputSchema,
  bulkCreateKeywordInputSchema,
  bulkUpdateKeywordInputSchema,
  getKeywordsInputSchema,
  createKeywordInputSchema,
  getKeywordInputSchema,
  updateKeywordInputSchema,
  bulkCreateNegativeKeywordInputSchema,
  bulkUpdateNegativeKeywordInputSchema,
  getNegativeKeywordsInputSchema,
  createNegativeKeywordInputSchema,
  getNegativeKeywordInputSchema,
  updateNegativeKeywordInputSchema,
  getReportInputSchema,
  getReportMetadataInputSchema,
  getReportMetadataForReportTypeInputSchema,
  getReportTasksInputSchema,
  createReportTaskInputSchema,
  getReportTaskInputSchema,
  deleteReportTaskInputSchema,
  createItemPriceMarkdownPromotionInputSchema,
  getItemPriceMarkdownPromotionInputSchema,
  updateItemPriceMarkdownPromotionInputSchema,
  deleteItemPriceMarkdownPromotionInputSchema,
  createItemPromotionInputSchema,
  getItemPromotionInputSchema,
  updateItemPromotionInputSchema,
  deleteItemPromotionInputSchema,
  getListingSetInputSchema,
  getPromotionsInputSchema,
  pausePromotionInputSchema,
  resumePromotionInputSchema,
  getPromotionReportsInputSchema,
  getPromotionSummaryReportInputSchema,
  getEmailCampaignsInputSchema,
  createEmailCampaignInputSchema,
  getEmailCampaignInputSchema,
  updateEmailCampaignInputSchema,
  deleteEmailCampaignInputSchema,
  getAudiencesInputSchema,
  getEmailPreviewInputSchema,
  getEmailReportInputSchema,
} from '@/schemas/marketing/marketing.js';
import type { operations } from '@/types/sell-apps/markeitng-and-promotions/sellMarketingV1Oas3.js';
import type { Effect } from 'effect';
import type { InferEffectSchema } from '@/utils/effectSchemaTypes.js';

const MARKETING_BASE_PATH = '/sell/marketing/v1';

type JsonContent<Response> = Response extends { content: { 'application/json': infer Body } }
  ? Body
  : void;

type MarketingOperationResponse<Operation extends keyof operations> =
  200 extends keyof operations[Operation]['responses']
    ? JsonContent<operations[Operation]['responses'][200]>
    : 201 extends keyof operations[Operation]['responses']
      ? JsonContent<operations[Operation]['responses'][201]>
      : 202 extends keyof operations[Operation]['responses']
        ? JsonContent<operations[Operation]['responses'][202]>
        : 204 extends keyof operations[Operation]['responses']
          ? JsonContent<operations[Operation]['responses'][204]>
          : void;

type BulkCreateAdsByInventoryReferenceInput = InferEffectSchema<
  typeof bulkCreateAdsByInventoryReferenceInputSchema
>;
type BulkCreateAdsByListingIdInput = InferEffectSchema<typeof bulkCreateAdsByListingIdInputSchema>;
type BulkDeleteAdsByInventoryReferenceInput = InferEffectSchema<
  typeof bulkDeleteAdsByInventoryReferenceInputSchema
>;
type BulkDeleteAdsByListingIdInput = InferEffectSchema<typeof bulkDeleteAdsByListingIdInputSchema>;
type BulkUpdateAdsBidByInventoryReferenceInput = InferEffectSchema<
  typeof bulkUpdateAdsBidByInventoryReferenceInputSchema
>;
type BulkUpdateAdsBidByListingIdInput = InferEffectSchema<
  typeof bulkUpdateAdsBidByListingIdInputSchema
>;
type BulkUpdateAdsStatusInput = InferEffectSchema<typeof bulkUpdateAdsStatusInputSchema>;
type BulkUpdateAdsStatusByListingIdInput = InferEffectSchema<
  typeof bulkUpdateAdsStatusByListingIdInputSchema
>;
type GetAdsInput = InferEffectSchema<typeof getAdsInputSchema>;
type CreateAdByListingIdInput = InferEffectSchema<typeof createAdByListingIdInputSchema>;
type CreateAdsByInventoryReferenceInput = InferEffectSchema<
  typeof createAdsByInventoryReferenceInputSchema
>;
type GetAdInput = InferEffectSchema<typeof getAdInputSchema>;
type DeleteAdInput = InferEffectSchema<typeof deleteAdInputSchema>;
type DeleteAdsByInventoryReferenceInput = InferEffectSchema<
  typeof deleteAdsByInventoryReferenceInputSchema
>;
type GetAdsByInventoryReferenceInput = InferEffectSchema<
  typeof getAdsByInventoryReferenceInputSchema
>;
type UpdateBidInput = InferEffectSchema<typeof updateBidInputSchema>;
type GetAdGroupsInput = InferEffectSchema<typeof getAdGroupsInputSchema>;
type CreateAdGroupInput = InferEffectSchema<typeof createAdGroupInputSchema>;
type GetAdGroupInput = InferEffectSchema<typeof getAdGroupInputSchema>;
type UpdateAdGroupInput = InferEffectSchema<typeof updateAdGroupInputSchema>;
type SuggestBidsInput = InferEffectSchema<typeof suggestBidsInputSchema>;
type SuggestKeywordsInput = InferEffectSchema<typeof suggestKeywordsInputSchema>;
type CloneCampaignInput = InferEffectSchema<typeof cloneCampaignInputSchema>;
type GetCampaignsInput = InferEffectSchema<typeof getCampaignsInputSchema>;
type CreateCampaignInput = InferEffectSchema<typeof createCampaignInputSchema>;
type GetCampaignInput = InferEffectSchema<typeof getCampaignInputSchema>;
type DeleteCampaignInput = InferEffectSchema<typeof deleteCampaignInputSchema>;
type EndCampaignInput = InferEffectSchema<typeof endCampaignInputSchema>;
type FindCampaignByAdReferenceInput = InferEffectSchema<
  typeof findCampaignByAdReferenceInputSchema
>;
type GetCampaignByNameInput = InferEffectSchema<typeof getCampaignByNameInputSchema>;
type LaunchCampaignInput = InferEffectSchema<typeof launchCampaignInputSchema>;
type PauseCampaignInput = InferEffectSchema<typeof pauseCampaignInputSchema>;
type ResumeCampaignInput = InferEffectSchema<typeof resumeCampaignInputSchema>;
type SetupQuickCampaignInput = InferEffectSchema<typeof setupQuickCampaignInputSchema>;
type SuggestBudgetInput = InferEffectSchema<typeof suggestBudgetInputSchema>;
type SuggestItemsInput = InferEffectSchema<typeof suggestItemsInputSchema>;
type SuggestMaxCpcInput = InferEffectSchema<typeof suggestMaxCpcInputSchema>;
type UpdateAdRateStrategyInput = InferEffectSchema<typeof updateAdRateStrategyInputSchema>;
type UpdateBiddingStrategyInput = InferEffectSchema<typeof updateBiddingStrategyInputSchema>;
type UpdateCampaignBudgetInput = InferEffectSchema<typeof updateCampaignBudgetInputSchema>;
type UpdateCampaignIdentificationInput = InferEffectSchema<
  typeof updateCampaignIdentificationInputSchema
>;
type BulkCreateKeywordInput = InferEffectSchema<typeof bulkCreateKeywordInputSchema>;
type BulkUpdateKeywordInput = InferEffectSchema<typeof bulkUpdateKeywordInputSchema>;
type GetKeywordsInput = InferEffectSchema<typeof getKeywordsInputSchema>;
type CreateKeywordInput = InferEffectSchema<typeof createKeywordInputSchema>;
type GetKeywordInput = InferEffectSchema<typeof getKeywordInputSchema>;
type UpdateKeywordInput = InferEffectSchema<typeof updateKeywordInputSchema>;
type BulkCreateNegativeKeywordInput = InferEffectSchema<
  typeof bulkCreateNegativeKeywordInputSchema
>;
type BulkUpdateNegativeKeywordInput = InferEffectSchema<
  typeof bulkUpdateNegativeKeywordInputSchema
>;
type GetNegativeKeywordsInput = InferEffectSchema<typeof getNegativeKeywordsInputSchema>;
type CreateNegativeKeywordInput = InferEffectSchema<typeof createNegativeKeywordInputSchema>;
type GetNegativeKeywordInput = InferEffectSchema<typeof getNegativeKeywordInputSchema>;
type UpdateNegativeKeywordInput = InferEffectSchema<typeof updateNegativeKeywordInputSchema>;
type GetReportInput = InferEffectSchema<typeof getReportInputSchema>;
type GetReportMetadataInput = InferEffectSchema<typeof getReportMetadataInputSchema>;
type GetReportMetadataForReportTypeInput = InferEffectSchema<
  typeof getReportMetadataForReportTypeInputSchema
>;
type GetReportTasksInput = InferEffectSchema<typeof getReportTasksInputSchema>;
type CreateReportTaskInput = InferEffectSchema<typeof createReportTaskInputSchema>;
type GetReportTaskInput = InferEffectSchema<typeof getReportTaskInputSchema>;
type DeleteReportTaskInput = InferEffectSchema<typeof deleteReportTaskInputSchema>;
type CreateItemPriceMarkdownPromotionInput = InferEffectSchema<
  typeof createItemPriceMarkdownPromotionInputSchema
>;
type GetItemPriceMarkdownPromotionInput = InferEffectSchema<
  typeof getItemPriceMarkdownPromotionInputSchema
>;
type UpdateItemPriceMarkdownPromotionInput = InferEffectSchema<
  typeof updateItemPriceMarkdownPromotionInputSchema
>;
type DeleteItemPriceMarkdownPromotionInput = InferEffectSchema<
  typeof deleteItemPriceMarkdownPromotionInputSchema
>;
type CreateItemPromotionInput = InferEffectSchema<typeof createItemPromotionInputSchema>;
type GetItemPromotionInput = InferEffectSchema<typeof getItemPromotionInputSchema>;
type UpdateItemPromotionInput = InferEffectSchema<typeof updateItemPromotionInputSchema>;
type DeleteItemPromotionInput = InferEffectSchema<typeof deleteItemPromotionInputSchema>;
type GetListingSetInput = InferEffectSchema<typeof getListingSetInputSchema>;
type GetPromotionsInput = InferEffectSchema<typeof getPromotionsInputSchema>;
type PausePromotionInput = InferEffectSchema<typeof pausePromotionInputSchema>;
type ResumePromotionInput = InferEffectSchema<typeof resumePromotionInputSchema>;
type GetPromotionReportsInput = InferEffectSchema<typeof getPromotionReportsInputSchema>;
type GetPromotionSummaryReportInput = InferEffectSchema<
  typeof getPromotionSummaryReportInputSchema
>;
type GetEmailCampaignsInput = InferEffectSchema<typeof getEmailCampaignsInputSchema>;
type CreateEmailCampaignInput = InferEffectSchema<typeof createEmailCampaignInputSchema>;
type GetEmailCampaignInput = InferEffectSchema<typeof getEmailCampaignInputSchema>;
type UpdateEmailCampaignInput = InferEffectSchema<typeof updateEmailCampaignInputSchema>;
type DeleteEmailCampaignInput = InferEffectSchema<typeof deleteEmailCampaignInputSchema>;
type GetAudiencesInput = InferEffectSchema<typeof getAudiencesInputSchema>;
type GetEmailPreviewInput = InferEffectSchema<typeof getEmailPreviewInputSchema>;
type GetEmailReportInput = InferEffectSchema<typeof getEmailReportInputSchema>;

/**
 * Response returned by eBay Marketing API bulkCreateAdsByInventoryReference.
 *
 * @see https://developer.ebay.com/api-docs/sell/marketing/resources/ad/methods/bulkCreateAdsByInventoryReference
 */
export type BulkCreateAdsByInventoryReferenceResponse =
  MarketingOperationResponse<'bulkCreateAdsByInventoryReference'>;

/**
 * Response returned by eBay Marketing API bulkCreateAdsByListingId.
 *
 * @see https://developer.ebay.com/api-docs/sell/marketing/resources/ad/methods/bulkCreateAdsByListingId
 */
export type BulkCreateAdsByListingIdResponse =
  MarketingOperationResponse<'bulkCreateAdsByListingId'>;

/**
 * Response returned by eBay Marketing API bulkDeleteAdsByInventoryReference.
 *
 * @see https://developer.ebay.com/api-docs/sell/marketing/resources/ad/methods/bulkDeleteAdsByInventoryReference
 */
export type BulkDeleteAdsByInventoryReferenceResponse =
  MarketingOperationResponse<'bulkDeleteAdsByInventoryReference'>;

/**
 * Response returned by eBay Marketing API bulkDeleteAdsByListingId.
 *
 * @see https://developer.ebay.com/api-docs/sell/marketing/resources/ad/methods/bulkDeleteAdsByListingId
 */
export type BulkDeleteAdsByListingIdResponse =
  MarketingOperationResponse<'bulkDeleteAdsByListingId'>;

/**
 * Response returned by eBay Marketing API bulkUpdateAdsBidByInventoryReference.
 *
 * @see https://developer.ebay.com/api-docs/sell/marketing/resources/ad/methods/bulkUpdateAdsBidByInventoryReference
 */
export type BulkUpdateAdsBidByInventoryReferenceResponse =
  MarketingOperationResponse<'bulkUpdateAdsBidByInventoryReference'>;

/**
 * Response returned by eBay Marketing API bulkUpdateAdsBidByListingId.
 *
 * @see https://developer.ebay.com/api-docs/sell/marketing/resources/ad/methods/bulkUpdateAdsBidByListingId
 */
export type BulkUpdateAdsBidByListingIdResponse =
  MarketingOperationResponse<'bulkUpdateAdsBidByListingId'>;

/**
 * Response returned by eBay Marketing API bulkUpdateAdsStatus.
 *
 * @see https://developer.ebay.com/api-docs/sell/marketing/resources/ad/methods/bulkUpdateAdsStatus
 */
export type BulkUpdateAdsStatusResponse = MarketingOperationResponse<'bulkUpdateAdsStatus'>;

/**
 * Response returned by eBay Marketing API bulkUpdateAdsStatusByListingId.
 *
 * @see https://developer.ebay.com/api-docs/sell/marketing/resources/ad/methods/bulkUpdateAdsStatusByListingId
 */
export type BulkUpdateAdsStatusByListingIdResponse =
  MarketingOperationResponse<'bulkUpdateAdsStatusByListingId'>;

/**
 * Response returned by eBay Marketing API getAds.
 *
 * @see https://developer.ebay.com/api-docs/sell/marketing/resources/ad/methods/getAds
 */
export type GetAdsResponse = MarketingOperationResponse<'getAds'>;

/**
 * Response returned by eBay Marketing API createAdByListingId.
 *
 * @see https://developer.ebay.com/api-docs/sell/marketing/resources/ad/methods/createAdByListingId
 */
export type CreateAdByListingIdResponse = MarketingOperationResponse<'createAdByListingId'>;

/**
 * Response returned by eBay Marketing API createAdsByInventoryReference.
 *
 * @see https://developer.ebay.com/api-docs/sell/marketing/resources/ad/methods/createAdsByInventoryReference
 */
export type CreateAdsByInventoryReferenceResponse =
  MarketingOperationResponse<'createAdsByInventoryReference'>;

/**
 * Response returned by eBay Marketing API getAd.
 *
 * @see https://developer.ebay.com/api-docs/sell/marketing/resources/ad/methods/getAd
 */
export type GetAdResponse = MarketingOperationResponse<'getAd'>;

/**
 * Response returned by eBay Marketing API deleteAd.
 *
 * @see https://developer.ebay.com/api-docs/sell/marketing/resources/ad/methods/deleteAd
 */
export type DeleteAdResponse = MarketingOperationResponse<'deleteAd'>;

/**
 * Response returned by eBay Marketing API deleteAdsByInventoryReference.
 *
 * @see https://developer.ebay.com/api-docs/sell/marketing/resources/ad/methods/deleteAdsByInventoryReference
 */
export type DeleteAdsByInventoryReferenceResponse =
  MarketingOperationResponse<'deleteAdsByInventoryReference'>;

/**
 * Response returned by eBay Marketing API getAdsByInventoryReference.
 *
 * @see https://developer.ebay.com/api-docs/sell/marketing/resources/ad/methods/getAdsByInventoryReference
 */
export type GetAdsByInventoryReferenceResponse =
  MarketingOperationResponse<'getAdsByInventoryReference'>;

/**
 * Response returned by eBay Marketing API updateBid.
 *
 * @see https://developer.ebay.com/api-docs/sell/marketing/resources/ad/methods/updateBid
 */
export type UpdateBidResponse = MarketingOperationResponse<'updateBid'>;

/**
 * Response returned by eBay Marketing API getAdGroups.
 *
 * @see https://developer.ebay.com/api-docs/sell/marketing/resources/ad_group/methods/getAdGroups
 */
export type GetAdGroupsResponse = MarketingOperationResponse<'getAdGroups'>;

/**
 * Response returned by eBay Marketing API createAdGroup.
 *
 * @see https://developer.ebay.com/api-docs/sell/marketing/resources/ad_group/methods/createAdGroup
 */
export type CreateAdGroupResponse = MarketingOperationResponse<'createAdGroup'>;

/**
 * Response returned by eBay Marketing API getAdGroup.
 *
 * @see https://developer.ebay.com/api-docs/sell/marketing/resources/ad_group/methods/getAdGroup
 */
export type GetAdGroupResponse = MarketingOperationResponse<'getAdGroup'>;

/**
 * Response returned by eBay Marketing API updateAdGroup.
 *
 * @see https://developer.ebay.com/api-docs/sell/marketing/resources/ad_group/methods/updateAdGroup
 */
export type UpdateAdGroupResponse = MarketingOperationResponse<'updateAdGroup'>;

/**
 * Response returned by eBay Marketing API suggestBids.
 *
 * @see https://developer.ebay.com/api-docs/sell/marketing/resources/ad_group/methods/suggestBids
 */
export type SuggestBidsResponse = MarketingOperationResponse<'suggestBids'>;

/**
 * Response returned by eBay Marketing API suggestKeywords.
 *
 * @see https://developer.ebay.com/api-docs/sell/marketing/resources/ad_group/methods/suggestKeywords
 */
export type SuggestKeywordsResponse = MarketingOperationResponse<'suggestKeywords'>;

/**
 * Response returned by eBay Marketing API cloneCampaign.
 *
 * @see https://developer.ebay.com/api-docs/sell/marketing/resources/campaign/methods/cloneCampaign
 */
export type CloneCampaignResponse = MarketingOperationResponse<'cloneCampaign'>;

/**
 * Response returned by eBay Marketing API getCampaigns.
 *
 * @see https://developer.ebay.com/api-docs/sell/marketing/resources/campaign/methods/getCampaigns
 */
export type GetCampaignsResponse = MarketingOperationResponse<'getCampaigns'>;

/**
 * Response returned by eBay Marketing API createCampaign.
 *
 * @see https://developer.ebay.com/api-docs/sell/marketing/resources/campaign/methods/createCampaign
 */
export type CreateCampaignResponse = MarketingOperationResponse<'createCampaign'>;

/**
 * Response returned by eBay Marketing API getCampaign.
 *
 * @see https://developer.ebay.com/api-docs/sell/marketing/resources/campaign/methods/getCampaign
 */
export type GetCampaignResponse = MarketingOperationResponse<'getCampaign'>;

/**
 * Response returned by eBay Marketing API deleteCampaign.
 *
 * @see https://developer.ebay.com/api-docs/sell/marketing/resources/campaign/methods/deleteCampaign
 */
export type DeleteCampaignResponse = MarketingOperationResponse<'deleteCampaign'>;

/**
 * Response returned by eBay Marketing API endCampaign.
 *
 * @see https://developer.ebay.com/api-docs/sell/marketing/resources/campaign/methods/endCampaign
 */
export type EndCampaignResponse = MarketingOperationResponse<'endCampaign'>;

/**
 * Response returned by eBay Marketing API findCampaignByAdReference.
 *
 * @see https://developer.ebay.com/api-docs/sell/marketing/resources/campaign/methods/findCampaignByAdReference
 */
export type FindCampaignByAdReferenceResponse =
  MarketingOperationResponse<'findCampaignByAdReference'>;

/**
 * Response returned by eBay Marketing API getCampaignByName.
 *
 * @see https://developer.ebay.com/api-docs/sell/marketing/resources/campaign/methods/getCampaignByName
 */
export type GetCampaignByNameResponse = MarketingOperationResponse<'getCampaignByName'>;

/**
 * Response returned by eBay Marketing API launchCampaign.
 *
 * @see https://developer.ebay.com/api-docs/sell/marketing/resources/campaign/methods/launchCampaign
 */
export type LaunchCampaignResponse = MarketingOperationResponse<'launchCampaign'>;

/**
 * Response returned by eBay Marketing API pauseCampaign.
 *
 * @see https://developer.ebay.com/api-docs/sell/marketing/resources/campaign/methods/pauseCampaign
 */
export type PauseCampaignResponse = MarketingOperationResponse<'pauseCampaign'>;

/**
 * Response returned by eBay Marketing API resumeCampaign.
 *
 * @see https://developer.ebay.com/api-docs/sell/marketing/resources/campaign/methods/resumeCampaign
 */
export type ResumeCampaignResponse = MarketingOperationResponse<'resumeCampaign'>;

/**
 * Response returned by eBay Marketing API setupQuickCampaign.
 *
 * @see https://developer.ebay.com/api-docs/sell/marketing/resources/campaign/methods/setupQuickCampaign
 */
export type SetupQuickCampaignResponse = MarketingOperationResponse<'setupQuickCampaign'>;

/**
 * Response returned by eBay Marketing API suggestBudget.
 *
 * @see https://developer.ebay.com/api-docs/sell/marketing/resources/campaign/methods/suggestBudget
 */
export type SuggestBudgetResponse = MarketingOperationResponse<'suggestBudget'>;

/**
 * Response returned by eBay Marketing API suggestItems.
 *
 * @see https://developer.ebay.com/api-docs/sell/marketing/resources/campaign/methods/suggestItems
 */
export type SuggestItemsResponse = MarketingOperationResponse<'suggestItems'>;

/**
 * Response returned by eBay Marketing API suggestMaxCpc.
 *
 * @see https://developer.ebay.com/api-docs/sell/marketing/resources/campaign/methods/suggestMaxCpc
 */
export type SuggestMaxCpcResponse = MarketingOperationResponse<'suggestMaxCpc'>;

/**
 * Response returned by eBay Marketing API updateAdRateStrategy.
 *
 * @see https://developer.ebay.com/api-docs/sell/marketing/resources/campaign/methods/updateAdRateStrategy
 */
export type UpdateAdRateStrategyResponse = MarketingOperationResponse<'updateAdRateStrategy'>;

/**
 * Response returned by eBay Marketing API updateBiddingStrategy.
 *
 * @see https://developer.ebay.com/api-docs/sell/marketing/resources/campaign/methods/updateBiddingStrategy
 */
export type UpdateBiddingStrategyResponse = MarketingOperationResponse<'updateBiddingStrategy'>;

/**
 * Response returned by eBay Marketing API updateCampaignBudget.
 *
 * @see https://developer.ebay.com/api-docs/sell/marketing/resources/campaign/methods/updateCampaignBudget
 */
export type UpdateCampaignBudgetResponse = MarketingOperationResponse<'updateCampaignBudget'>;

/**
 * Response returned by eBay Marketing API updateCampaignIdentification.
 *
 * @see https://developer.ebay.com/api-docs/sell/marketing/resources/campaign/methods/updateCampaignIdentification
 */
export type UpdateCampaignIdentificationResponse =
  MarketingOperationResponse<'updateCampaignIdentification'>;

/**
 * Response returned by eBay Marketing API bulkCreateKeyword.
 *
 * @see https://developer.ebay.com/api-docs/sell/marketing/resources/keyword/methods/bulkCreateKeyword
 */
export type BulkCreateKeywordResponse = MarketingOperationResponse<'bulkCreateKeyword'>;

/**
 * Response returned by eBay Marketing API bulkUpdateKeyword.
 *
 * @see https://developer.ebay.com/api-docs/sell/marketing/resources/keyword/methods/bulkUpdateKeyword
 */
export type BulkUpdateKeywordResponse = MarketingOperationResponse<'bulkUpdateKeyword'>;

/**
 * Response returned by eBay Marketing API getKeywords.
 *
 * @see https://developer.ebay.com/api-docs/sell/marketing/resources/keyword/methods/getKeywords
 */
export type GetKeywordsResponse = MarketingOperationResponse<'getKeywords'>;

/**
 * Response returned by eBay Marketing API createKeyword.
 *
 * @see https://developer.ebay.com/api-docs/sell/marketing/resources/keyword/methods/createKeyword
 */
export type CreateKeywordResponse = MarketingOperationResponse<'createKeyword'>;

/**
 * Response returned by eBay Marketing API getKeyword.
 *
 * @see https://developer.ebay.com/api-docs/sell/marketing/resources/keyword/methods/getKeyword
 */
export type GetKeywordResponse = MarketingOperationResponse<'getKeyword'>;

/**
 * Response returned by eBay Marketing API updateKeyword.
 *
 * @see https://developer.ebay.com/api-docs/sell/marketing/resources/keyword/methods/updateKeyword
 */
export type UpdateKeywordResponse = MarketingOperationResponse<'updateKeyword'>;

/**
 * Response returned by eBay Marketing API bulkCreateNegativeKeyword.
 *
 * @see https://developer.ebay.com/api-docs/sell/marketing/resources/negative_keyword/methods/bulkCreateNegativeKeyword
 */
export type BulkCreateNegativeKeywordResponse =
  MarketingOperationResponse<'bulkCreateNegativeKeyword'>;

/**
 * Response returned by eBay Marketing API bulkUpdateNegativeKeyword.
 *
 * @see https://developer.ebay.com/api-docs/sell/marketing/resources/negative_keyword/methods/bulkUpdateNegativeKeyword
 */
export type BulkUpdateNegativeKeywordResponse =
  MarketingOperationResponse<'bulkUpdateNegativeKeyword'>;

/**
 * Response returned by eBay Marketing API getNegativeKeywords.
 *
 * @see https://developer.ebay.com/api-docs/sell/marketing/resources/negative_keyword/methods/getNegativeKeywords
 */
export type GetNegativeKeywordsResponse = MarketingOperationResponse<'getNegativeKeywords'>;

/**
 * Response returned by eBay Marketing API createNegativeKeyword.
 *
 * @see https://developer.ebay.com/api-docs/sell/marketing/resources/negative_keyword/methods/createNegativeKeyword
 */
export type CreateNegativeKeywordResponse = MarketingOperationResponse<'createNegativeKeyword'>;

/**
 * Response returned by eBay Marketing API getNegativeKeyword.
 *
 * @see https://developer.ebay.com/api-docs/sell/marketing/resources/negative_keyword/methods/getNegativeKeyword
 */
export type GetNegativeKeywordResponse = MarketingOperationResponse<'getNegativeKeyword'>;

/**
 * Response returned by eBay Marketing API updateNegativeKeyword.
 *
 * @see https://developer.ebay.com/api-docs/sell/marketing/resources/negative_keyword/methods/updateNegativeKeyword
 */
export type UpdateNegativeKeywordResponse = MarketingOperationResponse<'updateNegativeKeyword'>;

/**
 * Response returned by eBay Marketing API getReport.
 *
 * @see https://developer.ebay.com/api-docs/sell/marketing/resources/ad_report/methods/getReport
 */
export type GetReportResponse = MarketingOperationResponse<'getReport'>;

/**
 * Response returned by eBay Marketing API getReportMetadata.
 *
 * @see https://developer.ebay.com/api-docs/sell/marketing/resources/ad_report_metadata/methods/getReportMetadata
 */
export type GetReportMetadataResponse = MarketingOperationResponse<'getReportMetadata'>;

/**
 * Response returned by eBay Marketing API getReportMetadataForReportType.
 *
 * @see https://developer.ebay.com/api-docs/sell/marketing/resources/ad_report_metadata/methods/getReportMetadataForReportType
 */
export type GetReportMetadataForReportTypeResponse =
  MarketingOperationResponse<'getReportMetadataForReportType'>;

/**
 * Response returned by eBay Marketing API getReportTasks.
 *
 * @see https://developer.ebay.com/api-docs/sell/marketing/resources/ad_report_task/methods/getReportTasks
 */
export type GetReportTasksResponse = MarketingOperationResponse<'getReportTasks'>;

/**
 * Response returned by eBay Marketing API createReportTask.
 *
 * @see https://developer.ebay.com/api-docs/sell/marketing/resources/ad_report_task/methods/createReportTask
 */
export type CreateReportTaskResponse = MarketingOperationResponse<'createReportTask'>;

/**
 * Response returned by eBay Marketing API getReportTask.
 *
 * @see https://developer.ebay.com/api-docs/sell/marketing/resources/ad_report_task/methods/getReportTask
 */
export type GetReportTaskResponse = MarketingOperationResponse<'getReportTask'>;

/**
 * Response returned by eBay Marketing API deleteReportTask.
 *
 * @see https://developer.ebay.com/api-docs/sell/marketing/resources/ad_report_task/methods/deleteReportTask
 */
export type DeleteReportTaskResponse = MarketingOperationResponse<'deleteReportTask'>;

/**
 * Response returned by eBay Marketing API createItemPriceMarkdownPromotion.
 *
 * @see https://developer.ebay.com/api-docs/sell/marketing/resources/item_price_markdown/methods/createItemPriceMarkdownPromotion
 */
export type CreateItemPriceMarkdownPromotionResponse =
  MarketingOperationResponse<'createItemPriceMarkdownPromotion'>;

/**
 * Response returned by eBay Marketing API getItemPriceMarkdownPromotion.
 *
 * @see https://developer.ebay.com/api-docs/sell/marketing/resources/item_price_markdown/methods/getItemPriceMarkdownPromotion
 */
export type GetItemPriceMarkdownPromotionResponse =
  MarketingOperationResponse<'getItemPriceMarkdownPromotion'>;

/**
 * Response returned by eBay Marketing API updateItemPriceMarkdownPromotion.
 *
 * @see https://developer.ebay.com/api-docs/sell/marketing/resources/item_price_markdown/methods/updateItemPriceMarkdownPromotion
 */
export type UpdateItemPriceMarkdownPromotionResponse =
  MarketingOperationResponse<'updateItemPriceMarkdownPromotion'>;

/**
 * Response returned by eBay Marketing API deleteItemPriceMarkdownPromotion.
 *
 * @see https://developer.ebay.com/api-docs/sell/marketing/resources/item_price_markdown/methods/deleteItemPriceMarkdownPromotion
 */
export type DeleteItemPriceMarkdownPromotionResponse =
  MarketingOperationResponse<'deleteItemPriceMarkdownPromotion'>;

/**
 * Response returned by eBay Marketing API createItemPromotion.
 *
 * @see https://developer.ebay.com/api-docs/sell/marketing/resources/item_promotion/methods/createItemPromotion
 */
export type CreateItemPromotionResponse = MarketingOperationResponse<'createItemPromotion'>;

/**
 * Response returned by eBay Marketing API getItemPromotion.
 *
 * @see https://developer.ebay.com/api-docs/sell/marketing/resources/item_promotion/methods/getItemPromotion
 */
export type GetItemPromotionResponse = MarketingOperationResponse<'getItemPromotion'>;

/**
 * Response returned by eBay Marketing API updateItemPromotion.
 *
 * @see https://developer.ebay.com/api-docs/sell/marketing/resources/item_promotion/methods/updateItemPromotion
 */
export type UpdateItemPromotionResponse = MarketingOperationResponse<'updateItemPromotion'>;

/**
 * Response returned by eBay Marketing API deleteItemPromotion.
 *
 * @see https://developer.ebay.com/api-docs/sell/marketing/resources/item_promotion/methods/deleteItemPromotion
 */
export type DeleteItemPromotionResponse = MarketingOperationResponse<'deleteItemPromotion'>;

/**
 * Response returned by eBay Marketing API getListingSet.
 *
 * @see https://developer.ebay.com/api-docs/sell/marketing/resources/promotion/methods/getListingSet
 */
export type GetListingSetResponse = MarketingOperationResponse<'getListingSet'>;

/**
 * Response returned by eBay Marketing API getPromotions.
 *
 * @see https://developer.ebay.com/api-docs/sell/marketing/resources/promotion/methods/getPromotions
 */
export type GetPromotionsResponse = MarketingOperationResponse<'getPromotions'>;

/**
 * Response returned by eBay Marketing API pausePromotion.
 *
 * @see https://developer.ebay.com/api-docs/sell/marketing/resources/promotion/methods/pausePromotion
 */
export type PausePromotionResponse = MarketingOperationResponse<'pausePromotion'>;

/**
 * Response returned by eBay Marketing API resumePromotion.
 *
 * @see https://developer.ebay.com/api-docs/sell/marketing/resources/promotion/methods/resumePromotion
 */
export type ResumePromotionResponse = MarketingOperationResponse<'resumePromotion'>;

/**
 * Response returned by eBay Marketing API getPromotionReports.
 *
 * @see https://developer.ebay.com/api-docs/sell/marketing/resources/promotion_report/methods/getPromotionReports
 */
export type GetPromotionReportsResponse = MarketingOperationResponse<'getPromotionReports'>;

/**
 * Response returned by eBay Marketing API getPromotionSummaryReport.
 *
 * @see https://developer.ebay.com/api-docs/sell/marketing/resources/promotion_summary_report/methods/getPromotionSummaryReport
 */
export type GetPromotionSummaryReportResponse =
  MarketingOperationResponse<'getPromotionSummaryReport'>;

/**
 * Response returned by eBay Marketing API getEmailCampaigns.
 *
 * @see https://developer.ebay.com/api-docs/sell/marketing/resources/email_campaign/methods/getEmailCampaigns
 */
export type GetEmailCampaignsResponse = MarketingOperationResponse<'getEmailCampaigns'>;

/**
 * Response returned by eBay Marketing API createEmailCampaign.
 *
 * @see https://developer.ebay.com/api-docs/sell/marketing/resources/email_campaign/methods/createEmailCampaign
 */
export type CreateEmailCampaignResponse = MarketingOperationResponse<'createEmailCampaign'>;

/**
 * Response returned by eBay Marketing API getEmailCampaign.
 *
 * @see https://developer.ebay.com/api-docs/sell/marketing/resources/email_campaign/methods/getEmailCampaign
 */
export type GetEmailCampaignResponse = MarketingOperationResponse<'getEmailCampaign'>;

/**
 * Response returned by eBay Marketing API updateEmailCampaign.
 *
 * @see https://developer.ebay.com/api-docs/sell/marketing/resources/email_campaign/methods/updateEmailCampaign
 */
export type UpdateEmailCampaignResponse = MarketingOperationResponse<'updateEmailCampaign'>;

/**
 * Response returned by eBay Marketing API deleteEmailCampaign.
 *
 * @see https://developer.ebay.com/api-docs/sell/marketing/resources/email_campaign/methods/deleteEmailCampaign
 */
export type DeleteEmailCampaignResponse = MarketingOperationResponse<'deleteEmailCampaign'>;

/**
 * Response returned by eBay Marketing API getAudiences.
 *
 * @see https://developer.ebay.com/api-docs/sell/marketing/resources/email_campaign/methods/getAudiences
 */
export type GetAudiencesResponse = MarketingOperationResponse<'getAudiences'>;

/**
 * Response returned by eBay Marketing API getEmailPreview.
 *
 * @see https://developer.ebay.com/api-docs/sell/marketing/resources/email_campaign/methods/getEmailPreview
 */
export type GetEmailPreviewResponse = MarketingOperationResponse<'getEmailPreview'>;

/**
 * Response returned by eBay Marketing API getEmailReport.
 *
 * @see https://developer.ebay.com/api-docs/sell/marketing/resources/email_campaign/methods/getEmailReport
 */
export type GetEmailReportResponse = MarketingOperationResponse<'getEmailReport'>;

const marketplaceHeader = (marketplaceId: string): EbayRequestConfig => ({
  headers: { 'X-EBAY-C-MARKETPLACE-ID': marketplaceId },
});

/** Marketing API - campaigns, ads, promotions, reports, and email campaigns. */
export class MarketingApi {
  public constructor(private readonly client: EbayApiClient) {}

  /**
   * Bulk create ads by inventory reference through the eBay Marketing API.
   *
   * @param input - Path, query, header, and request body values for bulkCreateAdsByInventoryReference.
   * @returns An Effect that succeeds with eBay's generated bulkCreateAdsByInventoryReference response DTO.
   *
   * @example
   * ```ts
   * const response = await Effect.runPromise(marketingApi.bulkCreateAdsByInventoryReference({ campaignId: 'campaign-1', request: { ... } }));
   * ```
   *
   * @see https://developer.ebay.com/api-docs/sell/marketing/resources/ad/methods/bulkCreateAdsByInventoryReference
   */
  public bulkCreateAdsByInventoryReference = (
    input: BulkCreateAdsByInventoryReferenceInput,
  ): Effect.Effect<BulkCreateAdsByInventoryReferenceResponse, EbayApiError> => {
    const path = `${MARKETING_BASE_PATH}/ad_campaign/${input.campaignId}/bulk_create_ads_by_inventory_reference`;
    return requestPostEffect<BulkCreateAdsByInventoryReferenceResponse>(
      this.client,
      path,
      input.request,
    );
  };

  /**
   * Bulk create ads by listing id through the eBay Marketing API.
   *
   * @param input - Path, query, header, and request body values for bulkCreateAdsByListingId.
   * @returns An Effect that succeeds with eBay's generated bulkCreateAdsByListingId response DTO.
   *
   * @example
   * ```ts
   * const response = await Effect.runPromise(marketingApi.bulkCreateAdsByListingId({ campaignId: 'campaign-1', request: { ... } }));
   * ```
   *
   * @see https://developer.ebay.com/api-docs/sell/marketing/resources/ad/methods/bulkCreateAdsByListingId
   */
  public bulkCreateAdsByListingId = (
    input: BulkCreateAdsByListingIdInput,
  ): Effect.Effect<BulkCreateAdsByListingIdResponse, EbayApiError> => {
    const path = `${MARKETING_BASE_PATH}/ad_campaign/${input.campaignId}/bulk_create_ads_by_listing_id`;
    return requestPostEffect<BulkCreateAdsByListingIdResponse>(this.client, path, input.request);
  };

  /**
   * Bulk delete ads by inventory reference through the eBay Marketing API.
   *
   * @param input - Path, query, header, and request body values for bulkDeleteAdsByInventoryReference.
   * @returns An Effect that succeeds with eBay's generated bulkDeleteAdsByInventoryReference response DTO.
   *
   * @example
   * ```ts
   * const response = await Effect.runPromise(marketingApi.bulkDeleteAdsByInventoryReference({ campaignId: 'campaign-1', request: { ... } }));
   * ```
   *
   * @see https://developer.ebay.com/api-docs/sell/marketing/resources/ad/methods/bulkDeleteAdsByInventoryReference
   */
  public bulkDeleteAdsByInventoryReference = (
    input: BulkDeleteAdsByInventoryReferenceInput,
  ): Effect.Effect<BulkDeleteAdsByInventoryReferenceResponse, EbayApiError> => {
    const path = `${MARKETING_BASE_PATH}/ad_campaign/${input.campaignId}/bulk_delete_ads_by_inventory_reference`;
    return requestPostEffect<BulkDeleteAdsByInventoryReferenceResponse>(
      this.client,
      path,
      input.request,
    );
  };

  /**
   * Bulk delete ads by listing id through the eBay Marketing API.
   *
   * @param input - Path, query, header, and request body values for bulkDeleteAdsByListingId.
   * @returns An Effect that succeeds with eBay's generated bulkDeleteAdsByListingId response DTO.
   *
   * @example
   * ```ts
   * const response = await Effect.runPromise(marketingApi.bulkDeleteAdsByListingId({ campaignId: 'campaign-1', request: { ... } }));
   * ```
   *
   * @see https://developer.ebay.com/api-docs/sell/marketing/resources/ad/methods/bulkDeleteAdsByListingId
   */
  public bulkDeleteAdsByListingId = (
    input: BulkDeleteAdsByListingIdInput,
  ): Effect.Effect<BulkDeleteAdsByListingIdResponse, EbayApiError> => {
    const path = `${MARKETING_BASE_PATH}/ad_campaign/${input.campaignId}/bulk_delete_ads_by_listing_id`;
    return requestPostEffect<BulkDeleteAdsByListingIdResponse>(this.client, path, input.request);
  };

  /**
   * Bulk update ads bid by inventory reference through the eBay Marketing API.
   *
   * @param input - Path, query, header, and request body values for bulkUpdateAdsBidByInventoryReference.
   * @returns An Effect that succeeds with eBay's generated bulkUpdateAdsBidByInventoryReference response DTO.
   *
   * @example
   * ```ts
   * const response = await Effect.runPromise(marketingApi.bulkUpdateAdsBidByInventoryReference({ campaignId: 'campaign-1', request: { ... } }));
   * ```
   *
   * @see https://developer.ebay.com/api-docs/sell/marketing/resources/ad/methods/bulkUpdateAdsBidByInventoryReference
   */
  public bulkUpdateAdsBidByInventoryReference = (
    input: BulkUpdateAdsBidByInventoryReferenceInput,
  ): Effect.Effect<BulkUpdateAdsBidByInventoryReferenceResponse, EbayApiError> => {
    const path = `${MARKETING_BASE_PATH}/ad_campaign/${input.campaignId}/bulk_update_ads_bid_by_inventory_reference`;
    return requestPostEffect<BulkUpdateAdsBidByInventoryReferenceResponse>(
      this.client,
      path,
      input.request,
    );
  };

  /**
   * Bulk update ads bid by listing id through the eBay Marketing API.
   *
   * @param input - Path, query, header, and request body values for bulkUpdateAdsBidByListingId.
   * @returns An Effect that succeeds with eBay's generated bulkUpdateAdsBidByListingId response DTO.
   *
   * @example
   * ```ts
   * const response = await Effect.runPromise(marketingApi.bulkUpdateAdsBidByListingId({ campaignId: 'campaign-1', request: { ... } }));
   * ```
   *
   * @see https://developer.ebay.com/api-docs/sell/marketing/resources/ad/methods/bulkUpdateAdsBidByListingId
   */
  public bulkUpdateAdsBidByListingId = (
    input: BulkUpdateAdsBidByListingIdInput,
  ): Effect.Effect<BulkUpdateAdsBidByListingIdResponse, EbayApiError> => {
    const path = `${MARKETING_BASE_PATH}/ad_campaign/${input.campaignId}/bulk_update_ads_bid_by_listing_id`;
    return requestPostEffect<BulkUpdateAdsBidByListingIdResponse>(this.client, path, input.request);
  };

  /**
   * Bulk update ads status through the eBay Marketing API.
   *
   * @param input - Path, query, header, and request body values for bulkUpdateAdsStatus.
   * @returns An Effect that succeeds with eBay's generated bulkUpdateAdsStatus response DTO.
   *
   * @example
   * ```ts
   * const response = await Effect.runPromise(marketingApi.bulkUpdateAdsStatus({ campaignId: 'campaign-1', request: { ... } }));
   * ```
   *
   * @see https://developer.ebay.com/api-docs/sell/marketing/resources/ad/methods/bulkUpdateAdsStatus
   */
  public bulkUpdateAdsStatus = (
    input: BulkUpdateAdsStatusInput,
  ): Effect.Effect<BulkUpdateAdsStatusResponse, EbayApiError> => {
    const path = `${MARKETING_BASE_PATH}/ad_campaign/${input.campaignId}/bulk_update_ads_status`;
    return requestPostEffect<BulkUpdateAdsStatusResponse>(this.client, path, input.request);
  };

  /**
   * Bulk update ads status by listing id through the eBay Marketing API.
   *
   * @param input - Path, query, header, and request body values for bulkUpdateAdsStatusByListingId.
   * @returns An Effect that succeeds with eBay's generated bulkUpdateAdsStatusByListingId response DTO.
   *
   * @example
   * ```ts
   * const response = await Effect.runPromise(marketingApi.bulkUpdateAdsStatusByListingId({ campaignId: 'campaign-1', request: { ... } }));
   * ```
   *
   * @see https://developer.ebay.com/api-docs/sell/marketing/resources/ad/methods/bulkUpdateAdsStatusByListingId
   */
  public bulkUpdateAdsStatusByListingId = (
    input: BulkUpdateAdsStatusByListingIdInput,
  ): Effect.Effect<BulkUpdateAdsStatusByListingIdResponse, EbayApiError> => {
    const path = `${MARKETING_BASE_PATH}/ad_campaign/${input.campaignId}/bulk_update_ads_status_by_listing_id`;
    return requestPostEffect<BulkUpdateAdsStatusByListingIdResponse>(
      this.client,
      path,
      input.request,
    );
  };

  /**
   * Get ads through the eBay Marketing API.
   *
   * @param input - Path, query, header, and request body values for getAds.
   * @returns An Effect that succeeds with eBay's generated getAds response DTO.
   *
   * @example
   * ```ts
   * const response = await Effect.runPromise(marketingApi.getAds({ campaignId: 'campaign-1' }));
   * ```
   *
   * @see https://developer.ebay.com/api-docs/sell/marketing/resources/ad/methods/getAds
   */
  public getAds = (input: GetAdsInput): Effect.Effect<GetAdsResponse, EbayApiError> => {
    const path = `${MARKETING_BASE_PATH}/ad_campaign/${input.campaignId}/ad`;
    const params = buildEndpointParams({
      adGroupIds: { wireName: 'ad_group_ids', value: input.adGroupIds },
      adStatus: { wireName: 'ad_status', value: input.adStatus },
      limit: { wireName: 'limit', value: input.limit },
      listingIds: { wireName: 'listing_ids', value: input.listingIds },
      offset: { wireName: 'offset', value: input.offset },
    });
    return requestGetEffect<GetAdsResponse>(this.client, path, params);
  };

  /**
   * Create ad by listing id through the eBay Marketing API.
   *
   * @param input - Path, query, header, and request body values for createAdByListingId.
   * @returns An Effect that succeeds with eBay's generated createAdByListingId response DTO.
   *
   * @example
   * ```ts
   * const response = await Effect.runPromise(marketingApi.createAdByListingId({ campaignId: 'campaign-1', request: { ... } }));
   * ```
   *
   * @see https://developer.ebay.com/api-docs/sell/marketing/resources/ad/methods/createAdByListingId
   */
  public createAdByListingId = (
    input: CreateAdByListingIdInput,
  ): Effect.Effect<CreateAdByListingIdResponse, EbayApiError> => {
    const path = `${MARKETING_BASE_PATH}/ad_campaign/${input.campaignId}/ad`;
    return requestPostEffect<CreateAdByListingIdResponse>(this.client, path, input.request);
  };

  /**
   * Create ads by inventory reference through the eBay Marketing API.
   *
   * @param input - Path, query, header, and request body values for createAdsByInventoryReference.
   * @returns An Effect that succeeds with eBay's generated createAdsByInventoryReference response DTO.
   *
   * @example
   * ```ts
   * const response = await Effect.runPromise(marketingApi.createAdsByInventoryReference({ campaignId: 'campaign-1', request: { ... } }));
   * ```
   *
   * @see https://developer.ebay.com/api-docs/sell/marketing/resources/ad/methods/createAdsByInventoryReference
   */
  public createAdsByInventoryReference = (
    input: CreateAdsByInventoryReferenceInput,
  ): Effect.Effect<CreateAdsByInventoryReferenceResponse, EbayApiError> => {
    const path = `${MARKETING_BASE_PATH}/ad_campaign/${input.campaignId}/create_ads_by_inventory_reference`;
    return requestPostEffect<CreateAdsByInventoryReferenceResponse>(
      this.client,
      path,
      input.request,
    );
  };

  /**
   * Get ad through the eBay Marketing API.
   *
   * @param input - Path, query, header, and request body values for getAd.
   * @returns An Effect that succeeds with eBay's generated getAd response DTO.
   *
   * @example
   * ```ts
   * const response = await Effect.runPromise(marketingApi.getAd({ adId: 'ad-1', campaignId: 'campaign-1' }));
   * ```
   *
   * @see https://developer.ebay.com/api-docs/sell/marketing/resources/ad/methods/getAd
   */
  public getAd = (input: GetAdInput): Effect.Effect<GetAdResponse, EbayApiError> => {
    const path = `${MARKETING_BASE_PATH}/ad_campaign/${input.campaignId}/ad/${input.adId}`;
    return requestGetEffect<GetAdResponse>(this.client, path);
  };

  /**
   * Delete ad through the eBay Marketing API.
   *
   * @param input - Path, query, header, and request body values for deleteAd.
   * @returns An Effect that succeeds with eBay's generated deleteAd response DTO.
   *
   * @example
   * ```ts
   * const response = await Effect.runPromise(marketingApi.deleteAd({ adId: 'ad-1', campaignId: 'campaign-1' }));
   * ```
   *
   * @see https://developer.ebay.com/api-docs/sell/marketing/resources/ad/methods/deleteAd
   */
  public deleteAd = (input: DeleteAdInput): Effect.Effect<DeleteAdResponse, EbayApiError> => {
    const path = `${MARKETING_BASE_PATH}/ad_campaign/${input.campaignId}/ad/${input.adId}`;
    return requestDeleteEffect<DeleteAdResponse>(this.client, path);
  };

  /**
   * Delete ads by inventory reference through the eBay Marketing API.
   *
   * @param input - Path, query, header, and request body values for deleteAdsByInventoryReference.
   * @returns An Effect that succeeds with eBay's generated deleteAdsByInventoryReference response DTO.
   *
   * @example
   * ```ts
   * const response = await Effect.runPromise(marketingApi.deleteAdsByInventoryReference({ campaignId: 'campaign-1', request: { ... } }));
   * ```
   *
   * @see https://developer.ebay.com/api-docs/sell/marketing/resources/ad/methods/deleteAdsByInventoryReference
   */
  public deleteAdsByInventoryReference = (
    input: DeleteAdsByInventoryReferenceInput,
  ): Effect.Effect<DeleteAdsByInventoryReferenceResponse, EbayApiError> => {
    const path = `${MARKETING_BASE_PATH}/ad_campaign/${input.campaignId}/delete_ads_by_inventory_reference`;
    return requestPostEffect<DeleteAdsByInventoryReferenceResponse>(
      this.client,
      path,
      input.request,
    );
  };

  /**
   * Get ads by inventory reference through the eBay Marketing API.
   *
   * @param input - Path, query, header, and request body values for getAdsByInventoryReference.
   * @returns An Effect that succeeds with eBay's generated getAdsByInventoryReference response DTO.
   *
   * @example
   * ```ts
   * const response = await Effect.runPromise(marketingApi.getAdsByInventoryReference({ campaignId: 'campaign-1', inventoryReferenceId: 'inventoryReference-1', inventoryReferenceType: 'inventoryReferenceType-1' }));
   * ```
   *
   * @see https://developer.ebay.com/api-docs/sell/marketing/resources/ad/methods/getAdsByInventoryReference
   */
  public getAdsByInventoryReference = (
    input: GetAdsByInventoryReferenceInput,
  ): Effect.Effect<GetAdsByInventoryReferenceResponse, EbayApiError> => {
    const path = `${MARKETING_BASE_PATH}/ad_campaign/${input.campaignId}/get_ads_by_inventory_reference`;
    const params = buildEndpointParams({
      inventoryReferenceId: {
        wireName: 'inventory_reference_id',
        value: input.inventoryReferenceId,
      },
      inventoryReferenceType: {
        wireName: 'inventory_reference_type',
        value: input.inventoryReferenceType,
      },
    });
    return requestGetEffect<GetAdsByInventoryReferenceResponse>(this.client, path, params);
  };

  /**
   * Update bid through the eBay Marketing API.
   *
   * @param input - Path, query, header, and request body values for updateBid.
   * @returns An Effect that succeeds with eBay's generated updateBid response DTO.
   *
   * @example
   * ```ts
   * const response = await Effect.runPromise(marketingApi.updateBid({ adId: 'ad-1', campaignId: 'campaign-1', request: { ... } }));
   * ```
   *
   * @see https://developer.ebay.com/api-docs/sell/marketing/resources/ad/methods/updateBid
   */
  public updateBid = (input: UpdateBidInput): Effect.Effect<UpdateBidResponse, EbayApiError> => {
    const path = `${MARKETING_BASE_PATH}/ad_campaign/${input.campaignId}/ad/${input.adId}/update_bid`;
    return requestPostEffect<UpdateBidResponse>(this.client, path, input.request);
  };

  /**
   * Get ad groups through the eBay Marketing API.
   *
   * @param input - Path, query, header, and request body values for getAdGroups.
   * @returns An Effect that succeeds with eBay's generated getAdGroups response DTO.
   *
   * @example
   * ```ts
   * const response = await Effect.runPromise(marketingApi.getAdGroups({ campaignId: 'campaign-1' }));
   * ```
   *
   * @see https://developer.ebay.com/api-docs/sell/marketing/resources/ad_group/methods/getAdGroups
   */
  public getAdGroups = (
    input: GetAdGroupsInput,
  ): Effect.Effect<GetAdGroupsResponse, EbayApiError> => {
    const path = `${MARKETING_BASE_PATH}/ad_campaign/${input.campaignId}/ad_group`;
    const params = buildEndpointParams({
      adGroupStatus: { wireName: 'ad_group_status', value: input.adGroupStatus },
      limit: { wireName: 'limit', value: input.limit },
      offset: { wireName: 'offset', value: input.offset },
    });
    return requestGetEffect<GetAdGroupsResponse>(this.client, path, params);
  };

  /**
   * Create ad group through the eBay Marketing API.
   *
   * @param input - Path, query, header, and request body values for createAdGroup.
   * @returns An Effect that succeeds with eBay's generated createAdGroup response DTO.
   *
   * @example
   * ```ts
   * const response = await Effect.runPromise(marketingApi.createAdGroup({ campaignId: 'campaign-1', request: { ... } }));
   * ```
   *
   * @see https://developer.ebay.com/api-docs/sell/marketing/resources/ad_group/methods/createAdGroup
   */
  public createAdGroup = (
    input: CreateAdGroupInput,
  ): Effect.Effect<CreateAdGroupResponse, EbayApiError> => {
    const path = `${MARKETING_BASE_PATH}/ad_campaign/${input.campaignId}/ad_group`;
    return requestPostEffect<CreateAdGroupResponse>(this.client, path, input.request);
  };

  /**
   * Get ad group through the eBay Marketing API.
   *
   * @param input - Path, query, header, and request body values for getAdGroup.
   * @returns An Effect that succeeds with eBay's generated getAdGroup response DTO.
   *
   * @example
   * ```ts
   * const response = await Effect.runPromise(marketingApi.getAdGroup({ adGroupId: 'adGroup-1', campaignId: 'campaign-1' }));
   * ```
   *
   * @see https://developer.ebay.com/api-docs/sell/marketing/resources/ad_group/methods/getAdGroup
   */
  public getAdGroup = (input: GetAdGroupInput): Effect.Effect<GetAdGroupResponse, EbayApiError> => {
    const path = `${MARKETING_BASE_PATH}/ad_campaign/${input.campaignId}/ad_group/${input.adGroupId}`;
    return requestGetEffect<GetAdGroupResponse>(this.client, path);
  };

  /**
   * Update ad group through the eBay Marketing API.
   *
   * @param input - Path, query, header, and request body values for updateAdGroup.
   * @returns An Effect that succeeds with eBay's generated updateAdGroup response DTO.
   *
   * @example
   * ```ts
   * const response = await Effect.runPromise(marketingApi.updateAdGroup({ adGroupId: 'adGroup-1', campaignId: 'campaign-1', request: { ... } }));
   * ```
   *
   * @see https://developer.ebay.com/api-docs/sell/marketing/resources/ad_group/methods/updateAdGroup
   */
  public updateAdGroup = (
    input: UpdateAdGroupInput,
  ): Effect.Effect<UpdateAdGroupResponse, EbayApiError> => {
    const path = `${MARKETING_BASE_PATH}/ad_campaign/${input.campaignId}/ad_group/${input.adGroupId}`;
    return requestPutEffect<UpdateAdGroupResponse>(this.client, path, input.request);
  };

  /**
   * Suggest bids through the eBay Marketing API.
   *
   * @param input - Path, query, header, and request body values for suggestBids.
   * @returns An Effect that succeeds with eBay's generated suggestBids response DTO.
   *
   * @example
   * ```ts
   * const response = await Effect.runPromise(marketingApi.suggestBids({ adGroupId: 'adGroup-1', campaignId: 'campaign-1', request: { ... } }));
   * ```
   *
   * @see https://developer.ebay.com/api-docs/sell/marketing/resources/ad_group/methods/suggestBids
   */
  public suggestBids = (
    input: SuggestBidsInput,
  ): Effect.Effect<SuggestBidsResponse, EbayApiError> => {
    const path = `${MARKETING_BASE_PATH}/ad_campaign/${input.campaignId}/ad_group/${input.adGroupId}/suggest_bids`;
    return requestPostEffect<SuggestBidsResponse>(this.client, path, input.request);
  };

  /**
   * Suggest keywords through the eBay Marketing API.
   *
   * @param input - Path, query, header, and request body values for suggestKeywords.
   * @returns An Effect that succeeds with eBay's generated suggestKeywords response DTO.
   *
   * @example
   * ```ts
   * const response = await Effect.runPromise(marketingApi.suggestKeywords({ adGroupId: 'adGroup-1', campaignId: 'campaign-1', request: { ... } }));
   * ```
   *
   * @see https://developer.ebay.com/api-docs/sell/marketing/resources/ad_group/methods/suggestKeywords
   */
  public suggestKeywords = (
    input: SuggestKeywordsInput,
  ): Effect.Effect<SuggestKeywordsResponse, EbayApiError> => {
    const path = `${MARKETING_BASE_PATH}/ad_campaign/${input.campaignId}/ad_group/${input.adGroupId}/suggest_keywords`;
    return requestPostEffect<SuggestKeywordsResponse>(this.client, path, input.request);
  };

  /**
   * Clone campaign through the eBay Marketing API.
   *
   * @param input - Path, query, header, and request body values for cloneCampaign.
   * @returns An Effect that succeeds with eBay's generated cloneCampaign response DTO.
   *
   * @example
   * ```ts
   * const response = await Effect.runPromise(marketingApi.cloneCampaign({ campaignId: 'campaign-1', request: { ... } }));
   * ```
   *
   * @see https://developer.ebay.com/api-docs/sell/marketing/resources/campaign/methods/cloneCampaign
   */
  public cloneCampaign = (
    input: CloneCampaignInput,
  ): Effect.Effect<CloneCampaignResponse, EbayApiError> => {
    const path = `${MARKETING_BASE_PATH}/ad_campaign/${input.campaignId}/clone`;
    return requestPostEffect<CloneCampaignResponse>(this.client, path, input.request);
  };

  /**
   * Get campaigns through the eBay Marketing API.
   *
   * @param input - Path, query, header, and request body values for getCampaigns.
   * @returns An Effect that succeeds with eBay's generated getCampaigns response DTO.
   *
   * @example
   * ```ts
   * const response = await Effect.runPromise(marketingApi.getCampaigns());
   * ```
   *
   * @see https://developer.ebay.com/api-docs/sell/marketing/resources/campaign/methods/getCampaigns
   */
  public getCampaigns = (
    input: GetCampaignsInput = {},
  ): Effect.Effect<GetCampaignsResponse, EbayApiError> => {
    const path = `${MARKETING_BASE_PATH}/ad_campaign`;
    const params = buildEndpointParams({
      campaignName: { wireName: 'campaign_name', value: input.campaignName },
      campaignStatus: { wireName: 'campaign_status', value: input.campaignStatus },
      campaignTargetingTypes: {
        wireName: 'campaign_targeting_types',
        value: input.campaignTargetingTypes,
      },
      channels: { wireName: 'channels', value: input.channels },
      endDateRange: { wireName: 'end_date_range', value: input.endDateRange },
      fundingStrategy: { wireName: 'funding_strategy', value: input.fundingStrategy },
      limit: { wireName: 'limit', value: input.limit },
      offset: { wireName: 'offset', value: input.offset },
      startDateRange: { wireName: 'start_date_range', value: input.startDateRange },
    });
    return requestGetEffect<GetCampaignsResponse>(this.client, path, params);
  };

  /**
   * Create campaign through the eBay Marketing API.
   *
   * @param input - Path, query, header, and request body values for createCampaign.
   * @returns An Effect that succeeds with eBay's generated createCampaign response DTO.
   *
   * @example
   * ```ts
   * const response = await Effect.runPromise(marketingApi.createCampaign({ request: { ... } }));
   * ```
   *
   * @see https://developer.ebay.com/api-docs/sell/marketing/resources/campaign/methods/createCampaign
   */
  public createCampaign = (
    input: CreateCampaignInput,
  ): Effect.Effect<CreateCampaignResponse, EbayApiError> => {
    const path = `${MARKETING_BASE_PATH}/ad_campaign`;
    return requestPostEffect<CreateCampaignResponse>(this.client, path, input.request);
  };

  /**
   * Get campaign through the eBay Marketing API.
   *
   * @param input - Path, query, header, and request body values for getCampaign.
   * @returns An Effect that succeeds with eBay's generated getCampaign response DTO.
   *
   * @example
   * ```ts
   * const response = await Effect.runPromise(marketingApi.getCampaign({ campaignId: 'campaign-1' }));
   * ```
   *
   * @see https://developer.ebay.com/api-docs/sell/marketing/resources/campaign/methods/getCampaign
   */
  public getCampaign = (
    input: GetCampaignInput,
  ): Effect.Effect<GetCampaignResponse, EbayApiError> => {
    const path = `${MARKETING_BASE_PATH}/ad_campaign/${input.campaignId}`;
    return requestGetEffect<GetCampaignResponse>(this.client, path);
  };

  /**
   * Delete campaign through the eBay Marketing API.
   *
   * @param input - Path, query, header, and request body values for deleteCampaign.
   * @returns An Effect that succeeds with eBay's generated deleteCampaign response DTO.
   *
   * @example
   * ```ts
   * const response = await Effect.runPromise(marketingApi.deleteCampaign({ campaignId: 'campaign-1' }));
   * ```
   *
   * @see https://developer.ebay.com/api-docs/sell/marketing/resources/campaign/methods/deleteCampaign
   */
  public deleteCampaign = (
    input: DeleteCampaignInput,
  ): Effect.Effect<DeleteCampaignResponse, EbayApiError> => {
    const path = `${MARKETING_BASE_PATH}/ad_campaign/${input.campaignId}`;
    return requestDeleteEffect<DeleteCampaignResponse>(this.client, path);
  };

  /**
   * End campaign through the eBay Marketing API.
   *
   * @param input - Path, query, header, and request body values for endCampaign.
   * @returns An Effect that succeeds with eBay's generated endCampaign response DTO.
   *
   * @example
   * ```ts
   * const response = await Effect.runPromise(marketingApi.endCampaign({ campaignId: 'campaign-1' }));
   * ```
   *
   * @see https://developer.ebay.com/api-docs/sell/marketing/resources/campaign/methods/endCampaign
   */
  public endCampaign = (
    input: EndCampaignInput,
  ): Effect.Effect<EndCampaignResponse, EbayApiError> => {
    const path = `${MARKETING_BASE_PATH}/ad_campaign/${input.campaignId}/end`;
    return requestPostEffect<EndCampaignResponse>(this.client, path);
  };

  /**
   * Find campaign by ad reference through the eBay Marketing API.
   *
   * @param input - Path, query, header, and request body values for findCampaignByAdReference.
   * @returns An Effect that succeeds with eBay's generated findCampaignByAdReference response DTO.
   *
   * @example
   * ```ts
   * const response = await Effect.runPromise(marketingApi.findCampaignByAdReference());
   * ```
   *
   * @see https://developer.ebay.com/api-docs/sell/marketing/resources/campaign/methods/findCampaignByAdReference
   */
  public findCampaignByAdReference = (
    input: FindCampaignByAdReferenceInput = {},
  ): Effect.Effect<FindCampaignByAdReferenceResponse, EbayApiError> => {
    const path = `${MARKETING_BASE_PATH}/ad_campaign/find_campaign_by_ad_reference`;
    const params = buildEndpointParams({
      inventoryReferenceId: {
        wireName: 'inventory_reference_id',
        value: input.inventoryReferenceId,
      },
      inventoryReferenceType: {
        wireName: 'inventory_reference_type',
        value: input.inventoryReferenceType,
      },
      listingId: { wireName: 'listing_id', value: input.listingId },
    });
    return requestGetEffect<FindCampaignByAdReferenceResponse>(this.client, path, params);
  };

  /**
   * Get campaign by name through the eBay Marketing API.
   *
   * @param input - Path, query, header, and request body values for getCampaignByName.
   * @returns An Effect that succeeds with eBay's generated getCampaignByName response DTO.
   *
   * @example
   * ```ts
   * const response = await Effect.runPromise(marketingApi.getCampaignByName({ campaignName: 'campaignName-1' }));
   * ```
   *
   * @see https://developer.ebay.com/api-docs/sell/marketing/resources/campaign/methods/getCampaignByName
   */
  public getCampaignByName = (
    input: GetCampaignByNameInput,
  ): Effect.Effect<GetCampaignByNameResponse, EbayApiError> => {
    const path = `${MARKETING_BASE_PATH}/ad_campaign/get_campaign_by_name`;
    const params = buildEndpointParams({
      campaignName: { wireName: 'campaign_name', value: input.campaignName },
    });
    return requestGetEffect<GetCampaignByNameResponse>(this.client, path, params);
  };

  /**
   * Launch campaign through the eBay Marketing API.
   *
   * @param input - Path, query, header, and request body values for launchCampaign.
   * @returns An Effect that succeeds with eBay's generated launchCampaign response DTO.
   *
   * @example
   * ```ts
   * const response = await Effect.runPromise(marketingApi.launchCampaign({ campaignId: 'campaign-1' }));
   * ```
   *
   * @see https://developer.ebay.com/api-docs/sell/marketing/resources/campaign/methods/launchCampaign
   */
  public launchCampaign = (
    input: LaunchCampaignInput,
  ): Effect.Effect<LaunchCampaignResponse, EbayApiError> => {
    const path = `${MARKETING_BASE_PATH}/ad_campaign/${input.campaignId}/launch`;
    return requestPostEffect<LaunchCampaignResponse>(this.client, path);
  };

  /**
   * Pause campaign through the eBay Marketing API.
   *
   * @param input - Path, query, header, and request body values for pauseCampaign.
   * @returns An Effect that succeeds with eBay's generated pauseCampaign response DTO.
   *
   * @example
   * ```ts
   * const response = await Effect.runPromise(marketingApi.pauseCampaign({ campaignId: 'campaign-1' }));
   * ```
   *
   * @see https://developer.ebay.com/api-docs/sell/marketing/resources/campaign/methods/pauseCampaign
   */
  public pauseCampaign = (
    input: PauseCampaignInput,
  ): Effect.Effect<PauseCampaignResponse, EbayApiError> => {
    const path = `${MARKETING_BASE_PATH}/ad_campaign/${input.campaignId}/pause`;
    return requestPostEffect<PauseCampaignResponse>(this.client, path);
  };

  /**
   * Resume campaign through the eBay Marketing API.
   *
   * @param input - Path, query, header, and request body values for resumeCampaign.
   * @returns An Effect that succeeds with eBay's generated resumeCampaign response DTO.
   *
   * @example
   * ```ts
   * const response = await Effect.runPromise(marketingApi.resumeCampaign({ campaignId: 'campaign-1' }));
   * ```
   *
   * @see https://developer.ebay.com/api-docs/sell/marketing/resources/campaign/methods/resumeCampaign
   */
  public resumeCampaign = (
    input: ResumeCampaignInput,
  ): Effect.Effect<ResumeCampaignResponse, EbayApiError> => {
    const path = `${MARKETING_BASE_PATH}/ad_campaign/${input.campaignId}/resume`;
    return requestPostEffect<ResumeCampaignResponse>(this.client, path);
  };

  /**
   * Setup quick campaign through the eBay Marketing API.
   *
   * @param input - Path, query, header, and request body values for setupQuickCampaign.
   * @returns An Effect that succeeds with eBay's generated setupQuickCampaign response DTO.
   *
   * @example
   * ```ts
   * const response = await Effect.runPromise(marketingApi.setupQuickCampaign({ request: { ... } }));
   * ```
   *
   * @see https://developer.ebay.com/api-docs/sell/marketing/resources/campaign/methods/setupQuickCampaign
   */
  public setupQuickCampaign = (
    input: SetupQuickCampaignInput,
  ): Effect.Effect<SetupQuickCampaignResponse, EbayApiError> => {
    const path = `${MARKETING_BASE_PATH}/ad_campaign/setup_quick_campaign`;
    return requestPostEffect<SetupQuickCampaignResponse>(this.client, path, input.request);
  };

  /**
   * Suggest budget through the eBay Marketing API.
   *
   * @param input - Path, query, header, and request body values for suggestBudget.
   * @returns An Effect that succeeds with eBay's generated suggestBudget response DTO.
   *
   * @example
   * ```ts
   * const response = await Effect.runPromise(marketingApi.suggestBudget({ marketplaceId: 'EBAY_US' }));
   * ```
   *
   * @see https://developer.ebay.com/api-docs/sell/marketing/resources/campaign/methods/suggestBudget
   */
  public suggestBudget = (
    input: SuggestBudgetInput,
  ): Effect.Effect<SuggestBudgetResponse, EbayApiError> => {
    const path = `${MARKETING_BASE_PATH}/ad_campaign/suggest_budget`;
    const config = marketplaceHeader(input.marketplaceId);
    return requestGetEffect<SuggestBudgetResponse>(this.client, path, undefined, config);
  };

  /**
   * Suggest items through the eBay Marketing API.
   *
   * @param input - Path, query, header, and request body values for suggestItems.
   * @returns An Effect that succeeds with eBay's generated suggestItems response DTO.
   *
   * @example
   * ```ts
   * const response = await Effect.runPromise(marketingApi.suggestItems({ campaignId: 'campaign-1' }));
   * ```
   *
   * @see https://developer.ebay.com/api-docs/sell/marketing/resources/campaign/methods/suggestItems
   */
  public suggestItems = (
    input: SuggestItemsInput,
  ): Effect.Effect<SuggestItemsResponse, EbayApiError> => {
    const path = `${MARKETING_BASE_PATH}/ad_campaign/${input.campaignId}/suggest_items`;
    const params = buildEndpointParams({
      categoryIds: { wireName: 'category_ids', value: input.categoryIds },
      limit: { wireName: 'limit', value: input.limit },
      offset: { wireName: 'offset', value: input.offset },
    });
    return requestGetEffect<SuggestItemsResponse>(this.client, path, params);
  };

  /**
   * Suggest max cpc through the eBay Marketing API.
   *
   * @param input - Path, query, header, and request body values for suggestMaxCpc.
   * @returns An Effect that succeeds with eBay's generated suggestMaxCpc response DTO.
   *
   * @example
   * ```ts
   * const response = await Effect.runPromise(marketingApi.suggestMaxCpc({ request: { ... } }));
   * ```
   *
   * @see https://developer.ebay.com/api-docs/sell/marketing/resources/campaign/methods/suggestMaxCpc
   */
  public suggestMaxCpc = (
    input: SuggestMaxCpcInput,
  ): Effect.Effect<SuggestMaxCpcResponse, EbayApiError> => {
    const path = `${MARKETING_BASE_PATH}/ad_campaign/suggest_max_cpc`;
    return requestPostEffect<SuggestMaxCpcResponse>(this.client, path, input.request);
  };

  /**
   * Update ad rate strategy through the eBay Marketing API.
   *
   * @param input - Path, query, header, and request body values for updateAdRateStrategy.
   * @returns An Effect that succeeds with eBay's generated updateAdRateStrategy response DTO.
   *
   * @example
   * ```ts
   * const response = await Effect.runPromise(marketingApi.updateAdRateStrategy({ campaignId: 'campaign-1', request: { ... } }));
   * ```
   *
   * @see https://developer.ebay.com/api-docs/sell/marketing/resources/campaign/methods/updateAdRateStrategy
   */
  public updateAdRateStrategy = (
    input: UpdateAdRateStrategyInput,
  ): Effect.Effect<UpdateAdRateStrategyResponse, EbayApiError> => {
    const path = `${MARKETING_BASE_PATH}/ad_campaign/${input.campaignId}/update_ad_rate_strategy`;
    return requestPostEffect<UpdateAdRateStrategyResponse>(this.client, path, input.request);
  };

  /**
   * Update bidding strategy through the eBay Marketing API.
   *
   * @param input - Path, query, header, and request body values for updateBiddingStrategy.
   * @returns An Effect that succeeds with eBay's generated updateBiddingStrategy response DTO.
   *
   * @example
   * ```ts
   * const response = await Effect.runPromise(marketingApi.updateBiddingStrategy({ campaignId: 'campaign-1', request: { ... } }));
   * ```
   *
   * @see https://developer.ebay.com/api-docs/sell/marketing/resources/campaign/methods/updateBiddingStrategy
   */
  public updateBiddingStrategy = (
    input: UpdateBiddingStrategyInput,
  ): Effect.Effect<UpdateBiddingStrategyResponse, EbayApiError> => {
    const path = `${MARKETING_BASE_PATH}/ad_campaign/${input.campaignId}/update_bidding_strategy`;
    return requestPostEffect<UpdateBiddingStrategyResponse>(this.client, path, input.request);
  };

  /**
   * Update campaign budget through the eBay Marketing API.
   *
   * @param input - Path, query, header, and request body values for updateCampaignBudget.
   * @returns An Effect that succeeds with eBay's generated updateCampaignBudget response DTO.
   *
   * @example
   * ```ts
   * const response = await Effect.runPromise(marketingApi.updateCampaignBudget({ campaignId: 'campaign-1', request: { ... } }));
   * ```
   *
   * @see https://developer.ebay.com/api-docs/sell/marketing/resources/campaign/methods/updateCampaignBudget
   */
  public updateCampaignBudget = (
    input: UpdateCampaignBudgetInput,
  ): Effect.Effect<UpdateCampaignBudgetResponse, EbayApiError> => {
    const path = `${MARKETING_BASE_PATH}/ad_campaign/${input.campaignId}/update_campaign_budget`;
    return requestPostEffect<UpdateCampaignBudgetResponse>(this.client, path, input.request);
  };

  /**
   * Update campaign identification through the eBay Marketing API.
   *
   * @param input - Path, query, header, and request body values for updateCampaignIdentification.
   * @returns An Effect that succeeds with eBay's generated updateCampaignIdentification response DTO.
   *
   * @example
   * ```ts
   * const response = await Effect.runPromise(marketingApi.updateCampaignIdentification({ campaignId: 'campaign-1', request: { ... } }));
   * ```
   *
   * @see https://developer.ebay.com/api-docs/sell/marketing/resources/campaign/methods/updateCampaignIdentification
   */
  public updateCampaignIdentification = (
    input: UpdateCampaignIdentificationInput,
  ): Effect.Effect<UpdateCampaignIdentificationResponse, EbayApiError> => {
    const path = `${MARKETING_BASE_PATH}/ad_campaign/${input.campaignId}/update_campaign_identification`;
    return requestPostEffect<UpdateCampaignIdentificationResponse>(
      this.client,
      path,
      input.request,
    );
  };

  /**
   * Bulk create keyword through the eBay Marketing API.
   *
   * @param input - Path, query, header, and request body values for bulkCreateKeyword.
   * @returns An Effect that succeeds with eBay's generated bulkCreateKeyword response DTO.
   *
   * @example
   * ```ts
   * const response = await Effect.runPromise(marketingApi.bulkCreateKeyword({ campaignId: 'campaign-1', request: { ... } }));
   * ```
   *
   * @see https://developer.ebay.com/api-docs/sell/marketing/resources/keyword/methods/bulkCreateKeyword
   */
  public bulkCreateKeyword = (
    input: BulkCreateKeywordInput,
  ): Effect.Effect<BulkCreateKeywordResponse, EbayApiError> => {
    const path = `${MARKETING_BASE_PATH}/ad_campaign/${input.campaignId}/bulk_create_keyword`;
    return requestPostEffect<BulkCreateKeywordResponse>(this.client, path, input.request);
  };

  /**
   * Bulk update keyword through the eBay Marketing API.
   *
   * @param input - Path, query, header, and request body values for bulkUpdateKeyword.
   * @returns An Effect that succeeds with eBay's generated bulkUpdateKeyword response DTO.
   *
   * @example
   * ```ts
   * const response = await Effect.runPromise(marketingApi.bulkUpdateKeyword({ campaignId: 'campaign-1', request: { ... } }));
   * ```
   *
   * @see https://developer.ebay.com/api-docs/sell/marketing/resources/keyword/methods/bulkUpdateKeyword
   */
  public bulkUpdateKeyword = (
    input: BulkUpdateKeywordInput,
  ): Effect.Effect<BulkUpdateKeywordResponse, EbayApiError> => {
    const path = `${MARKETING_BASE_PATH}/ad_campaign/${input.campaignId}/bulk_update_keyword`;
    return requestPostEffect<BulkUpdateKeywordResponse>(this.client, path, input.request);
  };

  /**
   * Get keywords through the eBay Marketing API.
   *
   * @param input - Path, query, header, and request body values for getKeywords.
   * @returns An Effect that succeeds with eBay's generated getKeywords response DTO.
   *
   * @example
   * ```ts
   * const response = await Effect.runPromise(marketingApi.getKeywords({ campaignId: 'campaign-1' }));
   * ```
   *
   * @see https://developer.ebay.com/api-docs/sell/marketing/resources/keyword/methods/getKeywords
   */
  public getKeywords = (
    input: GetKeywordsInput,
  ): Effect.Effect<GetKeywordsResponse, EbayApiError> => {
    const path = `${MARKETING_BASE_PATH}/ad_campaign/${input.campaignId}/keyword`;
    const params = buildEndpointParams({
      adGroupIds: { wireName: 'ad_group_ids', value: input.adGroupIds },
      keywordStatus: { wireName: 'keyword_status', value: input.keywordStatus },
      limit: { wireName: 'limit', value: input.limit },
      offset: { wireName: 'offset', value: input.offset },
    });
    return requestGetEffect<GetKeywordsResponse>(this.client, path, params);
  };

  /**
   * Create keyword through the eBay Marketing API.
   *
   * @param input - Path, query, header, and request body values for createKeyword.
   * @returns An Effect that succeeds with eBay's generated createKeyword response DTO.
   *
   * @example
   * ```ts
   * const response = await Effect.runPromise(marketingApi.createKeyword({ campaignId: 'campaign-1', request: { ... } }));
   * ```
   *
   * @see https://developer.ebay.com/api-docs/sell/marketing/resources/keyword/methods/createKeyword
   */
  public createKeyword = (
    input: CreateKeywordInput,
  ): Effect.Effect<CreateKeywordResponse, EbayApiError> => {
    const path = `${MARKETING_BASE_PATH}/ad_campaign/${input.campaignId}/keyword`;
    return requestPostEffect<CreateKeywordResponse>(this.client, path, input.request);
  };

  /**
   * Get keyword through the eBay Marketing API.
   *
   * @param input - Path, query, header, and request body values for getKeyword.
   * @returns An Effect that succeeds with eBay's generated getKeyword response DTO.
   *
   * @example
   * ```ts
   * const response = await Effect.runPromise(marketingApi.getKeyword({ campaignId: 'campaign-1', keywordId: 'keyword-1' }));
   * ```
   *
   * @see https://developer.ebay.com/api-docs/sell/marketing/resources/keyword/methods/getKeyword
   */
  public getKeyword = (input: GetKeywordInput): Effect.Effect<GetKeywordResponse, EbayApiError> => {
    const path = `${MARKETING_BASE_PATH}/ad_campaign/${input.campaignId}/keyword/${input.keywordId}`;
    return requestGetEffect<GetKeywordResponse>(this.client, path);
  };

  /**
   * Update keyword through the eBay Marketing API.
   *
   * @param input - Path, query, header, and request body values for updateKeyword.
   * @returns An Effect that succeeds with eBay's generated updateKeyword response DTO.
   *
   * @example
   * ```ts
   * const response = await Effect.runPromise(marketingApi.updateKeyword({ campaignId: 'campaign-1', keywordId: 'keyword-1', request: { ... } }));
   * ```
   *
   * @see https://developer.ebay.com/api-docs/sell/marketing/resources/keyword/methods/updateKeyword
   */
  public updateKeyword = (
    input: UpdateKeywordInput,
  ): Effect.Effect<UpdateKeywordResponse, EbayApiError> => {
    const path = `${MARKETING_BASE_PATH}/ad_campaign/${input.campaignId}/keyword/${input.keywordId}`;
    return requestPutEffect<UpdateKeywordResponse>(this.client, path, input.request);
  };

  /**
   * Bulk create negative keyword through the eBay Marketing API.
   *
   * @param input - Path, query, header, and request body values for bulkCreateNegativeKeyword.
   * @returns An Effect that succeeds with eBay's generated bulkCreateNegativeKeyword response DTO.
   *
   * @example
   * ```ts
   * const response = await Effect.runPromise(marketingApi.bulkCreateNegativeKeyword({ request: { ... } }));
   * ```
   *
   * @see https://developer.ebay.com/api-docs/sell/marketing/resources/negative_keyword/methods/bulkCreateNegativeKeyword
   */
  public bulkCreateNegativeKeyword = (
    input: BulkCreateNegativeKeywordInput,
  ): Effect.Effect<BulkCreateNegativeKeywordResponse, EbayApiError> => {
    const path = `${MARKETING_BASE_PATH}/bulk_create_negative_keyword`;
    return requestPostEffect<BulkCreateNegativeKeywordResponse>(this.client, path, input.request);
  };

  /**
   * Bulk update negative keyword through the eBay Marketing API.
   *
   * @param input - Path, query, header, and request body values for bulkUpdateNegativeKeyword.
   * @returns An Effect that succeeds with eBay's generated bulkUpdateNegativeKeyword response DTO.
   *
   * @example
   * ```ts
   * const response = await Effect.runPromise(marketingApi.bulkUpdateNegativeKeyword({ request: { ... } }));
   * ```
   *
   * @see https://developer.ebay.com/api-docs/sell/marketing/resources/negative_keyword/methods/bulkUpdateNegativeKeyword
   */
  public bulkUpdateNegativeKeyword = (
    input: BulkUpdateNegativeKeywordInput,
  ): Effect.Effect<BulkUpdateNegativeKeywordResponse, EbayApiError> => {
    const path = `${MARKETING_BASE_PATH}/bulk_update_negative_keyword`;
    return requestPostEffect<BulkUpdateNegativeKeywordResponse>(this.client, path, input.request);
  };

  /**
   * Get negative keywords through the eBay Marketing API.
   *
   * @param input - Path, query, header, and request body values for getNegativeKeywords.
   * @returns An Effect that succeeds with eBay's generated getNegativeKeywords response DTO.
   *
   * @example
   * ```ts
   * const response = await Effect.runPromise(marketingApi.getNegativeKeywords());
   * ```
   *
   * @see https://developer.ebay.com/api-docs/sell/marketing/resources/negative_keyword/methods/getNegativeKeywords
   */
  public getNegativeKeywords = (
    input: GetNegativeKeywordsInput = {},
  ): Effect.Effect<GetNegativeKeywordsResponse, EbayApiError> => {
    const path = `${MARKETING_BASE_PATH}/negative_keyword`;
    const params = buildEndpointParams({
      adGroupIds: { wireName: 'ad_group_ids', value: input.adGroupIds },
      campaignIds: { wireName: 'campaign_ids', value: input.campaignIds },
      limit: { wireName: 'limit', value: input.limit },
      negativeKeywordStatus: {
        wireName: 'negative_keyword_status',
        value: input.negativeKeywordStatus,
      },
      offset: { wireName: 'offset', value: input.offset },
    });
    return requestGetEffect<GetNegativeKeywordsResponse>(this.client, path, params);
  };

  /**
   * Create negative keyword through the eBay Marketing API.
   *
   * @param input - Path, query, header, and request body values for createNegativeKeyword.
   * @returns An Effect that succeeds with eBay's generated createNegativeKeyword response DTO.
   *
   * @example
   * ```ts
   * const response = await Effect.runPromise(marketingApi.createNegativeKeyword({ request: { ... } }));
   * ```
   *
   * @see https://developer.ebay.com/api-docs/sell/marketing/resources/negative_keyword/methods/createNegativeKeyword
   */
  public createNegativeKeyword = (
    input: CreateNegativeKeywordInput,
  ): Effect.Effect<CreateNegativeKeywordResponse, EbayApiError> => {
    const path = `${MARKETING_BASE_PATH}/negative_keyword`;
    return requestPostEffect<CreateNegativeKeywordResponse>(this.client, path, input.request);
  };

  /**
   * Get negative keyword through the eBay Marketing API.
   *
   * @param input - Path, query, header, and request body values for getNegativeKeyword.
   * @returns An Effect that succeeds with eBay's generated getNegativeKeyword response DTO.
   *
   * @example
   * ```ts
   * const response = await Effect.runPromise(marketingApi.getNegativeKeyword({ negativeKeywordId: 'negativeKeyword-1' }));
   * ```
   *
   * @see https://developer.ebay.com/api-docs/sell/marketing/resources/negative_keyword/methods/getNegativeKeyword
   */
  public getNegativeKeyword = (
    input: GetNegativeKeywordInput,
  ): Effect.Effect<GetNegativeKeywordResponse, EbayApiError> => {
    const path = `${MARKETING_BASE_PATH}/negative_keyword/${input.negativeKeywordId}`;
    return requestGetEffect<GetNegativeKeywordResponse>(this.client, path);
  };

  /**
   * Update negative keyword through the eBay Marketing API.
   *
   * @param input - Path, query, header, and request body values for updateNegativeKeyword.
   * @returns An Effect that succeeds with eBay's generated updateNegativeKeyword response DTO.
   *
   * @example
   * ```ts
   * const response = await Effect.runPromise(marketingApi.updateNegativeKeyword({ negativeKeywordId: 'negativeKeyword-1', request: { ... } }));
   * ```
   *
   * @see https://developer.ebay.com/api-docs/sell/marketing/resources/negative_keyword/methods/updateNegativeKeyword
   */
  public updateNegativeKeyword = (
    input: UpdateNegativeKeywordInput,
  ): Effect.Effect<UpdateNegativeKeywordResponse, EbayApiError> => {
    const path = `${MARKETING_BASE_PATH}/negative_keyword/${input.negativeKeywordId}`;
    return requestPutEffect<UpdateNegativeKeywordResponse>(this.client, path, input.request);
  };

  /**
   * Get report through the eBay Marketing API.
   *
   * @param input - Path, query, header, and request body values for getReport.
   * @returns An Effect that succeeds with eBay's generated getReport response DTO.
   *
   * @example
   * ```ts
   * const response = await Effect.runPromise(marketingApi.getReport({ reportId: 'report-1' }));
   * ```
   *
   * @see https://developer.ebay.com/api-docs/sell/marketing/resources/ad_report/methods/getReport
   */
  public getReport = (input: GetReportInput): Effect.Effect<GetReportResponse, EbayApiError> => {
    const path = `${MARKETING_BASE_PATH}/ad_report/${input.reportId}`;
    return requestGetEffect<GetReportResponse>(this.client, path);
  };

  /**
   * Get report metadata through the eBay Marketing API.
   *
   * @param input - Path, query, header, and request body values for getReportMetadata.
   * @returns An Effect that succeeds with eBay's generated getReportMetadata response DTO.
   *
   * @example
   * ```ts
   * const response = await Effect.runPromise(marketingApi.getReportMetadata());
   * ```
   *
   * @see https://developer.ebay.com/api-docs/sell/marketing/resources/ad_report_metadata/methods/getReportMetadata
   */
  public getReportMetadata = (
    input: GetReportMetadataInput = {},
  ): Effect.Effect<GetReportMetadataResponse, EbayApiError> => {
    const path = `${MARKETING_BASE_PATH}/ad_report_metadata`;
    const params = buildEndpointParams({
      fundingModel: { wireName: 'funding_model', value: input.fundingModel },
      channel: { wireName: 'channel', value: input.channel },
    });
    return requestGetEffect<GetReportMetadataResponse>(this.client, path, params);
  };

  /**
   * Get report metadata for report type through the eBay Marketing API.
   *
   * @param input - Path, query, header, and request body values for getReportMetadataForReportType.
   * @returns An Effect that succeeds with eBay's generated getReportMetadataForReportType response DTO.
   *
   * @example
   * ```ts
   * const response = await Effect.runPromise(marketingApi.getReportMetadataForReportType({ reportType: 'reportType-1' }));
   * ```
   *
   * @see https://developer.ebay.com/api-docs/sell/marketing/resources/ad_report_metadata/methods/getReportMetadataForReportType
   */
  public getReportMetadataForReportType = (
    input: GetReportMetadataForReportTypeInput,
  ): Effect.Effect<GetReportMetadataForReportTypeResponse, EbayApiError> => {
    const path = `${MARKETING_BASE_PATH}/ad_report_metadata/${input.reportType}`;
    const params = buildEndpointParams({
      fundingModel: { wireName: 'funding_model', value: input.fundingModel },
      channel: { wireName: 'channel', value: input.channel },
    });
    return requestGetEffect<GetReportMetadataForReportTypeResponse>(this.client, path, params);
  };

  /**
   * Get report tasks through the eBay Marketing API.
   *
   * @param input - Path, query, header, and request body values for getReportTasks.
   * @returns An Effect that succeeds with eBay's generated getReportTasks response DTO.
   *
   * @example
   * ```ts
   * const response = await Effect.runPromise(marketingApi.getReportTasks());
   * ```
   *
   * @see https://developer.ebay.com/api-docs/sell/marketing/resources/ad_report_task/methods/getReportTasks
   */
  public getReportTasks = (
    input: GetReportTasksInput = {},
  ): Effect.Effect<GetReportTasksResponse, EbayApiError> => {
    const path = `${MARKETING_BASE_PATH}/ad_report_task`;
    const params = buildEndpointParams({
      limit: { wireName: 'limit', value: input.limit },
      offset: { wireName: 'offset', value: input.offset },
      reportTaskStatuses: { wireName: 'report_task_statuses', value: input.reportTaskStatuses },
    });
    return requestGetEffect<GetReportTasksResponse>(this.client, path, params);
  };

  /**
   * Create report task through the eBay Marketing API.
   *
   * @param input - Path, query, header, and request body values for createReportTask.
   * @returns An Effect that succeeds with eBay's generated createReportTask response DTO.
   *
   * @example
   * ```ts
   * const response = await Effect.runPromise(marketingApi.createReportTask({ request: { ... } }));
   * ```
   *
   * @see https://developer.ebay.com/api-docs/sell/marketing/resources/ad_report_task/methods/createReportTask
   */
  public createReportTask = (
    input: CreateReportTaskInput,
  ): Effect.Effect<CreateReportTaskResponse, EbayApiError> => {
    const path = `${MARKETING_BASE_PATH}/ad_report_task`;
    return requestPostEffect<CreateReportTaskResponse>(this.client, path, input.request);
  };

  /**
   * Get report task through the eBay Marketing API.
   *
   * @param input - Path, query, header, and request body values for getReportTask.
   * @returns An Effect that succeeds with eBay's generated getReportTask response DTO.
   *
   * @example
   * ```ts
   * const response = await Effect.runPromise(marketingApi.getReportTask({ reportTaskId: 'reportTask-1' }));
   * ```
   *
   * @see https://developer.ebay.com/api-docs/sell/marketing/resources/ad_report_task/methods/getReportTask
   */
  public getReportTask = (
    input: GetReportTaskInput,
  ): Effect.Effect<GetReportTaskResponse, EbayApiError> => {
    const path = `${MARKETING_BASE_PATH}/ad_report_task/${input.reportTaskId}`;
    return requestGetEffect<GetReportTaskResponse>(this.client, path);
  };

  /**
   * Delete report task through the eBay Marketing API.
   *
   * @param input - Path, query, header, and request body values for deleteReportTask.
   * @returns An Effect that succeeds with eBay's generated deleteReportTask response DTO.
   *
   * @example
   * ```ts
   * const response = await Effect.runPromise(marketingApi.deleteReportTask({ reportTaskId: 'reportTask-1' }));
   * ```
   *
   * @see https://developer.ebay.com/api-docs/sell/marketing/resources/ad_report_task/methods/deleteReportTask
   */
  public deleteReportTask = (
    input: DeleteReportTaskInput,
  ): Effect.Effect<DeleteReportTaskResponse, EbayApiError> => {
    const path = `${MARKETING_BASE_PATH}/ad_report_task/${input.reportTaskId}`;
    return requestDeleteEffect<DeleteReportTaskResponse>(this.client, path);
  };

  /**
   * Create item price markdown promotion through the eBay Marketing API.
   *
   * @param input - Path, query, header, and request body values for createItemPriceMarkdownPromotion.
   * @returns An Effect that succeeds with eBay's generated createItemPriceMarkdownPromotion response DTO.
   *
   * @example
   * ```ts
   * const response = await Effect.runPromise(marketingApi.createItemPriceMarkdownPromotion({ request: { ... } }));
   * ```
   *
   * @see https://developer.ebay.com/api-docs/sell/marketing/resources/item_price_markdown/methods/createItemPriceMarkdownPromotion
   */
  public createItemPriceMarkdownPromotion = (
    input: CreateItemPriceMarkdownPromotionInput,
  ): Effect.Effect<CreateItemPriceMarkdownPromotionResponse, EbayApiError> => {
    const path = `${MARKETING_BASE_PATH}/item_price_markdown`;
    return requestPostEffect<CreateItemPriceMarkdownPromotionResponse>(
      this.client,
      path,
      input.request,
    );
  };

  /**
   * Get item price markdown promotion through the eBay Marketing API.
   *
   * @param input - Path, query, header, and request body values for getItemPriceMarkdownPromotion.
   * @returns An Effect that succeeds with eBay's generated getItemPriceMarkdownPromotion response DTO.
   *
   * @example
   * ```ts
   * const response = await Effect.runPromise(marketingApi.getItemPriceMarkdownPromotion({ promotionId: 'promotion-1' }));
   * ```
   *
   * @see https://developer.ebay.com/api-docs/sell/marketing/resources/item_price_markdown/methods/getItemPriceMarkdownPromotion
   */
  public getItemPriceMarkdownPromotion = (
    input: GetItemPriceMarkdownPromotionInput,
  ): Effect.Effect<GetItemPriceMarkdownPromotionResponse, EbayApiError> => {
    const path = `${MARKETING_BASE_PATH}/item_price_markdown/${input.promotionId}`;
    return requestGetEffect<GetItemPriceMarkdownPromotionResponse>(this.client, path);
  };

  /**
   * Update item price markdown promotion through the eBay Marketing API.
   *
   * @param input - Path, query, header, and request body values for updateItemPriceMarkdownPromotion.
   * @returns An Effect that succeeds with eBay's generated updateItemPriceMarkdownPromotion response DTO.
   *
   * @example
   * ```ts
   * const response = await Effect.runPromise(marketingApi.updateItemPriceMarkdownPromotion({ promotionId: 'promotion-1', request: { ... } }));
   * ```
   *
   * @see https://developer.ebay.com/api-docs/sell/marketing/resources/item_price_markdown/methods/updateItemPriceMarkdownPromotion
   */
  public updateItemPriceMarkdownPromotion = (
    input: UpdateItemPriceMarkdownPromotionInput,
  ): Effect.Effect<UpdateItemPriceMarkdownPromotionResponse, EbayApiError> => {
    const path = `${MARKETING_BASE_PATH}/item_price_markdown/${input.promotionId}`;
    return requestPutEffect<UpdateItemPriceMarkdownPromotionResponse>(
      this.client,
      path,
      input.request,
    );
  };

  /**
   * Delete item price markdown promotion through the eBay Marketing API.
   *
   * @param input - Path, query, header, and request body values for deleteItemPriceMarkdownPromotion.
   * @returns An Effect that succeeds with eBay's generated deleteItemPriceMarkdownPromotion response DTO.
   *
   * @example
   * ```ts
   * const response = await Effect.runPromise(marketingApi.deleteItemPriceMarkdownPromotion({ promotionId: 'promotion-1' }));
   * ```
   *
   * @see https://developer.ebay.com/api-docs/sell/marketing/resources/item_price_markdown/methods/deleteItemPriceMarkdownPromotion
   */
  public deleteItemPriceMarkdownPromotion = (
    input: DeleteItemPriceMarkdownPromotionInput,
  ): Effect.Effect<DeleteItemPriceMarkdownPromotionResponse, EbayApiError> => {
    const path = `${MARKETING_BASE_PATH}/item_price_markdown/${input.promotionId}`;
    return requestDeleteEffect<DeleteItemPriceMarkdownPromotionResponse>(this.client, path);
  };

  /**
   * Create item promotion through the eBay Marketing API.
   *
   * @param input - Path, query, header, and request body values for createItemPromotion.
   * @returns An Effect that succeeds with eBay's generated createItemPromotion response DTO.
   *
   * @example
   * ```ts
   * const response = await Effect.runPromise(marketingApi.createItemPromotion({ request: { ... } }));
   * ```
   *
   * @see https://developer.ebay.com/api-docs/sell/marketing/resources/item_promotion/methods/createItemPromotion
   */
  public createItemPromotion = (
    input: CreateItemPromotionInput,
  ): Effect.Effect<CreateItemPromotionResponse, EbayApiError> => {
    const path = `${MARKETING_BASE_PATH}/item_promotion`;
    return requestPostEffect<CreateItemPromotionResponse>(this.client, path, input.request);
  };

  /**
   * Get item promotion through the eBay Marketing API.
   *
   * @param input - Path, query, header, and request body values for getItemPromotion.
   * @returns An Effect that succeeds with eBay's generated getItemPromotion response DTO.
   *
   * @example
   * ```ts
   * const response = await Effect.runPromise(marketingApi.getItemPromotion({ promotionId: 'promotion-1' }));
   * ```
   *
   * @see https://developer.ebay.com/api-docs/sell/marketing/resources/item_promotion/methods/getItemPromotion
   */
  public getItemPromotion = (
    input: GetItemPromotionInput,
  ): Effect.Effect<GetItemPromotionResponse, EbayApiError> => {
    const path = `${MARKETING_BASE_PATH}/item_promotion/${input.promotionId}`;
    return requestGetEffect<GetItemPromotionResponse>(this.client, path);
  };

  /**
   * Update item promotion through the eBay Marketing API.
   *
   * @param input - Path, query, header, and request body values for updateItemPromotion.
   * @returns An Effect that succeeds with eBay's generated updateItemPromotion response DTO.
   *
   * @example
   * ```ts
   * const response = await Effect.runPromise(marketingApi.updateItemPromotion({ promotionId: 'promotion-1', request: { ... } }));
   * ```
   *
   * @see https://developer.ebay.com/api-docs/sell/marketing/resources/item_promotion/methods/updateItemPromotion
   */
  public updateItemPromotion = (
    input: UpdateItemPromotionInput,
  ): Effect.Effect<UpdateItemPromotionResponse, EbayApiError> => {
    const path = `${MARKETING_BASE_PATH}/item_promotion/${input.promotionId}`;
    return requestPutEffect<UpdateItemPromotionResponse>(this.client, path, input.request);
  };

  /**
   * Delete item promotion through the eBay Marketing API.
   *
   * @param input - Path, query, header, and request body values for deleteItemPromotion.
   * @returns An Effect that succeeds with eBay's generated deleteItemPromotion response DTO.
   *
   * @example
   * ```ts
   * const response = await Effect.runPromise(marketingApi.deleteItemPromotion({ promotionId: 'promotion-1' }));
   * ```
   *
   * @see https://developer.ebay.com/api-docs/sell/marketing/resources/item_promotion/methods/deleteItemPromotion
   */
  public deleteItemPromotion = (
    input: DeleteItemPromotionInput,
  ): Effect.Effect<DeleteItemPromotionResponse, EbayApiError> => {
    const path = `${MARKETING_BASE_PATH}/item_promotion/${input.promotionId}`;
    return requestDeleteEffect<DeleteItemPromotionResponse>(this.client, path);
  };

  /**
   * Get listing set through the eBay Marketing API.
   *
   * @param input - Path, query, header, and request body values for getListingSet.
   * @returns An Effect that succeeds with eBay's generated getListingSet response DTO.
   *
   * @example
   * ```ts
   * const response = await Effect.runPromise(marketingApi.getListingSet({ promotionId: 'promotion-1' }));
   * ```
   *
   * @see https://developer.ebay.com/api-docs/sell/marketing/resources/promotion/methods/getListingSet
   */
  public getListingSet = (
    input: GetListingSetInput,
  ): Effect.Effect<GetListingSetResponse, EbayApiError> => {
    const path = `${MARKETING_BASE_PATH}/promotion/${input.promotionId}/get_listing_set`;
    const params = buildEndpointParams({
      limit: { wireName: 'limit', value: input.limit },
      offset: { wireName: 'offset', value: input.offset },
      q: { wireName: 'q', value: input.q },
      sort: { wireName: 'sort', value: input.sort },
      status: { wireName: 'status', value: input.status },
    });
    return requestGetEffect<GetListingSetResponse>(this.client, path, params);
  };

  /**
   * Get promotions through the eBay Marketing API.
   *
   * @param input - Path, query, header, and request body values for getPromotions.
   * @returns An Effect that succeeds with eBay's generated getPromotions response DTO.
   *
   * @example
   * ```ts
   * const response = await Effect.runPromise(marketingApi.getPromotions({ marketplaceId: 'marketplace-1' }));
   * ```
   *
   * @see https://developer.ebay.com/api-docs/sell/marketing/resources/promotion/methods/getPromotions
   */
  public getPromotions = (
    input: GetPromotionsInput,
  ): Effect.Effect<GetPromotionsResponse, EbayApiError> => {
    const path = `${MARKETING_BASE_PATH}/promotion`;
    const params = buildEndpointParams({
      limit: { wireName: 'limit', value: input.limit },
      marketplaceId: { wireName: 'marketplace_id', value: input.marketplaceId },
      offset: { wireName: 'offset', value: input.offset },
      promotionStatus: { wireName: 'promotion_status', value: input.promotionStatus },
      promotionType: { wireName: 'promotion_type', value: input.promotionType },
      q: { wireName: 'q', value: input.q },
      sort: { wireName: 'sort', value: input.sort },
    });
    return requestGetEffect<GetPromotionsResponse>(this.client, path, params);
  };

  /**
   * Pause promotion through the eBay Marketing API.
   *
   * @param input - Path, query, header, and request body values for pausePromotion.
   * @returns An Effect that succeeds with eBay's generated pausePromotion response DTO.
   *
   * @example
   * ```ts
   * const response = await Effect.runPromise(marketingApi.pausePromotion({ promotionId: 'promotion-1' }));
   * ```
   *
   * @see https://developer.ebay.com/api-docs/sell/marketing/resources/promotion/methods/pausePromotion
   */
  public pausePromotion = (
    input: PausePromotionInput,
  ): Effect.Effect<PausePromotionResponse, EbayApiError> => {
    const path = `${MARKETING_BASE_PATH}/promotion/${input.promotionId}/pause`;
    return requestPostEffect<PausePromotionResponse>(this.client, path);
  };

  /**
   * Resume promotion through the eBay Marketing API.
   *
   * @param input - Path, query, header, and request body values for resumePromotion.
   * @returns An Effect that succeeds with eBay's generated resumePromotion response DTO.
   *
   * @example
   * ```ts
   * const response = await Effect.runPromise(marketingApi.resumePromotion({ promotionId: 'promotion-1' }));
   * ```
   *
   * @see https://developer.ebay.com/api-docs/sell/marketing/resources/promotion/methods/resumePromotion
   */
  public resumePromotion = (
    input: ResumePromotionInput,
  ): Effect.Effect<ResumePromotionResponse, EbayApiError> => {
    const path = `${MARKETING_BASE_PATH}/promotion/${input.promotionId}/resume`;
    return requestPostEffect<ResumePromotionResponse>(this.client, path);
  };

  /**
   * Get promotion reports through the eBay Marketing API.
   *
   * @param input - Path, query, header, and request body values for getPromotionReports.
   * @returns An Effect that succeeds with eBay's generated getPromotionReports response DTO.
   *
   * @example
   * ```ts
   * const response = await Effect.runPromise(marketingApi.getPromotionReports({ marketplaceId: 'marketplace-1' }));
   * ```
   *
   * @see https://developer.ebay.com/api-docs/sell/marketing/resources/promotion_report/methods/getPromotionReports
   */
  public getPromotionReports = (
    input: GetPromotionReportsInput,
  ): Effect.Effect<GetPromotionReportsResponse, EbayApiError> => {
    const path = `${MARKETING_BASE_PATH}/promotion_report`;
    const params = buildEndpointParams({
      limit: { wireName: 'limit', value: input.limit },
      marketplaceId: { wireName: 'marketplace_id', value: input.marketplaceId },
      offset: { wireName: 'offset', value: input.offset },
      promotionStatus: { wireName: 'promotion_status', value: input.promotionStatus },
      promotionType: { wireName: 'promotion_type', value: input.promotionType },
      q: { wireName: 'q', value: input.q },
    });
    return requestGetEffect<GetPromotionReportsResponse>(this.client, path, params);
  };

  /**
   * Get promotion summary report through the eBay Marketing API.
   *
   * @param input - Path, query, header, and request body values for getPromotionSummaryReport.
   * @returns An Effect that succeeds with eBay's generated getPromotionSummaryReport response DTO.
   *
   * @example
   * ```ts
   * const response = await Effect.runPromise(marketingApi.getPromotionSummaryReport({ marketplaceId: 'marketplace-1' }));
   * ```
   *
   * @see https://developer.ebay.com/api-docs/sell/marketing/resources/promotion_summary_report/methods/getPromotionSummaryReport
   */
  public getPromotionSummaryReport = (
    input: GetPromotionSummaryReportInput,
  ): Effect.Effect<GetPromotionSummaryReportResponse, EbayApiError> => {
    const path = `${MARKETING_BASE_PATH}/promotion_summary_report`;
    const params = buildEndpointParams({
      marketplaceId: { wireName: 'marketplace_id', value: input.marketplaceId },
    });
    return requestGetEffect<GetPromotionSummaryReportResponse>(this.client, path, params);
  };

  /**
   * Get email campaigns through the eBay Marketing API.
   *
   * @param input - Path, query, header, and request body values for getEmailCampaigns.
   * @returns An Effect that succeeds with eBay's generated getEmailCampaigns response DTO.
   *
   * @example
   * ```ts
   * const response = await Effect.runPromise(marketingApi.getEmailCampaigns());
   * ```
   *
   * @see https://developer.ebay.com/api-docs/sell/marketing/resources/email_campaign/methods/getEmailCampaigns
   */
  public getEmailCampaigns = (
    input: GetEmailCampaignsInput = {},
  ): Effect.Effect<GetEmailCampaignsResponse, EbayApiError> => {
    const path = `${MARKETING_BASE_PATH}/email_campaign`;
    const params = buildEndpointParams({
      limit: { wireName: 'limit', value: input.limit },
      offset: { wireName: 'offset', value: input.offset },
      q: { wireName: 'q', value: input.q },
      sort: { wireName: 'sort', value: input.sort },
    });
    return requestGetEffect<GetEmailCampaignsResponse>(this.client, path, params);
  };

  /**
   * Create email campaign through the eBay Marketing API.
   *
   * @param input - Path, query, header, and request body values for createEmailCampaign.
   * @returns An Effect that succeeds with eBay's generated createEmailCampaign response DTO.
   *
   * @example
   * ```ts
   * const response = await Effect.runPromise(marketingApi.createEmailCampaign({ marketplaceId: 'EBAY_US', request: { ... } }));
   * ```
   *
   * @see https://developer.ebay.com/api-docs/sell/marketing/resources/email_campaign/methods/createEmailCampaign
   */
  public createEmailCampaign = (
    input: CreateEmailCampaignInput,
  ): Effect.Effect<CreateEmailCampaignResponse, EbayApiError> => {
    const path = `${MARKETING_BASE_PATH}/email_campaign`;
    const config = marketplaceHeader(input.marketplaceId);
    return requestPostEffect<CreateEmailCampaignResponse>(this.client, path, input.request, config);
  };

  /**
   * Get email campaign through the eBay Marketing API.
   *
   * @param input - Path, query, header, and request body values for getEmailCampaign.
   * @returns An Effect that succeeds with eBay's generated getEmailCampaign response DTO.
   *
   * @example
   * ```ts
   * const response = await Effect.runPromise(marketingApi.getEmailCampaign({ emailCampaignId: 'emailCampaign-1' }));
   * ```
   *
   * @see https://developer.ebay.com/api-docs/sell/marketing/resources/email_campaign/methods/getEmailCampaign
   */
  public getEmailCampaign = (
    input: GetEmailCampaignInput,
  ): Effect.Effect<GetEmailCampaignResponse, EbayApiError> => {
    const path = `${MARKETING_BASE_PATH}/email_campaign/${input.emailCampaignId}`;
    return requestGetEffect<GetEmailCampaignResponse>(this.client, path);
  };

  /**
   * Update email campaign through the eBay Marketing API.
   *
   * @param input - Path, query, header, and request body values for updateEmailCampaign.
   * @returns An Effect that succeeds with eBay's generated updateEmailCampaign response DTO.
   *
   * @example
   * ```ts
   * const response = await Effect.runPromise(marketingApi.updateEmailCampaign({ emailCampaignId: 'emailCampaign-1', request: { ... } }));
   * ```
   *
   * @see https://developer.ebay.com/api-docs/sell/marketing/resources/email_campaign/methods/updateEmailCampaign
   */
  public updateEmailCampaign = (
    input: UpdateEmailCampaignInput,
  ): Effect.Effect<UpdateEmailCampaignResponse, EbayApiError> => {
    const path = `${MARKETING_BASE_PATH}/email_campaign/${input.emailCampaignId}`;
    return requestPutEffect<UpdateEmailCampaignResponse>(this.client, path, input.request);
  };

  /**
   * Delete email campaign through the eBay Marketing API.
   *
   * @param input - Path, query, header, and request body values for deleteEmailCampaign.
   * @returns An Effect that succeeds with eBay's generated deleteEmailCampaign response DTO.
   *
   * @example
   * ```ts
   * const response = await Effect.runPromise(marketingApi.deleteEmailCampaign({ emailCampaignId: 'emailCampaign-1' }));
   * ```
   *
   * @see https://developer.ebay.com/api-docs/sell/marketing/resources/email_campaign/methods/deleteEmailCampaign
   */
  public deleteEmailCampaign = (
    input: DeleteEmailCampaignInput,
  ): Effect.Effect<DeleteEmailCampaignResponse, EbayApiError> => {
    const path = `${MARKETING_BASE_PATH}/email_campaign/${input.emailCampaignId}`;
    return requestDeleteEffect<DeleteEmailCampaignResponse>(this.client, path);
  };

  /**
   * Get audiences through the eBay Marketing API.
   *
   * @param input - Path, query, header, and request body values for getAudiences.
   * @returns An Effect that succeeds with eBay's generated getAudiences response DTO.
   *
   * @example
   * ```ts
   * const response = await Effect.runPromise(marketingApi.getAudiences({ emailCampaignType: 'emailCampaignType-1' }));
   * ```
   *
   * @see https://developer.ebay.com/api-docs/sell/marketing/resources/email_campaign/methods/getAudiences
   */
  public getAudiences = (
    input: GetAudiencesInput,
  ): Effect.Effect<GetAudiencesResponse, EbayApiError> => {
    const path = `${MARKETING_BASE_PATH}/email_campaign/audience`;
    const params = buildEndpointParams({
      emailCampaignType: { wireName: 'emailCampaignType', value: input.emailCampaignType },
      limit: { wireName: 'limit', value: input.limit },
      offset: { wireName: 'offset', value: input.offset },
    });
    return requestGetEffect<GetAudiencesResponse>(this.client, path, params);
  };

  /**
   * Get email preview through the eBay Marketing API.
   *
   * @param input - Path, query, header, and request body values for getEmailPreview.
   * @returns An Effect that succeeds with eBay's generated getEmailPreview response DTO.
   *
   * @example
   * ```ts
   * const response = await Effect.runPromise(marketingApi.getEmailPreview({ emailCampaignId: 'emailCampaign-1' }));
   * ```
   *
   * @see https://developer.ebay.com/api-docs/sell/marketing/resources/email_campaign/methods/getEmailPreview
   */
  public getEmailPreview = (
    input: GetEmailPreviewInput,
  ): Effect.Effect<GetEmailPreviewResponse, EbayApiError> => {
    const path = `${MARKETING_BASE_PATH}/email_campaign/${input.emailCampaignId}/email_preview`;
    return requestGetEffect<GetEmailPreviewResponse>(this.client, path);
  };

  /**
   * Get email report through the eBay Marketing API.
   *
   * @param input - Path, query, header, and request body values for getEmailReport.
   * @returns An Effect that succeeds with eBay's generated getEmailReport response DTO.
   *
   * @example
   * ```ts
   * const response = await Effect.runPromise(marketingApi.getEmailReport({ endDate: 'endDate-1', startDate: 'startDate-1' }));
   * ```
   *
   * @see https://developer.ebay.com/api-docs/sell/marketing/resources/email_campaign/methods/getEmailReport
   */
  public getEmailReport = (
    input: GetEmailReportInput,
  ): Effect.Effect<GetEmailReportResponse, EbayApiError> => {
    const path = `${MARKETING_BASE_PATH}/email_campaign/report`;
    const params = buildEndpointParams({
      endDate: { wireName: 'endDate', value: input.endDate },
      startDate: { wireName: 'startDate', value: input.startDate },
    });
    return requestGetEffect<GetEmailReportResponse>(this.client, path, params);
  };
}
