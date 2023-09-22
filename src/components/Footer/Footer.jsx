import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { BsTelegram, BsInstagram } from 'react-icons/bs';
import { FaViber} from 'react-icons/fa';
import { SlSocialVkontakte} from 'react-icons/sl';
import './Footer.css'
function Footer() {
    const location = useLocation();
    const { pathname } = location;
    const splitLocation = pathname.split("/");
  return (
    <div className = 'footer'>
        <ul className = 'footer__nav'>
            <li className = 'footer__item'>
                <NavLink className = {splitLocation[1] === '' ? 'footer__link selected' : 'footer__link'}  to = '/'>Home</NavLink>
            </li>
            <li className = 'footer__item'>
                <NavLink className ={splitLocation[1] === 'about' ? 'footer__link selected' : 'footer__link'}  to = '/about'>About</NavLink>
            </li>
            <li className = 'footer__item'>
                <NavLink className = {splitLocation[1] === 'alcoholic' ? 'footer__link selected' : 'footer__link'}  to = '/alcoholic'>Alcoholic</NavLink>
            </li>
            <li className = 'footer__item'>
                <NavLink className = {splitLocation[1] === 'non-alcoholic' ? 'footer__link selected' : 'footer__link'}  to = '/non-alcoholic'>NON Alcoholic</NavLink>
            </li>
        </ul>
        <ul className='footer__messangers'>
            <a className='footer__link' href="https://t.me/angelika_ro"><BsTelegram className='footer__social'/></a>
            <a className='footer__link' href="https://instagram.com/_angelika_ro_?igshid=NTc4MTIwNjQ2YQ=="><BsInstagram className='footer__social'/></a>
            <a className='footer__link' href="viber://chat?number=+375291539886"><FaViber className='footer__social'/></a>
            <a className='footer__link' href="https://vk.com/angelika_ro"><SlSocialVkontakte className='footer__social'/></a>
        </ul>
    </div>
  )
}

export default Footer