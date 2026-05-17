import { FaRegPlusSquare } from "react-icons/fa";
import { RiDeleteBin7Fill } from "react-icons/ri";
import { CiEdit } from "react-icons/ci";

import { fetchUploadMenu } from "../../api/Restaurant";
import AddModal from "../models/AddModel";
import { useState } from "react";

export default function RestaurantController({handleDelete}) {
    const [openCreate, setOpenCreate] = useState(false);
    const [uploading, setUploading] = useState(false);
    
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
    
    if (uploading) {
        return(<div>
            It's loading.
        </div>)
    }
    return(
<div className="flex items-center gap-0.5 bg-[#2a3450] border border-white/14 rounded-[10px] px-1.5 py-1.5">
        {/* Create */}
        <div className="relative group">
          <button
            onClick={() => setOpenCreate(true)}
            aria-label="Create restaurant"
            className="flex items-center justify-center w-8 h-8 rounded-[7px] text-white/60 hover:bg-yellow-500 transition-colors duration-500"
          >
            <FaRegPlusSquare className="text-lg" />
          </button>
          <span className="pointer-events-none absolute bottom-[calc(100%+7px)] left-1/2 -translate-x-1/2 bg-[#0f1523] border border-white/18 text-white/90 text-[11px] px-2 py-1 rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-10">
            Create restaurant
          </span>

            {openCreate && (
                <AddModal
                    onClose={() => setOpenCreate(false)}
                    onSave={handleCreate}
                />
            )}
        </div>

        <div className="w-px h-[18px] bg-white/10 mx-0.5" />

        {/* Edit */}
        <div className="relative group">
          <button
            aria-label="Edit restaurant"
            className="flex items-center justify-center w-8 h-8 rounded-[7px] text-white/60 hover:bg-white/9 hover:bg-blue-500 disabled:opacity-30 disabled:cursor-not-allowed transition-colors duration-500"
          >
            <CiEdit className="text-lg" />
          </button>
          <span className="pointer-events-none absolute bottom-[calc(100%+7px)] left-1/2 -translate-x-1/2 bg-[#0f1523] border border-white/18 text-white/90 text-[11px] px-2 py-1 rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-10">
            Edit restaurant
          </span>
        </div>

        {/* Delete */}
        <div className="relative group">
          <button
            aria-label="Delete restaurant"
            onClick={handleDelete}
            className="flex items-center justify-center w-8 h-8 rounded-[7px] text-white/60 hover:bg-red-500 disabled:opacity-30 disabled:cursor-not-allowed transition-colors duration-500"
          >
            <RiDeleteBin7Fill className="text-lg" />
          </button>
          <span className="pointer-events-none absolute bottom-[calc(100%+7px)] left-1/2 -translate-x-1/2 bg-[#0f1523] border border-white/18 text-white/90 text-[11px] px-2 py-1 rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-10">
            Delete restaurant
          </span>
        </div>

      </div>
    )
}