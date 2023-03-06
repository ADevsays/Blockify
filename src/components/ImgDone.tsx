import { useState, useContext } from "react";
import { ImgStateContext } from "../globalStateImg";
import { IMG, userImgProps } from "../types";
import Button from "./Button";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import usePixelFace from "../hooks/usePixelFace";
import DownloadButton from "./DownloadButton";
import { PixelSizeContext } from "../globalStatePixelSize";
import { ArrowLeftCircle } from "react-bootstrap-icons";
export default function ImgDone({ userImg, publicId, 
                                  filename, formatImg}: userImgProps){
    const { setImgStatus } = useContext(ImgStateContext);
    const {pixelSize} = useContext(PixelSizeContext);
    const comeBackUploadImg = () => setImgStatus(IMG.NOT_READY);
    const [imgReady, setImgReady] = useState(true);

    const handleImgState = () => setImgReady(false);

    const urlPixelImg = usePixelFace(publicId, pixelSize);

    return (
        <div className="file-user-container">
            <div className="img_container">
                <h2 className="font mb-3 mt-3">Your Pixelate Image</h2>
                {imgReady && <p>Wait a bit more...</p>}
                <div className="img">
                    <LazyLoadImage
                        src={urlPixelImg}
                        alt="user image"
                        height={450}
                        width={600}
                        onLoad={handleImgState}
                    />
                </div>
                <DownloadButton
                    urlImg={urlPixelImg}
                    fileNameImg={`${filename} - pixelated by Blockify.jpg`}
                />
                <Button
                    className="btn-primary mt-3"
                    onClick={comeBackUploadImg}>
                    Come back to upload other img 
                    <span className="center" style={{fontSize:'1.1em'}}>
                        <ArrowLeftCircle/>
                    </span>
                </Button>
            </div>
        </div>
    );
}