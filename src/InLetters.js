const inLetters = (letter) => {
  let letterIndex = localStorage.getItem("indexLetter");    
  
  if(letter === letterIndex){
    return true;
  }else{
    return false;
  }  
   
};

export default inLetters;