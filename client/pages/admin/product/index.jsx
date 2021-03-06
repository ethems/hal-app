import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {browserHistory} from 'react-router';
import update from 'react-addons-update';
import _ from 'lodash';
import Tabs from '../../../components/tabs/tabs';
import Pane from '../../../components/tabs/pane';
import * as productActions from '../../../actions/product-action';
import Setup from './setup';
import Timeline from './timeline';
import ProductName from './product-name';
import timespanTypes from './timespan-types';


import './styles/index.scss';

class Product extends Component {
  constructor(props) {
    super(props);
    const {id} = props.params;
    const {products} = props;
    this.state = {
      priceHistory: [],
      newPrice: {},
      timespanType: timespanTypes[0]
    };
    if (id) {
      const index = _.findIndex(products, product => product.id === id);
      if (index === -1) {
        props.productActions.getProduct(id);
      } else {
        const product = products[index];
        this.state = {
          ...product,
          priceHistory: [...product.priceHistory],
          newPrice: _.find(product.priceHistory, price => price.active === true) || {},
          timespanType: timespanTypes[0]
        };
      }
    }
  }
  componentWillReceiveProps(nextProps) {
    const {id} = this.props.params;
    const {products} = nextProps;
    if (id) {
      const index = _.findIndex(products, product => product.id === id);
      if (index !== -1) {
        const product = products[index];
        this.setState({
          ...product,
          priceHistory: [...product.priceHistory],
          newPrice: _.find(product.priceHistory, price => price.active === true) || {}
        });
      }
    }
  }
  onChangePriceUnit = (type) => {
    this.setState(update(this.state, {
      newPrice: {
        unit: {
          $set: type.value
        }
      }
    }));
  }
  onChangePrice = (price) => {
    this.setState(update(this.state, {
      newPrice: {
        price: {
          $set: price
        }
      }
    }));
  }
  onChangeStatus = (active) => {
    this.setState({active});
  }
  onClickNameLabel = () => {
    this.setState({showNameEdit: true});
  }
  onChangeName = (event) => {
    const {value} = event.target;
    this.setState({name: value});
  }
  onClickSave = () => {
    const {id} = this.props.params;
    const {priceHistory} = this.state;
    const activePrice = _.find(priceHistory, price => price.active === true) || {}
    let state = Object.assign({}, this.state);
    if (_.isEqual(state.newPrice, activePrice)) {
      delete state.newPrice;
    }
    this.props.productActions.updateProduct(id, state, this.onClickCancel);
  }
  onClickCancel = () => {
    browserHistory.push('/admin/products');
  }
  handleChangeTimespanType = (timespanType) => {
    this.setState({timespanType: timespanType.value});
  }
  renderButtonSettings() {
    return (
      <div>
        <div className="valign-center">
          <i className="material-icons">settings</i>&nbsp;Settings
        </div>
      </div>
    );
  }
  renderButtonTimeline() {
    return (
      <div>
        <div className="valign-center">
          <i className="material-icons">timeline</i>&nbsp;Timeline
        </div>
      </div>
    );
  }
  render() {
    return (
      <div className="product-container">
        <div className="product-name-section">
          <ProductName {...this.state} onChangeName={this.onChangeName}/>
        </div>
        <div className="product-setup-section">
          <Setup {...this.state} onChangeStatus={this.onChangeStatus} onChangePrice={this.onChangePrice} onChangePriceUnit={this.onChangePriceUnit}/>
        </div>
        <div className="product-actions-section">
          <div className="botton-container">
            <button className="mdc-button  button-primary valign-center" onClick={() => this.onClickSave()}>Save</button>
            <button className="mdc-button valign-center" onClick={() => this.onClickCancel()}>Cancel</button>
          </div>
        </div>
      </div>
    );
  }
}
function mapDispatchToProps(dispatch) {
  return {
    productActions: bindActionCreators(productActions, dispatch)
  };
}
const mapStateToProps = state => ({products: state.products.data});
export default connect(mapStateToProps, mapDispatchToProps)(Product);
