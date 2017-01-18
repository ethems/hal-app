import React from 'react';
import MainProductsTable from './products-table';
import './styles/index.scss';

const Main = (props) => (
  <div className="index-container">
    <div className="product-table-wrapper"><MainProductsTable/></div>
    <div className="graph-wrapper">Graph</div>
  </div>
);

export default Main;
