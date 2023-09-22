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
    if(splitLocation[1] !== '' && splitLocation[1] === 'alcoholic') setCocktails(allCocktails.filter((item)=> item.strAlcoholic === "Alcoholic"))
    else if(splitLocation[1] !== '' && splitLocation[1] === 'non-alcoholic') setCocktails(allCocktails.filter((item)=> item.strAlcoholic === "Non alcoholic"))
    else if(splitLocation[1] !== '' && splitLocation[1] === 'optional-alcohol') setCocktails(allCocktails.filter((item)=> item.strAlcoholic === "Optional alcohol"))
  }

  useEffect(() =>{
    getCocktail();
  }, [location]);

  const search = function(event){
      setCocktails(allCocktails.filter((item)=>(item.strDrink.includes(event.target.value))));
  }

  const filter = function(event, choiseCategory, choiceGlass, choiceIngredient, choiceAlcoholic){
    event.preventDefault();
    let arr = [];
    if(choiseCategory.length !== 0){
      for(let i = 0; i<choiseCategory.length; i++){
        arr.push(...(allCocktails.filter((item)=> item.strCategory === choiseCategory[i])))
      }
      if(choiceGlass.length !== 0){
        for(let i = 0; i<choiceGlass.length; i++){
          let s = allCocktails.filter((item)=> item.strGlass === choiceGlass[i]);
          if(arr.length !== 0){
            let d = s.filter(a=>arr.includes(a));
            arr = d;
          }
        }
        if(choiceIngredient.length !== 0){
          let ar = [];
          for(let i = 0; i<choiceIngredient.length; i++){
            for(let j =1; j<=15; j++){
                  let s = allCocktails.filter((item)=> item["strIngredient" + j] === choiceIngredient[i]);
                  ar.push(...s);
              }
            }
            if(arr.length !== 0){
              let d = ar.filter(a=>arr.includes(a));
              arr = d;
            }
            if(choiceAlcoholic.length !== 0){
              for(let i = 0; i<choiceAlcoholic.length; i++){
                let s = allCocktails.filter((item)=> item.strAlcoholic === choiceAlcoholic[i]);
                if(arr.length !== 0){
                  let d = s.filter(a=>arr.includes(a));
                  arr = d;
                }
              }
            }
        } else{
          if(choiceAlcoholic.length !== 0){
            for(let i = 0; i<choiceAlcoholic.length; i++){
              let s = allCocktails.filter((item)=> item.strAlcoholic === choiceAlcoholic[i]);
              if(arr.length !== 0){
                let d = s.filter(a=>arr.includes(a));
                arr = d;
              }
            }
          }
        }
      } else{
        if(choiceIngredient.length !== 0){
          let ar = [];
          for(let i = 0; i<choiceIngredient.length; i++){
            for(let j =1; j<=15; j++){
                  let s = allCocktails.filter((item)=> item["strIngredient" + j] === choiceIngredient[i]);
                  ar.push(...s);
              }
            }
            if(arr.length !== 0){
              let d = ar.filter(a=>arr.includes(a));
              arr = d;
            }
        }
        else{
          if(choiceAlcoholic.length !== 0){
            for(let i = 0; i<choiceAlcoholic.length; i++){
              let s = allCocktails.filter((item)=> item.strAlcoholic === choiceAlcoholic[i]);
              if(arr.length !== 0){
                let d = s.filter(a=>arr.includes(a));
                arr = d;
              }
            }
          }
        }
      }
    } else{
      if(choiceGlass.length !== 0){
        for(let i = 0; i<choiceGlass.length; i++){
          let s = allCocktails.filter((item)=> item.strGlass === choiceGlass[i]);
          if(arr.length !== 0){
            let d = s.filter(a=>arr.includes(a));
            arr = d;
          }
        }
        if(choiceIngredient.length !== 0){
          let ar = [];
          for(let i = 0; i<choiceIngredient.length; i++){
            for(let j =1; j<=15; j++){
                  let s = allCocktails.filter((item)=> item["strIngredient" + j] === choiceIngredient[i]);
                  ar.push(...s);
              }
            }
            if(arr.length !== 0){
              let d = ar.filter(a=>arr.includes(a));
              arr = d;
            }
            if(choiceAlcoholic.length !== 0){
              for(let i = 0; i<choiceAlcoholic.length; i++){
                let s = allCocktails.filter((item)=> item.strAlcoholic === choiceAlcoholic[i]);
                if(arr.length !== 0){
                  let d = s.filter(a=>arr.includes(a));
                  arr = d;
                }
              }
            }
        } else{
          if(choiceAlcoholic.length !== 0){
            for(let i = 0; i<choiceAlcoholic.length; i++){
              let s = allCocktails.filter((item)=> item.strAlcoholic === choiceAlcoholic[i]);
              if(arr.length !== 0){
                let d = s.filter(a=>arr.includes(a));
                arr = d;
              }
            }
          }
        }
      } else{
        if(choiceIngredient.length !== 0){
          let ar = [];
          for(let i = 0; i<choiceIngredient.length; i++){
            for(let j =1; j<=15; j++){
                  let s = allCocktails.filter((item)=> item["strIngredient" + j] === choiceIngredient[i]);
                  ar.push(...s);
              }
            }
            if(arr.length !== 0){
              let d = ar.filter(a=>arr.includes(a));
              arr = d;
            } 
            if(choiceAlcoholic.length !== 0){
              for(let i = 0; i<choiceAlcoholic.length; i++){
                let s = allCocktails.filter((item)=> item.strAlcoholic === choiceAlcoholic[i]);
                if(arr.length !== 0){
                  let d = s.filter(a=>arr.includes(a));
                  arr = d;
                }
              }
            }
        } else{
          if(choiceAlcoholic.length !== 0){
            for(let i = 0; i<choiceAlcoholic.length; i++){
              let s = allCocktails.filter((item)=> item.strAlcoholic === choiceAlcoholic[i]);
              if(arr.length !== 0){
                let d = s.filter(a=>arr.includes(a));
                arr = d;
              }
            }
          }
        }
      }
    }
    setCocktails(arr);
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
          <Route path='/' element={<Main allcocktail = {allCocktails}/>}></Route>
          <Route path='/about' element={<About/>}></Route>
          <Route path='/alcoholic' element={<Main allcocktail = {cocktails}/>}></Route>
          <Route path='/non-alcoholic' element={<Main allcocktail = {cocktails}/>}></Route>
          <Route path='/optional-alcohol' element={<Main allcocktail = {cocktails}/>}></Route>
          <Route path='/search' element={<Main allcocktail = {cocktails}/>}></Route>
          <Route path='/filter' element={<Main allcocktail = {cocktails}/>}></Route>
          {allCocktails.map((item, i) => <Route key={i} path={"/cocktail/" + item.strDrink} element={<Details cocktail={item}/>}></Route>)}
        </Routes>
        <Footer/>
      </div>
    )}
    </>
  );
}

export default App;
