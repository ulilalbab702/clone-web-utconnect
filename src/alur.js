import { MENU } from '../../constants/menu';
import { Star, Heart, Share, IconDenied, IconCaution, IconUTCall, IconMail, IconSuccess, HeartBlack, Admin } from "../../assets/icons"
import { userIcon } from "../../assets/images"
import { Modal } from '@material-ui/core';
import Viewer from 'react-viewer';
import { FaLink, FaEnvelope, FaFacebookF, FaShareAlt, FaTwitter, FaWhatsapp } from "react-icons/fa"
import { EmailShareButton, FacebookShareButton, TwitterShareButton, WhatsappShareButton } from 'react-share';
import ModalLogin from "../../components/ModalLogin/ModalLogin";

const [openModalErrReview, setOpenModalErrReview] = useState(false);
const [viewImage, setViewImage] = useState(false);
const [imageAttribute, setImageAttribute] = useState(false);
const [login, setLogin] = useState(false);

const productId = props.match.params.productId;
const productUrl = window.location.href;
const cleanUrl = productUrl;

const _handleAddWishList = async () => {
    const { user, detailProduct } = props;
    if (detailProduct?.isWishlisted) {
        if (user) {
            await props.fetchDeleteSigleWishlist(user.tokenResponse.accessToken, [productId])
            await props.fetchDetailProduct(productId)
            console.log("DELETE WISHLIST");
        } else {
            setLogin(true);
        }
    } else {
        if (user) {
            await props.fetchAddWishlist(user.tokenResponse.accessToken, { productId });
            await props.fetchDetailProduct(productId);
            console.log("ADD WISHLIST");
        } else setLogin(true);
    }
};

const _handleLogin = async (data) => {
    await props.login(data);
    setLogin(false);
};

const _handleShowImage = () => {
    setViewImage(true);
    setImageAttribute(false);
}
const _handleCloseImage = () => {
    setViewImage(false);
}

const createImageViewToolbar = (toolbar) => {
    return toolbar.concat([
        {
            key: "facebook",
            render: <FacebookShareButton url={cleanUrl}>
                <FaFacebookF />
            </FacebookShareButton>,
        },
        {
            key: "twitter",
            render: <TwitterShareButton>
                <FaTwitter />
            </TwitterShareButton>,
        },
        {
            key: "wa",
            render: <WhatsappShareButton>
                <FaWhatsapp />
            </WhatsappShareButton>,
        },
        {
            key: "email",
            render: <EmailShareButton>
                <FaEnvelope />
            </EmailShareButton>,
        },
        {
            key: "copy",
            render: <FaLink onClick={() => onCopyImageButtonClick()} />,
        },
    ]);
}

const copyToClipboard = (text) => {
    let textField = document.createElement('textarea')
    textField.innerText = text
    document.body.appendChild(textField)
    textField.select()
    document.execCommand('copy')
    textField.remove()
}

const onCopyImageButtonClick = () => {
    copyToClipboard(cleanUrl);
    setImageAttribute(true);
}


const _renderDescription = () => {
    if (description === 0) {
        if (props.detailProduct != null) {
            return (
                <div className='container mx-auto px-12 mt-4'>
                    <div>
                        {props.detailProduct.materialDescription ? props.detailProduct.materialDescription : ""}
                    </div>
                </div>
            );
        }
    } else {
        if (props.detailProduct !== null) {
            return (
                <div>
                    {props.reviewProductData?.data.map((revw, index) => {
                        return (
                            <>
                                <div className='mt-8' key={index}>
                                    <div>
                                        <img src={revw.isAnonymous || !revw.profilPicture ? userIcon : "data:image/png;base64," + revw.profilPicture}
                                            className="w-auto h-6" />
                                        <div className='flex flex-col'>
                                            <p>{revw.fullName}</p>
                                            <p>{revw.reviewDate}</p>
                                            <p>{revw.reviewDescription}</p>
                                            {revw.reviewRepliedDescription ?
                                                <div className='flex flex-row'>
                                                    <img src={Admin} className="w-auto h-6" />
                                                    <div className='flex flex-col'>
                                                        <p>Admin UT connect</p>
                                                        <p>{props.reviewRepliedDate}</p>
                                                        <p>{revw.reviewRepliedDescription}</p>
                                                    </div>
                                                </div> : null}
                                        </div>
                                    </div>
                                </div>
                                <hr className='w-full border' />
                            </>
                        )
                    })}
                </div>
            );
        }
    }
};

const _renderModalErrReview = () => {
    return (
        <Modal
            open={openModalErrReview}
            onClose={() => setOpenModalErrReview(false)}
            style={{ borderRadius: '10px' }}
            className="flex justify-center items-center m-auto p-0">
            <div style={{ height: "65vh", width: "25%" }}
                className="flex flex-col items-center justify-center p-4 rounded-lg bg-white"
            >
                <p className="text-2xl font-bold my-2">Ulasan Produk</p>
                <div className="my-4">
                    <img src={IconCaution} className="w-auto h-24" />
                </div>
                <p className="mb-4 text-xl text-gray-500">Ulasan Produk masih kosong</p>
                <div className="flex justify-center items-center">
                    <button className="h-9 w-72 font-semibold rounded-lg"
                        style={{ backgroundColor: '#ffd500' }}
                        onClick={() => setOpenModalErrReview(false)}
                    >OK</button>
                </div>
                <p className="mt-6 text-sm">Butuh informasi tambahan? Kontak kami</p>
                <div className="flex flex-row justify-center items-center mt-6 cursor-pointer">
                    <img src={IconUTCall} className="w-auto h-10 px-8" />
                    <img src={IconMail} className="w-auto h-10" />
                </div>
            </div>
        </Modal>
    )
}

<div onClick = {() => { props.detailProduct.reviewCount < 1 ? setOpenModalErrReview(true) : setDescription(1) }}></div>

{
    props.detailProduct !== null ?
        <div className='flex flex-row items-center justify-end' style={{ flex: '1' }}>
            <p className='text-2xl text-gray-600 -mr-16 px-4 cursor-pointer' onClick={() => _handleAddWishList()}>Favorit</p>
            <div className='w-6 h-6 rounded-full bg-gray-300 mx-14 flex items-center justify-center'>
                <img src={props.detailProduct.isWishlisted ? Heart : HeartBlack} className="w-3 h-auto cursor-pointer" onClick={() => _handleAddWishList()} />
            </div>
            <p className='text-2xl text-gray-600 px-2 cursor-pointer' onClick={() => _handleShowImage()}>Bagikan</p>
            <div className='w-6 h-6 rounded-full bg-gray-300 cursor-pointer flex items-center justify-center' onClick={() => _handleShowImage()}>
                <img src={Share} className="w-3 h-auto" />
            </div>
        </div> : null
}


{ _renderDescription() }
{ _renderModalErrReview() }
{ _renderModalLogin() }

<Viewer
    visible={viewImage}
    onClose={() => _handleCloseImage()}
    onMaskClick={() => _handleCloseImage()}
    images={[{ src: props.detailProduct?.imageThumbnailUrl, alt: 'Copied to clipboard: ' + cleanUrl }]}
    noNavbar={true}
    attribute={imageAttribute}
    zoomSpeed={0.1}
    noImgDetails={true}
    rotatable={false}
    scalable={false}
    changeable={false}
    showTotal={false}
    customToolbar={toolbar => createImageViewToolbar(toolbar)}
/>

const _renderModalLogin = () => {
    return (
        <ModalLogin
            isOpen={login}
            isClose={() => setLogin(false)}
            login={_handleLogin}
        />
    )
}


const _masukKeranjang = async () => {
    const { user } = props;
    if (user) {
        const body = {
            poCustomer: "",
            poCustomerDate: "",
            filename: "",
            path: "",
            inquiryNumber: "",
            carts: [{
                "productId": productId,
                "itemQty": quantity,
                "price": props.detailProduct.basePrice,
                "orderType": 1
            }],
            cookiesData: "",
            branchId: null,
        }
        const data = await props.fetchPostCart(user.tokenResponse.accessToken, body);
        if (data != null && data != "400") {
            console.log("TAMBAH KE KERANJANG BERHASIL");
        }
        await props.fetchSearchByUserId(user.tokenResponse.accessToken, user.userId);
    } else {
        console.log("LOGIN DULU")
    }

}


const _deleteProduct = async (index) => {
    const { user } = props;
    let cartDetailId = null;
    let cartDelete = allCartList.filter((item) => item.cartDetailId == index);
    cartDetailId = cartDelete[0].cartDetailId;
    console.log("CARTDELETE", cartDelete);
    var newArr = allCartList.filter((item) => item.cartDetailId != index);
    const newCheckBox = [];
    for (let i = 0; newArr.length > i; i++) {
        const array = {
            id: i,
            select: false,
            cartDetailId: newArr[i].cartDetailId,
            brandName: newArr[i].brandName,
            productId: newArr[i].productId,
            imageThumbnailUrl: newArr[i].imageThumbnailUrl,
            productHierarchy: newArr[i].productHierarchy,
            partNumber: newArr[i].partNumber,
            partDescription: newArr[i].partDescription,
            weight: newArr[i].weight,
            uom: newArr[i].uom,
            currency: newArr[i].currency,
            itemQty: newArr[i].itemQty,
            basePrice: newArr[i].basePrice,
            percentDiscount: newArr[i].percentDiscount,
            price: newArr[i].price,
            display: newArr[i].display,
            orderType: newArr[i].orderType,
            isAvailablePrice: newArr[i].isAvailablePrice,
            isAvailableStock: newArr[i].isAvailableStock,

        };
        newCheckBox.push(array);
        console.log("CEKBOX", newCheckBox);
    }
    setAllCartList(newCheckBox);
    await props.deleteCartDetail(user.tokenResponse.accessToken, cartDetailId);
}

const [data, setData] = useState([
    {
        img: AccountPic,
        name: "Nike React Phantom Run Flyknit 2",
        size: "L",
        color: "Black",
    },
    {
        img: AccountPic,
        name: "Men Classic Eau De Toilette 100ml",
        size: "100ml",
        color: null,
    },
    {
        img: AccountPic,
        name: "Bold White Plastic's Strap Watch's",
        size: "L",
        color: "Black"
    },
]);

const _orderPage = () => {
    return (
        <div className='px-10vw'>
            <div className='flex flex-row gap-x-8'>
                <div className='w-64 h-screen rounded-lg bg-gray-400'>pertama</div>
                <div className='w-4/5 h-screen rounded-lg bg-gray-300'>
                    <div className='flex-col'>
                        <div className='p-4 flex flex-wrap gap-x-8'>
                            <p>Order ID: 908843320985</p>
                            <p>Placed on: 01 Jan, 2022</p>
                            <p>Delivered on: 03 Jan, 2022</p>
                        </div>
                        <hr className='w-full border' />
                        <div className='p-4'>
                            <div>
                                {data.map((item, index) => {
                                    return (
                                        <div className='flex flex-wrap gap-x-16 items-center' key={index}>
                                            <div className='flex flex-col'>
                                                <img src={item.img} />
                                                <p>$145 x 1</p>
                                            </div>
                                            <p>{item.name}</p>
                                            <p>Product properties: {item.size}, {item.color}</p>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}