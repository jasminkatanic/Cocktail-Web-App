import { useState } from "react";

const Ingredients = ({ ingredients, onModalClose }) => { 

  const [stateOfItems, setStateOfItems] = useState(false);
  

  function addIngredientToStorage(ingredient){
    let listOfIngredient = localStorage.getItem("ingredientsList");
    let  listOfIngredientArray = JSON.parse(listOfIngredient);
    let isThereAIngredient = listOfIngredientArray.includes(ingredient);
    if(isThereAIngredient){
      let indexOfIngredient =  listOfIngredientArray.indexOf(ingredient);
      listOfIngredientArray.splice(indexOfIngredient, 1);
      localStorage.setItem("ingredientsList",JSON.stringify(listOfIngredientArray));
      itemStateCheck();      
    }else{
      listOfIngredientArray.push(ingredient);      
      localStorage.setItem("ingredientsList",JSON.stringify(listOfIngredientArray));
      itemStateCheck();
    }
    
  };

  function itemStateCheck(){
    if(stateOfItems){
      setStateOfItems(false);
    }else{
      setStateOfItems(true);
    }
  };
 

  function addOrRemoveIngredient(ingredient){
    let listOfIngredient = localStorage.getItem("ingredientsList");
    let  listOfIngredientArray = JSON.parse(listOfIngredient);
    let isThereAIngredient = listOfIngredientArray.includes(ingredient);
    if(isThereAIngredient){
      return true;
    }else{
      return false;
    }
    
  };
     
  return (  
    <div className="ingredients">
      <div className="ingredients-container">
        <div className="ingredients-container-box">
          <div className="ingredients-container-box-close" onClick={onModalClose}>
            <div className="ingredients-container-box-close-content">
              &times;
            </div>
          </div>
          <div className="ingredients-container-box-title">
            List of Ingredients
          </div>
          <ul className="ingredients-container-box-list">
            {ingredients.map((ingredient) => 
            <li className="ingredients-container-box-list-item" key={ingredient}>
              <div className="ingredients-container-box-list-item-text">{ingredient}</div>
              <div className={`ingredients-container-box-list-item-btn ${addOrRemoveIngredient(ingredient) ? "removeIngerdient" : "addIngerdient"}`} onClick={() => addIngredientToStorage(ingredient)}></div>
            </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
 
export default Ingredients;