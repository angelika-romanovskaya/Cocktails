import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import './Header.css'
function Header() {
    const location = useLocation();
    const { pathname } = location;
    const splitLocation = pathname.split("/");
  return (
    <div className = 'header'>
        <ul className = 'header__nav'>
            <li className = 'header__item'>
                <NavLink className = {splitLocation[1] === '' ? 'header__link selected' : 'header__link'}  to = '/'>Home</NavLink>
            </li>
            <li className = 'header__item'>
                <NavLink className ={splitLocation[1] === 'about' ? 'header__link selected' : 'header__link'}  to = '/about'>About</NavLink>
            </li>
            <li className = 'header__item'>
                <NavLink className = {splitLocation[1] === 'alcoholic' ? 'header__link selected' : 'header__link'}  to = '/alcoholic'>Alcoholic</NavLink>
            </li>
            <li className = 'header__item'>
                <NavLink className = {splitLocation[1] === 'non-alcoholic' ? 'header__link selected' : 'header__link'}  to = '/non-alcoholic'>NON Alcoholic</NavLink>
            </li>
        </ul>
    </div>
  )
}

export default Header