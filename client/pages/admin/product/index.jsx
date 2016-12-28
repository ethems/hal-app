import React, {Component} from 'react';
import Setup from './setup';
import './styles/index.scss';

class Product extends Component {
  render() {
    return (
      <div className="product-container">
        <Setup/>
      </div>
    );
  }
}

export default Product;
