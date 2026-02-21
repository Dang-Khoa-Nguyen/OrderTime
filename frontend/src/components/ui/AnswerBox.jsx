
export default function AnswerBox({text, isOpen}) {
    return(
    <div>

        {isOpen ? ( 
        <div>
            {text === "" ? (<p>
                The customer didn't order yet
            </p>) : (
                <p className="text-sm font-manrope">
                {text}
            </p>
            )}    
        </div>)  : (
            <div></div>
        )}
       
    </div>
    )
}