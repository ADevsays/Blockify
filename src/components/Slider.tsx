import { useState, useContext } from "react";
import { PixelSizeContext, PixelSizeProvider } from "../globalStatePixelSize";

export default function Slider() {
    const MIN = 3;
    const MAX = 15;
    const {pixelSize, setPixelSize} = useContext(PixelSizeContext);
    const [rangeValue, setRangeValue] = useState(pixelSize);

    const handleRange = (e: Event | any) => {
        const pixelValue = e.target.value;
        setRangeValue(pixelValue);
        setPixelSize(pixelValue);
    }

    return (
        <div className="slider-container">
            <p className="range-p">{`${rangeValue}px`}</p>
            <input
                style={{ backgroundSize:
                        `${(rangeValue - MIN) * 100 /
                        (MAX - MIN)}% 100%`}}
                onChange={handleRange}
                min={MIN}
                max={MAX}
                value={rangeValue}
                type="range"
                className="slider" />
        </div>
    );
}