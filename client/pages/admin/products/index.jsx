import React from 'react';
import {browserHistory} from 'react-router';
import ProductsTable from './products-table';

import './styles/index.scss';

const handleAddNew = () => {
  browserHistory.push('/admin/product');
}

const Products = props => (
  <div className="products-container">
    <div className="products-actions">
      <button className="pure-button  button-primary" onClick={e => handleAddNew()}>
        <div className="valign-center">
          <i className="material-icons material-icons.md-18">add</i>New</div>
      </button>
    </div>
    <div className="products-table-wrapper">
      <ProductsTable/>
    </div>
  </div>
);

export default Products;
