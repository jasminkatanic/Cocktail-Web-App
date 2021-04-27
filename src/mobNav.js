import { Link } from 'react-router-dom';

const mobNav = () => {

  function fastUncheck(){
    let checkBoxState = document.getElementById("navi-togle");
      checkBoxState.checked = false;
  };

  return (  
    <div className="navigation" id="main-nav">
      <input type="checkbox" className="navigation__checkbox" id="navi-togle" />
        <label htmlFor="navi-togle" className="navigation__button" id="nav-btn">
            <span className="navigation__icon">&nbsp;</span>
        </label> 
        <div className="navigation__background">&nbsp;</div>       
      <nav className="navigation__nav">
        <ul className="navigation__list" id="mobNavList">
          <li className="navigation__item"><Link className="navbar-elements-itemMob" to="/" onClick={() => {fastUncheck()}}>Home</Link></li>
          <li className="navigation__item"><Link className="navbar-elements-itemMob" to="/alphabetical" onClick={() => {fastUncheck()}}>List Of Drinks</Link></li>
          <li className="navigation__item"><Link className="navbar-elements-itemMob" to="/search" onClick={() => {fastUncheck()}}>Search</Link></li>
          <li className="navigation__item"><Link className="navbar-elements-itemMob" to="/favourite" onClick={() => {fastUncheck()}}>Favourite</Link></li>
          <li className="navigation__item"><Link className="navbar-elements-itemMob" to="/shopping" onClick={() => {fastUncheck()}}>Shopping List</Link></li>
        </ul>
      </nav>              
     </div>
  );

}
 
export default mobNav;