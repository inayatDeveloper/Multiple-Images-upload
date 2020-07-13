import gql from "graphql-tag";

import { TypedMutation } from "../mutations";

import { WebhookDelete1, WebhookDeleteVariables1 } from "./types/WebhookDelete";

import { ImagesDelete, ImagesDeleteVariables } from "./types/deleteImages";
// new banner imagess

const ImagesUpload = gql`
  mutation($images:[Upload]){
  shopBannerCreate(input:{images:$images}){
    message
    errors{
      field
      message
    }
  }
}
`;
export const TypeImagesUpload = TypedMutation<
  WebhookDelete1,
  WebhookDeleteVariables1
>(ImagesUpload);


// Delete images...

const ImagesDeleted = gql`
 mutation ShopBannerDelete($ids:Int!){
  shopBannerDelete(input:{ids:[$ids]}){
    message
    shopErrors{
      field
      message
    }
  }
}
`;
export const TypeImagesDelete = TypedMutation<
  ImagesDelete,
  ImagesDeleteVariables
>(ImagesDeleted);



