import { FaHeart } from "react-icons/fa";
import { useEffect, useState } from "react";
import IngredientList from './IngredientList';
import InFavourite from './InFavourite';
import Ingredients from './Ingredients';


const Home = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [ingredientModalData, setIngredientModalData] = useState(null);
  let savedDrinks = [];
  let favouriteDrinks = localStorage.getItem("favouriteDrinks");
  let ingredientsList = localStorage.getItem("ingredientsList");

  if(!ingredientsList){
    localStorage.setItem("ingredientsList",JSON.stringify([]));
  }
  if(!favouriteDrinks){
    localStorage.setItem("favouriteDrinks",JSON.stringify([]));
  }
  
  
  useEffect(() => {
    if (data.length <= 5) {
      fetch('https://thecocktaildb.com/api/json/v1/1/random.php')
        .then((resp) => resp.json())
        .then((newData) => setData([...data, ...newData.drinks]),          
        )

        .catch(error => {
          console.error("Error fetching data: ", error);
          setError(error);
        });
    }    
  }, [data]);
  

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


  if(error) return "Error";
    
  return (
    <div className="home">
      <div className="home-header">
        <div className="home-header-main">random drinks suggestion</div>
        <div className="home-header-sub">Below is a list of randomly generated drinks fetched from The Cocktail DB choose your poison</div>
      </div>
      <div className="home-drinkList">
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
    </div>    
   
  );

}
 
export default Home;