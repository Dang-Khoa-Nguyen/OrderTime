
export default function AnswerBox({text, isOpen}) {
    return(
    <div>
        {isOpen ? ( 
        <div className="h-10">
            {text === "" ? (<p>
                The customer didn't order yet
            </p>) : (
                <p className="text-sm font-manrope">
                {text}
        </p>
            )}    
        </div>)  : (
            <div className="h-10"></div>
        )}
       
    </div>
    )
}