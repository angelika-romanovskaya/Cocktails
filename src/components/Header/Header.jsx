import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { BsSearch} from 'react-icons/bs';
import { LuFilter} from 'react-icons/lu';
import { BiMenuAltLeft} from 'react-icons/bi';
import './Header.css'
import Filter from '../Filter/Filter';
function Header({search, filter}) {
    const [stateSearch, setStateSearch]= useState(false);
    const [stateFilter, setStateFilter]= useState(false);
    const [stateBurger, setStateBurger]= useState(false);
    const location = useLocation();
    const { pathname } = location;
    const splitLocation = pathname.split("/");
    
    function addClass(event){
        setStateFilter(stateFilter => !stateFilter);
        setStateSearch(stateSearch => !stateSearch);
    }

    function addClassFilter(event){
        setStateFilter(stateFilter => !stateFilter);
        setStateSearch(stateSearch => !stateSearch);
    }

    function burgerFun(event){
        setStateBurger(!stateBurger);
    }


  return (
    <div className = 'header'>
        <div className='burger' onClick={(event) => burgerFun(event)}><BiMenuAltLeft/></div>
        <ul className = {stateBurger ? 'header__nav hidden' : 'header__nav'}>
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
            <li className = 'header__item'>
                <NavLink className = {splitLocation[1] === 'optional-alcohol' ? 'header__link selected' : 'header__link'}  to = '/optional-alcohol'>Optional Alcohol</NavLink>
            </li>
        </ul>
        <div className='header__function'>
            <input onKeyUp={(event) => search(event)} className={splitLocation[1] === 'search' ? 'header__input block' : 'header__input'} type="search" />
            <NavLink to={stateSearch === true ? '/search' : '/'} onClick={(event)=>addClass(event)} className='header__link'><BsSearch className='header__func' title='search'/></NavLink>
            <NavLink onClick={(event)=>addClassFilter(event)} to={stateFilter === true ? '/filter' : '/'} className='header__link'><LuFilter className='header__func' title='filter'/></NavLink>
            <div className={splitLocation[1] === 'filter' ? 'header__filter block' : 'header__filter'}>
                <Filter filter={filter}/>
            </div>
        </div>
    </div>
  )
}

export default Header