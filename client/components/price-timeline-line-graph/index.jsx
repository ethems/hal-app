import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import D3LineChart from './d3-line-chart';

import './styles/index.scss';

class PriceTimelineLineGraph extends Component {
  componentDidMount() {
    const {timeline, padding, timespanType} = this.props;
    const chartContainerDOM = ReactDOM.findDOMNode(this._chartContainer);
    const {clientWidth, clientHeight} = chartContainerDOM;
    this.d3LineChart = new D3LineChart({el: chartContainerDOM, width: clientWidth, height: clientHeight, padding, timespanType});
    (timeline && timeline.prices)
      ? this.d3LineChart.updateProperties({prices: timeline.prices, timespanType:timespanType})
      : this._renderEmpty();
  }
  componentDidUpdate(prevProps, prevState) {
    const {timeline, timespanType} = this.props;
    const chartContainerDOM = ReactDOM.findDOMNode(this._chartContainer);
    const {clientWidth, clientHeight} = chartContainerDOM;
     this.d3LineChart.checkDimension({width: clientWidth, height: clientHeight});
    (timeline && timeline.prices)
      ? this.d3LineChart.updateProperties({prices: timeline.prices, timespanType:timespanType})
      : this._renderEmpty();
  }
  _renderEmpty() {}
  render() {
    return (
      <div className="price-timeline-line-graph-container" ref={c => this._chartContainer = c}></div>
    );
  }
}
PriceTimelineLineGraph.propTypes = {
  timeline: React.PropTypes.shape({productId: React.PropTypes.string.isRequired, timespanType: React.PropTypes.string.isRequired, prices: React.PropTypes.array}),
  padding: React.PropTypes.number
};
PriceTimelineLineGraph.defaultProps = {
  padding: 30
};
export default PriceTimelineLineGraph;
