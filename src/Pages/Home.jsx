import { useEffect,useState } from 'react'
import ProductCard from './Components/ProductCart'
import { fetchProduct }  from './Utils/apis'
import './Home.css'
function Home({ addtoCart }){
    const [products,setProducts]=useState([])
    const [loading,setLoading]=useState(true)

    useEffect(()=>{
        async function getProducts(){
            const data =await fetchProduct();
            setProducts(data)
            setLoading(false)
        }

        getProducts()
    },[]);
    if(loading){
        return <div className='loading'>Loading.................</div>
    }
    return(
        <div className="home-page">
            <h1>Welcome to <span style={{color:'#2f80ed'}}>Shop</span><span style={{color:'#27ae60'}}>Easy</span></h1>
            <div className="product-grid">
                {
                    products.map(product=>(
                        <ProductCard key={product.id} product={product} addtoCart={addtoCart}/>
                    ))
                }
            </div>
        </div>
    )
}

export default Home;