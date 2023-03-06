import axios from "axios";
import fileDownload from "js-file-download"
import { DownloadButtonProps } from "../types";
import Button from "./Button";
import { Download } from "react-bootstrap-icons";

export default function DownloadButton({urlImg, fileNameImg}: DownloadButtonProps){

    const handleDownload = (url:string, filename:string)=>{

        axios.get(url, {
            responseType: "blob"
          })
          .then((res) => {
            fileDownload(res.data, filename);
          });

    }

    return <Button 
            className="btn-secondary mt-3"
            onClick={()=> handleDownload(urlImg, fileNameImg)}>
                Download Image <span className="center" style={{fontSize:'1.2em'}}><Download/></span>
            </Button>
}