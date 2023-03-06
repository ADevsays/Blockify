import { createContext, useState } from "react";
import {Props, IMG, ImgUserContextProps} from './types';

export const ImgStateContext = createContext<ImgUserContextProps>({} as ImgUserContextProps);


export function ImgStateProvider({children}: Props){
    const [imgStatus, setImgStatus] = useState(IMG.NOT_READY);
    const [isFace, setIsFace] = useState(true);
    
    const value:ImgUserContextProps = {
        error:"don't exists provider",
        imgStatus, setImgStatus,
        isFace, setIsFace
    } 

    return (
        <ImgStateContext.Provider
            value={value}>
            {children}
        </ImgStateContext.Provider>
    );
}