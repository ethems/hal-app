import React, {Component} from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import * as productActions from '../../actions/product-action';
import MainProductsRow from './products-row';

import './styles/products-table.scss';

class MainProductsTable extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.getProducts({justActive: true, withRate: true});
  }
  _sort(products) {
    return _.sortBy(products, product => product.name);
  }
  _filter(products) {
    const searchText = this.props.searchText.toLowerCase();
    if (searchText === '') {
      return products;
    }
    return _.filter(products, product => product.name.toLowerCase().indexOf(searchText) !== -1);
  }
  _renderRows() {
    const {products, onChangeTimelineProductId} = this.props;
    return this._sort(this._filter(products)).map(product => <MainProductsRow onChangeTimelineProductId={onChangeTimelineProductId} key={product.id} {...product}/>);
  }
  render() {
    return (
      <div className="products-table-container">
        {this._renderRows()}
      </div>
    );
  }
}

const mapStateToProps = state => ({products: state.products});
export default connect(mapStateToProps, productActions)(MainProductsTable);
