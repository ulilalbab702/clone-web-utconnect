import WishlistPage from "./WishlistPage";
import { connect } from "react-redux";
import { getWishlist } from "../../actions/wishlist";

const mapStateToProps = (state) => ({
    ...state.user,
    wishlistData: state.wishlist.wishlist.dataGet,
});

const mapDispatchToProps = (dispatch) => ({
    fetchWishlist: (token) => dispatch(getWishlist(token))
});

export default connect(mapStateToProps, mapDispatchToProps) (WishlistPage);