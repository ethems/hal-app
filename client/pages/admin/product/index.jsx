import React, {Component} from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import _ from 'lodash';
import classNames from 'classnames';
import Tabs from '../../../components/tabs/tabs';
import Pane from '../../../components/tabs/pane';
import * as productActions from '../../../actions/product-action';
import Setup from './setup';

import './styles/index.scss';

class Product extends Component {
  constructor(props) {
    super(props);
    const {id} = props.params;
    const {products} = props;
    this.state = {};
    if (id) {
      const index = _.findIndex(products, product => product.id === id);
      if (index === -1) {
        props.getProduct(id);
      } else {
        const product = products[index];
        this.state = {
          ...product,
          priceHistory: [...product.priceHistory]
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
          priceHistory: [...product.priceHistory]
        });
      }
    }
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
    this.props.updateProduct(id, this.state);
  }
  onClickCancel = () => {
    browserHistory.push('/admin/products');
  }
  _renderProductName() {
    const {name, showNameEdit} = this.state;
    const showInput = showNameEdit || !name;
    return (
      <div className="product-name-container">
        <div className={classNames('product-name-label', {hide: showInput})} onClick={() => this.onClickNameLabel()}>{name || ''}</div>
        <input className={classNames('product-name', {
          hide: !showInput
        })} value={name || ''} onChange={event => this.onChangeName(event)}/>
      </div>
    );
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
  renderButtonTimeline(){
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
          {this._renderProductName()}
        </div>
        <div className="product-tabs-section">
          <Tabs selected={0}>
            <Pane label={this.renderButtonSettings()}>
              <Setup {...this.state} onChangeStatus={this.onChangeStatus}/>
            </Pane>
            <Pane label={this.renderButtonTimeline()}>
              <div></div>
            </Pane>
          </Tabs>
        </div>
        <div className="product-actions-section">
          <div className="botton-container">
            <button className="pure-button  button-primary valign-center" onClick={() => this.onClickSave()}>Save</button>
            <button className="pure-button valign-center" onClick={() => this.onClickCancel()}>Cancel</button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({products: state.products});
export default connect(mapStateToProps, productActions)(Product);
