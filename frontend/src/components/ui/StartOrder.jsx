// icon imports
import { TiltButton } from 'react-tilt-button';

export default function StartOrder() {
    return(
    <div>
        <TiltButton
            variant="solid"
            width={250}
            height={80}
            radius={16}
            surfaceColor="#2a67d1"
        >
            Start Order
        </TiltButton>
    </div>
    )
}