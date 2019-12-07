const updateCartItem = (book, item = {}, amount) => {
  const { id = book.id,
          price = book.price,
          count = 0,
          title = book.title,
          author = book.author,
          coverImage =  book.coverImage,
          total = 0 } = item;

  return {
    id,
    price,
    count: count + amount,
    title,
    author,
    coverImage,
    total: total + amount * price,
  }
}

const updateCartItems = (cartItems, item, idx) => {
  if (item.count === 0) {
    return [
      ...cartItems.slice(0, idx),
      ...cartItems.slice(idx + 1)
    ];
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
  const newCartItems = updateCartItems(cartItems, newItem, itemIndex);

  return {
    cartItems: newCartItems,
    orderTotal: newCartItems
                  .map(item => item.total)
                  .reduce((a, b) => a + b, 0),
    numItems: newCartItems
                .map(item => item.count)
                .reduce((a, b) => a + b, 0)
  }
}

const updateShoppingCart = (state, action) => {

  if (!state) {
    return {
      cartItems: [],
      orderTotal: 0,
      numItems: 0
    }
  }

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
      return state.shoppingCart;
  }
}

export default updateShoppingCart;
