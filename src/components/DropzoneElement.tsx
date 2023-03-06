import { useContext } from "react";
import { FileEarmarkArrowUp } from "react-bootstrap-icons";
import { ImgStateContext } from "../globalStateImg";
import { DropzoneElementProps } from "../types";
import { IMG } from "../types";

export default function DropZoneElement({enterInDragzone,
                                         getOutDragzone, 
                                         inDrag}: 
                                        DropzoneElementProps) {

    const handleImgState = (e:(Event | any))=>{
        console.log(e)
        e.preventDefault();
    }
  
    return (
       <div className="form" >
            <label 
                htmlFor="file"
                id="dropzone" 
                onDragOverCapture={enterInDragzone}
                onDragLeaveCapture={getOutDragzone}
                onDropCapture={getOutDragzone}
                className={`${inDrag ? 'draggable' : ''}`}>
               <h3>DRAG AND DROP YOUR FILE HERE</h3>

               <span>
                   <FileEarmarkArrowUp/>
               </span>
               <input 
                    type="file" 
                    name="file"
                    title=""
                    onClick={handleImgState}
                />
           </label>
       </div>
    );
}