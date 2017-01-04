import React, {Component} from 'react';
import Dropdown from 'react-dropdown';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Switch from '../../../components/switch';
import * as priceActions from '../../../actions/price-action';

import './styles/setup.scss';
import '../../../components/styles/dropdown.scss';

class Setup extends Component {
  constructor(props) {
    super(props);
    if (props.priceUnits.length === 0) {
      props.priceActions.getPriceUnits();
    }
  }
  handleChangePrice = (event) => {
    const value = event.target.value || '';
    const rgx = /^[0-9]*\.?[0-9]{0,3}$/;
    const isValid = value.match(rgx);
    if (isValid || value === '') {
      this.props.onChangePrice(value);
    }
  }
  render() {
    const {active, onChangeStatus, newPrice, priceUnits,onChangePriceUnit} = this.props;
    const price = newPrice.price || '';
    const unit = newPrice.unit;
    return (
      <div className="setup-container">
        <div className="primary-form">
          <div className="row">
            <div className="label">Price</div>
            <div className="field">
              <div className="field-content">
                <input type="text" value={price} className="field-control" onChange={e => this.handleChangePrice(e)}/>&nbsp;/&nbsp;<Dropdown value={unit} onChange={onChangePriceUnit}  options={priceUnits} placeholder="Select a price type"/>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="label">Status</div>
            <div className="field">
              <div className="field-content">
                <Switch active={active} onClickSwitch={onChangeStatus}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Setup.propTypes = {
  active: React.PropTypes.bool,
  onChangeStatus: React.PropTypes.func,
  newPrice: React.PropTypes.object,
  onChangePrice: React.PropTypes.func
};

function mapDispatchToProps(dispatch) {
  return {
    priceActions: bindActionCreators(priceActions, dispatch)
  };
}
const mapStateToProps = state => ({priceUnits: state.priceUnits});
export default connect(mapStateToProps, mapDispatchToProps)(Setup);
