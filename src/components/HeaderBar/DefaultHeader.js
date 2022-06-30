import React, { Component } from "react";
import { UTLogoBlack, klikut, logoUTC } from "../../assets/images";
import "./DefaultHeaderStyle.css";
import { MENU } from "../../constants/menu";
import ModalLogin from "../ModalLogin/ModalLogin";
import ModalLoginHeader from "./ModalLogin/ModalLoginHeader";
import { Modal } from "@material-ui/core";
import {
    IconLogin,
    IconUTCall,
    IconMail,
    IconArrowLeft,
    IconGoogle,
    IconCart,
    IconOrderDefault,
    IconLike,
    IconGear,
    IconTerm,
    IconLogOut,
    IconAsk,
} from "../../assets/icons"
import { userIcon } from "../../assets/images"
import { getStorage } from "../../utils/storage.helper";

class DefaultHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            login: false,
            logout: false,
            errorLogin: false,
            userId: '',
            accessToken: '',
            verifyCode: '',
            isPassword: false,
            errorMessage: null,
            loginLock: false,
            timer: {
                minute: 0,
                second: 10
            },
            username: "testutconnect@gmail.com",
            password: "Scania,2020",
            isLogin: false,
            onLanding: false,
            modalLogout: false,
        };
    }

    actionLogin = () => {
        this.setState({ login: true });
    };
    actionLogout = () => {
        this.setState({ logout: true });
    };

    _handleLogin = async (data) => {
        await this.props.login(data)
        if (this.props.user?.user !== null) {
            return (
                this.setState({ login: false })
            )
        }
        // alert(JSON.stringify("LOGIN_HEADER",data))
        // if (this.props.error.errorLogin) {
        //     return (
        //         this.setState({ login: true, errorLogin: true })
        //     )
        // } else if (this.props.user?.user !== null) {
        //     return (
        //         this.setState({ login: false })
        //     )
        // } else if (this.props.user?.user === null) {
        //     return this.setState({ errorLogin: true })
        // }
    }
    async _dataCart(accessToken, userId) {
        await this.props.fetchSearchByUserId(accessToken, userId);
    }

    setLogout = async () => {
        const { logout } = this.state;
        this.setState({ logout: false, modalLogout: false });
        localStorage.clear();
        window.location.replace(MENU.LANDING);
    };

    componentDidUpdate(prevProps) {
        if (this.props.user !== prevProps.user && this.props.user.user != null) {
            this._dataCart(this.props.user.user.accessToken, this.props.user.user.userId)
            this.setState({ isLogin: true })
        }
    }


    handleIsKlikUT = () => {
        const arr = ["LANDING"];
        const link = this.props.path.toUpperCase();
        var newArr = [];
        for (let i = 0; i < arr.length; i++) {
            const data = {
                status: link.includes(arr[i])
            };
            newArr.push(data);
        };
        var isKlikUT = newArr.filter(item => item.status == true).length;
        if (isKlikUT != 0) {
            return true;
        } else {
            return false;
        }
    };

    _renderModalProfile = () => {
        // const user = getStorage("USER");
        const { user } = this.props.user;
        const chart1 = "data:image/png;base64,";

        return (
            <Modal
                open={this.state.logout}
                onClose={() => this.setState({ logout: false })}
                className="container mx-auto flex justify-end px-16 lg:px-6vw md:px-4vw sm:px-3vw rounded"
            >
                <div className="flex flex-col mt-16 lg:mt-12 md:mt-12 sm:mt-12 rounded bg-white p-4 xl:p-3 lg:p-3 md:p-2 sm:p-2 h-40vh w-auto xl:h-35vh lg:h-30vh md:h-28vh sm:h-28vh">
                    <div className="flex flex-row items-center">
                        <img src={user?.imagePath ? chart1 + user?.imagePath : userIcon} className="w-auto h-12 lg:h-10 md:h-9 sm:h-9 rounded-full" />
                        <div className="px-1 lg:px-2">
                            <p className="font-semibold lg:text-sm lg:font-bold md:text-sm md:font-bold sm:text-sm sm:font-bold">{user?.firstName + ' ' + user?.lastName}</p>
                            <p className="text-gray-500 text-xs">{user?.email}</p>
                        </div>
                    </div>
                    <hr className="w-full text-gray-800 mt-2" />
                    <div className="flex flex-row items-center h-14 xl:h-12 lg:h-10 md:h-9 sm:h-9 cursor-pointer md:mx-1 sm:mx-1"
                        onClick={() => (this.props.push('/PartOnline/Wishlist'), this.setState({ logout: false }))}>
                        <div className="flex justify-center bg-gray-200 w-7 h-7 lg:w-6 lg:h-6 md:h-6 md:w-6 sm:h-6 sm:w-6 items-center rounded-full px-1">
                            <img src={IconLike} className="w-auto h-3" />
                        </div>
                        <p className="px-7 lg:text-sm md:text-sm sm:text-sm">Item Favorit</p>
                    </div>
                    <hr className="w-full text-gray-800" />
                    <div className="flex flex-row items-center h-14 xl:h-12 lg:h-10 md:h-9 sm:h-9 cursor-pointer">
                        <div className="md:mr-1 sm:mr-1">
                            <img src={IconGear} className="w-auto h-9 lg:h-8 md:h-8 sm:h-8" />
                        </div>
                        <p className="px-5 lg:text-sm md:text-sm sm:text-sm">Pengaturan Profil</p>
                    </div>
                    <hr className="w-full text-gray-800" />
                    <div className="flex flex-row items-center h-14 xl:h-12 lg:h-10 md:h-9 sm:h-9 cursor-pointer" onClick={() => (this.props.push(MENU.TERMCONDITION), this.setState({ logout: false }))}>
                        <div className="md:mr-1 sm:mr-1">
                            <img src={IconTerm} className="w-auto h-9 lg:h-8 md:h-7 sm:h-7" />
                        </div>
                        <p className="px-6 lg:text-sm md:text-sm sm:text-sm">Syarat dan Ketentuan</p>
                    </div>
                    <hr className="w-full text-gray-800" />
                    <div className="flex flex-row items-center h-14 xl:h-12 lg:h-10 md:h-9 sm:h-9 cursor-pointer"
                        onClick={() => this.setState({ modalLogout: true })}>
                        <div className="mx-2 lg:mx-0 lg:mr-3 md:mx-1 md:mr-3 sm:mr-3 sm:mx-0">
                            <img src={IconLogOut} className="w-auto h-6" />
                        </div>
                        <p className="px-2 lg:text-sm md:text-sm sm:text-sm">Keluar</p>
                    </div>
                </div>
            </Modal>
        )
            ;
    }

    _renderModalLogout = () => {
        return (
            <Modal
                open={this.state.modalLogout}
                onClose={() => this.setState({ modalLogout: false })}
                style={{ borderRadius: '10px' }}
                className="flex justify-center items-center m-auto p-0 sm:p-2">
                <div className="flex flex-col items-center p-4 rounded-lg bg-white h-auto w-96 md:w-80 sm:w-full">
                    <p className="text-lg font-bold mt-5 md:mt-4">Kamu Yakin ?</p>
                    <div className="my-4">
                        <img src={IconAsk} className="w-auto h-28" />
                    </div>
                    <p className="text-gray-600 mb-4">Kamu akan keluar dari halaman ini</p>
                    <div className="flex flex-row justify-center items-center">
                        <button className="h-9 w-36 md:w-32 sm:w-28 font-semibold rounded-lg bg-gray-300 mx-4"
                            onClick={() => this.setState({ modalLogout: false })}
                        >Kembali</button>
                        <button className="h-9 w-36 md:w-32 sm:w-28 font-semibold rounded-lg"
                            style={{ backgroundColor: '#ffd500' }}
                            onClick={() => this.setLogout()}
                        >Lanjutkan</button>
                    </div>
                    <p className="mt-6 text-sm md:text-xs sm:text-xs">Butuh informasi tambahan? Kontak kami</p>
                    <div className="flex flex-row justify-center items-center mt-6 mb-4 cursor-pointer">
                        <img src={IconUTCall} className="w-auto h-10 px-8" />
                        <img src={IconMail} className="w-auto h-10" />
                    </div>
                </div>
            </Modal>
        )
    };

    _renderNavbarBeforeLogin = () => {
        return (
            <div className="flex items-center fixed top-0 w-100vw h-75px 2xl:h-70px xl:h-70px lg:h-50px md:h-50px sm:h-50px bg-white shadow">
                <div className="flex flex-row justify-between items-center w-100vw h-5vw px-10vw lg:px-6vw md:px-6vw sm:px-6vw">
                    <div className="flex items-center justify-start mr-auto ml-0 cursor-pointer">
                        <img src={UTLogoBlack} className="max-h-14vw max-w-14vw h-full 2xl:max-w-22vw 2xl:w-auto 2xl:h-35px xl:max-w-22vw xl:h-35px lg:max-w-26vw lg:h-25px md:max-w-34vw md:h-25px sm:max-w-38vw sm:h-25px" style={{ transform: 'scale(1)' }}
                            onClick={() => this.props.push(MENU.LANDING)} />
                        {!this.handleIsKlikUT() ?
                            <img src={klikut}
                                className="ml-5 w-auto h-2.4vw max-h-3.2vw lg:h-4 lg:ml-3 md:max-h-5vw md:h-4 md:ml-2 sm:max-h-5vw sm:h-4 sm:ml-2"
                                style={{ marginTop: '2%', transform: 'scale(1)' }}
                                onClick={() => this.props.push(MENU.HOME)}
                            />
                            :
                            <img src={logoUTC}
                                className="ml-5 w-auto h-2.4vw max-h-3.2vw lg:h-4 lg:ml-3 md:max-h-5vw md:h-4 md:ml-2 sm:max-h-5vw sm:h-4 sm:ml-2"
                                style={{ marginTop: '2%', transform: 'scale(1)' }}
                                onClick={() => this.props.push(MENU.LANDING)}
                            />
                        }
                    </div>
                    <div className="flex items-center justify-center cursor-pointer w-8.5vw h-2.8vw 2xl:ml-8 2xl:w-9vw 2xl:h-3.5vw xl:h-3.5vw lg:h-5 lg:w-14 md:h-5 md:w-12 sm:h-5 sm:w-12"
                        style={{ marginLeft: '2.3vw', borderRadius: '0.7vw', backgroundColor: '#ffb500' }}
                        onClick={() => this.actionLogin()}>
                        <p className="font-bold font-sans 2xl:tracking-wider xl:text-base lg:text-xs md:text-xs md:font-semibold sm:text-xs sm:font-semibold">Masuk</p>
                    </div>
                </div>
            </div>
        )
    }


    _renderNavbarAfterLogin = () => {
        const { user } = this.props.user;
        const chart1 = "data:image/png;base64,";
        // const { dataCart } = this.props;
        return (
            <div className="flex items-center fixed top-0 w-100vw h-75px 2xl:h-70px xl:h-70px lg:h-50px md:h-50px sm:h-50px bg-white shadow">
                <div className="flex flex-row justify-between items-center w-100vw h-5vw px-10vw lg:px-6vw md:px-6vw sm:px-6vw">
                    <div className="flex items-center justify-start mr-auto ml-0 cursor-pointer">
                        <img src={UTLogoBlack} className="max-h-14vw max-w-14vw h-full 2xl:max-w-22vw 2xl:w-auto 2xl:h-35px xl:max-w-22vw xl:h-35px lg:max-w-26vw lg:h-25px md:max-w-34vw md:h-25px sm:max-w-38vw sm:h-25px" style={{ transform: 'scale(1)' }}
                            onClick={() => this.props.push(MENU.LANDING)} />
                        {!this.handleIsKlikUT() ?
                            <img src={klikut}
                                className="ml-5 w-auto h-2.4vw max-h-3.2vw lg:h-4 lg:ml-3 md:max-h-5vw md:h-4 md:ml-2 sm:max-h-5vw sm:h-4 sm:ml-2"
                                style={{ marginTop: '2%', transform: 'scale(1)' }}
                                onClick={() => this.props.push(MENU.HOME)}
                            />
                            :
                            <img src={logoUTC}
                                className="ml-5 w-auto h-2.4vw max-h-3.2vw lg:h-4 lg:ml-3 md:max-h-5vw md:h-4 md:ml-2 sm:max-h-5vw sm:h-4 sm:ml-2"
                                style={{ marginTop: '2%', transform: 'scale(1)' }}
                                onClick={() => this.props.push(MENU.LANDING)}
                            />
                        }
                    </div>
                    <div className="px-2vw">
                        <div className="flex items-center justify-center cursor-pointer mr-1 w-50px ml-auto">
                            <div className="flex flex-row mr-8 lg:mr-2 md:mr-4 sm:mr-3" onClick={() => this.props.push(MENU.BUCKETLIST)}>
                                <img src={IconCart} className="h-7 w-auto mr-8 lg:h-5 md:h-5 sm:h-5" />
                                {this.props.dataCart != null && this.props.dataCart.totalCart > 0 ? (
                                    <div className="absolute flex items-center justify-center border-2 border-white bg-red-700 rounded-full h-5 w-5 ml-5">
                                        <p className="text-white text-xs"
                                        >{this.props.dataCart.totalCart}</p>
                                    </div>
                                ) : null}
                            </div>
                            <img src={IconOrderDefault} className="h-5 mr-8 lg:mr-4 md:h-5 md:mr-4 sm:h-5 sm:mr-3" />
                            <img src={user?.imagePath ? chart1 + user?.imagePath : userIcon} className="w-auto h-9 rounded-full xl:h-8 mr-8 lg:mr-3 lg:h-6 md:h-6 md:mr-3 sm:h-6 sm:mr-1"
                                onClick={() => this.actionLogout()} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }



    render() {
        return (
            <React.Fragment>
                <div className='z-50'>
                    {this.state.isLogin ? (
                        this._renderNavbarAfterLogin()
                    ) : this._renderNavbarBeforeLogin()}
                </div>
                <ModalLogin
                    isOpen={this.state.login}
                    isClose={() => this.setState({ login: false })}
                    login={this._handleLogin}
                />
                <Modal
                    // open={this.state.login}
                    onClose={() => this.setState({ login: false })}
                    style={{ borderRadius: '10px' }}
                    className="flex justify-center items-center m-auto p-0">
                    <div style={{
                        backgroundColor: "#fff",
                        height: "90vh",
                        width: "38%",
                        display: 'flex',
                        flexDirection: 'column',
                        borderRadius: '10px'
                    }}>
                        <div className="flex flex-col px-14">
                            <div className="flex justify-center items-center">
                                <img src={IconLogin} className="w-auto h-28" />
                            </div>
                            <div className="mb-2">
                                <p className="text-gray-500 font-normal mb-1">EMAIL</p>
                                <input
                                    className="text-start border border-solid border-black w-full rounded h-9 p-2"
                                    type="text"
                                    value={this.state.username}
                                    placeholder="Username"
                                    onChange={(e) => this.setState({ username: e.target.value })}
                                />
                            </div>
                            <div className="mb-2">
                                <p className="text-gray-500 font-normal mb-1">PASSWORD</p>
                                <input
                                    className="text-start border border-solid border-black w-full rounded h-9 p-2"
                                    type="text"
                                    value={this.state.password}
                                    placeholder="Passsword"
                                    onChange={(e) => this.setState({ password: e.target.value })}
                                />
                            </div>
                            <button
                                className="w-full h-12 rounded-lg font-semibold mt-4 mb-6"
                                style={{ backgroundColor: '#ffd500' }}
                                onClick={() => this._handleLogin({ username: this.state.username, password: this.state.password })}
                            >Masuk
                            </button>
                            <hr className="border border-gray-500 w-full mb-6" />
                            <div className="shadow-lg w-full h-12 rounded-lg">
                                <div className="flex flex-row justify-between items-center p-3 px-6">
                                    <img src={IconGoogle} className="w-auto h-6" />
                                    <p className="px-6"> Masuk dengan Google</p>
                                    <img src={IconArrowLeft} className="w-auto h-3" style={{ marginLeft: 'auto' }} />
                                </div>
                            </div>
                            <div className="flex flex-col justify-center items-center">
                                <div className="mt-6 text-base">
                                    <p>Belum punya akun ? <span className="text-yellow-400">Daftar disini</span></p>
                                </div>
                                <div className="mt-6 text-sm">
                                    <p>Butuh informasi tambahan ? Kontak kami</p>
                                </div>
                                <div className="flex flex-row mt-4">
                                    <img src={IconUTCall} className="w-auto h-9 px-2" />
                                    <img src={IconMail} className="w-auto h-9" />
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal>
                {this._renderModalLogout()}
                {this._renderModalProfile()}
            </React.Fragment>
        );
    }
}

export default DefaultHeader;