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
  _renderRows() {
    const {products} = this.props;
    return this._sort(products).map(product => <MainProductsRow key={product.id} {...product}/>);
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
