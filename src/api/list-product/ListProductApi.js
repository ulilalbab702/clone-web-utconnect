import BaseApi from "../base";
import apiConfigOc from "../../config/apiOc.config";

export default class ListProductApi extends BaseApi {
    static newInstance = token => {
        if (!this.api) this.api = new ListProductApi(apiConfigOc(token));
        return this.api;
    }
    getListProduct = (params, pageSize) => {
        return this.axios.get(`api/v1/catalog/product?PageSize=${pageSize}`, {params})
    }
}