function IngredientList({ drink }){
  let allIngredient = [];

    for (let key in drink) {
      if (key.includes("strIngredient") && drink[key]) {
        allIngredient.push(drink[key]); // drink['strIngredient1'] -> drink.strIngredient1
      }
    }

    return <p><strong>Ingredients:</strong> {allIngredient.join(", ")}</p>;
};

export default IngredientList;