import React, { useEffect, useState } from 'react'
import './Filter.css'

function Filter({filter, sent}) {
    const [category, setCategory] = useState([])
    const [glass, setGlass] = useState([])
    const [ingredient, setIngredient] = useState([])
    const [alcoholic, setAlcoholic] = useState([])

    const [choiceCategory, setChoiceCategory] = useState([]);
    const [choiceGlass, setChoiceGlass] = useState([]);
    const [choiceIngredient, setChoiceIngredient] = useState([]);
    const [choiceAlcoholic, setChoiceAlcoholic] = useState([]);

    const getCategory = async function(){
        try{
              const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list`);
              const data = await response.json();
              setCategory(data.drinks);
        }catch(error){
          console.log(error)
        }
      }

      useEffect(() =>{
        getCategory();
      }, []);

      const getGlass = async function(){
        try{
              const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/list.php?g=list`);
              const data = await response.json();
              setGlass(data.drinks);
        }catch(error){
          console.log(error)
        }
      }

      useEffect(() =>{
        getGlass();
      }, []);

      const getIngredient = async function(){
        try{
              const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list`);
              const data = await response.json();
              setIngredient(data.drinks);
        }catch(error){
          console.log(error)
        }
      }

      useEffect(() =>{
        getIngredient();
      }, []);

      const getAlcoholic = async function(){
        try{
              const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/list.php?a=list`);
              const data = await response.json();
              setAlcoholic(data.drinks);
        }catch(error){
          console.log(error)
        }
      }

      useEffect(() =>{
        getAlcoholic();
      }, []);

      function arrayCategory(event){
        let value = Array.from(event.target.selectedOptions, option => option.value);
        setChoiceCategory(value);
      }

      function arrayGlass(event){
        let value = Array.from(event.target.selectedOptions, option => option.value);
        setChoiceGlass(value);
      }

      function arrayIngredient(event){
        let value = Array.from(event.target.selectedOptions, option => option.value);
        setChoiceIngredient(value);
      }

      function arrayAlcoholic(event){
        let value = Array.from(event.target.selectedOptions, option => option.value);
        setChoiceAlcoholic(value);
      }


  return (
    <form className='filter'>
        <div className='filter__wrap'>
          <div>
            <h3 className='filter__name'>Category</h3>
            <select className='filter__select' name="select" size="5" multiple onChange={arrayCategory}>
                {category.map((item, i) => <option className='filter__option' key={i} value={item.strCategory}>{item.strCategory}</option>)}
            </select>
          </div>
          <div>
            <h3 className='filter__name'>Glass</h3>
            <select className='filter__select' name="select" size="5" multiple onChange={arrayGlass}>
                {glass.map((item, i) => <option key={i} className='filter__option' value={item.strGlass}>{item.strGlass}</option>)}
            </select>
          </div>
          <div>
            <h3 className='filter__name'>Ingredient</h3>
            <select className='filter__select' name="select" size="5" multiple onChange={arrayIngredient}>
                {ingredient.map((item, i) => <option key={i} className='filter__option' value={item.strIngredient1}>{item.strIngredient1}</option>)}
            </select>
          </div>
          <div>
            <h3 className='filter__name'>Alcoholic</h3>
            <select className='filter__select' name="select" size="3" multiple onChange={arrayAlcoholic}>
                {alcoholic.map((item, i) => <option key={i} className='filter__option' value={item.strAlcoholic}>{item.strAlcoholic}</option>)}
            </select>
          </div>
        </div>
        <button className = 'filter__btn' onClick={(event) => {sent(); filter(event, choiceCategory, choiceGlass, choiceIngredient, choiceAlcoholic)}} type='submit'>ОК</button>
    </form>
  )
}

export default Filter