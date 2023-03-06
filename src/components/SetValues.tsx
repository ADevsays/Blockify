import Slider from "./Slider";
import Switch from "./Switch";
import { ArrowRight } from "react-bootstrap-icons";
import { SliderProps } from "../types";
export default function SetValues({sizePixel, setSizePixel}:SliderProps) {
    
    return (
        <div className="center f-column m-3 container-inputs">
            <div className="slider-container d-flex mt-2 border-bottom">
                    <p className="description">
                        Select the Square Size of pixels
                        <span>
                            <ArrowRight/>
                        </span>
                    </p>
               
                <Slider
                    sizePixel={sizePixel}
                    setSizePixel={setSizePixel}
                    />
            </div>
            <div className="d-flex mt-4 border-bottom">
                    <p className=" description">
                        Select to automatically face detected
                        <span>
                            <ArrowRight/>
                        </span>
                    </p>
                <Switch/>
            </div>
        </div>
    );
}