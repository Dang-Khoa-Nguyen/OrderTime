// icon imports
import { TiltButton } from 'react-tilt-button';

export default function OpenCloseButton({isOpen, handleOpen, handleClose}) {
    return(
        <div className='flex h-24 items-center'>
        {isOpen ? (
   <button
            variant="solid"
            width={250}
            height={80}
            radius={16}
            surfaceColor="#c16d18"
            onClick={handleClose}
             className='w-36 h-8 border border-white rounded-lg bg-rose-500'
        >
            Close
        </button>
        ) : (
        <button
            variant="solid"
            width={250}
            height={80}
            radius={16}
            surfaceColor="#6bb412"
            onClick={handleOpen}
            className='w-36 h-8 border border-white rounded-lg bg-green-500'
        >
            Open
        </button>
        
        )}
   </div>
    )
}