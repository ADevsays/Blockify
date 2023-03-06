import { Props } from "../types";

export default function Button({children, className, onClick}:Props){
    return <button 
                className={className}
                onClick={onClick}>
                {children}
            </button>
}
