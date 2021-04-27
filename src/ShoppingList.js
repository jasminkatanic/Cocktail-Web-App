import { useEffect, useState } from "react";

const ShoppingList = () => {

  let listOfIngredient = localStorage.getItem("ingredientsList");
  let listOfIngredientArray = JSON.parse(listOfIngredient);
  // eslint-disable-next-line
  const [searchState, setSearchState] = useState('There are no items on your shopping list');
  const [data, setData] = useState([]);  
  
    
       

  
  useEffect(() => {        
    
    const newDataState = (listOfIngredientArray).map((name) => {
      return { name: name, url: `https://www.thecocktaildb.com/images/ingredients/${name}-Medium.png`};
    });

    setData(newDataState);   
    
  // eslint-disable-next-line    
  }, []);

  function removeIngredient(ingredientName, ingredientUrl){

    let currentStorageIngredien = [];
    let currentData = [...data];    

    currentData.map((item, index) =>{      
      if(item.name===ingredientName && item.url===ingredientUrl){
        delete currentData[index];
        currentData = currentData.filter(function(element) {return element;});                           
      }else{
        currentStorageIngredien.push(item.name);
      }      
    return currentData;     
    })    

    setData(currentData);
    localStorage.setItem("ingredientsList",JSON.stringify(currentStorageIngredien));
    
  };


  return (  
   <div className="home">
      <div className="home-header">
        <div className="home-header-main">shopping list</div>
        <div className="home-header-sub">Shopping list shows all the items added throughout the website</div>
      </div>      
      
      { !data.length ?
        <h2>{searchState}</h2>
        : (        
          <div className="home-drinkList" id="listItemContent">
            {data.map((item) => 
              <div className="home-drinkList-item" key={item.name}>
                <div className="home-drinkList-item-content">
                  <div className="home-drinkList-item-content-left">
                    <img src={item.url} alt={item}></img>
                  </div>
                  <div className="home-drinkList-item-content-right">              
                      <div className="home-drinkList-item-content-right-content" >
                        <div className="home-drinkList-item-content-right-content-title">
                          <h1>{item.name}</h1>
                        </div>                  
                        <div className="home-drinkList-item-content-right-content-more">                          
                          <div
                            className="home-drinkList-item-content-right-content-more-buy removeIngerdientFromShop" onClick={() => {removeIngredient(item.name, item.url)}}>
                            Remove Ingredient
                          </div>
                        </div>                                         
                      </div>                        
                  </div>
                </div>
                
              </div>
            )}
            
          </div>        
        )
    }    
    </div>
  );

}


export default ShoppingList;
