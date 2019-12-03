export default class BookstoreService {
  data = [
    { 
      id: 1,
      title: 'Eloquent JavaScript',
      author: 'Marijn Haverbeke',
      price: 28,
      coverImage: 'https://images-na.ssl-images-amazon.com/images/I/51-5ZXYtcML._SX377_BO1,204,203,200_.jpg'
    },
    { 
      id: 2,
      title: 'JavaScript: The Good Parts',
      author: 'Douglas Crockford',
      price: 16,
      coverImage: 'https://images-na.ssl-images-amazon.com/images/I/5131OWtQRaL._SX381_BO1,204,203,200_.jpg'
    },
  ];

  getBooks() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() > 0.75) {
          reject(new Error('Something is wrong'));
        } else {
          resolve(this.data);
        }
      }, 1000);
    });
  }
}
