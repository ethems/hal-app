import React from 'react';
import ProductsTable from './products-table';
import ProductsHeader from './products-header';
import './styles/index.scss';

const Products = () => (
  <div className="admin--products-container">
    <div className="admin--products-header-wrapper">
      <ProductsHeader/>
    </div>
    <div className="admin--products-table-wrapper">
      <ProductsTable/>
    </div>
  </div>
);

export default Products;
