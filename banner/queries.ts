import gql from "graphql-tag";

import { TypedQuery } from "../queries";
import { BannerImagesGet } from "./types/bannerGet";

const bannerImagesGet = gql`
  query{
  shop{
    banners{
      image,
      id
    }
  }
}
`;
export const TypedBannerImagesQuery = TypedQuery<BannerImagesGet,{}>(
    bannerImagesGet
);
