import React, { useEffect, useState } from 'react'
import './Details.css'

function Details({cocktail}) {

    const [ingredient, setIngredient] = useState([]);

    const getAllIngridient = async function(){
        let array = [];
        for(let i =1; i<=15; i++){
            if(cocktail["strIngredient" + i] !== null){
                let ing = {
                    name: cocktail["strIngredient" + i],
                    measure: cocktail["strMeasure" + i],
                }
                array.push(ing);
            }
        }
        setIngredient(array);
    }
    
    useEffect(() =>{
        getAllIngridient();
    }, []);
  return (
    <div className="wrap">
        <div className='wrap__item cocktail'>
            <h2 className="cocktail__name">{cocktail.strDrink}</h2>
            <img className='cocktail__img' src={cocktail.strDrinkThumb} alt={cocktail.strDrink} />
        </div>
        <div className='wrap__item ingredients'>
            <h4 className='ingredients__title'>Ingredients</h4>
            <ul className='ingredients__list'>
                {ingredient.map((item, i)=> <li className='ingredients__item' key={i}><span className='ingredients__name'>{item.name}</span> : <span className='ingredients__measure'>{item.measure}</span></li>)}
            </ul>
        </div>
    </div>
  )
}

export default Details