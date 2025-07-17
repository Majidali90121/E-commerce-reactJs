import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
import Home from './Pages/Home'
import ProductDetails from './Pages/ProductDetails'
import CartPage from './Pages/Cart'
import Checkout from './Pages/Checkout'
import './App.css'
function App(){
  const [cartItems,setCartItems]=useState([])
  function addtoCart(product){
    setCartItems(prevItems=>{
      const existingItem=prevItems.find(item=>item.id===product.id)
      if(existingItem){
        return prevItems
      }
      return [...prevItems,product]
    })
  }

  function removeFormCart(productId){
    setCartItems(prevItems=>prevItems.filter(item=>item.id!==productId))
  }

  function clearCart(){
    setCartItems([])
  }

  return(
    <Router>
      <div className="app">
        <Navbar cartCount={cartItems.length} />
        <main className="main-content">
          <Routes>
            <Route path='/' element={<Home addtoCart={addtoCart} />}></Route>
            <Route path='/product/:id' element={<ProductDetails addtoCart={addtoCart} />} />
            <Route path='/cart' element={<CartPage cartItems={cartItems} removeFormCart={removeFormCart} />} />
            <Route path='/checkout' element={<Checkout cartItems={cartItems} clearCart={clearCart} />} />
          </Routes>
        </main>
        <Footer/>
      </div>
    </Router>
  )
}
export default App