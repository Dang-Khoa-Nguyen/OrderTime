import { FaPlus } from "react-icons/fa";

export default function IncreaseButton({increase}) {
    return(
    <div className="w-5 h-4 cursor-pointer" onClick={increase}>
        <FaPlus/>
    </div>
    )
}