import BaseApi from "../base";
import apiConfig from "../../config/api.config";

const userManagementService = 'online-transaction/api/login';

class AccountApi extends BaseApi {
    static newInstance = () => {
        if (!this.accountApi) this.accountApi = new AccountApi(apiConfig());
        return this.accountApi;
    };
    login = (data) => {
        return this.axios.post(`${userManagementService}`, data);
    };
}

export default AccountApi;