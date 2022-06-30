import BaseApi from "../base";
import apiConfigOc from "../../config/apiOc.config";

export default class DetailProductApi extends BaseApi {
    static newInstance = token => {
        if (!this.api) {
            this.api = new DetailProductApi(apiConfigOc(token));
        }
        return this.api;
    }
    getDetailProduct = (id) => {
        return this.axios.get(`api/v1/catalog/product/${id}`)
    }
    getReviewProduct = (productId) => {
        return this.axios.get(`api/v1/catalog/review/${productId}`)
    }
}