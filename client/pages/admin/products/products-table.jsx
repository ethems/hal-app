import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as productActions from '../../../actions/product-action';
import ProductsRow from './products-row';

import './styles/products-table.scss';

class ProductsTable extends Component {
  componentDidMount() {
    this.props.getProducts();
  }
  _renderRows() {
    const {products} = this.props;
    return products.map((product, index) => <ProductsRow key={product._id} index={index} {...product}/>);
  }
  render() {
    return (
      <div className="admin-products-container">
        <table className="products-table">
          <thead>
            <tr>
              <th colSpan={3}>
                <div className="search-text-container">
                  <input className="search-text"/>
                </div>
              </th>
            </tr>
            <tr className="products-table-header">
              <th>Product Name</th>
              <th>Status</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{this._renderRows()}</tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = state => ({products: state.products});
export default connect(mapStateToProps, productActions)(ProductsTable);
