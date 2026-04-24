

export default function DeleteRestaurant({handleDelete}) {
    return(
        <div 
        onClick={handleDelete}
        className="mb-4 px-3 py-2 flex items-center justify-center bg-rose-500 cursor-pointer
        text-gray-50 rounded-lg border border-gray-200 text-sm">
            Delete table
        </div>
    )
}