import React from 'react'
import Card from '../../components/Card/Card'
import './Main.css'

function Home({allcocktail}) {
  return (
    <div className='cocktails'>
      <ul className="cocktails__list">
          {allcocktail.map((item, i)=><Card key={i} cocktail = {item}/>)}
      </ul>
    </div>
  )
}

export default Home