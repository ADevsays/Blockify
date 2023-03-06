import { createContext, useState } from "react";
import { PixelSizeContextProps, Props } from "./types";

export const PixelSizeContext = createContext<PixelSizeContextProps>({} as PixelSizeContextProps);

export function PixelSizeProvider({children}:Props){
    const [pixelSize, setPixelSize] = useState(9);
    const value = {
        error: "don't exists provider",
        pixelSize, setPixelSize
    }
    return (
        <PixelSizeContext.Provider
            value={value}>
            {children}
        </PixelSizeContext.Provider>
    )

}