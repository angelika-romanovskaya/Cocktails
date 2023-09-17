import React from 'react'
import './Card.css';

function Card({cocktail}) {
  return (
    <li className="cocktails__item">
        <a className="cocktails__link">
            <h3 className="cocktails__title">{cocktail.strDrink}</h3>
            <div>
              <img className="cocktails__images" src={cocktail.strDrinkThumb} alt={cocktail.strDrink} />
              <p className="cocktails__description hidden">{cocktail.strInstructions}</p>
            </div>
        </a>
    </li>
  )
}

export default Card