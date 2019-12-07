import React from 'react';
import { connect } from 'react-redux';

import './cart-page.css';

const CartPage = ({ cartItems }) => {
  if (cartItems.length === 0) {
    return (
      <div class="alert alert-warning">
        <span>Your shopping cart is empty</span>
      </div>
    );
  }

  return (
    <ul className='cart-page-items'>
      {
        cartItems.map(item => {
          return (
            <li className='cart-page-item' key={item.id}>
              <span className='cart-page-item-title'>{item.title}</span>
              <span className='cart-page-item-author'>{item.author}</span>
              <div className='cart-page-item-cover'>
                <img src={ item.coverImage } alt={ item.title }/>
              </div>
              <span className='cart-page-item-value'>
                ${item.price} * {item.count} = ${item.total}
              </span>
            </li>
          );
        })
      }
    </ul>
  )
}

const mapStatetoProps = ({ shoppingCart: { cartItems } }) => {
  return {
    cartItems
  }
}

export default connect(mapStatetoProps)(CartPage);
