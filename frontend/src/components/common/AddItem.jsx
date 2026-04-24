
export default function AddItem({handleAdd}) {
    return(
        <div 
        onClick={handleAdd}
        className="mb-4 px-3 py-2 flex items-center justify-center bg-green-500 cursor-pointer
        text-gray-50 rounded-lg border border-gray-200 text-sm">
            Add item
        </div>
    )
}