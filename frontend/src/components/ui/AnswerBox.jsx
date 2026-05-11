import { FaEyeSlash } from "react-icons/fa";

export default function AnswerBox({text, isOpen}) {
    return(
    <div className="w-5/6 mb-3">
        {isOpen ? ( 
        <div className="h-10 flex px-2 items-center rounded-lg bg-gray-500 text-xs">
            {text === "" ? (<p>
                The customer hasn't order yet!
            </p>) : (
                <p className="text-sm font-manrope">
                {text}
        </p>
            )}    
        </div>)  : (
            <div className="h-10 text-xs flex justify-start items-center px-5 gap-2 rounded-lg bg-gray-500 cursor-not-allowed
            opacity-30"> <FaEyeSlash/> Click Open button to view answer </div>
        )}
       
    </div>
    )
}