import BaseApi from "../base";
import apiConfigOc from "../../config/apiOc.config";

export default class CategoryApi extends BaseApi {
    static newInstance = token => {
        if (!this.api) {
            this.api = new CategoryApi(apiConfigOc(token));
        }
        return new CategoryApi(apiConfigOc(token));
    }
    listBranchGet = (IsGetAll, Description) => {
        return this.axios.get(`api/v1/catalog/branch?PageSize=100&IsGetAll=${IsGetAll ? true : false}&Description=${Description ? Description : ""}`)
    }
    getCheckPrice = (body) => {
        return this.axios.post(`api/v1/catalog/product/price`, body)
    }
}