// icon imports
import { BiSolidFoodMenu } from "react-icons/bi";
import { IoLogoGameControllerB } from "react-icons/io";

import {Link} from "react-router-dom";

export default function NavBar() {
    return(
    <div className="flex justify-center w-full ">
    <div className="flex w-full shadow-sm bg-gray-600 rounded-xl px-5 py-3 items-center justify-between text-white font-manrope">
        <h1 className="text-white text-4xl px-4"> <b className="text-rose-400">Order</b>Time</h1>
        <div className="flex items-center gap-5">
            <Link to="/" className="flex items-center gap-2 px-2 text-xl">
                <IoLogoGameControllerB className="text-white"/> Simulator
            </Link>
            <Link to="/menu" className="flex items-center gap-2 px-2 text-xl">
                <BiSolidFoodMenu className="text-white"/> Menu
            </Link>
        </div>
    </div>
    </div>
    )
}