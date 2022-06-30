import React, { Component } from 'react';
import {
    IconAppStore,
    IconPlayStore,
    IconFacebook,
    IconInstagram,
    IconTwitter
} from "../../assets/icons";

class FooterBar extends Component {
    render() {
        return (
            <>
                <div className='w-full ml-auto mt-12'>
                    <div className='m-0 flex xl:flex-wrap lg:flex-wrap md:flex-wrap sm:flex-wrap justify-evenly'>
                        <div className='w-2/4 flex flex-row mb-4 xl:w-100vw xl:-ml-12 xl:px-2 lg:w-100vw lg:px-4 md:w-100vw md:px-4 sm:w-100vw sm:px-4'>
                            <div className='max-w-50% mx-auto lg:ml-2 md:-ml-1 sm:-ml-1'>
                                <div className='font-normal text-sm md:text-3xs sm:text-3xs'>
                                    <b className='text-base lg:text-sm md:text-xs sm:text-xs'>UT Connect</b> adalah aplikasi yang dikembangkan untuk memberikan layanan terbaik bagi pelanggan United Tractors.
                                </div>
                                <div className='mt-1'>
                                    <p className='mb-4 font-bold md:text-sm md:mb-2 sm:mb-2'>Download</p>
                                    <div className='flex flex-row items-center mb-3 mr-4'>
                                        <img src={IconAppStore} className="w-2/5 mr-4 sm:w-16 sm:mr-2" />
                                        <img src={IconPlayStore} className="w-2/5 sm:w-16" />
                                    </div>
                                </div>
                            </div>
                            <div className='max-w-50% mx-auto sm:mr-2'>
                                <p className='mb-4 font-bold lg:mb-2 lg:text-sm md:mb-2 md:text-sm sm:text-sm sm:mb-2'>UT Connect</p>
                                <p className='ml-0 text-sm mb-1 md:mb-0 md:text-2xs sm:mb-0 sm:text-3xs'>Equipment Monitoring</p>
                                <p className='ml-0 text-sm mb-1 md:mb-0 md:text-2xs sm:mb-0 sm:text-3xs'>Order Tracking</p>
                                <p className='ml-0 text-sm mb-1 md:mb-0 md:text-2xs sm:mb-0 sm:text-3xs'>Notifikasi</p>
                                <p className='ml-0 text-sm mb-1 md:mb-0 md:text-2xs sm:mb-0 sm:text-3xs'>My Ticket</p>
                                <p className='ml-0 text-sm mb-1 md:mb-0 md:text-2xs sm:mb-0 sm:text-3xs'>Promosi</p>
                            </div>
                        </div>
                        <div className='w-2/4 flex flex-row mb-4 xl:w-100vw xl:px-2 lg:w-100vw lg:px-4 md:w-100vw md:px-4 sm:w-100vw sm:px-4'>
                            <div className='max-w-50% mx-auto xl:ml-8 lg:ml-2 md:-ml-2 sm:-ml-2'>
                                <p className='mb-4 font-bold md:text-sm md:mb-2 sm:mb-2 sm:text-sm'>Hubungi Kami</p>
                                <table>
                                    <tr>
                                        <td className='text-sm md:text-3xs sm:text-3xs'>Telepon</td>
                                        <td className='text-sm'> </td>
                                        <td className='text-sm md:text-3xs sm:text-3xs'>:</td>
                                        <td className='text-sm'></td>
                                        <td className='text-sm md:text-3xs sm:text-3xs'>(021) 24579999</td>
                                    </tr>
                                    <tr>
                                        <td className='text-sm md:text-3xs sm:text-3xs'>Website</td>
                                        <td className='text-sm'> </td>
                                        <td className='text-sm md:text-3xs sm:text-3xs'>:</td>
                                        <td className='text-sm'></td>
                                        <td className='text-sm md:text-3xs sm:text-3xs'>www.unitedtractors.com</td>
                                    </tr>
                                    <tr>
                                        <td className='text-sm md:text-3xs sm:text-3xs'>Email</td>
                                        <td className='text-sm'> </td>
                                        <td className='text-sm md:text-3xs sm:text-3xs'>:</td>
                                        <td className='text-sm'></td>
                                        <td className='text-sm md:text-3xs sm:text-3xs'>utmobileapp@unitedtractors.com</td>
                                    </tr>
                                    <tr>
                                        <td className='text-sm md:text-3xs sm:text-3xs'>Alamat</td>
                                        <td className='text-sm'> </td>
                                        <td className='text-sm md:text-3xs sm:text-3xs'>:</td>
                                        <td className='text-sm'></td>
                                        <td className='text-sm md:text-3xs sm:text-3xs'>PT. United Tractors, Tbk</td>
                                    </tr>
                                    <tr>
                                        <td className='text-sm'></td>
                                        <td className='text-sm'> </td>
                                        <td className='text-sm'></td>
                                        <td className='text-sm'></td>
                                        <td className='text-sm md:text-3xs sm:text-3xs'>Jl. Raya Bekasi KM 22, Cakung,</td>
                                    </tr>
                                    <tr>
                                        <td className='text-sm'></td>
                                        <td className='text-sm'> </td>
                                        <td className='text-sm'></td>
                                        <td className='text-sm'></td>
                                        <td className='text-sm md:text-3xs sm:text-3xs'>Jakarta Timur, 13190</td>
                                    </tr>
                                </table>
                            </div>
                            <div className='max-w-50% mx-auto xl:mr-14 lg:-mr-2 md:mr-1 sm:-mr-3'>
                                <div className='mb-4 font-bold md:mb-2 md:text-sm sm:text-sm sm:mb-2'>Ikuti Kami</div>
                                <div className='ml-0'>
                                    <div className='text-sm mb-2 sm:mb-3 flex flex-row items-center md:text-2xs sm:text-3xs'>
                                        <img src={IconFacebook} className="mr-4 md:mr-2 h-5 md:h-4 sm:h-4 sm:mr-1" />
                                        ptunitedtractorstbk
                                    </div>
                                    <div className='text-sm mb-2 sm:mb-3 flex flex-row items-center md:text-2xs sm:text-3xs'>
                                        <img src={IconInstagram} className="mr-4 md:mr-2 h-5 md:h-4 sm:h-4 sm:mr-1" />
                                        unitedtractors.connect
                                    </div>
                                    <div className='text-sm mb-1 flex flex-row items-center md:text-2xs sm:text-3xs'>
                                        <img src={IconTwitter} className="mr-4 md:mr-2 h-5 md:h-4 sm:h-4 sm:mr-1" />
                                        unitedtractors
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-wrap'>
                        <div className='text-sm sm:text-xs mt-4 py-2 flex-grow bg-black text-white'>
                            <div className='ml-12'> &copy; 2022 United Tractors - All rights reserved</div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default FooterBar;