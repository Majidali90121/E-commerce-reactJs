import './Cart.css'
const Cart = ({ cartItems, removeFormCart })=>{
    const total = cartItems.reduce((sum,item)=> sum+item.price,0)

    return(
        <div className="cart-container">
            <h2>Your Cart</h2>
            {cartItems.length === 0 ? (
                <p>Your cart is empty</p>
            ):(
                <>
                <div className="cart-items">
                    {cartItems.map((item)=>(
                        <div key={item.id} className="cart-item">
                            <img src={item.image} alt={item.title} />
                            <div className="cart-item-details">
                                <h3>{item.title}</h3>
                                <p>${item.price}</p>
                                <button onClick={()=>removeFormCart(item.id)} className='remove-button'>Remove</button>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="cart-summary">
                    <h3>Total: ${total.toFixed(2)}</h3>
                </div>
                </>
            )}
        </div>
    )
}
export default Cart;