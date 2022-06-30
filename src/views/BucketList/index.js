import BucketList from "./BucketListPage"
import { connect } from "react-redux"
import { listCart, searchByUserId, cartListByCartId, cartDetailDelete, allCartDelete, putCartListByCartId } from "../../actions/cart"
import { push } from "connected-react-router"
import { login } from "../../actions/user"

const mapStateToProps = (state) => ({
    ...state.user,
    cartList: state.cart.cartData.data,
    dataCart: state.cart.searchByUserId.data?.data,
    dataCartList: state.cart.listCart.dataCartList,
    dataPut: state.cart.listCart.dataPutCartList,
});

const mapDispatchToProps = (dispatch) => ({
    push: (url, item) => dispatch(push(url, item)),
    login: (data) => dispatch(login(data)),
    fetchCartList: (token) => dispatch(listCart(token)),
    fetchSearchByUserId: (token, userId) => dispatch(searchByUserId(token, userId)),
    fetchListCartByCartId: (token, cartId) => dispatch(cartListByCartId(token, cartId)),
    deleteCartDetail: (token, cartDetailId) => dispatch(cartDetailDelete(token, cartDetailId)),
    allCartDelete: (token, cartId, body) => dispatch(allCartDelete(token, cartId, body)),
    fetchPutCartListByCartId: (cartId, data, token) => dispatch(putCartListByCartId(cartId, data, token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BucketList);