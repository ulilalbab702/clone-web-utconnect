import BaseApi from "../base";
import apiConfig from "../../config/api.config";

export default class ListNewsApi extends BaseApi {
    static newInstance = token => {
        if (!this.api) this.api = new ListNewsApi(apiConfig(token));
        return this.api;
    }
    listNewsGet = (AttributeValue, PageSize, PageNumber) => {
        return this.axios.get(`/promotion/api/News?AttributeValue=${AttributeValue}&PageSize=${PageSize}&PageNumber=${PageNumber}`);
    }
}