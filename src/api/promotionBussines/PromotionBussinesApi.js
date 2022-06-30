import BaseApi from "../base";
import apiConfig from "../../config/api.config";


export default class PromotionBussinesApi extends BaseApi {
    static newInstance = token => {
        if (!this.api) {
            this.api = new PromotionBussinesApi(apiConfig(token));
          }
        return new PromotionBussinesApi(apiConfig(token));
    }
    getPromotionListHeader = async () => {
        return this.axios.get(`/promotion/api/group/promotion/businesstype`);
    };
}