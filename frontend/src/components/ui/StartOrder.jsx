// icon imports
import { TiltButton } from 'react-tilt-button';

export default function StartOrder({getOrder}) {
    return(
    <div>
        <button
            variant="solid"
            width={250}
            height={80}
            radius={16}
            surfaceColor="#2a67d1"
            onClick={getOrder}
            className='w-36 h-8 border border-white rounded-lg bg-blue-500'
        >
            Start Order
        </button>
    </div>
    )
}