
import useDrawCanvas from "../hooks/useDrawCanvas";
import { CanvasEditProps } from "../types";

//Tipar todos los ANY 🦾

//guardar como un objeto las medidas y la  ubicacion del 
//rectangulo dibujado por el usuario  🦾
//Pasarle este objeto al usepixelzone
//Actualizar la imagen por la imagen pixelada

export default function CanvasEdit({ userImg, height, width, setCoordinates }: CanvasEditProps) {
    const { canvasRef,
            clear,
            handlePosition,
            mouseUp,
            calculateMeasures,
            coordinates } = useDrawCanvas(userImg);
    setCoordinates(coordinates);
    return (
        <canvas
            ref={canvasRef}
            height={height}
            width={width}
            onClick={clear}
            onMouseDown={((e) => handlePosition( e))}
            onMouseUp={mouseUp}
            onMouseMove={(e) => calculateMeasures(e)}
        />
    );
}