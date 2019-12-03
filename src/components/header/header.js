import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import './header.css';

const Header = ({ numItems, orderTotal }) => {
  return (
    <header className='header row'>
      <Link to='/'>
        <h1 className='logo text-dark'>ReStore</h1>
      </Link>
      <Link to='/cart'>
        <div className='shopping-cart'>
          <span className='cart-icon fa fa-shopping-cart'></span>
          <span>{ numItems } items (${ orderTotal })</span>
        </div>
      </Link>
    </header>
  )
}

const mapStateToProps = ({shoppingCart:{orderTotal}}) => {
  return {orderTotal}
}

export default connect(mapStateToProps)(Header);
