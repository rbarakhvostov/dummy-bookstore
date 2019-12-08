import React from 'react';
import { connect } from 'react-redux';

import './cart-page.css';

const CartPage = ({ cartItems }) => {
  if (cartItems.length === 0) {
    return (
      <div className="alert alert-warning">
        <span>Your shopping cart is empty</span>
      </div>
    );
  }

  return (
    <ul className='cart-page-items'>
      {
        cartItems.map(item => {
          const { id, title, author, coverImage, price, count, total } = item;
          return (
            <li className='cart-page-item' key={id}>
              <span className='cart-page-item-title'>{title}</span>
              <span className='cart-page-item-author'>{author}</span>
              <div className='cart-page-item-cover'>
                <img src={coverImage} alt={title}/>
              </div>
              <span className='cart-page-item-value'>
                ${price} * {count} = ${total}
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
