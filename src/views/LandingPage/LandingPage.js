import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import { IconWarehouse, IconCloud, IconDeleteBin } from "../../assets/icons";
import { setStorage, getStorage } from "../../utils/storage.helper"
import { Modal } from "@material-ui/core";
import {
  IconLogin,
  IconUTCall,
  IconMail,
  IconArrowLeft,
  IconGoogle,
  IconCaution,
  IconAsk,
  IconFile,
  IconFileAdd,
  IconCSV,
  IconUploadFile
} from "../../assets/icons"
import ModalSelectBranch from "./components/ModalSelectBranch";
import { MENU } from "../../constants/menu";
import { Progress } from "react-sweet-progress";
import ModalLogin from "../../components/ModalLogin/ModalLogin";

const LandingPage = (props) => {
  const CHECK_STOCK = getStorage("CHECK_STOCK");
  const [screenWidth, setScreen] = useState(window.innerWidth);
  const [openTab, setOpenTab] = useState(1);
  const [listMaterial, setMaterial] = useState([
    {
      no: 1,
      partNumber: null,
      partDesc: null,
      qty: null,
      mou: null,
      price: null,
      amount: null,
      checklist: false,
    },
    {
      no: 2,
      partNumber: null,
      partDesc: null,
      qty: null,
      mou: null,
      price: null,
      amount: null,
      checklist: false,
    },
    {
      no: 3,
      partNumber: null,
      partDesc: null,
      qty: null,
      mou: null,
      price: null,
      amount: null,
      checklist: false,
    },
    {
      no: 4,
      partNumber: null,
      partDesc: null,
      qty: null,
      mou: null,
      price: null,
      amount: null,
      checklist: false,
    },
    {
      no: 5,
      partNumber: null,
      partDesc: null,
      qty: null,
      mou: null,
      price: null,
      amount: null,
      checklist: false,
    },
  ]);
  const [newListMaterial, setNewListMaterial] = useState(listMaterial);
  const [selectAll, setAll] = useState(false);
  const [checkPrice, setCheckPrice] = useState(getStorage('CHECK_PRICE'));
  const [partNumber, setPartNumber] = useState("");
  const [dataNotNull, setData] = useState(false);
  const [materialNumber, setMaterialNumber] = useState(false);
  const [branchSelect, setBranchSelect] = useState(getStorage("BRANCH_ACTIVE"));
  const [login, setLogin] = useState(false);
  const [dataUser, setDataUser] = useState({
    username: "testutconnect@gmail.com",
    password: "Scania,2020"
  });
  const [openModalError, setOpenModalError] = useState(false);
  const [branchListOrder, setBranchListOrder] = useState([]);
  const [branch, setBranch] = useState(CHECK_STOCK?.branch ? CHECK_STOCK?.branch : "");
  const [modalSelect, setModal] = useState(false);
  const [openModalConfirmCabang, setOpenModalConfirmCabang] = useState(false);
  const [openModalErrorCabang, setOpenModalErrorCabang] = useState(false);
  const [openModalUpload, setOpenModalUpload] = useState(false);
  const [nameFile, setFileCsv] = useState("");
  const [fileCsv, setFile] = useState("");

  useEffect(() => {
    async function fetchImgSlider() {
      await props.fetchImageslider();
    }
    async function fetchBrand() {
      await props.fetchListBrand();
    }
    fetchImgSlider();
    fetchBrand();
  }, []);

  useEffect(() => {
    if (props.user && props.user.customerCode !== 'ONETIMESTD') {
      getBranchList();
    }
    async function fetchBrandUnauth() {
      const data = await props.fetchGetBranchList(null, true, branch);
      if (data != null && data != '400') {
        setBranchListOrder(data.data);
      }
    }
    fetchBrandUnauth();
  }, [props.user, branch]);

  const getBranchList = async () => {
    const { user } = props;
    const data = await props.fetchGetBranchList(user.tokenResponse.accessToken, false, "");
    if (data != null && data != "400") {
      setBranchListOrder(data.data);
    }
  };

  useEffect(() => {
    const { user } = props;
    let params = {
      PageNumber: 1
    }
    async function getProductList() {
      if (user) {
        await props.fetchListProduct(user.tokenResponse.accessToken, params, 10);
      } else {
        await props.fetchListProduct(null, params, 10);
      }
    }
    getProductList();
  }, [])

  const _klikPesanCepat = () => {
    if (props.user) {
      if (props.user.customerCode === "ONETIMESTD") {
        setOpenModalError(true);
      } else {
        setOpenTab(2)
      }
    } else {
      console.log("harus login");
      setLogin(true)
    }
  }

  const _pesanCepat = () => {
    const userLogin = getStorage("USER");
    if (userLogin) {
      setOpenTab(2)
    } else {
      setLogin(true)
    }
  }

  const _addRowsMaterial = () => {
    if (listMaterial.length <= 500) {
      const dataNew = [];
      for (let i = 0; i < 5; i++) {
        const array = {
          no: listMaterial.length + 1 + i,
          partNumber: null,
          partDesc: null,
          qty: null,
          mou: null,
          amount: null,
          checklist: false,
        };
        dataNew.push(array);
      }
      setMaterial(listMaterial.concat(dataNew));
    }
  };

  const _checklist = (event, index) => {
    let newArr = listMaterial.map((item, i) => {
      if (index === i) {
        return {
          ...item,
          ["checklist"]: event.target.checked,
        };
      } else {
        return item;
      }
    });
    setMaterial(newArr);
    setAll(event.target.checked ? false : false);
  };

  const _checklistAll = (event) => {
    const selectAll = event.target.checked;
    const newCheckBoxObj = [];
    for (let i = 0; listMaterial.length > i; i++) {
      const array = {
        checklist: selectAll,
        no: listMaterial[i].no,
        partNumber: listMaterial[i].partNumber,
        partDesc: listMaterial[i].partDesc,
        qty: listMaterial[i].qty,
        mou: listMaterial[i].mou,
        price: listMaterial[i].price,
        amount: listMaterial[i].amount,
        availability: listMaterial[i].availability,
        productId: listMaterial[i].productId,
      };
      newCheckBoxObj.push(array);
    }
    setMaterial(newCheckBoxObj);
    setAll(event.target.checked);
  }

  const _deleteCheckList = () => {
    let myArray = listMaterial;
    var newArray = myArray.filter((item) => item.checklist != true);
    const newCheckBoxObj = [];
    for (let i = 0; newArray.length > i; i++) {
      document.getElementById(`"partNumber"${i}`).value = '';
      document.getElementById(`"qty"${i}`).value = '';
      const array = {
        productId: newArray[i].productId,
        checklist: newArray[i].checklist,
        no: i + 1,
        partNumber: newArray[i].partNumber,
        partDesc: newArray[i].partDesc,
        qty: newArray[i].qty,
        mou: newArray[i].mou,
        price: newArray[i].price,
        amount: newArray[i].amount,
      };
      newCheckBoxObj.push(array);
    }
    setMaterial(newCheckBoxObj);
    localStorage.setItem('listMaterial', JSON.stringify(newCheckBoxObj))
  };

  const _eventInput = (event, index) => {
    setCheckPrice(false);
    setStorage('CHECK_PRICE', false)
    if (event.length > 0 && event > 0) {
      let newArr = listMaterial.map((item, i) => {
        if (index == i) {
          return {
            ...item,
            ["qty"]: event,
          };
        } else {
          return item;
        }
      });
      setMaterial(newArr);
      localStorage.setItem('listMaterial', JSON.stringify(newArr))
    } else if (event.length === 0) {
      let newArr = listMaterial.map((item, i) => {
        if (index == i) {
          return {
            ...item,
            ["qty"]: null,
          };
          return item;
        }
      });
      setMaterial(newArr);
      localStorage.setItem('listMaterial', JSON.stringify(newArr))
    }
  };

  const _eventInputPart = (event, index) => {
    setPartNumber(event.target.value.toUpperCase());
    setCheckPrice(false);
    setStorage('CHECK_PRICE', false)
    if (event.target.value.length > 0) {
      let newArr = listMaterial.map((item, i) => {
        if (index == i) {
          return {
            ...item,
            ["no"]: index + 1,
            ["partNumber"]: event.target.value.toUpperCase(),
          };
        } else {
          return item;
        }
      });
      setData(true);
      setMaterial(newArr);
      localStorage.setItem('listMaterial', JSON.stringify(newArr))
    } else {
      let newArr = listMaterial.map((item, i) => {
        if (index == i) {
          return {
            ...item,
            ["partNumber"]: null,
          };
        } else {
          return item;
        }
      });
      setMaterial(newArr);
      localStorage.setItem('listMaterial', JSON.stringify(newArr))
    }
  };



  const _renderImagePromotion = () => {
    if (props.loadingPromo) {
      return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <h3>loading...</h3>
        </div>
      );
    } else if (props.imageSlider != null) {
      return (
        <div style={{ margin: '0 6rem', marginLeft: '7rem', display: 'flex', flexDirection: 'column' }}>
          {(props.imageSlider.data || props.imageSlider).map((item, index) => {
            return (
              <div
                style={{ margin: '0 30px' }}
                key={index}
              >
                <img className="imgSliderLanding" style={{ borderRadius: "15px", cursor: 'pointer', width: '50%' }} src={item.imageUrl} />
              </div>
            );
          })}

          <span
            className="viewAllLanding"
          >Lihat Lainnya</span>
        </div>
      );
    }
  };

  const _renderSelectByBrand = () => {
    if (props.loadingBrand) {
      return (
        <div>loading...</div>
      );
    } else if (props.brandData != null && props.brandData.length > 0) {
      return (
        <>
          <div className="mt-28">
            <p className="font-sans font-semibold text-2xl 2xl:text-xl xl:text-xl lg:text-xl md:text-xl sm:text-xl">Pilih Berdasarkan Brand</p>
          </div>
          <div className="flex flex-wrap mt-8 gap-x-6 3xl:gap-x-8 2xl:gap-x-2 2xl:gap-y-8 xl:gap-x-2 xl:gap-y-8 lg:px-4vw lg:gap-x-8 lg:gap-y-10 md:gap-x-6 md:gap-y-10 md:justify-center sm:gap-x-1 sm:gap-y-10">
            {props.brandData != null && props.brandData.map((item, index) => {
              return (
                <>
                  <div className="flex flex-col items-center w-auto h-auto rounded-lg p-1 2xl:p-0 2xl:h-60 xl:p-0 xl:h-60 md:p-0 md:h-56 md:w-36 sm:h-56 sm:w-36" key={index}
                    style={
                      item.name == "KOMATSU" ? { backgroundColor: "#ffd500" }
                        : item.name == "SCANIA" ? { backgroundColor: "#51AAE1" }
                          : item.name == "UD TRUCK" ? { backgroundColor: "#D41837", }
                            : item.name == "TADANO" ? { backgroundColor: "#85A6FD" } : { backgroundColor: "#0F3460" }}
                  >
                    <div className="flex justify-center items-center w-36 h-9 md:w-32 md:h-8 sm:w-32 sm:h-8 -mt-6 border 2xl:-mt-4 xl:-mt-4 md:-mt-4 sm:-mt-4 rounded-lg bg-white shadow-md">
                      <img src={item.imageUrl} className="w-24" />
                    </div>
                    <img className="mt-10 2xl:mt-6 xl:mt-6 md:mt-10 w-auto h-24 lg:h-28 sm:mt-10" src={item.additionalImage} alt="logoimg" />
                    <button className="w-40 md:w-32 sm:w-32 mt-16 md:mt-8 sm:mt-8 mx-1 mb-2 rounded-lg h-8 text-sm bg-white font-bold text-center p-1 shadow-md"
                      style={
                        item.name == "KOMATSU" ? { color: "#ffd500" }
                          : item.name == "SCANIA" ? { color: "#51AAE1" }
                            : item.name == "UD TRUCK" ? { color: "#D41837", }
                              : item.name == "TADANO" ? { color: "#85A6FD" } : { color: "#0F3460" }
                      }
                    >
                      Buy part
                    </button>
                  </div>
                </>
              )
            })}
          </div>
        </>
      )
    }
  }

  const _renderProduct = () => {
    if (props.loadingProduct) {
      return (
        <>loading...</>
      );
    } else {
      const { listProductData } = props;
      return (
        <div className="">
          <div className="flex flex-wrap items-center md:justify-center sm:justify-center">
            {listProductData && listProductData.data.map((item, index) => {
              return (
                <div key={index} className="py-6">
                  <div className="flex flex-col rounded-lg shadow-lg w-48 h-350px mr-5 2xl:w-52 2xl:h-350px 2xl:mr-2 xl:w-40 xl:h-72 xl:mr-3 lg:w-48 lg:h-80 lg:mr-7 md:w-40 md:h-310px md:mr-2 sm:w-36 sm:h-335px sm:mr-1">
                    <a href={`${MENU.DETAIL_PRODUCT}${item.productId}`}>
                      <div className="p-4 xl:p-3 md:p-3 sm:p-3">
                        <div className="bg-gray-100 w-auto h-auto 2xl:w-full 2xl:h-18vw xl:w-full xl:h-16vw lg:w-full lg:h-28vw md:w-full md:h-32 sm:w-full sm:h-28 rounded-lg flex justify-center items-center">
                          <img className="max-w-100% max-h-full" src={item.imageThumbnailUrl} />
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
        </div>
      )
    }
  }

  const _renderListproduct = () => {
    return (
      <>
        <div className="">
          <div className="flex flex-wrap">
            <div className="mt-5">
              <ul
                className="flex mb-0 list-none flex-wrap md:flex-row sm:flex-row pt-3 pb-4 flex-row"
                role="tablist"
              >
                <li className="mr-2 last:mr-0 flex-auto text-center cursor-pointer">
                  <a
                    className={
                      openTab === 1
                        ? "inline-block py-2 text-2xl xl:text-xl lg:text-lg md:text-lg sm:text-base font-bold border-b-4 border-yellow-300 dark:text-blue-500 dark:border-blue-500"
                        : "inline-block py-2 text-2xl xl:text-xl lg:text-lg md:text-lg sm:text-base font-bold"
                    }
                    onClick={() => {
                      setOpenTab(1);
                    }}
                    data-toggle="tab"
                    role="tablist"
                  >
                    Produk Promo
                  </a>
                </li>
                <li className="px-4 mr-2 last:mr-0 flex-auto text-center cursor-pointer">
                  <a
                    className={
                      openTab === 2
                        ? "inline-block py-2 text-2xl xl:text-xl lg:text-lg md:text-lg sm:text-base font-bold border-b-4 border-yellow-300 dark:text-blue-500 dark:border-blue-500"
                        : "inline-block py-2 text-2xl xl:text-xl lg:text-lg md:text-lg sm:text-base font-bold"
                    }
                    onClick={() => {
                      _klikPesanCepat();
                    }}
                    data-toggle="tab"
                    role="tablist"
                  >
                    Pesan Cepat
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <hr className="-mt-4" />
        </div>
      </>
    );
  };

  const _setItemBranch = (item) => {
    setBranchSelect(item);
    setStorage("BRANCH_ACTIVE", item);
  };


  const _checkPrice = async () => {
    if (branchSelect != null) {
      const { user } = props;
      const body = {
        plantCode: branchSelect.plantCode,
        parts: [],
      };
      for (let i = 0; listMaterial.length > i; i++) {
        if ((listMaterial[i].partNumber != null && listMaterial[i].quantity != null) || listMaterial[i].qty != null) {
          const array = {
            itemNo: listMaterial[i].no,
            partNumber: listMaterial[i].partNumber,
            quantity: listMaterial[i].qty,
          };
          body.parts.push(array);
        }
      }
      const data = await props.fetchCheckPrice(user.tokenResponse.accessToken, body);
      if (data != null && data != "400") {
        const newCheckBoxObj = [];
        for (let i = 0; data.parts.length > i; i++) {
          const array = {
            checklist: data.parts[i].price != null ? true : false,
            no: i + 1,
            partNumber: data.parts[i].partNumber,
            partDesc: data.parts[i].partDescription != null ? data.parts[i].partDescription : false,
            qty: data.parts[i].quantity,
            mou: data.parts[i].sku,
            price: data.parts[i].price,
            amount: data.parts[i].amount != null ? data.parts[i].amount : false,
            availability: data.parts[i].availability,
            productId: data.parts[i].productId,
          };
          newCheckBoxObj.push(array);
        }
        setMaterial(newCheckBoxObj);
        localStorage.setItem('listMaterial', JSON.stringify(newCheckBoxObj))
        setCheckPrice(true);
        setStorage('CHECK_PRICE', true)
        setMaterialNumber(true);
      }
    } else {
      setOpenModalErrorCabang(true)
    }
  };

  const _renderTabProduct = () => {
    switch (true) {
      case openTab === 2:
        return (
          <>
            <div className="flex flex-col justify-center mt-4">
              <div className="text-2xl font-semibold xl:text-xl lg:text-xl md:text-xl sm:text-base">
                Detail Pesanan
              </div>
              <div className="h-28 xl:h-24 lg:h-20 md:h-16 sm:h-16 mt-6 shadow-lg rounded-xl flex flex-row justify-between items-center border border-gray-50">
                <img src={IconWarehouse} className="h-20 px-4 sm:px-2 xl:h-16 lg:h-14 md:h-12 sm:h-12" />
                {branchSelect != null ? (
                  <div>
                    <h5 className="text-xl lg:text-lg md:text-base sm:text-sm font-bold text-gray-800">{branchSelect.description.toUpperCase().replace("UT BRANCH", "")}</h5>
                    <p className="text-gray-700 text-sm lg:text-xs md:text-2xs sm:text-2xs">{branchSelect.address}</p>
                  </div>
                ) : (
                  <p className="text-2xl font-semibold xl:text-xl lg:text-lg md:text-base sm:text-base">Cabang UT</p>
                )}
                {branchSelect != null ? (
                  <div onClick={() => (localStorage.removeItem("BRANCH_ACTIVE"), setOpenModalConfirmCabang(true))} style={{ marginLeft: "auto" }} className="m-6">
                    <p className="font-bold text-blue-600 cursor-pointer md:text-sm sm:text-sm">Ubah</p>
                  </div>
                ) : (
                  <button className="text-xl w-56 h-14 xl:w-44 xl:h-12 lg:w-40 lg:h-11 lg:text-lg md:w-24 md:h-8 md:text-sm sm:w-24 sm:h-8 sm:text-sm m-6 sm:m-3 rounded-lg font-semibold bg-yellow-400"
                    style={{ marginLeft: "auto" }}
                    onClick={() => { setModal(true) }}
                  >Pilih Cabang</button>
                )}
              </div>
              <div className="flex justify-end items-center">
                <div className="flex justify-center items-center cursor-pointer mt-4 h-14 w-56 xl:h-12 xl:w-52 xl:p-2 lg:h-11 lg:w-48 lg:p-1 md:h-10 md:w-40 md:p-1 sm:h-10 sm:w-40 sm:p-1 rounded-lg shadow-lg border border-gray-50">
                  <img src={IconCloud} />
                  <p className="ml-2 md:ml-1 sm:ml-1 text-lg xl:text-base lg:text-sm md:text-xs sm:text-xs font-semibold" onClick={() => setOpenModalUpload(true)}>Upload Suku Cadang</p>
                </div>
              </div>
              <div>
                <div className="overflow-x-scroll">
                  <div className="mt-4">
                    <div className="inline-flex text-sm text-gray-500">
                      <div className="w-8"> </div>
                      <div className="w-16">Item No</div>
                      <div className="w-56">Nomor Material</div>
                      <div className="w-64">Deskripsi Material</div>
                      <div className="w-24 ml-4">Qty</div>
                      <div className="w-24">MoU</div>
                      <div className="w-36">Harga</div>
                      <div className="w-32 ml-3">Total</div>
                    </div>
                    <div className="">
                      {listMaterial.map((data, index) => {
                        return (
                          <div className="inline-flex space-y-3 gap-x-4 items-center">
                            <div className="flex justify-center">
                              <input
                                type="checkbox"
                                checked={data.checklist}
                                onChange={(event) => _checklist(event, index)}
                              />
                            </div>
                            <div className="w-12">
                              <div className="bg-gray-200 rounded-lg text-black text-center w-full py-2">
                                {data.no}
                              </div>
                            </div>
                            <div className="w-52">
                              <input className="border border-solid border-black rounded-lg transition ease-in-out text-center font-semibold uppercase text-sm text-gray-700 w-full py-2  focus:border-blue-500 focus:outline-none"
                                id={`"partNumber"${index}`}
                                type="text"
                                value={data.partNumber}
                                onChange={(event) => _eventInputPart(event, index)}
                                placeholder="Nomor Material" />
                            </div>
                            <div className="w-64">
                              <div
                                className="bg-gray-200 rounded-lg text-black text-center w-full h-11 py-2 px-3"
                                type="text"
                                placeholder="deskripsi">
                                {data.partDesc}
                              </div>
                            </div>
                            <div className="w-20">
                              <input className="border border-solid border-black rounded-lg transition ease-in-out text-center font-semibold uppercase text-sm text-gray-700 w-full py-2 px-3  focus:border-blue-500 focus:outline-none"
                                id={`"qty"${index}`}
                                min={1}
                                onChange={(event) => _eventInput(event.target.value.replace(/[^0-9]+/g, ""), index)}
                                value={data.qty !== null ? data.qty.toString().replace(/[^0-9]+/g, "") : ""}
                                type="text"
                                placeholder="qty"
                                style={data.qty === null && data.partNumber != null ? { borderColor: 'red', borderWidth: 2 } : null}
                              />
                            </div>
                            <div className="w-20">
                              <div className="bg-gray-200 rounded-lg text-black text-center h-11 py-2 px-3">
                                {data.mou}
                              </div>
                            </div>
                            <div className="w-36 flex-grow-0">
                              <div className="bg-gray-200 rounded-lg text-black text-center h-11 w-full py-2 px-3">
                                {data.price}
                              </div>
                            </div>
                            <div className="w-32 flex-grow-0">
                              <div className="bg-gray-200 rounded-lg text-black text-center h-11 w-full py-2 px-3">
                                {data.amount}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <div className="flex justify-center mt-8 mb-2">
                    <button
                      type="button"
                      className="inline-block px-6 py-2 border-2 border-blue-400 text-blue-400 font-medium text-sm rounded-lg"
                      onClick={() => _addRowsMaterial()}
                    >
                      Tambah Lebih Banyak
                    </button>
                  </div>
                </div>
                <hr className="mt-6" />
                <div className="flex items-center justify-between m-4">
                  <input type="checkbox" checked={selectAll} onChange={(event) => _checklistAll(event)} />
                  <div className="ml-2 text-sm text-gray-500">Pilih semua</div>
                  <div
                    style={{ marginLeft: 'auto' }}
                    className="flex items-center text-red-700 cursor-pointer"
                    onClick={() => _deleteCheckList()}
                  >
                    <img src={IconDeleteBin} />
                    Hapus
                  </div>
                </div>
                {checkPrice === true ? (
                  <div className="flex flex-row justify-end">
                    <div className="px-4">
                      <button className="text-base font-semibold rounded-lg w-48 h-12 bg-white border border-black cursor-pointer">
                        Beli Sekarang
                      </button>
                    </div>
                    <button className="text-base font-semibold rounded-lg w-48 h-12 bg-yellow-400 cursor-pointer">
                      Masukkan Keranjang
                    </button>
                  </div>
                ) : (
                  <div className="flex justify-end" onClick={() => _checkPrice()}>
                    <button className="text-lg font-semibold rounded-lg w-48 h-12 xl:w-44 xl:h-11 lg:w-40 lg:h-10 md:w-36 md:h-9 md:text-base sm:w-32 sm:h-8 sm:text-sm bg-yellow-400">
                      Periksa Harga
                    </button>
                  </div>
                )}
              </div>
            </div>
          </>
        );
      default:
        return _renderProduct();
    }
  };


  const _handleLogin = async (data) => {
    await props.login(data);
    setLogin(false);
    setOpenTab(2);
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name == "username") {
      const val1 = value;
      setUser((prevState) => ({
        ...prevState,
        [name]: val1,
      }));
    } else {
      setUser((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const _renderModalConfirm = () => {
    return (
      <Modal
        open={openModalConfirmCabang}
        onClose={() => setOpenModalConfirmCabang(false)}
        style={{ borderRadius: '10px' }}
        className="flex justify-center items-center m-auto p-4 lg:p-3 md:p-4 sm:p-3">
        <div className="flex flex-col items-center justify-center h-auto w-30vw 2xl:w-96 xl:w-96 lg:w-min md:w-min sm:w-min p-4 rounded-lg bg-white">
          <p className="text-lg font-bold mt-4">Kamu Yakin ?</p>
          <div className="my-4">
            <img src={IconCaution} className="w-auto h-24 lg:h-20 md:h-20 sm:h-20" />
          </div>
          <p className="mb-4 text-center lg:text-sm lg:font-semibold md:text-sm md:font-semibold sm:text-sm sm:font-semibold">Kamu akan melakukan perubahan titik cabang UT</p>
          <div className="flex flex-row justify-center items-center">
            <button className="h-9 w-36 lg:w-32 lg:h-8 md:w-28 md:h-8 sm:w-28 sm:h-8 font-semibold rounded-lg bg-gray-300 mx-4"
              onClick={() => setOpenModalConfirmCabang(false)}
            >Kembali</button>
            <button className="h-9 w-36 lg:w-32 lg:h-8 md:w-28 md:h-8 sm:w-28 sm:h-8 font-semibold rounded-lg"
              style={{ backgroundColor: '#ffd500' }}
              onClick={() => (setOpenModalConfirmCabang(false), setModal(true), setBranchSelect(null))}
            >Lanjutkan</button>
          </div>
          <p className="mt-6 text-sm md:text-xs sm:text-xs">Butuh informasi tambahan? Kontak kami</p>
          <div className="flex flex-row justify-center items-center mt-6 mb-2 cursor-pointer">
            <img src={IconUTCall} className="w-auto h-11 md:h-8 sm:h-7 px-8 md:px-4 sm:px-3" />
            <img src={IconMail} className="w-auto h-10 md:h-8 sm:h-7" />
          </div>
        </div>
      </Modal>
    )
  }

  const _renderModalDenied = () => {
    return (
      <Modal
        open={openModalErrorCabang}
        onClose={() => setOpenModalErrorCabang(false)}
        style={{ borderRadius: '10px' }}
        className="flex justify-center items-center m-auto p-0 lg:p-14 md:p-6 sm:p-4">
        <div className="h-auto w-1/3 2xl:w-2/5 xl:w-2/4 lg:w-full md:w-full sm:w-full" >
          <div className="flex flex-col items-center p-8 rounded-lg bg-white">
            <p className="text-2xl xl:text-xl lg:text-xl md:text-lg sm:text-lg font-bold text-center">Huhu sayang sekali...</p>
            <div className="my-4">
              <img src={IconCaution} className="w-auto h-32 xl:h-28 lg:h-28 md:h-24 sm:h-24" />
            </div>
            <p className="mb-4 text-lg lg:text-base md:text-base sm:text-sm text-center text-gray-500">Silahkan pilih cabang UT untuk melanjutkan proses</p>
            <div className="w-full">
              <button className="h-9 md:h-8 sm:h-7 w-full font-semibold rounded-lg"
                style={{ backgroundColor: '#ffd500' }}
                onClick={() => setOpenModalErrorCabang(false)}
              >OK</button>
            </div>
            <p className="mt-6 text-base lg:text-sm md:text-sm sm:text-sm text-center">Butuh informasi tambahan? Kontak kami</p>
            <div className="flex flex-row justify-center items-center mt-6 gap-x-3 cursor-pointer">
              <img src={IconUTCall} className="w-auto h-10 md:h-8 sm:h-8" />
              <img src={IconMail} className="w-auto h-10 md:h-8 sm:h-8" />
            </div>
          </div>
        </div>
      </Modal>
    )
  }

  const _uploadFileCsv = async () => {
    document.getElementById("uploadCsv").click();
    document.getElementById("uploadCsv").onchange = async () => {
      var allowedExtensions = /(\.csv|\.CSV)$/i;
      var data = document.getElementById("uploadCsv").files[0].name;
      var file = document.getElementById("uploadCsv").files[0];
      var size = document.getElementById("uploadCsv").files[0].size / 1024 / 1024;

      if (!allowedExtensions.exec(data)) {
        _openModalErrorFileCsv()
      } else if (size > 3 && allowedExtensions.exec(data)) {
        _openModalErrorFileCsvSize()
      } else if (size <= 3 && allowedExtensions.exec(data)) {
        setFileCsv(data);
        setFile(file);
      }

    };
  };

  const _submitFile = async () => {
    if (fileCsv != "") {
      const { user } = props;
      const formData = new FormData();
      formData.append("file", fileCsv);
      const data = await props.fetchUploadCsv(user.tokenResponse.accessToken, formData);
      if (data != null && data != "400") {
        const newCheckBoxObj = [];
        for (let i = 0; data.length > i; i++) {
          if (i <= 499) {
            const array = {
              checklist: selectAll,
              no: i + 1,
              partNumber: data[i].materialNumber,
              partDesc: null,
              qty: data[i].quantity,
              mou: null,
              price: null,
              amount: null,
            };
            newCheckBoxObj.push(array);
          }
        }
        setMaterial(newCheckBoxObj);
        localStorage.setItem('listMaterial', JSON.stringify(newCheckBoxObj))
        setData(true);
        setOpenModalUpload(false);
      } else {
        console.log("UPLOAD ERROR")
      }
    }
  }

  const _downloadFile = async () => {
    const { user } = props;
    const data = await props.fetchDownloadTemplate(user.tokenResponse.accessToken);
    if (data != null && data != "400") {
      var binaryData = [];
      binaryData.push(data);
      const href = window.URL.createObjectURL(new Blob(binaryData, { type: "text/csv" }));
      const link = document.createElement("a");
      link.href = href;
      link.setAttribute("download", "template.csv");
      document.body.appendChild(link);
      link.click();
      setAnalyticClevertap("click", "Click_DownloadMaterial", "View_Home_Screen", null);
    }
  };

  const _renderModalUpload = () => {
    const [selectedTab, setTab] = useState(0);

    const onClick = (option) => {
      if (option === selectedTab) setTab(0);
      else setTab(option);
    };

    const renderTab = () => {
      return (
        <div className="flex flex-row justify-center items-center">
          <div className="cursor-pointer">
            <p className={selectedTab === 0 ? "font-semibold text-lg xl:text-base lg:text-base md:text-base sm:text-sm mb-2" : "mb-2 text-lg xl:text-base lg:text-base md:text-base sm:text-sm text-gray-500"} onClick={() => onClick(0)}>
              Download Template
            </p>
            <div style={selectedTab === 0 ? { borderBottom: "3px solid #ffd500" } : { borderBottom: "1px solid #f1f1f1" }} />
          </div>
          <div className="cursor-pointer px-4">
            <p className={selectedTab === 1 ? "font-semibold text-lg xl:text-base lg:text-base md:text-base sm:text-sm mb-2" : "mb-2 text-lg xl:text-base lg:text-base md:text-base sm:text-sm text-gray-500"} onClick={() => onClick(1)}>
              Upload File
            </p>
            <div style={selectedTab === 1 ? { borderBottom: "3px solid #ffd500" } : { borderBottom: "1px solid #f1f1f1" }} />
          </div>
        </div>
      );
    };

    const renderAttachCsv = () => {
      if (nameFile != '')
        return (
          <div style={{ marginTop: 10, marginBottom: 10 }}>
            <div className="flex flex-row justify-center items-center">
              <img src={IconCSV} className="w-auto h-6" />
              <div style={{ flexDirection: "column", flex: 1 }}>
                <div className="flex justify-between px-2">
                  <div className="font-bold text-sm">
                    <p>{nameFile}</p>
                  </div>
                  <div>
                    <p>100%</p>
                  </div>
                </div>
                <div style={{ flex: 1 }} className="px-2">
                  <Progress percent={100} status='success' />
                </div>
              </div>
            </div>
          </div>
        );
    };

    return (
      <Modal
        open={openModalUpload}
        onClose={() => setOpenModalUpload(false)}
        className="flex justify-center items-center m-auto p-0 md:p-3 sm:p-2">
        <div className="max-w-35% w-full 2xl:max-w-45% 2xl:w-min xl:max-w-50% xl:w-min lg:max-w-80% lg:w-min md:max-w-100% md:w-full sm:max-w-100% sm:w-full">
          <div className="flex flex-col items-center h-1/2 p-8 rounded-lg bg-white">
              <p className="text-center text-xl lg:text-lg md:text-lg sm:text-lg font-semibold mb-3">Upload Item</p>
              {renderTab()}
              <div className="flex flex-col justify-center items-center w-80 h-44 md:w-72 md:h-40 sm:w-64 sm:h-36 mt-4 bg-gray-200 mx-4 rounded-2xl border-2 border-gray-400 border-dashed">
                <div className="flex items-center justify-center">
                  <img className="w-auto h-28 md:h-24 sm:h-24 mb-2" src={selectedTab === 0 ? IconFile : IconUploadFile} />
                  {selectedTab === 1 ?
                    <input id="uploadCsv" hidden type='file' onChange={() => _uploadFileCsv()} /> : null}
                </div>
                <div
                  onClick={() => { selectedTab === 0 ? _downloadFile() : _uploadFileCsv() }}
                  className="flex flex-row w-36 h-8 md:w-32 md:h-7 sm:w-28 sm:h-7 justify-center items-center rounded-lg bg-blue-500">
                  <div className="flex flex-row justify-center items-center">
                    <div>
                      <img src={IconFileAdd} className="h-4" />
                    </div>
                    <div className="font-semibold px-1 text-white cursor-pointer md:text-sm sm:text-sm">
                      {selectedTab === 0 ? "Download File" : "Pilih File"}
                    </div>
                  </div>
                </div>
              </div>
            {selectedTab === 1 ? renderAttachCsv() : null}

            {selectedTab === 1 ?
              <>
                <div className="flex flex-row justify-end items-center mt-4">
                  <div>
                    <button className="h-9 w-32 xl:h-8 xl:w-28 lg:h-8 lg:w-28 md:h-8 md:w-28 sm:h-8 sm:w-24 font-semibold border rounded-lg bg-gray-200  shadow"
                      onClick={() => setOpenModalUpload(false)}
                    >Batal</button>
                  </div>
                  <div className="px-2">
                    <button style={{ backgroundColor: '#ffd500' }}
                      className="h-9 w-32 xl:h-8 xl:w-28 lg:h-8 lg:w-28 md:h-8 md:w-28 sm:h-8 sm:w-24 font-semibold rounded-lg shadow"
                      onClick={() => _submitFile()}>Kirim</button>
                  </div>
                </div>
              </>
              : null}
            </div>
          </div>
      </Modal>
    );
  };

  return (
    <div>
      <div className="px-10vw 2xl:px-6vw xl:px-4vw lg:px-4vw md:px-3vw sm:px-3vw">
        {_renderSelectByBrand()}
        {_renderListproduct()}
        {_renderTabProduct()}
        {_renderModalConfirm()}
        {_renderModalDenied()}
        {_renderModalUpload()}
      </div>
      <ModalSelectBranch
        item={branchListOrder}
        isOpen={modalSelect}
        isClose={() => setModal(false)}
        cancel={() => setModal(false)}
        save={(item) => (setModal(false), _setItemBranch(item))}
      />
      <ModalLogin 
      isOpen={login}
      isClose={() => setLogin(false)}
      login={() => _handleLogin(dataUser)}
      />
    </div>
  )
}

LandingPage.propTypes = {
  tokenResponse: PropTypes.object,
}
LandingPage.defaultProps = {
  tokenResponse: null,
}

export default LandingPage;