import React, { useState } from "react";
import { Modal } from "@material-ui/core";

const ModalSelectBranch = ({ item, isOpen, isClose, save, cancel }) => {
    const [selectedTabBranch, setTabBranch] = useState(null);
    const [selectedBranch, setBranch] = useState(null);

    const renderListAddress = () => {
        return item.map((item, index) => {
            return (
                <div className="overflow-auto">
                    <div className="flex flex-row mb-6 md:mb-4 sm:mb-3 items-center" >
                        {selectedTabBranch === index ? (
                            <div className="mx-3 w-4 h-4 rounded-full bg-green-400" />
                        ) : (
                            <div className="mx-3 w-4 h-4 border-2 rounded-full" />
                        )}
                        <div className="w-full h-20 md:h-16 sm:h-14 flex flex-col justify-center bg-gray-100 rounded-lg" onClick={() => (setTabBranch(index), setBranch(item))}>
                            <div className="m-2 font-semibold md:text-sm md:font-bold sm:text-sm sm:font-bold text-gray-800">
                                {item.description.toUpperCase().replace("UT BRANCH", "")}
                                <div className="font-normal text-gray-600 text-sm md:text-xs sm:text-xs">{item.address}</div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        })
    }

    return (
        <Modal
            open={isOpen}
            onClose={isClose}
            style={{ borderRadius: '10px' }}
            className="flex justify-center items-center m-auto p-0 lg:p-6 md:p-3 sm:p-2">
            <div className="flex flex-col h-65vh max-w-35% w-full 2xl:max-w-40% xl:max-w-55% lg:max-w-100% md:max-w-100% sm:max-w-100% px-6 rounded-lg bg-white">
                <p className="text-xl font-semibold mt-4">Titik Cabang UT</p>
                <hr className="border border-gray-300 mt-4 mx-10 w-96 2xl:w-80 xl:max-w-90% xl:w-full lg:max-w-90% lg:w-full md:max-w-90% md:w-10/12 sm:max-w-90% sm:w-10/12 mb-1"
                    // style={{ width: '330px' }}
                />
                <div className="overflow-auto mb-1">
                    {renderListAddress()}
                </div>
                <div className="flex flex-row justify-center items-center mb-6">
                    <button className="h-9 w-36 md:h-8 md:w-32 sm:h-7 sm:w-28 font-semibold rounded-lg bg-gray-300 mx-4"
                        onClick={cancel}
                    >Kembali</button>
                    <button className="h-9 w-36 md:h-8 md:w-32 sm:h-7 sm:w-28 font-semibold rounded-lg"
                        style={{ backgroundColor: '#ffd500' }}
                        onClick={() => save(selectedBranch)}
                    >Simpan</button>
                </div>
            </div>
        </Modal>
    );
};

export default ModalSelectBranch;