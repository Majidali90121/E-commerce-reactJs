import { useState } from "react";
import { processPayment } from './Utils/apis';
import './Checkout.css';

function Checkout({ cartItems, clearCart }) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        address: '',
        cardNumber: '',
        expiryDate: '',
        cvv: '',
    });
    const [isProcessing, setIsProcessing] = useState(false);
    const [paymentSuccess, setPaymentSucces] = useState(false);
    const [error, setError] = useState('');

    const total = cartItems.reduce((sum, item) => sum + item.price, 0);

    function HandleChange(e) {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    }

    async function HandleSubmit(e) {
        e.preventDefault();
        setIsProcessing(true);
        setError('');

        try {
            const paymentResult = await processPayment({
                amount: total,
                ...formData
            });

            if (paymentResult.success) {
                setPaymentSucces(true);
                clearCart();
            } else {
                setError('Payment is failed. Please try again.');
            }
        } catch (err) {
            setError('An error occured during payment processing.');
        } finally {
            setIsProcessing(false);
        }
    }

    if (cartItems.length === 0 && !paymentSuccess) {
        return (
            <div className="checkout-empty">
                <h2>Your cart is empty</h2>
                <p>There are no items to check out</p>
            </div>
        );
    }

    if (paymentSuccess) {
        return (
            <div className="checkout-succes">
                <h2>Payment Successful!</h2>
                <p>Thank you for your purchase</p>
            </div>
        );
    }

    return (
        <div className="checkout-page">
            <h2>Checkout</h2>
            <div className="checkout-container">
                <div className="order-summary">
                    <h3>Order Summary</h3>
     <ul>
  {cartItems.map(item => (
      <li key={item.id} className="order-item">
       <span>{item.title || item.name || 'Unnamed Item'}</span> {/* ✅ Safe fallback */}
       <span>${item.price.toFixed(2)}</span>
     </li>
   ))}
 </ul>
                    <div className="order-total">
                        <span>Total: </span>
                        <span>${total.toFixed(2)}</span>
                    </div>
                </div>

                <form onSubmit={HandleSubmit} className="payment-form">
                    <h3>Payment information</h3>
                    <div className="form-group">
                        {/* ✅ Fixed typo: changed <lable> to <label> */}
                        <label htmlFor="name">Full Name</label>
                        <input type="text" id="name" name="name" value={formData.name} autoComplete="name" onChange={HandleChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="text" id="email" name="email" value={formData.email} autoComplete="email" onChange={HandleChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="address">Shipping Address</label>
                        <textarea name="address" id="address" value={formData.address} autoComplete="address" onChange={HandleChange}></textarea>
                    </div>
                    <div className="form-group">
                        <label htmlFor="cardNumber">Card Number</label>
                        <input type="text" id="cardNumber" name="cardNumber" value={formData.cardNumber} autoComplete="cardNumber" onChange={HandleChange} required />
                    </div>
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="expiryDate">Expiry Date</label>
                            <input type="text" id="expiryDate" name="expiryDate" autoComplete="expiryDate" value={formData.expiryDate} onChange={HandleChange} placeholder="MM/YY" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="cvv">CVV</label>
                            <input type="text" id="cvv" name="cvv" value={formData.cvv} placeholder="123" autoComplete="Cvv" onChange={HandleChange} required />
                        </div>
                    </div>
                    {error && <div className="error-message">{error}</div>}
                    <button type="submit" className="submit-button" disabled={isProcessing}>
                        {isProcessing ? 'Processing........' : 'Complete Payment'}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Checkout;
