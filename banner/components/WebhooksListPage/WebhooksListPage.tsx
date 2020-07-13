import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import {
  createStyles,
  Theme,
  withStyles,
  WithStyles
} from "@material-ui/core/styles";
import React, { useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";

import AppHeader from "@saleor/components/AppHeader";
import Container from "@saleor/components/Container";
import PageHeader from "@saleor/components/PageHeader";
import useNotifier from "@saleor/hooks/useNotifier";
import DeleteImage from "../../../../assets/images/delete.svg";

import { sectionNames } from "@saleor/intl";

import { TypeImagesDelete, TypeImagesUpload } from "../../mutations"
import { TypedBannerImagesQuery } from "../../queries"

const styles = (theme: Theme) =>
  createStyles({
    bannerList: {
      alignItems: "center",
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-between",
      padding: "1rem 1.5rem",
      width: "100%"
    },

    bannerImg: {
      width: "100%"
    },

    delIcon: {
      background: "#fafafa",
      borderRadius: "25px",
      cursor: "pointer",
      padding: "5px",
      position: "absolute",
      right: "0",
      top: "0",
    },
    imgBox: {
      height: "200px",
      margin: "0 0 2rem",
      overflow: "hidden",
      position: "relative",
      [theme.breakpoints.down("sm")]: {
        height: "100%",
        width: "100%",

      },
      width: "48%",



    },
    textFieldGrid: {
      padding: "2rem 0 0 1.5rem"
    }
  });

interface WebhooksListPageProps extends WithStyles<typeof styles> {
  onBack: () => void;

}
let fileObj = [];
let fileArray = [];
let totalFinal = [];

const WebhooksListPage = withStyles(styles, {
  name: "StaffAddMemberDialog"
})(
  ({
    classes,
    onBack,
  }: WebhooksListPageProps) => {

    // : React.StatelessComponent<WebhooksListPageProps> = ({
    //   onBack
    // }) => 
    // {
    const intl = useIntl();
    const notify = useNotifier();
    const [, setFile] = useState([null]);
    // const [total, setTotal] = useState([null]);
    const [, setName] = useState("");
    const uploadMultipleFiles = (e) => {

      fileObj.push(e.target.files)
      // for (let i = 0; i < fileObj[0].length; i++) {
      //   const url = URL.createObjectURL(fileObj[0][i])
      //   fileArray.push(url)
      //   totalFinal.push({ file: fileObj[0][i], url })
      // }

      fileObj[0].forEach((value) => {
        const url = URL.createObjectURL(value)
        fileArray.push(url)
        totalFinal.push({ file: value, url })
      });
      setFile(fileArray)
    }


    const removeImage = (url) => {


      const filteredTotal = totalFinal.filter((value) => {
        return value.url !== url
      })


      totalFinal = filteredTotal

      const filteredImages = fileArray.filter(value => value !== url)
      fileArray = filteredImages
      setName(url)
    }

    const filterFinalImageFile = () => {
      return new Promise((resolve) => {
        const updateArray = [];
        totalFinal.map((item) => updateArray.push(item.file))
        resolve(updateArray);

      })

    }

    const showUpdateData = () => {

      // alert("You have successfully deleted image")
      // window.location.reload()
      setName("tttt")

    }
    return (
      <>
        <TypedBannerImagesQuery>
          {({ data, loading, refetch }) => {
            if (loading) {
              return (<h3>loding..</h3>)
            }
            else {


              return (
                <TypeImagesUpload onCompleted={async ({ shopBannerCreate: { errors } }) => {

                  if (errors.length) {

                    notify({ text: "" + errors[0].message });

                  }
                  else {
                    refetch()
                    fileObj = [];
                    fileArray = [];
                    totalFinal = [];
                  }

                }}>
                  {(imageUpload) => {

                    const handleSubmit = () => {
                      filterFinalImageFile().then((data) => {
                        imageUpload({
                          variables: {
                            images: data
                          }
                        })
                      })
                    }
                    return (
                      <Container>
                        <AppHeader onBack={onBack}>
                          {intl.formatMessage(sectionNames.configuration)}
                        </AppHeader>
                        <PageHeader title={intl.formatMessage(sectionNames.imagesBanner)}>
                          <Button onClick={() => handleSubmit()} variant="contained" color="primary" disabled={totalFinal.length > 0 ? false : true}>
                            <FormattedMessage
                              defaultMessage="Save"
                              description="button"
                            />
                          </Button>
                        </PageHeader>
                        <Card>
                          <form>

                            <div className={classes.textFieldGrid}>
                              <input type="file" className="form-control" onChange={(e) => uploadMultipleFiles(e)} multiple accept="image/*" />
                            </div>
                            {/* {fileArray.length > 0 ? <button type="button" className="btn btn-danger btn-block" onClick={(e) => uploadFiles(e)}>Save.</button> : ""} */}
                            <div className={classes.bannerList}>
                              {(fileArray || []).map(url => (
                                <div className={classes.imgBox}>
                                  <img src={DeleteImage} className={classes.delIcon} onClick={() => removeImage(url)} />
                                  <img src={url} alt="..." onClick={() => removeImage(url)} className={classes.bannerImg} />
                                </div>
                              ))}
                            </div>
                          </form >

                          <TypeImagesDelete onCompleted={async ({ shopBannerDelete: { shopErrors } }) => {

                            if (shopErrors.length) {
                              alert("Error occure try again.")
                            }
                            else {
                              refetch()
                              showUpdateData()
                            }

                          }}>
                            {(imageDelete) => {

                              const handleSubmitDelete = (id) => {
                                imageDelete({
                                  variables: {
                                    ids: id
                                  }
                                })
                              }
                              return (
                                <div className={classes.bannerList}>
                                  {data.shop.banners && data.shop.banners.map(url =>
                                    <div className={classes.imgBox}>
                                      <img src={DeleteImage} className={classes.delIcon} onClick={() => handleSubmitDelete(url.id)} />
                                      <img src={url.image} alt="..." className={classes.bannerImg} />
                                    </div>

                                  )}
                                </div>
                              )
                            }}

                          </TypeImagesDelete>

                        </Card>
                      </Container>);
                  }}
                </TypeImagesUpload>

              )



            }
          }}
        </TypedBannerImagesQuery>






      </>
    );
  }
);
WebhooksListPage.displayName = "WebhooksListPage";
export default WebhooksListPage;
