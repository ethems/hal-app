import React, {Component} from 'react';
import Select from 'react-select';
import {connect} from 'react-redux';
import * as priceActions from '../../../actions/price-action';
import timespanTypes from './timespan-types';
import PriceTimelineLineGraph from '../../../components/price-timeline-line-graph';
import {getActiveTimeline} from '../../../reducers';

import 'react-select/dist/react-select.css';
import './styles/timeline.scss';

class Timeline extends Component {
  constructor(props) {
    super(props);
    const {id, timespanType} = props;
    if (id) {
      props.getPriceTimelines(id, timespanType);
    }
  }
  componentWillReceiveProps(nextProps) {
    const {id, timespanType} = nextProps;
    const oldTimeSpanType = this.props.timespanType;
    if (timespanType && id && timespanType !== oldTimeSpanType) {
      this.props.getPriceTimelines(id, timespanType);
    }
  }
  render() {
    const {timespanType, activeTimeline} = this.props;
    return (
      <div className="timeline-container">
        <div className="timeline-header">
          <div className="timeline-timespan-selection">
            <Select searchable={false} backspaceRemoves={false} clearable={false} value={timespanType} onChange={this.props.onChangeTimespan} options={timespanTypes.map((timespan) => {
              return {value: timespan, label: timespan};
            })}/>
          </div>
        </div>
        <div className="timeline-content">
          <PriceTimelineLineGraph timeline={activeTimeline} timespanType={timespanType}/>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => ({
  activeTimeline: getActiveTimeline(state, ownProps.id, ownProps.timespanType)
});
export default connect(mapStateToProps, priceActions)(Timeline);
