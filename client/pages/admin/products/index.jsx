import React from 'react';
import ProductsTable from './products-table';

import './styles/index.scss';

const Products = props => (
  <div className="products-container">
    <div className="products-actions">
      <button className="pure-button  button-primary valign-center"><i className="material-icons material-icons.md-18">add</i>New</button>
    </div>
    <div className="products-table-wrapper">
      <ProductsTable/>
    </div>
  </div>
);

export default Products;
