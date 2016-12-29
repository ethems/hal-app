import React from 'react';
import {Provider} from 'react-redux';
import {Router, Route, browserHistory} from 'react-router';
import App from './app.jsx';
import Admin from '../pages/admin';
import Products from '../pages/admin/products';
import Product from '../pages/admin/product';


const Root = ({store}) => (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <Route path="admin" component={Admin}>
          <Route path="products" component={Products}/>
          <Route path="product/:id" component={Product}/>
        </Route>
      </Route>
    </Router>
  </Provider>
);


export default Root;
