// icon imports
import { FiPlus } from "react-icons/fi";
import { BiSolidFoodMenu } from "react-icons/bi";
import { IoLogoGameControllerB } from "react-icons/io";

import { useState, useRef } from "react";
import AddModal from "../models/AddModel";
import { fetchUploadMenu } from "../../api/Restaurant";
import {Link} from "react-router-dom";

export default function NavBar() {
    const [uploading, setUploading] = useState(false);
    const [openCreate, setOpenCreate] = useState(false);
    const handleCreate = async (formData) => {
    try {
        setUploading(true);
        setOpenCreate(false);
        const restaurantId = formData.get("restaurant_id");
        fetchUploadMenu(formData, restaurantId)
    } catch (err) {
        console.log(err)
        setOpenCreate(false);
    } finally {
        setUploading(false);
    }
  };

    return(
    <div className="flex justify-between items-center text-white">
        <h1 className="text-white text-4xl px-4"> OrderTime</h1>
        <div className="flex items-center gap-5">
            <Link to="/" className="flex gap-2 px-2">
                <IoLogoGameControllerB className="text-white text-2xl"/> Simulator
            </Link>
            <Link to="/menu" className="flex gap-2 px-2">
                <BiSolidFoodMenu className="text-white text-2xl"/> Menu
            </Link>
            <div>
                <button 
                type="button"
                onClick={() => setOpenCreate(true)}
                className="flex items-center text-white px-4 py-2 mx-3 my-3
                rounded-lg border border white hover:bg-white hover:text-black
                duration-200 transition"> 
                    <FiPlus/> Add menu 
                </button>

                {openCreate && (
                <AddModal
                    onClose={() => setOpenCreate(false)}
                    onSave={handleCreate}
                />
            )}
            </div>
        </div>
    </div>
    )
}