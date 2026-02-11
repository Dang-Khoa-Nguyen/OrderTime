// icon imports
import { TiltButton } from 'react-tilt-button';

export default function StartOrder({getOrder}) {
    return(
    <div>
        <TiltButton
            variant="solid"
            width={250}
            height={80}
            radius={16}
            surfaceColor="#2a67d1"
            onClick={getOrder}
        >
            Start Order
        </TiltButton>
    </div>
    )
}