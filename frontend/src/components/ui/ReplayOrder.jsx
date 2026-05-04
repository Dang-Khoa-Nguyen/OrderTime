// icon imports
import { MdOutlineReplay } from "react-icons/md";

export default function ReplayOrder({handleReplay}) {
    return(
    <div className="w-full">
        <button
            onMouseOver={e => e.currentTarget.style.background = '#7c4b0c'}
            onMouseOut={e => e.currentTarget.style.background = '#895413'}
            onClick={handleReplay}
            className="w-full flex items-center gap-2 px-8 py-3 rounded-xl text-[#E6F1FB] 
            font-medium text-xs transition-transform active:scale-95 bg-[#895413]"
        >
            <MdOutlineReplay/>
            Replay
        </button>
    </div>
    )
}