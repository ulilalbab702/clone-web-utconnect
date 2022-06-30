import React, { useEffect, useState } from 'react'
import { IconZoom, Heart, HeartBlack } from "../../assets/icons"

const WishlistPage = (props) => {
    const wishlistData = props.wishlistData?.data;
    const [wishlist, setWishlist] = useState([]);

    useEffect(() => {
        const { user } = props;
        if (user !== null) {
            async function fetchData() {
                await props.fetchWishlist(user.tokenResponse.accessToken);
            }
            fetchData();
        }
    }, []);

    useEffect(() => {
        if (wishlistData != null && wishlistData != undefined) {
            setWishlist(wishlistData);
        }
    }, [wishlistData]);

    const _renderWishlist = () => {
        if (wishlist != null && wishlist != undefined) {
            return (
                <div className="flex flex-wrap items-center sm:justify-center">
                    {wishlist.map((item, index) => {
                        return (
                            <div key={index} className="py-4">
                                <div className="flex flex-col rounded-lg shadow-lg w-48 h-350px mr-5 2xl:w-52 2xl:h-350px 2xl:mr-2 xl:w-40 xl:h-80 xl:mr-3 lg:w-48 lg:h-full lg:mr-4 md:w-40 md:h-310px md:mr-2 sm:w-52 sm:h-335px sm:mr-1">
                                    <a>
                                        <div className="m-4">
                                            <div className='flex flex-col'>
                                                <img src={Heart}
                                                    className="w-6 h-6 xl:w-5 absolute xl:h-5 lg:w-5 lg:h-5 md:w-5 md:h-5 sm:w-5 sm:h-5 p-1 rounded-full ml-32 2xl:ml-36 xl:ml-24 md:ml-24 sm:ml-36 mt-2 cursor-pointer"
                                                    style={item.isWishlisted ? { backgroundColor: '#dedede', zIndex: '-1' } : { backgroundColor: '#dedede', zIndex: '-1' }}
                                                />
                                                <img className="w-full h-auto" src={item.imageThumbnailUrl} style={{ zIndex: '-2' }} />
                                            </div>
                                            <p className="mt-2 text-xs tracking-wider text-gray-400">{item.brandName}</p>
                                            <p className="text-sm font-bold tracking-wider">{item.materialName}</p>
                                            <p className="text-sm text-gray-400 tracking-wider">({item.materialNumber})</p>
                                            <div className="flex flex-wrap">
                                                <s><p className="mt-2 text-xs text-gray-400 line-through-black tracking-wider">Rp.{item.basePrice}</p></s>
                                                <p className="text-sm font-bold text-green-600 px-1 mt-1">{item.discountPercent}</p>
                                            </div>
                                            <p className="font-bold tracking-wider text-red-500">Rp {item.promotionPrice}</p>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        )
                    })}
                </div>
            )
        } else {
            return (
                <div>NULL</div>
            )
        }
    };

    const _renderSearchItem = () => {
        return (
            <div>
                <input type='text'
                    className="border border-solid border-black rounded-lg transition ease-in-out text-center font-semibold uppercase text-sm text-gray-700 w-80 py-2 px-3  focus:border-blue-500 focus:outline-none" />
            </div>
        )
    }

    return (
        <div className='mt-20 px-6vw md:px-3vw'>
            <div className='w-full flex flex-row text-base font-semibold mb-3'>
                <p className='text-blue-400 mr-2'>Part Online Transaction &gt;</p>Favorit
            </div>
            <div className='flex flex-row'>
                <div className='flex justify-start'>
                    {/* <button className='h-10 rounded-lg px-4 font-semibold cursor-pointer border border-black'>Ubah Favorit</button> */}
                    {/* {_renderSearchItem()} */}
                </div>
            </div>
            {_renderWishlist()}
        </div>
    )
}

export default WishlistPage