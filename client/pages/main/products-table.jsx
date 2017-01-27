import React, {Component} from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import * as productActions from '../../actions/product-action';
import MainProductsRow from './products-row';
import EmptyProductTable from './products-table-empty';
import CircularLoadingPanel from '../../components/loading-panel';

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
  _renderEmptyList() {
    return <EmptyProductTable/>
    //return <CircularLoadingPanel/>
  }
  _renderRows() {
    const {products, onChangeTimelineProductId} = this.props;
    const processedProducts = this._sort(this._filter(products));
    if (processedProducts.length && processedProducts.length > 0) {
      return processedProducts.map(product => <MainProductsRow onChangeTimelineProductId={onChangeTimelineProductId} key={product.id} {...product}/>);
    }
    return this._renderEmptyList();
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
