import React from 'react';
import { Link } from 'react-router-dom';

import './header.css';

const Header = ({ numItems, total }) => {
  return (
    <header className='header row'>
      <Link to='/'>
        <h1 className='logo text-dark'>ReStore</h1>
      </Link>
      <Link to='/cart'>
        <div className='shopping-cart'>
          <span className='cart-icon fa fa-shopping-cart'></span>
          <span>{ numItems } items (${ total })</span>
        </div>
      </Link>
    </header>
  )
}

export default Header;
