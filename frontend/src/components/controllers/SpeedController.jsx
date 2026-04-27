import IncreaseButton from "../common/IncreaseButton";
import DecreaseButton from "../common/DecreaseButton";

export default function SpeedController({newRate, increaseSpeed, decreaseSpeed}) {
    return(
         <div className="flex items-center gap-2 bg-white/7 border border-blue-300/30 rounded-xl px-4 py-2.5 w-1/2">
            <span className="text-white/50 text-xs flex-1">Speed</span>
            <DecreaseButton decrease={decreaseSpeed} />
            <span className="text-white font-medium w-7 text-center">{newRate.toFixed(1)}</span>
            <IncreaseButton increase={increaseSpeed} />
        </div>
    );
}