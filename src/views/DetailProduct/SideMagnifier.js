import React, { Component } from "react";
import { SideBySideMagnifier } from "react-image-magnifiers"

class SideMagnifier extends Component {
    state = {
        alwaysInPlace: false,
        overlayOpacity: 0.6,
        switchSides: false,
        fillAvalableSpace: false,
        fillAlignTop: false,
        fillGapLeft: 0,
        fillGapRight: 10,
        fillGapTop: 10,
        fillGapBottom: 10
    };

    render() {
        const {
            alwaysInPlace,
            overlayOpacity,
            switchSides,
            fillAvalableSpace,
            fillAlignTop,
            fillGapLeft,
            fillGapRight,
            fillGapTop,
            fillGapBottom
        } = this.state;

        const {images, imagesLarge} = this.props;

        return (
            <>
                <div className="flex mt-4">
                    <SideBySideMagnifier
                        className="h-20"
                        style={{ order: switchSides ? "1" : "0" }}
                        imageSrc={images}
                        largeImageSrc={imagesLarge}
                        alwaysInPlace={alwaysInPlace}
                        overlayOpacity={overlayOpacity}
                        switchSides={switchSides}
                        onZoomStart="left"
                        inPlaceMinBreakpoint={641}
                        fillAvailableSpace={fillAvalableSpace}
                        fillAlignTop={fillAlignTop}
                        fillGapTop={fillGapTop}
                        fillGapRight={fillGapRight}
                        fillGapBottom={fillGapBottom}
                        fillGapLeft={fillGapLeft}
                        zoomContainerBorder="1px solid #ccc"
                    />
                </div>
            </>
        )
    }
}

export default SideMagnifier;