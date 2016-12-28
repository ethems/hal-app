import React, {Component} from 'react';
import './styles/setup.scss';

class Setup extends Component {
  render() {
    return (
      <div className="setup-container">
        <div className="product-form">
          <div className="row">
            <div className="label">Name</div>
            <div className="field"><input type="text" className="setup-field-control" /></div>
          </div>
        </div>
      </div>
    );
  }
}

export default Setup;
