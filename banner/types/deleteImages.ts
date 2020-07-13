/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: WebhookDelete
// ====================================================

export interface WebhookDelete_WebhookDelete_Errors {
  __typename: "Error";
  field: string | null;
  message: string | null;
}

export interface WebhookDelete_WebhookDelete {
  __typename: "WebhookDelete";
  shopErrors: WebhookDelete_WebhookDelete_Errors[] | null;
}

export interface ImagesDelete {
  shopBannerDelete: WebhookDelete_WebhookDelete | null;
}

export interface ImagesDeleteVariables {
  ids: any;
}
