import { FaHeart } from "react-icons/fa";
import { useEffect, useState } from "react";
import IngredientList from './IngredientList';
import InFavourite from './InFavourite';
import InLetters from './InLetters';
import Ingredients from './Ingredients';

const DrinkList = () => {  
  const alpha = Array.from(Array(26)).map((e, i) => i + 65);
  const alphabet = alpha.map((x) => String.fromCharCode(x));
  const [data, setData] = useState([]);
  // eslint-disable-next-line
  const [error, setError] = useState(null);      
  const [fetchEnd, setFetchEnd] = useState('A');  
  const [searchState, setSearchState] = useState('Please select a letter');
  const [alphabeticalList, setAlphabeticalList] = useState([alphabet]);
  const [ingredientModalData, setIngredientModalData] = useState(null);
  let savedDrinks = [];  
  

  useEffect(() => {
    
    setAlphabeticalList(alphabet);
  // eslint-disable-next-line    
  }, []);

  useEffect(() => {
    if (fetchEnd) {
      fetch(`https://thecocktaildb.com/api/json/v1/1/search.php?f=${fetchEnd}`)
        .then((resp) => resp.json())
        .then((newData) => setData([...data, ...newData.drinks]),localStorage.setItem("indexLetter",`${fetchEnd}`))      
        
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

  function searchDrinksByLetter(letter){
    setData([]);
    setFetchEnd(`${letter}`); 
    
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
        <div className="home-header-main">list all drinks</div>
        <div className="home-header-sub">Show all drinks that start with a certain letters</div>
      </div>
      
      <div className="home-dl">        
          {alphabeticalList.map((item) =>
          <div className="home-dl-alphabet" key={item}  onClick={() => searchDrinksByLetter(item)}>
            <div className={`home-dl-alphabet-content ${InLetters(item) ? "active" : ""}`} >
              <div className="home-dl-alphabet-content-letter">{item}</div>              
            </div>
          </div>  
          )}          
             
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
                          <div
                            className="home-drinkList-item-content-right-content-more-buy"
                            onClick={() => setIngredientModalData(getIngredientsData(item))}
                          >
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
                </div>
                
              </div>
            )}
            { ingredientModalData ? <Ingredients ingredients={ingredientModalData} onModalClose={() => setIngredientModalData(null)} /> : null }
          </div>        
        )
    }    
    </div>
  );

}
 
export default DrinkList;