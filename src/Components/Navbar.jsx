import {Link} from 'react-router-dom'
import './Navbar.css'
function Navbar({cartCount}){
    return(
        <div className="navbar">
        <div className="navbar-container">
            <Link to='/' className='navbar-logo'>
            ShopEasy
            </Link>
            <div className="navbar-links">
                <Link to='/' className='navbar-link'>Home</Link>
                <Link to='/cart' className='navbar-link'>
                Cart ({cartCount})
                </Link>
            </div>
            </div></div>
    )
}
export default Navbar