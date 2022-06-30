import React, { useState, useEffect } from "react";
import { getStorage } from "../../utils/storage.helper";

class BucketList extends React.PureComponent {
    constructor(props) {
        super();
        this.state = {
            cartId: null,
            allCartList: null,
        }
    }

    // tes = async (value, cartId) => {
    //     const { user } = this.props;
    //     const accessToken = user.tokenResponse.accessToken;
    //     const userId = user.userId;
    //     if (value) {
    //         this.setState({ cartId: cartId });
    //         await this.props.fetchListCartByCartId(accessToken, cartId);
    //         const { dataCartList } = this.props;
    //         if (dataCartList != null) {
    //             if (getStorage("TEMP_CART")) {
    //                 let newArr = dataCartList.data.cartDetail
    //                 for (let i = 0; i < getStorage("TEMP_CART").length; i++) {
    //                     for (let c = 0; c < newArr.)
    //                 }
    //             }
    //         }
    //     }
    // }

    async componentDidMount() {
        const { user } = this.props;
        const newCartId = '71423621-90c3-415d-9932-d89dc1318442';
        await this.props.fetchListCartByCartId(user.tokenResponse.accessToken, newCartId);
    }
    
    componentDidUpdate(prevProps) {
        if (this.props.dataCartList.data.cartDetail != null && this.props.dataCartList !== prevProps.dataCartList) {
            this.setState({ allCartList: this.props.dataCartList.data.cartDetail})
        }
    }
    
    
    render() {
        return (
            <>
                <div className="mt-28">TES</div>
            </>
        )
    }
}

export default BucketList;