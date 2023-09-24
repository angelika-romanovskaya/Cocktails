import React from 'react';
import { useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header/Header';
import { Route, Routes, useLocation } from 'react-router-dom';
import Main from './pages/Main/Main';
import About from './pages/About/About';
import Error from './pages/Error/Error';
import Details from './pages/Details/Details';
import Footer from './components/Footer/Footer';


function App() {
  const [allCocktails, setAllCocktails] = useState([]);
  const [error, setError] = useState(false);
  const [cocktails, setCocktails] = useState([]);
  const location = useLocation();
  const { pathname } = location;
  const splitLocation = pathname.split("/");

  const getAllCocktail = async function(){
    let array = [];
   
    try{
      for (let i = 97; i <= 122; i++) {
          const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${String.fromCharCode(i)}`);
          const data = await response.json();
          if(data.drinks != null) {
            if(data.drinks.length > 2) data.drinks.length = 2;
            array.push(...data.drinks)
          }
      }
      setAllCocktails(array);
    }catch(error){
      setError(error);
    }
  }

  useEffect(() =>{
    getAllCocktail();
  }, []);

  
  const getCocktail = function(){
    if(splitLocation[2] !== '' && splitLocation[2] === 'alcoholic') setCocktails(allCocktails.filter((item)=> item.strAlcoholic === "Alcoholic"))
    else if(splitLocation[2] !== '' && splitLocation[2] === 'non-alcoholic') setCocktails(allCocktails.filter((item)=> item.strAlcoholic === "Non alcoholic"))
    else if(splitLocation[2] !== '' && splitLocation[2] === 'optional-alcohol') setCocktails(allCocktails.filter((item)=> item.strAlcoholic === "Optional alcohol"))
  }

  useEffect(() =>{
    getCocktail();
  }, [location]);

  const search = function(event){
      setCocktails(allCocktails.filter((item)=>(item.strDrink.includes(event.target.value))));
  }

  function filterCategory(choiseCategory){
    let arrCategory = [];
    if(choiseCategory.length !== 0){
      for(let i = 0; i<choiseCategory.length; i++){
        arrCategory.push(...(allCocktails.filter((item)=> item.strCategory === choiseCategory[i])))
        console.log(arrCategory);
      }
      return arrCategory;
    } else{
      return arrCategory;
    }
  }

  function filterGlass(choiceGlass, arrCategory){
    let arrGlass = [];
    let arr = [];
    let glass = [];
    if(choiceGlass.length !== 0){
      for(let i = 0; i<choiceGlass.length; i++){
        arr.push(...(allCocktails.filter((item)=> item.strGlass === choiceGlass[i])));
      }
      if(arrCategory.length !== 0){
        glass.push(...(arrCategory.filter(a=>arr.includes(a))));
        console.log(glass);
        arrGlass.push(...glass);
      } else{
        arrGlass.push(...arrCategory);
      }
      return arrGlass;
    } else{
      return arrCategory;
    }
  }

  function filterIngredient(choiceIngredient, arrGlass){
    let arrIngredient = [];
    let arr = [];
    let ingredient = [];
    if(choiceIngredient.length !== 0){
      for(let i = 0; i<choiceIngredient.length; i++){
        for(let j =1; j<=15; j++){
          arr.push(...(allCocktails.filter((item)=> item["strIngredient" + j] === choiceIngredient[i])));
        }
      }
      if(arrGlass.length !== 0){
        ingredient.push(...(arrGlass.filter(a=>arr.includes(a))));
        arrIngredient.push(...ingredient);
        console.log(ingredient);
      } else{
        arrIngredient.push(...arrGlass);
      }
      return arrIngredient;
    } else{
      return arrGlass;
    }
  }

  function filterAlcoholic(choiceAlcoholic, arrIngredient){
    let arrAlcoholic = [];
    let arr = [];
    let alcoholic = [];
    if(choiceAlcoholic.length !== 0){
      for(let i = 0; i<choiceAlcoholic.length; i++){
        arr.push(...(allCocktails.filter((item)=> item.strAlcoholic === choiceAlcoholic[i])));
      }
      if(arrIngredient.length !== 0){
        alcoholic.push(...(arrIngredient.filter(a=>arr.includes(a))));
        arrAlcoholic.push(...alcoholic);
        console.log(alcoholic);
      } else{
        arrAlcoholic.push(...arrIngredient);
      }
      return arrAlcoholic;
    } else{
      return arrIngredient;
    }
  }


  const filter = function(event,choiseCategory, choiceGlass, choiceIngredient, choiceAlcoholic){
    event.preventDefault();
    let arrResult = [];
    arrResult = filterAlcoholic(choiceAlcoholic,filterIngredient(choiceIngredient,filterGlass(choiceGlass,filterCategory(choiseCategory))));
    setCocktails(arrResult);
}


  return (
    <>
    {error ? (
     <Error error = {error}/>
    ) :
    (
      <div className='container'>
        <Header search={search} filter={filter}/>
        <Routes>
          <Route path='/Cocktails/' element={<Main allcocktail = {allCocktails}/>}></Route>
          <Route path='/Cocktails/about' element={<About/>}></Route>
          <Route path='/Cocktails/alcoholic' element={<Main allcocktail = {cocktails}/>}></Route>
          <Route path='/Cocktails/non-alcoholic' element={<Main allcocktail = {cocktails}/>}></Route>
          <Route path='/Cocktails/optional-alcohol' element={<Main allcocktail = {cocktails}/>}></Route>
          <Route path='/Cocktails/search' element={<Main allcocktail = {cocktails}/>}></Route>
          <Route path='/Cocktails/filter' element={<Main allcocktail = {cocktails}/>}></Route>
          {allCocktails.map((item, i) => <Route key={i} path={"/Cocktails/cocktail/" + item.strDrink} element={<Details cocktail={item}/>}></Route>)}
        </Routes>
        <Footer/>
      </div>
    )}
    </>
  );
}

export default App;
