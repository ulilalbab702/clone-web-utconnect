import React, { useState, useEffect } from 'react'
import { brakeImg } from "../../assets/images"
import { Bin, IconDeleteBin, IconArrowLeft, IconTicket } from "../../assets/icons"
import { formatUang } from '../../utils/format'
import { MENU } from '../../constants/menu'
import ModalConfirm from './component/ModalConfirm'

const BucketList = (props) => {
    const [quantity, setQuantity] = useState(1);
    const [allCartList, setAllCartList] = useState([]);
    const [cartId, setCartId] = useState();
    const [selectAll, setSelectAll] = useState(false);
    const [buy, setBuy] = useState({});
    const [modalConfirm, setModalConfirm] = useState(false);

    useEffect(() => {
        async function fetchSearchCartId() {
            const { user } = props;
            await props.fetchSearchByUserId(user.tokenResponse.accessToken, user.userId);
        }
        fetchSearchCartId();
    }, [props.user]);

    useEffect(() => {
        async function fetchIdCart() {
            const { dataCart } = props;
            if (dataCart) {
                const idCart = dataCart.cartId;
                setCartId(idCart);
            }
        }
        fetchIdCart();
    }, [props.dataCart]);

    useEffect(() => {
        async function fetchData() {
            const { user } = props;
            await props.fetchListCartByCartId(user.tokenResponse.accessToken, cartId);
        }
        fetchData();
    }, [cartId, props.user]);

    useEffect(() => {
        if (props.dataCartList != null) {
            const list = props.dataCartList.data.cartDetail;
            setAllCartList(list);
        } else {
            setAllCartList([]);
        }
    }, [props.dataCartList]);

    const _bayar = (data) => {
        const newData = data.filter(item => item.select == true);
        const tax = 11;
        let total = 0;
        for (let i = 0; newData.length > i; i++) {
            total += newData[i].price * newData[i].itemQty;
        }
        let newArr = {
            subTotal: total,
            ppn: total * tax / 100,
            hargaTotal: total + (total * tax / 100),
        }
        setBuy(newArr);
    }

    const _deleteProduct = async (index) => {
        const { user } = props;
        let cartDetailId = null;
        let cartDelete = allCartList.filter((item) => item.cartDetailId == index);
        cartDetailId = cartDelete[0].cartDetailId;
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
        }
        setAllCartList(newCheckBox);
        await props.deleteCartDetail(user.tokenResponse.accessToken, cartDetailId);
    }

    const _deleteAll = async () => {
        const { user } = props;
        var newArr = allCartList.filter((item) => item.select != true);
        const newBox = [];
        for (let i = 0; newArr.length > i; i++) {
            const array = {
                id: i,
                select: newArr[i].select,
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
            newBox.push(array);
        }
        setAllCartList(newBox);
        const body = {};
        await props.allCartDelete(user.tokenResponse.accessToken, cartId, body);
    }

    const updateQty = (value, index) => {
        if (value === "tambah") {
            let newArr = allCartList.map((item, i) => {
                if (index === i) {
                    return {
                        ...item,
                        ['itemQty']: item.itemQty + 1,
                    }
                } else {
                    return item
                }
            })
            setAllCartList(newArr)
            _bayar(newArr)
        } else {
            let newArr = allCartList.map((item, i) => {
                if (index === i) {
                    return {
                        ...item,
                        ['itemQty']: item.itemQty - 1,
                    }
                } else {
                    return item
                }
            })
            setAllCartList(newArr)
            _bayar(newArr)
        }
    }

    const _select = (event, index) => {
        let newArr = allCartList.map((item, i) => {
            if (index === i) {
                return {
                    ...item,
                    ["select"]: event.target.checked,
                };
            } else {
                return item;
            }
        });
        setAllCartList(newArr);
        _bayar(newArr);
        setSelectAll(event.target.checked ? false : false);
    };

    const _selectAll = (event) => {
        const selectAll = event.target.checked;
        const newBox = [];
        for (let i = 0; allCartList.length > i; i++) {
            const array = {
                id: i,
                select: selectAll,
                cartDetailId: allCartList[i].cartDetailId,
                brandName: allCartList[i].brandName,
                productId: allCartList[i].productId,
                imageThumbnailUrl: allCartList[i].imageThumbnailUrl,
                productHierarchy: allCartList[i].productHierarchy,
                partNumber: allCartList[i].partNumber,
                partDescription: allCartList[i].partDescription,
                weight: allCartList[i].weight,
                uom: allCartList[i].uom,
                currency: allCartList[i].currency,
                itemQty: allCartList[i].itemQty,
                basePrice: allCartList[i].basePrice,
                percentDiscount: allCartList[i].percentDiscount,
                price: allCartList[i].price,
                display: allCartList[i].display,
                orderType: allCartList[i].orderType,
                isAvailablePrice: allCartList[i].isAvailablePrice,
                isAvailableStock: allCartList[i].isAvailableStock,
            };
            newBox.push(array);
        }
        setAllCartList(newBox);
        setSelectAll(event.target.checked);
        _bayar(newBox);
    }

    const checkoutItem = async (cart) => {
        const body = {
            poCustomer: '03904890284',
            filename: 'PO20220627_0237_ST 041 WFO DAD Group_2_06-31Des21.pdf',
            poCustomerDate: '2022-06-22T02:55:59.4359308',
            carts: [],
            branchId: '83c73c9a-af1e-408a-7cfa-08d930973229',
        };
        for (let i = 0; allCartList.length > i; i++) {
            if (allCartList[i].select) {
                const array = {
                    productId: allCartList[i].productId,
                    itemQty: allCartList[i].itemQty,
                    price: allCartList[i].price,
                };
                body.carts.push(array);
            }
        }
        const { user } = props;
        const accessToken = user.tokenResponse.accessToken;
        if (body.carts.length == 0) {
            console.log("ERRORCARTS");
        } else {
            await props.fetchPutCartListByCartId(cart, body, accessToken);
            const { dataPut } = props;
            if (dataPut != null) {
                console.log("BERHASIL");
                props.push(MENU.BILLING, cart);
            }
            setModalConfirm(true);
        }
    }

    const _renderBucketList = () => {
        return (
            <div>
                <p className='text-2xl lg:text-xl md:text-xl sm:text-lg font-bold mb-4'>Keranjang</p>
                <div className='flex flex-row lg:flex-col md:flex-col sm:flex-col'>
                    <div className='pr-4 flex flex-grow w-100% mr-6 xl:mr-1 lg:mr-0 lg:mb-8 md:mr-0 md:mb-6 sm:mr-0 sm:mb-6'>
                        <div className='flex flex-col mr-4 lg:mr-0 md:mr-0 sm:mr-0 w-full'>
                            <div className='flex flex-row'>
                                <input
                                    type='checkbox'
                                    className='cursor-pointer'
                                    checked={selectAll}
                                    onChange={(event) => _selectAll(event)}
                                />
                                <div className='flex flex-row lg:text-sm md:text-sm sm:text-sm justify-between pl-2vw w-full'>
                                    <p className='text-gray-700 font-semibold cursor-pointer'>
                                        Pilih Semua
                                    </p>
                                    {selectAll
                                        ? <p className='text-red-600 font-semibold' onClick={() => _deleteAll()}>Hapus</p>
                                        : null}
                                </div>
                            </div>
                            <hr className='border-2 mt-4 w-full border-gray-200' />
                            <div className='mt-4'>
                                {allCartList.map((item, index) => (
                                    <div className='flex flex-col mb-4' key={index}>
                                        <div className='flex flex-row items-center gap-2'>
                                            <input
                                                type='checkbox'
                                                className='cursor-pointer'
                                                checked={item.select}
                                                onChange={(event) => _select(event, index)}
                                            />
                                            <img src={item.imageThumbnailUrl ? item.imageThumbnailUrl : brakeImg} className="w-24 h-24 lg:w-20 lg:h-auto md:w-20 md:h-auto sm:w-20 sm:h-auto" />
                                            <div>
                                                <p className='font-semibold mb-1 text-lg lg:text-base md:text-base sm:text-base'>{item.partDescription}</p>
                                                <p className={item.isAvailableStock
                                                    ? 'w-16 h-5 text-center text-sm font-semibold rounded bg-green-100'
                                                    : 'w-16 h-5 text-center text-sm font-semibold rounded bg-red-200'} style={item.isAvailableStock ? { color: '#03AC0E' } : { color: 'red' }}>{item.isAvailableStock ? "Tersedia" : "Kosong"}</p>
                                                <div className='flex flex-row mt-1 gap-2 items-center'>
                                                    <p className={item.percentDiscount
                                                        ? 'flex items-center justify-center font-bold text-xs h-5 w-7 rounded bg-red-600 text-white'
                                                        : null}>{item.percentDiscount}</p>
                                                    {item.percentDiscount ?
                                                        <p className='text-sm lg:text-xs md:text-xs sm:text-xs line-through text-gray-500 font-semibold'>Rp {formatUang(item.basePrice)}</p>
                                                        : null}
                                                    <p className='font-semibold text-lg lg:text-base md:text-base sm:text-base'>Rp {formatUang(item.price)}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='mt-4 ml-5 flex flex-row justify-between'>
                                            <div className='text-sm font-semibold' style={{ color: '#03AC0E' }}><p>Tulis Catatan</p></div>
                                            <div className='flex flex-row items-center'>
                                                <div className='flex flex-row gap-4 items-center text-gray-500'>
                                                    {/* <p className='text-sm font-semibold'>Pindahkan ke Wishlist</p>
                                                    <p className='font-bold'>|</p> */}
                                                    <img src={IconDeleteBin} onClick={() => _deleteProduct(item.cartDetailId)} className="cursor-pointer" />
                                                </div>
                                                <div className='flex flex-row gap-6 md:gap-3 sm:gap-3 ml-8 items-center'>
                                                    {item.itemQty == 1 ? (
                                                        <p className='w-6 h-6 rounded-full font-semibold border-gray-400 border-2 leading-4 text-center'>-</p>
                                                    ) : (
                                                        <p className='w-6 h-6 rounded-full font-semibold cursor-pointer border-black border-2 leading-4 text-center'
                                                            onClick={() => updateQty("kurang", index)}>-</p>
                                                    )}
                                                    <p className='text-lg text-gray-600 cursor-pointer'>{item.itemQty}</p>
                                                    <p className='w-6 h-6 rounded-full font-semibold cursor-pointer border-black border-2 leading-4 text-center'
                                                        onClick={() => updateQty("tambah", index)}>+</p>
                                                </div>
                                            </div>
                                        </div>
                                        <hr className='border-2 mt-4 w-full border-gray-200' />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-grow max-w-35% lg:max-w-100% md:max-w-100% sm:max-w-100% h-full'>
                        {_renderTotal()}
                    </div>
                </div>
            </div>
        )
    };

    const _renderTotal = () => {
        return (
            <div className='w-full rounded-lg shadow'>
                <div className='p-4'>
                    <div className='w-full h-14 flex flex-row justify-between items-center p-2 border rounded'>
                        <img src={IconTicket} className="mr-3 md:w-8 sm:w-8" />
                        <p className='font-semibold text-gray-600 md:text-sm sm:text-sm'>Makin hemat pakai promo</p>
                        <img src={IconArrowLeft} className="w-auto h-3 ml-auto" />
                    </div>
                </div>
                <hr className='w-full border-2 text-gray-500 mt-2' />
                <div className='p-4'>
                    <p className='text-lg lg:text-base md:text-base sm:text-base font-semibold mb-3'>Ringkasan belanja</p>
                    <div className='flex flex-row justify-between text-gray-600 lg:text-sm md:text-sm sm:text-sm' >
                        <p className=''>Subtotal</p>
                        <p>Rp {formatUang(buy.subTotal ? buy.subTotal : 0)}</p>
                    </div>
                    <div className='flex flex-row justify-between text-gray-600 lg:text-sm md:text-sm sm:text-sm' >
                        <p className=''>PPN</p>
                        <p>Rp {formatUang(buy.ppn ? buy.ppn : 0)}</p>
                    </div>
                    <hr className='w-full mt-4' />
                    <div className='flex flex-row justify-between font-semibold mt-2 text-lg lg:text-base md:text-base sm:text-base'>
                        <p>Total harga</p>
                        <p>Rp {formatUang(buy.hargaTotal ? buy.hargaTotal : 0)}</p>
                    </div>
                    <button onClick={() => checkoutItem(cartId)}
                        className='w-full h-10 lg:h-8 md:h-8 sm:h-8 rounded-lg font-semibold text-lg text-white cursor-pointer mt-4' style={{ backgroundColor: '#ffd500' }}>Beli</button>
                </div>
            </div>
        )
    }

    const _renderListCart = () => {
        if (allCartList !== null) {
            return (
                <>
                    <div>
                        {allCartList.map((item, index) => (
                            <div key={index}>
                                <img src={item.imageThumbnailUrl} className="w-14 h-auto" />
                            </div>
                        ))}
                    </div>
                </>
            )
        }
    }

    return (
        <div className='mt-28 px-10vw xl:px-4vw lg:px-4vw md:px-4vw sm:px-3vw'>
            {_renderBucketList()}
            <ModalConfirm 
            isOpen={modalConfirm}
            isClose={() => setModalConfirm(false)}
            cancel={() => setModalConfirm(false)}
            order={() => checkoutItem(cartId)}
            />
            {/* {_renderListCart()} */}
        </div>
    )
}

export default BucketList