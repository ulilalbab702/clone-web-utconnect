import BaseApi from "../base";
import apiConfigOc from "../../config/apiOc.config";

export default class BrandApi extends BaseApi {
    static newInstance = token => {
        if (!this.api) this.api = new BrandApi(apiConfigOc(token));
        return this.api;
    }
    listBrandGet = () => {
        return this.axios.get(`api/v1/catalog/brand`)
    }
}