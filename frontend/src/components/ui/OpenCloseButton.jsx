// icon imports

export default function OpenCloseButton({isOpen, handleOpen, handleClose}) {
    return(
        <div className='flex h-24 items-center'>
        {isOpen ? (
   <button
            onClick={handleClose}
            className="w-28 flex justify-center items-center gap-2 px-8 py-3 rounded-xl text-white bg-rose-500
            hover:bg-rose-700 font-medium text-sm transition-transform active:scale-95"
        >
            Close
        </button>
        ) : (
        <button
            onClick={handleOpen}
            className="w-28 flex justify-center items-center gap-2 px-8 py-3 rounded-xl text-white bg-green-500
            hover:bg-green-700 font-medium text-sm transition-transform active:scale-95"
        >
            Open
        </button>
        
        )}
   </div>
    )
}