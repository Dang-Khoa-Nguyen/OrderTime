import { FaMinus } from "react-icons/fa";

export default function DecreaseButton({decrease}) {
    return(
    <div className="w-5 h-4 cursor-pointer" onClick={decrease}>
        <FaMinus/>
    </div>
    )
}