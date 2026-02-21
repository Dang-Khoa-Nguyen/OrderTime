// icon imports
import { TiltButton } from 'react-tilt-button';

export default function OpenCloseButton({isOpen, handleOpen, handleClose}) {
    return(
        <div>
        {isOpen ? (
   <TiltButton
            variant="solid"
            width={250}
            height={80}
            radius={16}
            surfaceColor="#c16d18"
            onClick={handleClose}
        >
            Close
        </TiltButton>
        ) : (
        <TiltButton
            variant="solid"
            width={250}
            height={80}
            radius={16}
            surfaceColor="#6bb412"
            onClick={handleOpen}
        >
            Open
        </TiltButton>
        
        )}
   </div>
    )
}