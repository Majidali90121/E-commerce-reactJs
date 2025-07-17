import React from 'react'
import {Link} from 'react-router-dom'
import './ProductCard.css'

function ProductCard({product,addtoCart}){
    return(
        <div className="product-card">
            <img src={product.image} alt={product.title} className='product-image'/>
            <div className="product-details">
                <h3 className='product-title'>{product.title}</h3>
                <p className="product-price">${product.price}</p>
                <div className="product-actions">
                    <Link to={`/product/${product.id}`} className="product-button view-button">
                    View Details
                    </Link>
                    <button onClick={()=> addtoCart(product)} className='product-button add-button'>Add to Cart</button>
                </div>
            </div>
        </div>
    )
}
export default ProductCard