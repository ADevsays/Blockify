import { DropzoneElementProps } from "../types";
import DropZoneElement from "./DropzoneElement";
import SetValues from "./SetValues";
import Title from "./Title";


export default function FileUserContainer({ enterInDragzone,
    getOutDragzone,
    inDrag }:
    DropzoneElementProps) {

    return (
        <div className="container-flex">
            <Title />
            <div className="f-column">
                <DropZoneElement
                    enterInDragzone={enterInDragzone}
                    getOutDragzone={getOutDragzone}
                    inDrag={inDrag}
                />
                <SetValues />
            </div>
        </div>

    );
}