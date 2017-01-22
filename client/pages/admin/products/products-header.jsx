import React from 'react';
import {browserHistory} from 'react-router';
import {connect} from 'react-redux';
import * as productActions from '../../../actions/product-action';
import './styles/products-header.scss';

const handleGotoNew = () => {
  browserHistory.push('/admin/product');
}
const handleGotoHome = () => {
  browserHistory.push('/');
}
const ProductsHeader = (props) => (
  <div className="admin--products-header-container">
    <div className="admin--products-header--fixed mdc-elevation--z4">
      <div className="admin--products-header__button-container">
        <button className="admin--products-header__button mdc-button  button-primary" onClick={() => props.resetProducts(handleGotoHome)}>
          <div className="valign-center">
            <i className="material-icons md-18">home</i>
          </div>
        </button>
        <button className="admin--products-header__button mdc-button  button-primary" onClick={() => handleGotoNew()}>
          <div className="valign-center">
            <i className="material-icons md-18">add</i>
          </div>
        </button>
      </div>
    </div>
  </div>
);

export default connect(null, productActions)(ProductsHeader);
