import React from 'react';
import { useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header/Header';
import { Route, Routes, useLocation } from 'react-router-dom';
import Main from './pages/Main/Main';
import About from './pages/About/About';
import Error from './pages/Error/Error';


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
  }

  useEffect(() =>{
    getCocktail();
  }, [location]);

  return (
    <>
    {error ? (
     <Error error = {error}/>
    ) :
    (
      <div className='container'>
        <Header/>
        <Routes>
          <Route path='/' element={<Main allcocktail = {allCocktails}/>}></Route>
          <Route path='/about' element={<About/>}></Route>
          <Route path='/alcoholic' element={<Main allcocktail = {cocktails}/>}></Route>
          <Route path='/non-alcoholic' element={<Main allcocktail = {cocktails}/>}></Route>
        </Routes>
      </div>
    )}
    </>
  );
}

export default App;
