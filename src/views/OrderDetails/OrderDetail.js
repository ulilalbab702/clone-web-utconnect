import React from 'react'
import { brakeImg, brake2 } from "../../assets/images"
import ReactImageMagnify from 'react-image-magnify';

const OrderDetail = () => {

    const img = brakeImg;
    const img2 = brakeImg;
    const img3 = brakeImg;
    const img4 = brakeImg;
    const img5 = brake2;
    const frontSrcSet = [
        { src: img, setting: '500vw' },
        { src: img2, setting: '779vw' },
        { src: img3, setting: '1020vw' },
        { src: img4, setting: '1200vw' },
        { src: img5, setting: '1426vw' },
    ].map(item => `${item.src} ${item.setting}`).join(', ');

    const dataSrc = [
        {
            srcSet: frontSrcSet,
            small: img,
            large: img5
        }
    ]

    const _imageMagnifier = () => {
        return (
            <div className='mt-28'>
                {dataSrc.map((item) => (
                    <div>
                        <ReactImageMagnify
                            {...{
                                smallImage: {
                                    alt: 'gambar',
                                    isFluidWidth: true,
                                    src: item.small,
                                    srcSet: item.srcSet,
                                    sizes: '(max-width: 480px) 100vw, (max-width:1200px) 30vw, 360px'
                                },
                                largeImage: {
                                    src: item.large,
                                    width: 1200,
                                    height: 600
                                },
                                enlargedImagePosition: "over",
                            }} />
                    </div>
                ))}
            </div>
        )
    }


    const imageBaseUrl =
        "https://s3-us-west-1.amazonaws.com/react-package-assets/images/";
    const images = [
        { name: "wristwatch_355.jpg", vw: "355w" },
        { name: "wristwatch_481.jpg", vw: "481w" },
        { name: "wristwatch_584.jpg", vw: "584w" },
        { name: "wristwatch_687.jpg", vw: "687w" },
        { name: "wristwatch_770.jpg", vw: "770w" },
        { name: "wristwatch_861.jpg", vw: "861w" },
        { name: "wristwatch_955.jpg", vw: "955w" },
        { name: "wristwatch_1033.jpg", vw: "1033w" },
        { name: "wristwatch_1112.jpg", vw: "1112w" },
        { name: "wristwatch_1192.jpg", vw: "1192w" },
        { name: "wristwatch_1200.jpg", vw: "1200w" }
    ];

    const srcSet = () => {
        return images
            .map((image) => {
                return `${imageBaseUrl}${image.name} ${image.vw}`;
            })
            .join(", ");
    }

    const _tes = () => {
        return (
            <div>
                <ReactImageMagnify
                    {...{
                        smallImage: {
                            alt: "Wristwatch by Ted Baker London",
                            isFluidWidth: true,
                            src: `${imageBaseUrl}wristwatch_1033.jpg`,
                        },
                        largeImage: {
                            alt: "",
                            src: `${imageBaseUrl}wristwatch_1200.jpg`,
                            width: 1200,
                            height: 1800
                        },
                        isHintEnabled: true,
                        enlargedImagePosition: "over"
                    }}
                />
            </div>
        )
    }

    return (
        <div className='mt-28 flex justify-center'>
            <div className='border flex mb-8 mx-0'>
                <div style={{flex: '0 0 100%'}}>
                {_tes()}
                </div>
                {/* {_imageMagnifier()} */}
            </div>
        </div>
    )
}

export default OrderDetail