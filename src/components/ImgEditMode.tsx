import { Suspense, useEffect, useState } from "react";
import { useContext } from "react";
import { ImgStateContext } from "../globalStateImg";
import { IMG, usePixelZoneArgs, userImgEditdProps } from "../types";
import Button from "./Button";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import DownloadButton from "./DownloadButton";
import { PixelSizeContext } from "../globalStatePixelSize";
import usePixelZone from "../hooks/usePixelZone";
import { AreaSelector, IArea } from "@bmunozg/react-image-area";
import { ArrowLeftCircle,ArrowCounterclockwise, Pencil } from "react-bootstrap-icons";

const MAX_WIDTH = 600;

export default function ImgEditMode({ publicId, filename, widthFile }: userImgEditdProps) {
    let widthToUse = widthFile < (MAX_WIDTH + 200) ? 550 : 450;
    const { setImgStatus } = useContext(ImgStateContext);
    const { pixelSize } = useContext(PixelSizeContext);
    const comeBackUploadImg = () => setImgStatus(IMG.NOT_READY);

    const [areas, setAreas] = useState<IArea[]>([]);
    const [imgReady, setImgReady] = useState(true);

    const [newUrl, setNewUrl] = useState('');
    const [changeImg, setChangeImg] = useState(false);

    const [calculateImg, setCalculateImg] = useState(1);

    const { resizeImg } = usePixelZone({ publicId } as usePixelZoneArgs, widthToUse);

    useEffect(() => {
        let i = 1;
        new Array(10).fill(0).map(() => {
            i = i + 0.1;
            if ((widthToUse / i) < MAX_WIDTH) {
                setCalculateImg(i);
            }
        });
    }, []);


    const handleImgState = () => {
        setImgReady(false)
    };

    const onChangeHandler = (areas: IArea[]) => {
        setAreas(areas);
    }


    const pixelateImg = () => {
        if (areas[0]) {
            let { height, width, x, y } = areas[0];
            if (widthToUse > MAX_WIDTH) {
                x  *= calculateImg;
                y  *= calculateImg;
                width *= calculateImg;
                height *= calculateImg;
            }
            const data = {
                pixelSize,
                publicId,
                userWidth: Math.trunc(width),
                userHeight: Math.trunc(height),
                x: Math.trunc(x),
                y: Math.trunc(y),
                newWidth: 0,
                newHeight: 0
            }
            const { pixelateImg } = usePixelZone(data, widthToUse);
            setNewUrl(pixelateImg);
            if(pixelateImg){
                setChangeImg(true);
            }
        }

    }

    const pixelateAgain=()=>{
        setChangeImg(false);
    }

    return (
        <div className="file-user-container">
            <div className="img_container">
                <h2 className="font mb-3 mt-3">Please Select Your Zone to Pixelate</h2>
                {imgReady && 
                <div className="center" style={{width:'100%', height:`${550}px`}}>
                    <p className="mt-5 mb-5">Wait a bit more...</p>
                </div>}
                <div className={`canvas-container ${changeImg ? 'dontPixel' : ''}`}>
                    <AreaSelector
                        areas={areas}
                        onChange={onChangeHandler}
                        maxAreas={1}>
                        <LazyLoadImage
                            src={changeImg ? newUrl : resizeImg}
                            alt="user image"
                            onLoad={handleImgState}
                        />
                    </AreaSelector>
                </div>
                {
                    !changeImg ?
                        <Button
                            className="btn-secondary mt-3"
                            onClick={pixelateImg}>
                            Pixelate image
                            <span className="center" style={{fontSize:'1em'}}>
                                <Pencil/>
                            </span>
                        </Button>
                    : <DownloadButton
                        fileNameImg={`${filename} - pixelated by Blockify.jpg`}
                        urlImg={newUrl}
                        />
                }
                {
                    !changeImg ? 
                    <Button
                        className="btn-primary mt-3"
                        onClick={comeBackUploadImg}>
                        Come back to upload other img
                        <span className="center" style={{fontSize:'1.1em'}}>
                            <ArrowLeftCircle/>
                        </span>
                    </Button>
                    :
                    <Button
                        className="btn-primary mt-3"
                        onClick={pixelateAgain}>
                        Pixelate again 
                        <span className="center" style={{fontSize:'1.1em'}}>
                            <ArrowCounterclockwise/>
                        </span>                    
                    </Button>
                }
       

            </div>
        </div>
    );
}
