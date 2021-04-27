import { FaHeart } from "react-icons/fa";
import { useEffect, useState } from "react";
import IngredientList from './IngredientList';
import InFavourite from './InFavourite';
import Ingredients from './Ingredients';

const Favourite = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);    
  const [numberOfDrinks, setNumberOfDrinks] = useState(0);
  const [ingredientModalData, setIngredientModalData] = useState(null);
  
     
  
  useEffect(() => {      
    let favouriteDrinks = localStorage.getItem("favouriteDrinks"); 
    let favouriteDrinksArray = JSON.parse(favouriteDrinks || []);   
          

    if(favouriteDrinksArray.length && numberOfDrinks < favouriteDrinksArray.length){
      let drinkString = `https://thecocktaildb.com/api/json/v1/1/lookup.php?i=${favouriteDrinksArray[numberOfDrinks]}`;
      
      fetch(drinkString)
      .then((resp) => resp.json())
      .then((newData) => setData([...data, ...newData.drinks]),setNumberOfDrinks(numberOfDrinks + 1))       
      .catch(error => {
        console.error("Error fetching data: ", error);
        setError(error);
      });      
    }
    
  // eslint-disable-next-line
  }, [data]);

  if(error) return "Error";
  

  function removeDrinkFromFavourite(drinkId) {
    let currentData = [...data];
    const drinkIndex = currentData.findIndex(({ strDrink }) => strDrink === drinkId);
    currentData.splice(drinkIndex, 1);
    const dataForStorage = currentData.map(({ strDrink }) => strDrink ); // ["drink 1", "drink 2"]

    localStorage.setItem("favouriteDrinks", JSON.stringify(dataForStorage));
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
        <div className="home-header-main">list of your favorite drinks</div>
        <div className="home-header-sub">Below is a list of drinks which you have marked as your favorite</div>
      </div>
      { !data.length ?
        <h2>You currently don't have any favourites please add some</h2>
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
                          <div className="home-drinkList-item-content-right-content-more-favourite" onClick={() => removeDrinkFromFavourite(`${item.idDrink}`)}>
                              <FaHeart
                              className={`home-drinkList-item-content-right-content-more-favourite ${InFavourite(item.idDrink) ? "iconRed" : "iconGrey"}`}                              
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
 
export default Favourite;