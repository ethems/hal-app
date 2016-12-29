import React from 'react';
import ProductsTable from './products-table';

import './styles/index.scss';

const Products = props => (
  <div className="products-container">
    <div className="products-actions">
      <button className="button-primary">New</button>
    </div>
    <div className="products-table-wrapper">
      <ProductsTable/>
    </div>
  </div>
);

export default Products;
