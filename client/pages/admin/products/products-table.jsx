import React, {Component} from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import update from 'react-addons-update';
import * as productActions from '../../../actions/product-action';
import ProductsRow from './products-row';

import './styles/products-table.scss';

class ProductsTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      sort: {
        by: 'name',
        ascending: true
      }
    };
    this.onChangeText = this.onChangeText.bind(this);
  }
  componentDidMount() {
    this.props.getProducts();
  }
  onChangeText(event) {
    this.setState({searchText: event.target.value});
  }
  onChangeSortType(newSortBy) {
    this.setState({
      sort: update(this.state.sort, {
        by: {
          $set: newSortBy
        },
        ascending: {
          $set: this.state.sort.by === newSortBy
            ? !this.state.sort.ascending
            : true
        }
      })
    });
  }
  _filter(products) {
    const searchText = this.state.searchText.toLowerCase();
    if (searchText === '') {
      return products;
    }
    return _.filter(products, product => product.name.toLowerCase().indexOf(searchText) !== -1);
  }
  _sort(products) {
    const {by, ascending} = this.state.sort;
    const sortedList = _.sortBy(products, (product) => {
      switch (by) {
        case 'name':
          return product.name;
        default:
          return product.name;
      }
    });
    if (!ascending) {
      return _(sortedList).reverse().value();
    }
    return sortedList;
  }
  _renderRows() {
    const {products} = this.props;
    return this._sort(this._filter(products)).map((product, index) => <ProductsRow key={product._id} index={index} {...product}/>);
  }
  render() {
    const {searchText} = this.state;
    return (
      <div className="admin-products-container">
        <table className="products-table">
          <thead>
            <tr>
              <th colSpan={4}>
                <div className="search-text-container">
                  <input className="search-text" value={searchText} onChange={(event) => {
                    this.onChangeText(event)
                  }}/>
                </div>
              </th>
              <th colSpan={1}>
                <div className="active-visibility-container">
                </div>
              </th>
            </tr>
            <tr className="products-table-header">
              <th onClick={e => {
                this.onChangeSortType('name')
              }}>Product Name</th>
              <th>Status</th>
              <th>Price</th>
              <th>Update Date</th>
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
