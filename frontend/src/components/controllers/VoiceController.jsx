import IncreaseButton from "../common/IncreaseButton";
import DecreaseButton from "../common/DecreaseButton";

export default function VoiceController({newPitch, decreaseTone, increaseTone}) {
    return(
        <div className="flex items-center gap-2 bg-white/7 border border-amber-300/30 rounded-xl px-4 py-2.5">
            <span className="text-white/50 text-xs flex-1">Voice</span>
            <DecreaseButton decrease={decreaseTone} />
            <span className="text-white font-medium w-7 text-center">{newPitch.toFixed(1)}</span>
            <IncreaseButton increase={increaseTone} />
        </div>
    );
}