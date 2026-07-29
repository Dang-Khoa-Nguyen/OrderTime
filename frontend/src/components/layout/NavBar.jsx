// icon imports
import { BiSolidFoodMenu } from "react-icons/bi";
import { IoLogoGameControllerB } from "react-icons/io";

import {Link} from "react-router-dom";

export default function NavBar() {
    return(
    <div className="flex justify-center w-full ">
    <div className="flex w-full shadow-sm bg-gray-600 rounded-xl px-5 py-3 items-center justify-between text-gray-150 font-manrope">
        <h1 className="text-white text-4xl px-4"> <b className="text-blue-500">Order</b>Time</h1>
        <div className="flex items-center">
        <Link to="/" className="flex items-center gap-2 px-2 text-lg mx-5 hover:text-blue-300 transition-full duration-500 hover:-translate-y-1">
                <IoLogoGameControllerB/> Simulator
            </Link>
            <Link to="/menu" className="flex items-center gap-2 px-2 text-lg mx-5 hover:text-blue-300 transition-full duration-500 hover:-translate-y-1">
                <BiSolidFoodMenu/> Menu
            </Link>
        </div>
    </div>
    </div>
    )
}