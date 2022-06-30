import BaseApi from "../base";
import apiConfigOc from "../../config/apiOc.config";

export default class CartApi extends BaseApi {
    static newInstance = token => {
        if (!this.api) this.api = new CartApi(apiConfigOc(token));
        return this.api;
    }
    listCartGet = () => {
        return this.axios.get(`api/v1/catalog/cart`)
    }
    itemCartPost = (body) => {
        return this.axios.post(`api/v1/catalog/cart`, body)
    }
    searchByUserIdGet = (userId) => {
        return this.axios.get(`api/v1/catalog/cart/search-by-userid?userId=${userId}`)
    }
    cartListByCartIdGet = (cartId) => {
        return this.axios.get(`api/v1/catalog/cart/${cartId}`)
    }
    cartDetailDelete = (cartId) => {
        return this.axios.delete(`api/v1/catalog/cart/detail/${cartId}`)
    }
    allCartDelete = (cartId, body) => {
        return this.axios.delete(`api/v1/catalog/cart/${cartId}`, body)
    }
    putCartListByCartId = (cartId, data) => {
        return this.axios.put(`api/v1/catalog/cart/${cartId}`, data)
    }
}