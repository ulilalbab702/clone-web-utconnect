import { Modal } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import { Star, Heart, Share, IconDenied, IconCaution, IconUTCall, IconMail, IconSuccess, HeartBlack, Admin } from "../../assets/icons"
import { brakeImg, userIcon } from "../../assets/images"
import ModalLogin from "../../components/ModalLogin/ModalLogin"
import { formatUang } from "../../utils/format";
import Viewer from "react-viewer";
import { FaLink } from "react-icons/fa"
import ReactImageMagnify from 'react-image-magnify';
import stagingSuccess from "../../assets/icons/stagingSuccess.png"
import { MENU } from '../../constants/menu';

const ProductDetail = (props) => {
    const [quantity, setQuantity] = useState(1);
    const [description, setDescription] = useState(0);
    const [openModalErrReview, setOpenModalErrReview] = useState(false);
    const [login, setLogin] = useState(false);
    const [seeImage, setSeeImage] = useState(false);
    const [imgAtt, setImgAtt] = useState(false);
    const [modalSuccess, setModalSuccess] = useState(false);

    const [cartItems, setCartItems] = useState([]);

    const productId = props.match.params.productId;
    const linkProduct = window.location.href;

    useEffect(() => {
        async function fetchData() {
            await props.fetchDetailProduct(productId);
        }
        fetchData();
    }, [props.user]);

    const _handleLogin = async (data) => {
        await props.login(data);
        setLogin(false);
    };

    const _seeImage = () => {
        setSeeImage(true);
    }
    const _closeImage = () => {
        setSeeImage(false);
    }
    const imageViewToolbar = (toolbar) => {
        return toolbar.concat([
            {
                key: "copy",
                render: <FaLink onClick={() => buttonCopy()} />
            },
        ]);
    }
    const copy = (text) => {
        let copas = document.createElement('textarea')
        copas.innerText = text
        document.body.appendChild(copas)
        copas.select()
        document.execCommand('copy')
        copas.remove()
    }
    const buttonCopy = () => {
        copy(linkProduct);
        setImgAtt(true);
    }

    const _tambahFavorit = async () => {
        const { user, detailProduct } = props;
        if (detailProduct?.isWishlisted) {
            if (user) {
                await props.fetchDeleteSigleWishlist(user.tokenResponse.accessToken, [productId])
                await props.fetchDetailProduct(productId);
                console.log("DELETE WISHLISTED");
            } else {
                console.log("LOGIN DELETE");
                setLogin(true);
            }
        } else {
            if (user) {
                await props.fetchAddWishlist(user.tokenResponse.accessToken, { productId })
                await props.fetchDetailProduct(productId);
                console.log("ADD WISHLISTED");
            } else {
                console.log("LOGIN ADD");
                setLogin(true);
            }
        }
    };

    const _addToCart = async () => {
        const { user } = props;
        if (user) {
            const p = props.detailProduct;
            const body = {
                poCustomer: "",
                poCustomerDate: "",
                filename: "",
                path: "",
                inquiryNumber: "",
                carts: [{
                    "productId": p.productId,
                    "itemQty": quantity,
                    "price": p.basePrice,
                    "orderType": 1
                }],
                cookiesData: "",
                branchId: null,
            };
            const data = await props.fetchPostCart(user.tokenResponse.accessToken, body);
            console.log("data", data);
            if (data != null && data != "400") {
                console.log("ADDTOCARTSUCCESS");
            } else {
                console.log("ERROR");
            }
            await props.fetchSearchByUserId(user.tokenResponse.accessToken, user.userId);
            setModalSuccess(true);
        } else {
            console.log("LOGINDULU");
            setLogin(true);
        }
    }

    const _renderImage = () => {
        if (props.detailProduct !== null) {
            if (props.detailProduct.imageUrls !== undefined) {
                return (
                    <div className='flex flex-row xl:flex-col lg:flex-col md:flex-col sm:flex-col'>
                        <div className='3xl:pl-12vw xl:ml-12 lg:ml-12 flex justify-center items-center' style={{ flex: "1 1 0%" }}>
                            <div className='h-96 w-96 flex flex-col justify-center items-center p-7 m-2'>
                                {/* <SideBySideMagnifier
                                    imageSrc={props.detailProduct.imageThumbnailUrl}
                                    imageAlt="imageProduct"
                                    alwaysInPlace={true}
                                    fillAvailableSpace={false}
                                /> */}
                                <img src={props.detailProduct.imageThumbnailUrl} className="w-full h-auto md:w-3/6 sm:w-3/6" />
                                <div className="md:ml-8 md:w-80 sm:ml-16 -ml-16 flex flex-row mt-4">
                                    {props.detailProduct.imageUrls.map((item) => {
                                        return (
                                            <div className='flex flex-row'>
                                                <div className='px-2'>
                                                    <img src={item} className="w-16" />
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                        <div className='lg:mt-6 md:-mt-6 sm:-mt-10' style={{ flex: '1 1 0%' }}>
                            {_renderDesc()}
                        </div>
                    </div>
                )
            }
        }
    };

    const _renderDesc = () => {
        if (props.detailProduct !== null) {
            return (
                <div className='ml-6 mr-6'>
                    <p className='text-2xl text-gray-500 lg:text-xl md:text-base sm:text-base'>{props.detailProduct.brandName}</p>
                    <p className='text-3xl font-bold xl:text-2xl lg:text-xl sm:text-lg'>{props.detailProduct.materialName}</p>
                    <div className='flex flex-row items-center my-2'>
                        <img src={Star} className="w-auto h-5 md:h-4 sm:h-4" />
                        <p className="text-xl font-bold ml-4 md:text-base sm:text-base">{props.detailProduct.rating}</p>
                        <p className='text-xl ml-2 text-gray-500 md:text-base sm:text-base'>{`(${props.detailProduct.reviewCount} Ulasan)`}</p>
                    </div>
                    <hr className='borer w-full' />
                    <div className='flex flex-row my-2 items-center md:flex-wrap sm:flex-row'>
                        <p className='text-3xl font-bold md:text-2xl sm:text-2xl' style={{ color: '#fa591d' }}>Rp. {formatUang(props.detailProduct.promotionPrice)}</p>
                        <p className='px-4 line-through md:text-sm sm:text-xs'>Rp. {(props.detailProduct.basePrice).toLocaleString("id-ID")}</p>
                        <div className='flex items-center justify-center bg-red-300 w-12 h-6 rounded-full sm:w-10 sm:h-5'>
                            <p className='text-red-700 text-sm font-semibold'>{props.detailProduct.discountPercent}</p>
                        </div>
                    </div>
                    <hr className='borer w-full' />
                    <div className='flex flex-row my-3 items-center'>
                        <p className='text-lg text-gray-500 w-48 md:text-base sm:text-base sm:w-40'>Kode Produk</p>
                        <p className='text-lg font-bold text-gray-500 md:text-base sm:text-base sm:text-left'>{props.detailProduct.materialNumber}</p>
                    </div>
                    <hr className='borer w-full' />
                    <div className='flex flex-row my-3 items-center'>
                        <p className='text-lg text-gray-500 w-48 md:text-base sm:text-base sm:w-40'>Model Unit</p>
                        <div className='w-auto h-auto p-1 md:text-sm sm:text-sm bg-gray-100 border border-gray-400 rounded-lg text-center font-semibold'>
                            <p>{props.detailProduct.modelUnit}</p>
                        </div>
                    </div>
                    <hr className='borer w-full' />
                    <div className='flex flex-row my-3 items-center'>
                        <p className='text-lg text-gray-500 w-48 md:text-base sm:text-base sm:w-40'>Kategori</p>
                        <p className='text-lg font-bold text-gray-500 md:text-base sm:text-base'>{props.detailProduct.category}</p>
                    </div>
                    <hr className='borer w-full' />
                    <div className='flex flex-row my-3 items-center'>
                        <p className='text-lg text-gray-500 w-48 md:text-base sm:text-base sm:w-40'>Berat</p>
                        <p className='text-lg font-bold text-gray-500 md:text-base sm:text-base'>{`${props.detailProduct.weight} gram`}</p>
                    </div>
                    <hr className='borer w-full' />
                    <div className='flex flex-row my-3 items-center'>
                        <p className='text-lg text-gray-500 w-48 md:text-base sm:text-base sm:w-40'>Dimensi Produk</p>
                        <div className='flex flex-col items-center justify-center'>
                            <p className='flex items-center text-lg font-bold text-gray-500 md:text-base sm:text-base'>{props.detailProduct.length} x {props.detailProduct.width} x {props.detailProduct.height} cm <div className='flex text-sm -mt-3'>3</div></p>
                        </div>
                    </div>
                    <hr className='borer w-full' />
                    <div className='flex flex-row my-3 items-center'>
                        <p className='text-lg text-gray-500 w-48 md:text-base sm:text-base sm:w-40'>Pengiriman</p>
                        <p className='text-lg font-bold text-gray-500 md:text-base sm:text-base'>{props.detailProduct?.isCourierAvaliable ? "Dapat dikirim" : "Ambil di cabang"}</p>
                    </div>
                    <hr className='borer w-full' />
                    <div className='flex flex-row my-3 items-center gap-x-6 2xl:gap-x-2 md:gap-x-1 sm:gap-x-1'>
                        <div className='flex flex-row'>
                            <p className='w-10 h-10 lg:w-8 lg:h-8 md:w-7 sm:h-8 sm:w-7 sm:leading-7 leading-8 text-center border border-gray-300' onClick={quantity < 2 ? null : () => setQuantity(quantity - 1)}>-</p>
                            <p className='w-16 h-10 lg:w-12 lg:h-8 md:w-10 sm:h-8 sm:w-10 sm:leading-7 leading-8 text-center border border-gray-300'>{quantity}</p>
                            <p className='w-10 h-10 lg:w-8 lg:h-8 md:w-7 sm:h-8 sm:w-7 sm:leading-7 leading-8 text-center border border-gray-300' onClick={() => setQuantity(quantity + 1)}>+</p>
                        </div>
                        <button className='w-36 h-12 lg:w-32 lg:h-10 lg:text-sm md:w-28 md:h-10 md:text-xs md:font-bold sm:w-28 sm:h-10 sm:text-xs sm:font-bold font-semibold rounded-lg border border-black'>Beli Sekarang</button>
                        <button className='w-48 h-12 lg:w-44 lg:h-10 lg:text-sm md:w-40 md:h-10 md:text-xs sm:w-36 sm:h-10 sm:text-xs sm:font-bold font-semibold rounded-lg' style={{ backgroundColor: '#ffd500' }}
                            onClick={() => _addToCart()} >Masukkan Keranjang</button>
                    </div>
                </div >
            )
        }
    };

    const _renderDescription = () => {
        if (description === 0) {
            if (props.detailProduct !== null) {
                return (
                    <div className='ml-24 mt-4 2xl:ml-12 xl:ml-12 lg:ml-6 md:ml-1 sm:ml-1'>
                        <p className='text-lg lg:text-base md:text-sm md:break-words sm:text-sm font-semibold text-gray-600'>{props.detailProduct.materialDescription}</p>
                    </div>
                )
            } else {
                if (props.detailProduct !== null) {
                    return (
                        <div className='container mx-auto px-12 mt-4'>
                            {props.reviewProductData?.data.map((item, index) => {
                                console.log("KK", reviewProductData?.data)
                                return (
                                    <>
                                        <div className='mt-4' key={index}>
                                            <img src={item.isAnonymous || !item.profilPicture ? userIcon : "data:image/png;base64," + item.profilPicture}
                                                className="w-10 h-auto"
                                            />lfjdjfnklenflkaen
                                            <div className='flex flex-col'>
                                                <p>{item.fullName}</p>
                                                <img src={item.star} className="w-8 h-auto" />
                                                <p>{item.reviewDate}</p>
                                                <p>{item.reviewDescription}</p>
                                                {item.reviewRepliedDescription ?
                                                    <div className='flex flex-row'>
                                                        <img src={Admin} className="w-10 h-auto" />
                                                        <div className='flex flex-col'>
                                                            <p>Admin UT Connect</p>
                                                            <p>{item.reviewRepliedDate}</p>
                                                            <p>{item.reviewRepliedDescription}</p>
                                                        </div>
                                                    </div> : null}
                                            </div>
                                        </div>
                                    </>
                                )
                            })}
                        </div>
                    )
                }
            }
        }
    };

    const _renderModalErrReview = () => {
        return (
            <Modal
                open={openModalErrReview}
                onClose={() => setOpenModalErrReview(false)}
                className="flex justify-center items-center m-auto p-2"
            >
                <div className='h-75vh 2xl:h-70vh xl:h-60vh md:h-55vh sm:h-50vh bg-white rounded-lg p-4' style={{ maxWidth: '500px', width: '-moz-available' }}>
                    <div className='p-2vw'>
                        <div className='flex flex-col justify-center items-center'>
                            <p className='text-2xl leading-6 font-semibold'>Ulasan Produk</p>
                            <img src={IconCaution} className="w-4/12 mt-8" />
                            <p className='text-lg font-medium text-gray-600 leading-6 tracking-normal my-4 mt-10'>Ulasan produk masih kosong</p>
                            <button className='h-10 w-full rounded-xl font-semibold bg-yellow-400 cursor-pointer'
                                onClick={() => setOpenModalErrReview(false)}>OK</button>
                            <p className='text-sm my-6 font-semibold'>Butuh informasi tambahan? Kontak kami</p>
                            <div className='flex flex-row'>
                                <img src={IconUTCall} className="h-1/5 px-6" />
                                <img src={IconMail} className="h-1/5" />
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        )
    };

    const _renderModalLogin = () => {
        return (
            <ModalLogin
                isOpen={login}
                isClose={() => setLogin(false)}
                login={_handleLogin}
            />
        )
    };

    const _modalSuccess = () => {
        return (
            <Modal open={modalSuccess} onClose={() => setModalSuccess(false)}
                className="flex justify-center items-center m-auto p-4 md:p-6 sm:p-4">
                <div className="flex flex-col items-center justify-center h-auto w-30vw 2xl:w-2/5 xl:w-2/4 lg:w-98 md:w-full sm:w-full p-4 rounded-lg bg-white">
                    <p className='text-2xl lg:text-xl md:text-xl sm:text-xl font-bold tracking-wide mt-4'>Berhasil ditambahkan</p>
                    <img src={stagingSuccess} className="w-28 lg:w-24 md:w-24 sm:w-24 h-auto mt-6" />
                    <p className='text-lg lg:text-base md:text-base sm:text-base font-medium text-gray-500 mt-4'>Lihat barang anda di keranjang</p>
                    <div className='flex flex-row justify-center gap-x-4 mt-4'>
                        <button className='w-36 h-8 lg:w-32 md:w-28 sm:w-28 p-1 rounded-lg font-semibold shadow bg-gray-300'
                            onClick={() => setModalSuccess(false)}>Kembali</button>
                        <button className='w-36 h-8 lg:w-32 md:w-28 sm:w-28 p-1 rounded-lg font-semibold shadow' style={{ backgroundColor: '#ffd500' }}
                            onClick={() => props.push(MENU.BUCKETLIST)}>Lanjutkan</button>
                    </div>
                    <p className='text-sm md:text-xs sm:text-xs mt-4'>Butuh informasi tambahan? Kontak kami</p>
                    <div className='flex flex-row justify-center gap-x-4 mt-4'>
                        <img src={IconUTCall} className="w-16 h-auto" />
                        <img src={IconMail} className="w-14 h-auto" />
                    </div>
                </div>
            </Modal>
        )
    }

    const _imageMagnifier = () => {
        return (
            <div className='mt-28'>
                <ReactImageMagnify
                    {...{
                        smallImage: {
                            alt: "ImageDetail",
                            isFluidWidth: true,
                            src: { brakeImg },
                        },
                        largeImage: {
                            alt: "",
                            src: { brakeImg },
                            width: 1200,
                            height: 1200,
                        },
                        isHintEnabled: true,
                        enlargedImagePosition: 'over',
                        style: { width: '200px', height: '200px' }
                    }}
                />
            </div>
        )
    }

    return (
        <>
            <div className='mt-32 md:mt-16 sm:mt-14 mb-16'>
                <Viewer
                    visible={seeImage}
                    onClose={() => _closeImage()}
                    images={[{ src: props.detailProduct?.imageThumbnailUrl, alt: linkProduct }]}
                    noNavbar={true}
                    noImgDetails={true}
                    attribute={imgAtt}
                    customToolbar={toolbars => imageViewToolbar(toolbars)}
                />
                {_renderImage()}
                <hr className='mt-12' />
                <div className='flex flex-wrap mr-4 ml-4'>
                    <div className='flex flex-row mr-4 sm:mr-2' style={{ flex: '1 1 0%' }}>
                        <p className={description === 0 ? "text-2xl font-bold border-b-4 border-yellow-400 py-1 ml-20 2xl:ml-8 xl:ml-8 xl:text-lg lg:ml-2 lg:text-lg md:ml-2 md:text-base md:font-semibold sm:ml-0 sm:text-base sm:font-semibold cursor-pointer" : "text-2xl font-bold ml-20 2xl:ml-2 xl:ml-8 xl:text-lg lg:ml-2 lg:text-lg md:ml-2 md:text-base md:font-semibold sm:ml-0 sm:text-base sm:font-semibold py-1 text-gray-500 cursor-pointer"}
                            onClick={() => setDescription(0)}>Deskripsi</p>
                        <p className={description === 1 ? "text-2xl font-bold border-b-4 border-yellow-400 py-1 ml-16 2xl:ml-8 xl:ml-8 xl:text-lg lg:ml-4 lg:text-lg md:ml-4 md:text-base md:font-semibold sm:ml-2 sm:text-base sm:font-semibold cursor-pointer" : 'text-2xl font-bold ml-16 2xl:ml-8 xl:ml-8 xl:text-lg lg:ml-4 lg:text-lg md:ml-4 md:text-base md:font-semibold sm:ml-2 sm:text-base sm:font-semibold py-1 text-gray-500 cursor-pointer'}
                            onClick={() => props.detailProduct.reviewCount < 1 ? setOpenModalErrReview(true) : setDescription(1)}>
                            {props.detailProduct !== null ? `Ulasan(${props.detailProduct.reviewCount})` : ''}
                        </p>
                    </div>
                    {props.detailProduct !== null ?
                        <div className='mr-16 lg:mr-8 md:mr-4 sm:mr-4 md:ml-0 sm:ml-0 flex flex-wrap ml-4 justify-end' style={{ flex: '1 1 0%' }}>
                            <div className='flex flex-wrap ml-4 lg:ml-0 md:ml-0 sm:ml-0 items-center'>
                                <p className='ml-20 2xl:ml-12 lg:ml-6 md:ml-0 sm:ml-0 xl:text-base lg:text-base md:text-xs sm:text-xs text-xl text-gray-600 cursor-pointer'
                                    onClick={() => _tambahFavorit()}>Favorit</p>
                                <img src={props.detailProduct.isWishlisted ? Heart : HeartBlack}
                                    className="w-6 h-6 xl:w-5 xl:h-5 lg:w-5 lg:h-5 md:w-5 md:h-5 sm:w-5 sm:h-5 p-1 rounded-full ml-3 xl:ml-1 lg:ml-1 md:ml-1 sm:ml-1 cursor-pointer"
                                    style={props.detailProduct.isWishlisted ? { backgroundColor: '#f1f1f1' } : { backgroundColor: '#f1f1f1' }}
                                    onClick={() => _tambahFavorit()}
                                />
                                <p className='ml-20 2xl:ml-12 xl:ml-4 xl:text-base lg:ml-4 lg:text-base md:ml-4 md:text-xs sm:ml-2 sm:text-xs  text-xl text-gray-600 cursor-pointer'
                                    onClick={() => _seeImage()}>Bagikan</p>
                                <img src={Share} className="w-6 h-6 xl:w-5 xl:h-5 lg:w-5 lg:h-5 md:w-5 md:h-5 sm:w-5 sm:h-5 p-1 bg-gray-300 rounded-full ml-3 xl:ml-1 xl:-mr-6 lg:ml-1 lg:-mr-6 md:ml-1 md:-mr-6 sm:ml-1 sm:-mr-6 cursor-pointer"
                                    onClick={() => _seeImage()} />
                            </div>
                        </div> : null}
                </div>
                <hr />
                {_renderDescription()}
                {_renderModalErrReview()}
                {_renderModalLogin()}
                {_modalSuccess()}
                {/* {_imageMagnifier()} */}
            </div>
        </>
    )
}
export default ProductDetail;