
export type Props = {
    className?:string,
    children?: React.ReactNode | string | JSX.Element | JSX.Element[],
    onClick?: ()=> any
}

export enum IMG {
    NOT_READY, 
    UPLOAD,
    DONE
}



export interface DropzoneElementProps {
    enterInDragzone: ()=> void,
    getOutDragzone: ()=> void,
    inDrag: boolean
}


export type userImgProps = {
    userImg: string , 
    publicId: string,
    filename:string,
    formatImg:string,
}
export type userImgEditdProps={
    publicId: string,
    filename:string,
    widthFile: number 
}

export type DownloadButtonProps = {
    urlImg:string,
    fileNameImg:string
}

export interface ImgUserContextProps{
    error:string, 
    imgStatus: IMG, 
    setImgStatus: React.Dispatch<React.SetStateAction<number>>,
    isFace:boolean,
    setIsFace: React.Dispatch<React.SetStateAction<boolean>>
}


export interface PixelSizeContextProps{
    error:string,
    pixelSize: number,
    setPixelSize: React.Dispatch<React.SetStateAction<number>>
}

export interface usePixelZoneArgs{
    newWidth:number,
    newHeight:number,
    pixelSize:number,
    publicId:string, 
    userWidth:number, 
    userHeight:number, 
    x:number, 
    y:number
}


export interface CanvasEditProps{
    width:number,
    height:number,
    userImg:string,
    setCoordinates: React.Dispatch<React.SetStateAction<Coordinates>>
}

export interface MousePosition{
    x:number,
    y:number
}

export interface Coordinates{
    x:number,
    y:number,
    width:number,
    height:number
}