// icon imports
import { FaPlay } from "react-icons/fa6";

export default function StartOrder({getOrder}) {
    return(
    <div className="w-full">
        <button
            style={{ background: '#185FA5' }}
            onMouseOver={e => e.currentTarget.style.background = '#0C447C'}
            onMouseOut={e => e.currentTarget.style.background = '#185FA5'}
            onClick={getOrder}
            className="w-full flex items-center gap-2 px-8 py-3 rounded-xl text-[#E6F1FB] 
            font-medium text-xs transition-transform active:scale-95 bg-#185FA5"
        >
            <FaPlay/>
            Start order
        </button>
    </div>
    )
}