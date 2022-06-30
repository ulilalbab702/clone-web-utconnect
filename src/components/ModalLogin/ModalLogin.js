import React, { useState } from "react";
import { Modal, DialogContent, InputBase } from "@material-ui/core";
import { IconLogin, IconUTCall, IconMail, IconArrowLeft, IconGoogle } from "../../assets/icons"

const dotenv = require('dotenv');
dotenv.config();
const GOOGLE_ID = process.env.REACT_APP_GOOGLE_CLIENT

const ModalLogin = ({ isOpen, isClose, isSignUp, isForgot, login, loginGoogle, isLoading, error, blocked, timer }) => {
    const [hidden, setHidden] = useState(false);
    const [data, setData] = useState({
        username: "testutconnect@gmail.com",
        password: "Scania,2020",
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name == "username") {
            const val1 = value;
            setData((prevState) => ({
                ...prevState,
                [name]: val1,
            }));
        } else {
            setData((prevState) => ({
                ...prevState,
                [name]: value,
            }));
        }
    };

    return (
        <Modal
            open={isOpen}
            onClose={isClose}
            style={{ borderRadius: '10px' }}
            className="flex justify-center items-center m-auto p-0 md:p-4 sm:p-3">
            <div className="bg-white h-90vh w-2/5 2xl:h-70vh 2xl:w-1/2 xl:h-70vh xl:w-2/3 lg:h-60vh lg:w-10/12 md:h-auto md:w-full sm:h-auto sm:w-full flex flex-col rounded-lg">
                <div className="flex flex-col px-14 lg:px-6 md:px-4 sm:px-4">
                    <div className="flex justify-center items-center md:mt-4 sm:mt-4">
                        <img src={IconLogin} className="w-auto h-28 lg:h-20 md:h-16 sm:h-14" />
                    </div>
                    <div className="mb-2">
                        <p className="text-gray-500 font-normal mb-1 lg:text-sm md:text-sm sm:text-xs">EMAIL</p>
                        <input
                            className="text-start border-solid border-b-2 border-gray-300 focus:border-gray-400 focus:outline-none w-full h-9 p-2 lg:h-8 lg:text-sm md:h-7 md:text-sm sm:h-7 sm:text-xs"
                            type="text"
                            name="username"
                            value={data.username}
                            placeholder="Username"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-2">
                        <p className="text-gray-500 font-normal mb-1 lg:text-sm md:text-sm sm:text-xs">PASSWORD</p>
                        <input
                            className="text-start border-b-2 border-solid border-gray-300 focus:border-gray-400 focus:outline-none w-full h-9 p-2 lg:h-8 lg:text-sm md:h-7 md:text-sm sm:h-7 sm:text-xs"
                            type="password"
                            name="password"
                            value={data.password}
                            placeholder="Passsword"
                            onChange={handleChange}
                        />
                    </div>
                    <button
                        className="w-full h-12 lg:h-9 md:h-9 sm:h-9 rounded-lg font-semibold mt-4 sm:mt-2 mb-6 sm:mb-4"
                        style={{ backgroundColor: '#ffd500' }}
                        onClick={() => login(data)}
                    >Masuk
                    </button>
                    <hr className="border border-gray-500 w-full mb-6" />
                    <div className="shadow-lg w-full h-12 lg:h-10 md:h-9 sm:h-9 rounded-lg">
                        <div className="flex flex-row justify-between items-center p-3 lg:p-2 md:p-2 md:px-6 sm:p-2 sm:px-6 px-6">
                            <img src={IconGoogle} className="w-auto h-6 lg:ml-6 md:h-5 sm:h-5" />
                            <p className="px-6 md:text-sm sm:text-sm"> Masuk dengan Google</p>
                            <img src={IconArrowLeft} className="w-auto h-3 lg:mr-4 md:h-2 sm:h-2" style={{ marginLeft: 'auto' }} />
                        </div>
                    </div>
                    <div className="flex flex-col justify-center items-center">
                        <div className="mt-6 sm:mt-4 text-base lg:text-sm md:text-sm sm:text-sm">
                            <p>Belum punya akun ? <span className="text-yellow-400">Daftar disini</span></p>
                        </div>
                        <div className="mt-6 sm:mt-3 text-sm lg:text-sm md:text-sm">
                            <p>Butuh informasi tambahan ? Kontak kami</p>
                        </div>
                        <div className="flex flex-row mt-4 md:mb-6 sm:mb-6">
                            <img src={IconUTCall} className="w-auto h-9 px-2" />
                            <img src={IconMail} className="w-auto h-9" />
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
};
export default ModalLogin;