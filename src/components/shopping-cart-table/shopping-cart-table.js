import React from 'react';
import { connect } from 'react-redux';
import {
  bookAddedToCart,
  bookRemovedFromCart,
  allBooksRemovedFromCart } from '../../actions';

import './shopping-cart-table.css';

const ShoppingCartTable = ({ cartItems, orderTotal, onIncrease, onDecrease, onDelete }) => {
  const renderRow = (item, idx) => {
    const { id, title, count, total } = item;
    return (
      <tr key={ id }>
        <td>{ idx + 1 }</td>
        <td>{ title }</td>
        <td>{ count }</td>
        <td>${ total }</td>
        <td>
          <div className='wrapper-button'>
            <button
              onClick={() => onDecrease(id)}
              className='btn btn-outline-warning btn-sm float-left'>
              <span className='fa fa-minus-circle'></span>
            </button>
            <button
              onClick={() => onIncrease(id)}
              className='btn btn-outline-success btn-sm float-left'>
              <span className='fa fa-plus-circle'></span>
            </button>
            <button
              onClick={() => onDelete(id)}
              className='btn btn-outline-danger btn-sm float-left'>
              <span className='fa fa-trash-o'></span>
            </button>
          </div>
        </td>
      </tr>
    )
  }
  return (
    <div className='shopping-cart-table'>
      <h2>Your Order</h2>
      <table className='table'>
        <thead>
          <tr>
            <th>#</th>
            <th>Item</th>
            <th>Count</th>
            <th>Total</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {
            cartItems.map(renderRow)
          }
        </tbody>
      </table>
      <div className='total'>
        <span>Total: ${ orderTotal }</span>
      </div>
    </div>
  );
}

const mapStateToProps = ({ shoppingCart : { cartItems, orderTotal } }) => {
  return {
    cartItems,
    orderTotal
  }
}

const mapDispatchToProps = {
  onIncrease: bookAddedToCart,
  onDecrease: bookRemovedFromCart,
  onDelete: allBooksRemovedFromCart
}

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCartTable);
