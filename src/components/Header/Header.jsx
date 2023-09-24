import React, { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { BsSearch} from 'react-icons/bs';
import { LuFilter} from 'react-icons/lu';
import { BiMenuAltLeft} from 'react-icons/bi';
import './Header.css'
import Filter from '../Filter/Filter';
function Header({search, filter}) {
    const [stateSearch, setStateSearch]= useState('/search');
    const [stateFilter, setStateFilter]= useState('/filter');
    const [stateBurger, setStateBurger]= useState(false);
    const [classN, setClassN] = useState('header__nav');
    const [stateFilterBTN, setStateFilterBTN]= useState(false);
    const [classFilter, setClassFilter] = useState('header__filter');
    const [size, setSize] = useState(window.innerWidth)
    const location = useLocation();
    const { pathname } = location;
    const splitLocation = pathname.split("/");
    
    function addClassSearch(event){
        if(splitLocation[2] === 'search') setStateSearch('/Cocktails/')
        else setStateSearch('/Cocktails/search')
    }

    useEffect(() =>{
        addClassSearch();
      }, [location]);

    function addClassFilter(event){
        if(splitLocation[2] === 'filter') {
            setStateFilter('/Cocktails/')
            setClassFilter('header__filter');
        }
        else{
            setStateFilter('/Cocktails/filter')
            setClassFilter('hidden');
        }
    }

    useEffect(() =>{
        addClassFilter();
      }, [location]);

    function burgerFun(){
        if(size<768){
            setStateBurger(!stateBurger);
            stateBurger ? setClassN('header__nav') : setClassN('hidden');
        }
    }

    useEffect(() => {
        const resize = () => {
            setSize(window.innerWidth)
            setClassName();
        }

        window.addEventListener('resize', resize)
    }, [size])

    function setClassName(){
       if(size<768){
        setStateBurger(false);
        stateBurger ? setClassN('header__nav') : setClassN('hidden');
       } else{
        setClassN('header__nav');
       }
    }

    function sent(){
        if(splitLocation[2] === 'filter' && stateFilter) {
            setClassFilter('hidden')
            setStateFilter(true);
        }
    }

  return (
    <div className = 'header'>
        <div className='burger' onClick={() => burgerFun()}><BiMenuAltLeft/></div>
        <ul onClick={() => burgerFun()}  className = {classN}>
            <li className = 'header__item'>
                <NavLink className = {splitLocation[2] === '' ? 'header__link selected' : 'header__link'}  to = '/Cocktails/'>Home</NavLink>
            </li>
            <li className = 'header__item'>
                <NavLink className ={splitLocation[2] === 'about' ? 'header__link selected' : 'header__link'}  to = '/Cocktails/about'>About</NavLink>
            </li>
            <li className = 'header__item'>
                <NavLink className = {splitLocation[2] === 'alcoholic' ? 'header__link selected' : 'header__link'}  to = '/Cocktails/alcoholic'>Alcoholic</NavLink>
            </li>
            <li className = 'header__item'>
                <NavLink className = {splitLocation[2] === 'non-alcoholic' ? 'header__link selected' : 'header__link'}  to = '/Cocktails/non-alcoholic'>NON Alcoholic</NavLink>
            </li>
            <li className = 'header__item'>
                <NavLink className = {splitLocation[2] === 'optional-alcohol' ? 'header__link selected' : 'header__link'}  to = '/Cocktails/optional-alcohol'>Optional Alcohol</NavLink>
            </li>
        </ul>
        <div className='header__function'>
            <input onKeyUp={(event) => search(event)} className={splitLocation[2] === 'search' ? 'header__input block' : 'header__input'} type="search" />
            <NavLink to={stateSearch} onClick={(event)=>addClassSearch(event)} className='header__link'><BsSearch className='header__func' title='search'/></NavLink>
            <NavLink onClick={(event)=>addClassFilter(event)} to={stateFilter} className='header__link'><LuFilter className='header__func' title='filter'/></NavLink>
            <div className={classFilter}>
                <Filter filter={filter} sent={sent}/>
            </div>
        </div>
    </div>
  )
}

export default Header