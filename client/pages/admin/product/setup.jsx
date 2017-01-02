import React, {Component} from 'react';
import Switch from '../../../components/switch';
import './styles/setup.scss';

class Setup extends Component {
  render() {
    const {active,onChangeStatus} = this.props;
    return (
      <div className="setup-container">
        <div className="primary-form">
          <div className="row">
            <div className="label">Price</div>
            <div className="field">
              <div className="field-content">
                <input type="text" className="field-control"/>&nbsp;/&nbsp;<input type="text" className="field-control"/>
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

export default Setup;
