import { Link } from 'react-router-dom';

const NavBar = () => {
  
  return (  
    <div className="navbar">
      <div className="navbar-elements">
        <Link className="navbar-elements-item" to="/">Home</Link>
        <Link className="navbar-elements-item" to="/alphabetical">List Of Drinks</Link>
        <Link className="navbar-elements-item" to="/search">Search</Link>
        <Link className="navbar-elements-item" to="/favourite">Favourite</Link>
        <Link className="navbar-elements-item" to="/shopping">Shopping List</Link>        
      </div>
    </div>
  );

}
 
export default NavBar;