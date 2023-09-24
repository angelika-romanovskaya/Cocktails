import React from 'react'
import './Card.css';
import { NavLink } from 'react-router-dom';

function Card({cocktail}) {
  return (
    <li className="cocktails__item">
        <NavLink to={"/Cocktails/cocktail/" + cocktail.strDrink} className="cocktails__link">
            <h3 className="cocktails__title">{cocktail.strDrink}</h3>
            <div>
              <img className="cocktails__images" src={cocktail.strDrinkThumb} alt={cocktail.strDrink} />
              <p className="cocktails__description hidden">{cocktail.strInstructions}</p>
            </div>
        </NavLink>
    </li>
  )
}

export default Card