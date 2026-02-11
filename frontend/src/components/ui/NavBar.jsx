// icon imports
import { FiPlus } from "react-icons/fi";

import { useState, useRef } from "react";
import AddModal from "../models/AddModel";

export default function NavBar() {
    const [uploading, setUploading] = useState(false);
    const [openCreate, setOpenCreate] = useState(false);
    const handleCreate = async (newTransaction) => {
    try {
      console.log(1)
      setOpenCreate(false);
    } catch (err) {
        console.log(err)
    }
  };

    return(
    <div className="flex justify-between">
        <h1 className="text-white text-4xl flex items-center gap-2 p-4"> OrderTime</h1>
        <div>
            <button 
            type="button"
            onClick={() => setOpenCreate(true)}
            className="flex items-center text-white px-4 py-2 my-3 mx-3 
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
    )
}