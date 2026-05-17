
export default function AddItem({setOpenCreate}) {
    return(
        <button
        type="button"
        onClick={() => setOpenCreate(true)} 
        className="px-5 py-2 flex items-center justify-center bg-green-500 cursor-pointer
        text-gray-50 rounded-lg border border-gray-200 text-sm">
            Add item
        </button>
    )
}