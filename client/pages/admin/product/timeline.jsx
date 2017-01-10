import React, {Component} from 'react';
import Select from 'react-select';
import {connect} from 'react-redux';
import * as priceActions from '../../../actions/price-action';
import timespanTypes from './timespan-types';

import 'react-select/dist/react-select.css';
import './styles/timeline.scss';

class Timeline extends Component {
  constructor(props) {
    super(props);
    const{id,timespanType}=props;
    if(id){
      props.getPriceTimelines(id,timespanType);
    }
  }

  render() {
    const {timespanType} = this.props;
    return (
      <div className="timeline-container">
        <div className="timeline-header">
          <div className="timeline-timespan-selection">
            <Select searchable={false} backspaceRemoves={false} clearable={false} value={timespanType} onChange={this.props.onChangeTimespan} options={timespanTypes.map((timespan) => {
              return {value: timespan, label: timespan}
            })}/>
          </div>
        </div>
        <div className="timeline-content">
          xxx
        </div>
      </div>
    );
  }
}

export default connect(null, priceActions)(Timeline);
