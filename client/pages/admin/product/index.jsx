import React, {Component} from 'react';
import Setup from './setup';
import './styles/index.scss';

class Product extends Component {
  componentWillMount() {}
  render() {
    return (
      <div className="product-container">
        <div className="product-name-section"></div>
        <div className="product-tabs-section"></div>
        <div className="product-actions"></div>
      </div>
    );
  }
}

export default Product;
