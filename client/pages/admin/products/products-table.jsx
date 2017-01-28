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
      deleteConfirmationRowId: null,
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
  handleOpenDeleteSection = (id) => {
    this.setState({deleteConfirmationRowId: id});
  }
  handleCloseDeleteSection = () => {
    this.setState({deleteConfirmationRowId: null});
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
        case 'date':
          return product.modifiedDate || product.createdDate;
        case 'status':
          return product.active;
        case 'price':
          return product.priceHistory.length === 0
            ? 0
            : product.priceHistory[0].price;
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
    const {deleteConfirmationRowId} = this.state;
    return this._sort(this._filter(products)).map((product, index) => <ProductsRow key={product.id} index={index} isDeleteSectionOpen={deleteConfirmationRowId === product.id} {...product} onOpenDeleteSection={this.handleOpenDeleteSection} onCloseDeleteSection={this.handleCloseDeleteSection}/>);
  }
  render() {
    const {searchText} = this.state;
    return (
      <div className="admin--products-table-container">
        <table className="admin--products__table">
          <thead>
            <tr className="admin--products__table__tr-actions-container">
              <th colSpan={3}>
                <div className="search-text-container">
                  <input className="full-width-height" value={searchText} onChange={event => this.onChangeText(event)}/>
                </div>
              </th>
              <th colSpan={1}>
                <div className="active-visibility-container"></div>
              </th>
            </tr>
            <tr className="admin--products__table__tr-header">
              <th width="40%" onClick={() => this.onChangeSortType('name')}>Product Name</th>
              <th width="20%" onClick={() => this.onChangeSortType('price')}>Price</th>
              <th width="15%" onClick={() => this.onChangeSortType('date')}>Update Date</th>
              <th width="25%">Actions</th>
            </tr>
          </thead>
          <tbody>{this._renderRows()}</tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = state => ({products: state.products.data});
export default connect(mapStateToProps, productActions)(ProductsTable);
