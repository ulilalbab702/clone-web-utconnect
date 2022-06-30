// import DetailProductPage from "./DetailProductPage";
import ProductDetail from "./ProductDetail";
import { connect } from "react-redux";
import { detailProductGet, reviewDetailProduct } from "../../actions/detailProduct";
import { push } from "connected-react-router";
import { addWishlist, delWishlist } from "../../actions/wishlist"
import { addCart, searchByUserId } from "../../actions/cart"; 
import { login } from "../../actions/user";

const mapStateToProps = (state) => ({
    ...state.user,
    detailProduct: state.detailProduct.detailProduct.data,
    reviewProductData: state.detailProduct.detailProduct.dataReview,
    dataPost: state.cart.addCart.dataPost,
    dada: console.log("JJ", state.detailProduct.detailProduct.dataReview),
});

const mapDispatchToProps = (dispatch) => ({
    push: (url, item) => dispatch(push(url, item)),
    fetchDetailProduct: (id) => dispatch(detailProductGet(id)),
    fetchReviewProduct: (productId) => dispatch(reviewDetailProduct(productId)),
    fetchAddWishlist: (token, data) => dispatch(addWishlist(token, data)),
    fetchDeleteSigleWishlist: (token, data) => dispatch(delWishlist(token, data)),
    fetchPostCart: (token, body) => dispatch(addCart(token, body)),
    fetchSearchByUserId: (token, userId) => dispatch(searchByUserId(token, userId)),

    login: (data) => dispatch(login(data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);