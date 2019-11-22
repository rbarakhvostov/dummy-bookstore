import React from 'react';

import './header.css';

const Header = ({ numItems, total }) => {
  return (
    <header className='header row'>
      <a className='logo text-dark' href='#'>ReStore</a>
      <a className='shopping-cart'>
        <span className='cart-icon fa fa-shopping-cart'>
          { numItems } items (${ total })
        </span>
      </a>
    </header>
  )
}

export default Header;
