// icon imports
import { FiPlus } from "react-icons/fi";

import { useRef, useState } from "react";

export default function NavBar() {
    const fileInputRef = useRef(null);
    const [uploading, setUploading] = useState(false);
    const handleFileChange = async (e) => {
        const selected = e.target.files?.[0];
        if (!selected) return;
    }

    return(
    <div className="flex justify-between">
        <h1 className="text-white text-4xl flex items-center gap-2 p-4"> OrderTime</h1>
        <div>
            <button 
            type="button"
            disabled={uploading}
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center text-white px-4 py-2 my-3 mx-3 
            rounded-lg border border white hover:bg-white hover:text-black
            duration-200 transition"> 
                <FiPlus/> Add menu 
            
            </button>
            <input
                ref={fileInputRef}
                type="file"
                accept=".csv, .pdf, .png, .jpg  "
                className="hidden"
                onChange={handleFileChange}
            />
        </div>
    </div>
    )
}