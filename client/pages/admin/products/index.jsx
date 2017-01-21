import React from 'react';
import {browserHistory} from 'react-router';
import ProductsTable from './products-table';

import './styles/index.scss';

const handleAddNew = () => {
  browserHistory.push('/admin/product');
}

const Products = () => (
  <div className="admin--products-container">
    <div className="admin--products-actions-container">
      <button className="mdc-button  button-primary" onClick={e => handleAddNew()}>
        <div className="valign-center">
          <i className="material-icons md-18">add</i>New
        </div>
      </button>
    </div>
    <div className="admin--products-table-wrapper">
      <ProductsTable/>
    </div>
  </div>
);

export default Products;
