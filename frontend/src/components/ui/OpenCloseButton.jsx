// icon imports

export default function OpenCloseButton({isOpen, handleOpen, handleClose}) {
    return(
        <div className='flex h-24 items-center w-full'>
        {isOpen ? (
   <button
            onClick={handleClose}
            className="w-full flex justify-center items-center gap-2 px-8 py-3 rounded-xl text-white bg-rose-500
            hover:bg-rose-700 font-medium text-xs transition-transform active:scale-95"
        >
            Close Answer
        </button>
        ) : (
        <button
            onClick={handleOpen}
            className="w-full flex justify-center items-center gap-2 px-8 py-3 rounded-xl text-white bg-green-500
            hover:bg-green-700 font-medium text-xs transition-transform active:scale-95"
        >
            Open Answer
        </button>
        
        )}
   </div>
    )
}