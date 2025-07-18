import Cart from './Components/Cart';
import { Link } from 'react-router-dom';
import './Cart.css'
function CartPage({cartItems,removeFormCart}){
    return(
        <div className="cart-page">
            <Cart cartItems={cartItems} removeFormCart={removeFormCart} />
            {cartItems.length > 0 && (
                <div className="checkout-button-container">
                 <Link to='/checkout' className='checkout-button'>
                 Process to Checkout
                 </Link>
                </div>
            )}
        </div>
    )
}
export default CartPage