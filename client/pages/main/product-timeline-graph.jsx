import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as priceActions from '../../actions/price-action';
import PriceTimelineLineGraph from '../../components/price-timeline-line-graph';
import {getActiveTimeline} from '../../reducers/price-timelines';
import classNames from 'classnames';

import './styles/product-timeline-graph.scss';

class TimelineGraph extends Component {
  constructor(props) {
    super(props);
    const {timelineProductId} = props;
    const timespanType = 'daily';
    if (timelineProductId) {
      props.getPriceTimelines(timelineProductId, timespanType);
    }
    this.state = {
      timespanType
    }
  }
  componentWillReceiveProps(nextProps) {
    const {timelineProductId} = nextProps;
    if (timelineProductId !== this.props.timelineProductId) {
      const timespanType = 'daily';
      this.props.getPriceTimelines(timelineProductId, timespanType);
      this.setState({timespanType});
    }
  }
  handleChangeTimespanType = (timespanType) => {
    const {timelineProductId} = this.props;
    if (this.state.timespanType !== timespanType && timelineProductId) {
      this.props.getPriceTimelines(timelineProductId, timespanType);
    }
    this.setState({timespanType});
  }
  render() {
    const {timespanType} = this.state;
    const {timelineProductId} = this.props;
    const activeTimeline = getActiveTimeline(this.props.timelines, timelineProductId, timespanType);
    return (
      <div className="product-timeline-container">
        <div className="product-timeline-header mdc-elevation--z1">
          <div className={classNames('product-timeline-header-item', {
            'active': timespanType === 'daily'
          })} onClick={() => this.handleChangeTimespanType('daily')}>Gunluk</div>
          <div className={classNames('product-timeline-header-item', {
            'active': timespanType === 'weekly'
          })} onClick={() => this.handleChangeTimespanType('weekly')}>Haftalik</div>
          <div className={classNames('product-timeline-header-item', {
            'active': timespanType === 'monthly'
          })} onClick={() => this.handleChangeTimespanType('monthly')}>Aylik</div>
        </div>
        <div className="product-timeline-content">
            <PriceTimelineLineGraph timeline={activeTimeline} timespanType={timespanType}/>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({timelines: state.priceTimelines});
export default connect(mapStateToProps, priceActions)(TimelineGraph);
