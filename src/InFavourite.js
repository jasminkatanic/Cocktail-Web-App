const isInFavorites = (givenDrinkName) => {
  let favouriteDrinks = JSON.parse(localStorage.getItem("favouriteDrinks")) || [];   
    
  let isThereAFavorite = favouriteDrinks.includes(givenDrinkName);
  if(isThereAFavorite){
    return true;
  }else{
    return false;
  }  
   
};

export default isInFavorites;