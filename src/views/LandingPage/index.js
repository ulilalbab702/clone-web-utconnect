import LandingPage from "./LandingPage";
import { connect } from "react-redux";
import { IMAGE_SLIDER_REQ } from "../../actions/actionTypes"
import { push } from "connected-react-router";
import { imageSlider } from "../../actions/promotions";
import { listBrand } from "../../actions/brand";
import { listProduct } from "../../actions/listProduct";
import { getCheckPrice, getBranchList, uploadCsvTemplate, uploadAttachment, getTemplate } from "../../actions/listNews";
import { login } from "../../actions/user";

const mapStateToProps = (state) => ({
  ...state.user,
  imageSlider: state.promotions.promotion.image,
  brandData: state.listBrand.listBrand.data,
  loadingPromo: state.promotions.promotion.loading,
  listProductData: state.listProduct.listProduct.data,
  priceList: state.listNews.listNews.priceList,
  branchList: state.listNews.listNews.branchList,
  uploadCsv: state.listNews.listNews.uploadCsv,
  uploadPdf: state.listNews.listNews.uploadPdf,
  downloadFile: state.listNews.listNews.downloadFile,
});

const mapDispatchToProps = (dispatch) => ({
  push: (url, item) => dispatch(push(url, item)),
  fetchListBrand: () => dispatch(listBrand()),
  fetchImageslider: () => dispatch(imageSlider()),
  fetchListProduct: (token, page, pageSize) => dispatch(listProduct(token, page, pageSize)),
  fetchCheckPrice: (token, body) => dispatch(getCheckPrice(token, body)),
  fetchGetBranchList: (token, IsGetAll, Description) => dispatch(getBranchList(token, IsGetAll, Description)),
  fetchUploadCsv: (token, formData) => dispatch(uploadCsvTemplate(token, formData)),
  fetchUploadAttachment: (token, file) => dispatch(uploadAttachment(token, file)),
  fetchDownloadTemplate: (token) => dispatch(getTemplate(token)),

  login: (data) => dispatch(login(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);
