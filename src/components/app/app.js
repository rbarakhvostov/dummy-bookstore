import React from 'react';
import { withBookstoreService } from '../hoc';
import { HomePage, CartPage } from '../pages';
import { Route, Switch } from 'react-router-dom';

import './app.css';

const App = () => {
  return (
    <Switch>
      <Route
        path='/'
        component={HomePage} 
        exact />
      <Route
        path='/cart'
        component={CartPage} 
      />
    </Switch>
  );
}

export default withBookstoreService()(App);
