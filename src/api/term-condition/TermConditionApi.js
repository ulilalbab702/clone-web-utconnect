import BaseApi from "../base";
import apiConfig from "../../config/api.config";

export default class TermConditionApi extends BaseApi {
    static newInstance = token => {
        if (!this.api) this.api = new TermConditionApi(apiConfig(token));
        return this.api;
    }
    termConditionGet = () => {
        return this.axios.get(`user-management/api/termandcondition`)
    }
}