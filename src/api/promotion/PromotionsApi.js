import BaseApi from "../base";
import apiConfig from '../../config/api.config';

export default class PromotionApi extends BaseApi {
    static newInstance = token => {
        if (!this.api) this.api = new PromotionApi(apiConfig(token));
        return this.api;
    }
    imageSliderGet = () => {
        return this.axios.get(`/promotion/api/promotion/imageslider`)
    }
    promotionListGet = (BusinessTypeId, GroupId, Page, Sorting, PageSize) => {
        return this.axios.get(`/promotion/api/Promotion/alllist?BusinessTypeId=${BusinessTypeId}&GroupId=${GroupId}&Page=${Page}&Sorting=${Sorting}&PageSize=${PageSize}`)
    }
    promotionDetail = (id) => {
        return this.axios.get(`/promotion/api/promotion/detail/m/${id}`)
    }
}