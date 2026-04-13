import { FaEyeSlash } from "react-icons/fa";

export default function AnswerBox({text, isOpen}) {
    return(
    <div className="w-1/2">
        {isOpen ? ( 
        <div className="h-10 flex justify-center items-center rounded-lg bg-gray-500">
            {text === "" ? (<p>
                The customer didn't order yet
            </p>) : (
                <p className="text-sm font-manrope">
                {text}
        </p>
            )}    
        </div>)  : (
            <div className="h-10 flex justify-start items-center px-5 gap-2 rounded-lg bg-gray-500 cursor-not-allowed"> <FaEyeSlash/> Answer </div>
        )}
       
    </div>
    )
}