import  { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProductDetails } from './Utils/apis';

const ProductDetail = ({ addtoCart }) => {
  const { id } = useParams();
  const numericId = parseInt(id); 
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProduct = async () => {
      try {
        if (isNaN(numericId)) {
          console.error("Invalid product ID:", id);
          setProduct(null);
          setLoading(false);
          return;
        }

        const data = await fetchProductDetails(numericId);

        if (!data || Object.keys(data).length === 0) {
          console.error("No product found for ID:", numericId);
          setProduct(null);
        } else {
          setProduct(data);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
        setProduct(null);
      } finally {
        setLoading(false); // ✅ Always turn loading off
      }
    };

    getProduct();
  }, [numericId]);

  if (loading) {
    return <div className="loading">Loading product details...</div>;
  }

  if (!product) {
    return <div className="not-found">❌ Product not found</div>;
  }

  return (
    <div className="product-detail-page">
      <div className="product-detail-container">
        <div className="product-image-container">
          <img src={product.image} alt={product.title} className="detail-image" />
        </div>
        <div className="product-info">
          <h1>{product.title}</h1>
          <p className="price">${product.price}</p>
          <p className="category">Category: {product.category}</p>
          <p className="description">{product.description}</p>
          <button onClick={() => addtoCart(product)} className="add-to-cart-button">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
