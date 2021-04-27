import './App.scss';
import Home from './Home';
import Search from './Search';
import NavBar from './NavBar';
import Favourite from './Favourite';
import DrinkList from './DrinkList';
import ShoppingList from './ShoppingList';
import MobNav from './mobNav';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  return (
    
    <Router>
      <div className="App">        
        <NavBar />
        <MobNav />
          <div className="content">
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route path="/alphabetical">
                <DrinkList />
              </Route>
              <Route path="/search">
                <Search />
              </Route>
              <Route path="/favourite">
                <Favourite />
              </Route>
              <Route path="/shopping">
                <ShoppingList />
              </Route>
            </Switch>
          </div>
      </div>
    </Router>
    
  );
}

export default App;
