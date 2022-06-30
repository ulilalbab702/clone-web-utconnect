import React from 'react'
import Modal from '@material-ui/core/Modal';
import { IconCaution, IconUTCall, IconMail } from '../../../assets/icons';

const ModalConfirm = ({ isOpen, isClose, cancel, order }) => {
    return (
        <Modal open={isOpen} onClose={isClose}
            className="flex justify-center items-center m-auto p-4 sm:p-2">
            <div className="flex flex-col items-center justify-center h-auto w-30vw 2xl:w-2/5 xl:w-1/2 lg:w-10/12 md:w-auto sm:w-full p-4 rounded-lg bg-white">
                <div className='flex flex-col items-center'>
                    <p className='text-lg font-bold mb-5 md:mb-4 sm:mb-3'>Kamu Yakin ?</p>
                    <img src={IconCaution} className="w-28 h-auto md:w-24 sm:w-24" />
                    <div className='font-medium text-center mx-7 mt-6 md:mt-5 sm:mt-4 sm:text-sm'>Dengan memilih lanjutkan Anda setuju dengan <span className='text-blue-500'>syarat dan ketentuan</span> UT Connect</div>
                    <div className='flex flex-row justify-center gap-x-4 mt-4'>
                        <button onClick={cancel}
                            className='w-36 h-8 md:w-32 sm:w-28 p-1 rounded-lg font-semibold shadow bg-gray-300'>Kembali</button>
                        <button onClick={order}
                            className='w-36 h-8 md:w-32 sm:w-28 p-1 rounded-lg font-semibold shadow' style={{ backgroundColor: '#ffd500' }}>Lanjutkan</button>
                    </div>
                    <p className='text-sm sm:text-xs mt-4'>Butuh informasi tambahan? Kontak kami</p>
                    <div className='flex flex-row justify-center gap-x-4 mt-4'>
                        <img src={IconUTCall} className="w-16 h-auto" />
                        <img src={IconMail} className="w-14 h-auto" />
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default ModalConfirm