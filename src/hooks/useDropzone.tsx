import Dropzone from "dropzone";
import {useState, useEffect, useContext} from 'react';
import { ImgStateContext } from "../globalStateImg";
import {IMG} from '../types';
const UPLOAD_API_URL = 'https://api.cloudinary.com/v1_1/dundmk7vd/upload'


export default function useDropzone(){
    const [inDrag, setInDrag] = useState(false);
    const [userImg, setUserImg] = useState('');
    const [publicId, setPublicId] = useState('');
    const [filename, setFilename] = useState('');
    const [formatImg, setImgFormat] = useState('');
    const [widthFile, setWidthFile] = useState(0);

    // const 

    const {imgStatus, setImgStatus} = useContext(ImgStateContext);

    useEffect(()=>{
        if(imgStatus === IMG.NOT_READY){
            const dropzone = new Dropzone('#dropzone', {
                uploalMultiple: false,
                acceptedFiles: '.jpg, .png, .webp',
                maxFiles: 1,
                url: UPLOAD_API_URL
            });
            dropzone.on('sending', (file:any, xhr:any, formData:FormData) =>{
                formData.append('upload_preset', 'new_preset_value');
                formData.append('timestamp', String(Date.now()));
                formData.append('api_key', String(183546424685349));
                setImgStatus(IMG.UPLOAD);
            });
            dropzone.on('error', ()=>{
                console.error('HAS HAPPEND A ERROR!');
                
            });
            dropzone.on('success', (file:any, response:any)=>{
                file.previewElement.parentNode.removeChild(file.previewElement);
                const {secure_url, 
                        public_id, 
                        original_filename,
                        format: format_img,
                        width} = response;
                console.log(file)
                setImgFormat(format_img);
                setFilename(original_filename);
                setUserImg(secure_url);
                setImgStatus(IMG.DONE);
                setPublicId(public_id);
                setWidthFile(width);
            });     
        }
    
    }, [imgStatus]);

    const enterInDragzone=()=> setInDrag(true);
    const getOutDragzone=()=> setInDrag(false);

    return {
        enterInDragzone, 
        getOutDragzone, 
        inDrag, userImg,
        publicId, filename,
        formatImg, widthFile
    }

}