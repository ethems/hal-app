import React, {Component} from 'react';
import {connect} from 'react-redux';

import './styles/products-row.scss';

const MainProductsRow = (props) => {
  const {id, name, priceHistory} = props;
  const price=priceHistory[0].price;
  return (
    <div className="products-row-container">
      <div className="products-row-price-section">
        <div>{price}</div>
        <div></div>
      </div>
      <div className="products-row-content-section"></div>
    </div>
  );
}
export default MainProductsRow;
