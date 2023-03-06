import FileUserContainer from "./FileUserContainer";
import { IMG } from "../types";
import ImgDone from "./ImgDone";
import useDropzone from "../hooks/useDropzone";
import { useContext } from "react";
import { ImgStateContext } from "../globalStateImg";
import ImgEditMode from "./ImgEditMode";

export default function ContentRender() {
    const { enterInDragzone,
            getOutDragzone,
            inDrag, userImg,
            publicId, filename,
            formatImg, widthFile } = useDropzone();
    const { imgStatus, isFace } = useContext(ImgStateContext);


    return (
        <>
            {imgStatus === IMG.NOT_READY ?
                <FileUserContainer
                    enterInDragzone={enterInDragzone}
                    getOutDragzone={getOutDragzone}
                    inDrag={inDrag}
                />
                : imgStatus === IMG.UPLOAD ?
                    <div className="f-column">
                        <div className="loader"></div>
                        <h3 className="font" style={{ marginTop: "150px" }}>We're working in your image ;)</h3>
                    </div>
                    : isFace ?
                    <ImgDone
                        publicId={publicId}
                        userImg={userImg}
                        filename={filename}
                        formatImg={formatImg}
                    /> : 
                    <ImgEditMode
                        publicId={publicId}
                        widthFile={widthFile}
                        filename={filename}/>
            }
        </>

    );
}