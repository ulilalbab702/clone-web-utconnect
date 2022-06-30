import BaseApi from "../base";
import apiConfigOc from "../../config/apiOc.config";

export default class WishlistApi extends BaseApi {
    static newInstance = token => {
        if (!this.api) {
            this.api = new WishlistApi(apiConfigOc(token));
        }
        return new WishlistApi(apiConfigOc(token));
    }
    wishlistGet = () => {
        return this.axios.get(`api/v1/catalog/product?ShowWishlist=true&MaterialName=`)
    }
    wishlistPost = (body) => {
        return this.axios.post(`api/v1/catalog/wishlist`, body)
    }
    wishlistDelete = (body) => {
        const arr = {productId: body[0]}
        return this.axios.delete(`api/v1/catalog/wishlist`, {
            data: arr
        })
    }
}