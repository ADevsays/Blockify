import { useContext, useState } from "react";
import { ImgStateContext } from "../globalStateImg";

export default function Switch() {
    const {isFace, setIsFace} = useContext(ImgStateContext);

    const handleIsFace=()=>{
        setIsFace(!isFace);
    }

    return (
        <div className="switch-container">
            <p className="isFace-p m-1">
                {
                    !isFace 
                    ? "It don't have face" 
                    : "Have face"
                }
            </p>
            <div className="cntr">
                <input 
                    checked={isFace}
                    onChange={handleIsFace}
                    type="checkbox" 
                    id="cbx" 
                    className="hidden-xs-up" />
                <label 
                    htmlFor="cbx" 
                    className="cbx" />
            </div>
        </div>
    );
}