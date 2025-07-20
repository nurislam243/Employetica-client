import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from './PaymentForm';


const PaymentModal = ({ isOpen, onClose, paymentId, onSuccess }) => {
    const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
    if (!isOpen) return null;

    return (
        <dialog className="modal modal-open">
            <div className="modal-box max-w-lg">
                <h3 className="font-bold text-xl mb-4">Approve Payment</h3>
                
                <Elements stripe={stripePromise}>
                <PaymentForm
                    paymentId={paymentId}
                    onSuccess={onSuccess}
                />
                </Elements>

                <div className="modal-action">
                    <button onClick={onClose} className="btn btn-sm btn-outline">
                        Close
                    </button>
                </div>
            </div>
        </dialog>
    );
};

export default PaymentModal;
