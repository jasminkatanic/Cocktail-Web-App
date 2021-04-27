import { FaHeart } from "react-icons/fa";
import { useEffect, useState } from "react";
import IngredientList from './IngredientList';
import InFavourite from './InFavourite';
import Ingredients from './Ingredients';

const Search = () => {
  const [data, setData] = useState([]);
  // eslint-disable-next-line
  const [error, setError] = useState(null);    
  const [searchInput, setSearchInput] = useState(''); 
  const [searchType, setSearchType] = useState('search.php?s=');
  const [fetchEnd, setFetchEnd] = useState();
  const [searchState, setSearchState] = useState('');
  const [ingredientModalData, setIngredientModalData] = useState(null);
  let savedDrinks = [];  


  useEffect(() => {
    if (fetchEnd) {
      fetch(`https://thecocktaildb.com/api/json/v1/1/${fetchEnd}`)
        .then((resp) => resp.json())
        .then((newData) => setData([...data, ...newData.drinks]))        
        
        .catch(error => {
          console.error("Error fetching data: ", error);
          setError(error);
          setSearchState("Sorry but the search returned no results");
          setData([]);
          setData(data);
        });
    }
  // eslint-disable-next-line    
  }, [fetchEnd]);


 
  function startSearch(){
    setData([]);
    setFetchEnd(`${searchType}${searchInput}`);    
  };

   
  function addFavourite(drinkId){
    let getDrinksFromStorage = localStorage.getItem("favouriteDrinks") || [];
    
      if(getDrinksFromStorage.length === 0){
        savedDrinks.push(drinkId);
        let uniqueDrinks = [...new Set(savedDrinks)];
        localStorage.setItem("favouriteDrinks",JSON.stringify(uniqueDrinks));   
        setData([...data]);      
      }else{       
        let getDrinksFromStorageArray = JSON.parse(getDrinksFromStorage);
        if(getDrinksFromStorageArray.includes(drinkId)){
          removeFavourite(drinkId);
        }else{
          savedDrinks = [...getDrinksFromStorageArray];       
          savedDrinks.push(drinkId);
          let uniqueDrinks = [...new Set(savedDrinks)];
          localStorage.setItem("favouriteDrinks",JSON.stringify(uniqueDrinks)); 
          setData([...data]);
        }                       
      }
  };

  const removeFavourite = (drinkId) => {
    let favouriteDrinks = localStorage.getItem("favouriteDrinks");
    let currentData = [...data];
    let favouriteArray = JSON.parse(favouriteDrinks);
    const drinkIndex = currentData.findIndex(({ idDrink }) => idDrink === drinkId);
    favouriteArray.splice(drinkIndex, 1);    

    localStorage.setItem("favouriteDrinks", JSON.stringify(favouriteArray));
    setData(currentData);
  };
  

  function getIngredientsData(drink){
    let ingredientsArray = [];
    for (let key in drink) {
      if (key.includes("strIngredient") && drink[key]) {
        ingredientsArray.push(drink[key]);
      }
    }

    return ingredientsArray;
  };

  return (  
    <div className="home">
      <div className="home-header">
        <div className="home-header-main">find your drink</div>
        <div className="home-header-sub">Find a drink by name or by ingredient</div>
      </div>
      
      <div className="home-search">
        <div className="home-search-btn">
          <div className="home-search-btn-content" onClick={startSearch}>
            Search
          </div>
        </div>
        <div className="home-search-field">
          <input type="text" className="home-search-field-content" placeholder="enter a search term" onChange={event => setSearchInput(event.target.value)}/>
        </div>
        <div className="home-search-type">
          <select name="searcIn" className="home-search-type-content" value={searchType} onChange={event => setSearchType(event.target.value)}>
            <option name="name" value="search.php?s=">Name</option>
            <option name="ingredient" value="search.php?i=">Ingredient</option>
          </select>
        </div>
      </div>  
      { !data.length ?
        <h2>{searchState}</h2>
        : (        
          <div className="home-drinkList" id="listItemContent">
            {data.map((item) => 
              <div className="home-drinkList-item" key={item.idDrink}>
                <div className="home-drinkList-item-content">
                  <div className="home-drinkList-item-content-left">
                    <img src={item.strDrinkThumb} alt={item.strDrink}></img>
                  </div>
                  <div className="home-drinkList-item-content-right">              
                      <div className="home-drinkList-item-content-right-content" >
                        <div className="home-drinkList-item-content-right-content-title">
                          <h1>{item.strDrink}</h1>
                        </div>                  
                        <div className="home-drinkList-item-content-right-content-instructions">
                          <p><strong>Instructions:</strong> {item.strInstructions}</p>
                        </div>                  
                        <div className="home-drinkList-item-content-right-content-ingredient">
                          <IngredientList drink={item} />
                        </div>
                        <div className="home-drinkList-item-content-right-content-type">
                          <p><strong>Type:</strong> {item.strAlcoholic}</p>
                        </div>
                        <div className="home-drinkList-item-content-right-content-more">
                          <div className="home-drinkList-item-content-right-content-more-buy" onClick={() => setIngredientModalData(getIngredientsData(item))}>
                            Add Ingredients
                          </div>
                          <div className="home-drinkList-item-content-right-content-more-favourite">
                            <FaHeart
                            className={`home-drinkList-item-content-right-content-more-favourite ${InFavourite(item.idDrink) ? "iconRed" : "iconGrey"}`}
                            onClick={() => addFavourite(item.idDrink)}
                            />
                          </div>
                        </div>
                      </div>                        
                  </div>
                  { ingredientModalData ? <Ingredients ingredients={ingredientModalData} onModalClose={() => setIngredientModalData(null)} /> : null }
                </div>
                
              </div>
            )} 
          </div>        
        )
    }
    </div>
  );

}
 
export default Search;