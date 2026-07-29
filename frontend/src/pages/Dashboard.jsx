// component imports
import RestaurantSelector from "../components/ui/RestaurantSelector"
import Introduction from "../components/ui/Introduction"
import StartOrder from "../components/ui/StartOrder"
import VoiceController from "../components/controllers/VoiceController";
import SpeedController from "../components/controllers/SpeedController";

// icon imports
import { RiSpeakFill } from "react-icons/ri";
import { CiCircleCheck, CiCircleQuestion  } from "react-icons/ci";
import { fetchCheckAnswer, fetchOrders } from "../api/Restaurant";
import {useState} from "react";
import AnswerBox from "../components/ui/AnswerBox";
import OpenCloseButton from "../components/ui/OpenCloseButton";
import UserInputBox from "../components/ui/UserInputBox";
import AddAnswerBox from "../components/common/AddAnswerBox";
import ReplayOrder from "../components/ui/ReplayOrder";

export default function Dashboard() {
    const [restaurantId, setRestaurantId] = useState(0);
    const [text, setText] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [newRate, setNewRate] = useState(1);
    const [newPitch, setNewPitch] = useState(0.7);
    const [orders, setOrders] = useState([])
    const [qty, setQty] = useState(1)
    const [answer, setAnswer] = useState("")
    const [result, setResult] = useState([])
    const [overallScore, setOverallScore] = useState(0);
    const [isSubmit, setIsSubmit] = useState(false);
    const [audio, setAudio] = useState(null)
    const [isOrder, setIsOrder] = useState(false);
    const [isShowInstruction, setIsShowInstruction] = useState(false);

    console.log(result)
    console.log(orders)

    const handleAddOrder = () => {
    if (!answer.trim()) return
    setOrders(prev => [...prev, { qty: qty, item: answer, id: Date.now() }])
    setAnswer("")
    setQty(1)
    }

    const handleRemove = (id) => {
    setOrders(prev => prev.filter(order => order.id !== id))
    }

    const handleOpen = () => {
        setIsOpen(true);
    }

    const handleClose = () => {
        setIsOpen(false);
    }

     const increaseTone = () => {
        if (newPitch >= 1) {
            alert("1 is the maximum")
        } else {
            setNewPitch(parseFloat((newPitch + 0.1).toFixed(1)));
        }
    }

    const decreaseTone = () => {
        if (newPitch === 0.1) {
            alert("0.1 is the minimum")
        } else {
            setNewPitch(parseFloat((newPitch - 0.1).toFixed(1)));
        }
    }

    const increaseSpeed = () => {
        if (newRate >= 1.2) {
            alert("1.2 is the maximum")
        } else {
            setNewRate(parseFloat((newRate + 0.1).toFixed(1)));
        }
    }

    const decreaseSpeed = () => {
        if (newRate === 0.7) {
            alert("0.7 is the minimum")
        } else {
            setNewRate(parseFloat((newRate - 0.1).toFixed(1)));
        }
    }
    console.log(restaurantId)
    // const speak = (text) => {
    //     const msg = new SpeechSynthesisUtterance(text);
    //     const voices = window.speechSynthesis.getVoices();

    //     // Choose voice, speed, and tone
    //     msg.voice = voices.find(voice => voice.lang === voiceReading);
    //     msg.rate =  newRate; 
    //     msg.pitch = newPitch; 

    //     setIsSpeaking(true)

    //     msg.onend = () => {
    //         setIsSpeaking(false);
    //     }
        
    //     window.speechSynthesis.speak(msg);
    // };

    const getOrder = async () => {
        if (restaurantId === 0) {
            alert("Please choose the restaurant")
            return  // early return instead of else block
        }

        const res = await fetchOrders({restaurantId: restaurantId, speed: newRate, tone: newPitch});
        setText(res.text)
        setResult(res.answers)
        setOrders([])
        setIsSubmit(false)
        setIsOrder(true)

        const newAudio = new Audio(`data:audio/mp3;base64,${res.audio}`)
        setAudio(newAudio)
        setIsSpeaking(true)
        newAudio.play()
        newAudio.onended = () => setIsSpeaking(false)
    };

    const handleReplay = () => {
        if (!audio) return
        audio.currentTime = 0  // rewind to start
        audio.play()
    }
    
    const handleControlInstruction = () => {
        if (isShowInstruction) {
            setIsShowInstruction(false);
        } else {
            setIsShowInstruction(true);
        } 
    }

    const handleSubmit = async () => {
        setIsSubmit(false)
        const data = await fetchCheckAnswer(orders, result)
        setOverallScore(data.overallScore)
        setIsSubmit(true)
    }


    return(
        <div className="text-white text-center w-full">
            <div className="h-24 flex justify-center items-center my-3">
                <Introduction/>
            </div> 
            <div className="flex justify-center h-full">
                <div className="flex flex-col justify-center items-center gap-3 bg-gray-700 border border-gray-600 w-1/2 rounded-lg relative">
                    <div className="w-full text-center text-2xl mt-4 font-semibold"> Simulation Panel </div>
                    <div onClick={handleControlInstruction} className="absolute right-2 top-4 mt-5 -translate-y-1/2 group cursor-pointer text-xl">
                        <CiCircleQuestion />
                        <span className="absolute right-0 top-6 hidden group-hover:block bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap border border-gray-600">
                            Show Instructions
                        </span>
                    </div>
                    <RiSpeakFill className={`text-3xl h-10 ${isSpeaking ? "animate-speaking" : "text-white"}`}/>
                    <div className="w-5/6">
                        <p className="text-xs text-gray-400 text-left italic mb-2 font-bold"> Adjust your preferred voice</p>
                        <div className="w-full flex gap-3"> 
                            <SpeedController newRate={newRate} decreaseSpeed={decreaseSpeed} increaseSpeed={increaseSpeed}/>
                            <VoiceController newPitch={newPitch} decreaseTone={decreaseTone} increaseTone={increaseTone}/>
                        </div>
                    </div>

                    <div className="w-5/6 mt-2">
                        <p className="text-xs text-gray-400 text-left italic mb-2 font-bold">Select your preferred restaurant </p>
                        <div className="w-full flex justify-center items-center">
                            <RestaurantSelector setRestaurantId={setRestaurantId}/>
                        </div>
                    </div>
                    <div className="flex justify-between items-center h-10 w-5/6 gap-4">
                        <StartOrder getOrder={getOrder}/>
                        <OpenCloseButton isOpen={isOpen} handleClose={handleClose} handleOpen={handleOpen}/>
                        {isOrder && (
                            <ReplayOrder handleReplay={handleReplay}/>
                        )}
                    </div>
                    <AnswerBox text={text} isOpen={isOpen}/>

                    {isShowInstruction && (
                        <div className="w-5/6 bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 mb-3 text-xs text-gray-300 text-left space-y-1">
                            <h1 className="text-center text-lg font-semibold text-gray-50"> Instructions </h1>
                            <p>① Set your preferred <span className="text-white font-medium">speed</span> and <span className="text-white font-medium">voice pitch</span>. (optional)</p>
                            <p>② Select a <span className="text-white font-medium">restaurant</span> from the dropdown. (required)</p>
                            <p>③ Press <span className="text-white font-medium">Start Order</span> to hear the customer speak.</p>
                            <p>④ Use <span className="text-white font-medium">Replay</span> if you missed something. (Appear after start ordering)</p> 
                            <p>⑤ Head to the <span className="text-white font-medium">Answer Panel</span> below to write your orders.</p>
                            <p>⑥ Add an order with name and quantity to the <span className="text-white font-medium">Order List </span>.</p>
                            <p>⑦ When done, press <span className="text-white font-medium">Submit</span> to see your score.</p>                 
                        </div>       
                    )}          
                </div>
            </div>
                        
            <div className="flex justify-center my-5">
                <div className="flex flex-col justify-center items-center gap-3 bg-gray-700 border border-gray-600 w-1/2 rounded-lg">
                <div className="text-center text-2xl font-grotesk font-semibold mt-3"> Answer Panel </div>
                
                <div className="w-5/6">
                    <p className="text-xs text-gray-400 text-left italic mb-2"> Write down each order with quantity </p>
                    <div className="flex gap-1">
                    <input
                    className="rounded-lg w-10 text-gray-800 bg-white text-xs text-center"
                    placeholder="Qty"
                    type="number"
                    min="1"
                    value={qty}
                    onChange={e => setQty(Number(e.target.value))}
                    />
                    <UserInputBox value={answer} onChange={e => setAnswer(e.target.value)} onKeyDown={e => e.key === "Enter" && handleAddOrder()}/>
                    <AddAnswerBox onClick={handleAddOrder}/>
                </div>
                </div>

                <div className="w-full flex flex-col items-center justify-center gap-1">
                    <span className="font-grotesk font-semibold text-2xl">Order List</span>
                    <div className="w-5/6">
                    {orders.length === 0 ? (
                        <div className="border border-dashed bg-gray-900 text-xs opacity-50 text-center px-2 py-2">
                            <p>No order has been made. </p>
                        </div>
                    ) : (
                        orders.map(order => (
                        <div key={order.id} className="flex items-center justify-between bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-xs mb-1">
                            <span className="text-blue-300 w-8">x{order.qty}</span>
                            <span className="flex-1 text-white">{order.item}</span>
                            <button onClick={() => handleRemove(order.id)} className="text-red-400 hover:text-red-300">✕</button>
                        </div>
                        ))
                    )}
                    </div>
                </div>
                <div className="w-5/6 mb-3">
                    <div className="flex justify-end items-center gap-3">
                        
                        {isSubmit && (
                        <div className={`flex items-center gap-1 text-sm font-medium px-3 py-1.5 rounded-full ${
                            overallScore >= 80 ? "bg-green-900/50 text-green-400" :
                            overallScore >= 50 ? "bg-yellow-900/50 text-yellow-400" :
                            "bg-red-900/50 text-red-400"
                        }`}>
                            <CiCircleCheck className="text-lg"/>
                            {overallScore}%
                        </div>
                        )}

                        <button
                        className="bg-blue-600 hover:bg-blue-700 active:scale-95 transition-all rounded-lg px-4 py-2 text-sm font-medium"
                        onClick={handleSubmit}
                        >
                        Submit
                        </button>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    )
}