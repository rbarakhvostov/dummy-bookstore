const initialState = {
  bookList: {
    books: [],
    loading: true,
    error: null,
  },

  shoppingCart: {
    cartItems: [],
    orderTotal: 0
  }
}

const updateCartItem = (book, item = {}, amount) => {
  const { id = book.id,
          count = 0,
          title = book.title,
          total = 0 } = item;

  return {
    id,
    count: count + amount,
    title,
    total: total + amount * book.price,
  }
}

const updateCartItems = (cartItems, item, idx) => {
  if (item.count === 0) {
    return [
      ...cartItems.slice(0, idx),
      ...cartItems.slice(idx + 1)
    ]
  }

  if (idx < 0) {
    return [
      ...cartItems,
      item
    ];
  }

  return [
    ...cartItems.slice(0, idx),
    item,
    ...cartItems.slice(idx + 1)
  ];
}

const updateOrder = (state, bookId, amount) => {
  const { bookList: { books }, shoppingCart: { cartItems } } = state;
  const book = books.find(({id}) => id === bookId);
  const itemIndex = cartItems.findIndex(({id}) => id === bookId);
  const item = cartItems[itemIndex];
  const newItem = updateCartItem(book, item, amount);

  return {
    cartItems: updateCartItems(cartItems, newItem, itemIndex),
    orderTotal: 0,
  }
}

const updateBookList = (state, action) => {
  switch(action.type) {
    case 'FETCH_BOOKS_REQUEST':
      return {
        books: [],
        loading: true,
        error: null,
      }

    case 'FETCH_BOOKS_SUCCESS':
      return {
        books: action.payload,
        loading: false,
        error: null,
      }

    case 'FETCH_BOOKS_FAILURE':
      return {
        books: [],
        loading: false,
        error: action.payload,
      }

    default:
      return;
  }
}

const updateShoppingCart = (state, action) => {
  switch(action.type) {
    case 'BOOK_ADDED_TO_CART':
      return updateOrder(state, action.payload, 1);
  
    case 'BOOK_REMOVED_FROM_CART':
      return updateOrder(state, action.payload, -1);

    case 'ALL_BOOKS_REMOVED_FROM_CART':
      const item = state
                    .shoppingCart
                    .cartItems.find(({id}) => id === action.payload);
      return updateOrder(state, action.payload, -item.count);

    default:
      return;
  }
}

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case 'FETCH_BOOKS_REQUEST':
    case 'FETCH_BOOKS_SUCCESS':
    case 'FETCH_BOOKS_FAILURE':
      return {
        ...state,
        bookList: updateBookList(state, action)
      }

    case 'BOOK_ADDED_TO_CART':
    case 'BOOK_REMOVED_FROM_CART':
    case 'ALL_BOOKS_REMOVED_FROM_CART':
      return {
        ...state,
        shoppingCart: updateShoppingCart(state, action)
      }

    default: 
      return state;
  }
}

export default reducer;
