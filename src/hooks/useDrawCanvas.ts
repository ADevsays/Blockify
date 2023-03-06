import { useContext, useEffect, useRef, useState } from "react";
import { ImgStateContext } from "../globalStateImg";
import { CanvasEditProps, Coordinates, IMG, MousePosition } from "../types";


export default function useDrawCanvas(userImg:string){
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { imgStatus } = useContext(ImgStateContext);
    const [canvas, setCanvas] = useState<HTMLCanvasElement>({
        getBoundingClientRect: ()=> 0 as unknown
    } as HTMLCanvasElement);
    const [ctx, setCtx] = useState<CanvasRenderingContext2D>({} as CanvasRenderingContext2D);

    const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 });
    const [isHold, setIsHold] = useState(false);

    const [coordinates, setCoordinates] = useState<Coordinates>({
        x:0,
        y:0,
        width:0,
        height:0
    });

    const [start, setStart] = useState(0);
    const [end, setEnd] = useState(0);

    useEffect(() => {
        if (imgStatus === IMG.DONE) {
            console.log('IMG READY!')
            const canvas = canvasRef.current as HTMLCanvasElement;
            const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
            const newImg = new Image();
            newImg.src = userImg;
            newImg.onload = function () {
                console.log(newImg)
                ctx.drawImage(newImg, canvas.width, canvas.height);
                setCtx(ctx);
                setCanvas(canvas);
            }
        }
    }, [imgStatus]);

    const handlePosition = (event: Event | any) => {
        setStart(Date.now());
        setIsHold(true);
        const rect = canvas.getBoundingClientRect();
   
        setMousePosition({
            x: event.clientX - rect.left,
            y: event.clientY - rect.top,
        });
        
    }

    const draw = (x: number, y: number, width: number, heightM: number) => {

        if (isHold) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.strokeStyle = '#09f';
            ctx.setLineDash([6]);
            ctx.lineWidth = 3;
            ctx.strokeRect(x, y, width, heightM);
            setEnd(Date.now());
        }
    }

    const calculateMeasures = (event: Event | any) => {
        const rect = canvas.getBoundingClientRect();
        const xDown = event.clientX - rect.left;
        const yDown = event.clientY - rect.top;
        const width = xDown - mousePosition.x;
        const height = yDown - mousePosition.y;
        const coordinatesData = {
            x: mousePosition.x,
            y: mousePosition.y,
            width,
            height
        };
        draw(mousePosition.x, mousePosition.y, width, height);
        if(isHold){
            setCoordinates(coordinatesData);
        }
    }

    const clear = () => {
        if ((start - end) > 0) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
    }

    const mouseUp=()=>{
        setIsHold(false);
    }

    return{
        canvasRef,
        clear, 
        handlePosition,
        mouseUp,
        calculateMeasures,
        coordinates
    }
}