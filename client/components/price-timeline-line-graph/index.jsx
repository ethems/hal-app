import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import * as d3 from 'd3';

import './styles/index.scss';

class PriceTimelineLineGraph extends Component {
  componentDidMount() {
    const {timeline} = this.props;
    const chartContainerDOM = ReactDOM.findDOMNode(this._chartContainer);
    const {clientWidth, clientHeight} = chartContainerDOM;
    this.setState({width: clientWidth, height: clientHeight});
    this._createGraph(chartContainerDOM, {
      width: clientWidth,
      height: clientHeight
    });
    (timeline && timeline.prices)
      ? this._updateGraph(chartContainerDOM, {
        width: clientWidth,
        height: clientHeight,
        prices: timeline.prices,
        timespanType: timeline.timespanType
      })
      : this._renderEmpty();
  }
  componentDidUpdate(prevProps, prevState) {
    const chartContainerDOM = ReactDOM.findDOMNode(this._chartContainer);
    const {timeline} = this.props;
    const {width, height} = this.state;
    (timeline && timeline.prices)
      ? this._updateGraph(chartContainerDOM, {
        width,
        height,
        prices: timeline.prices,
        timespanType: timeline.timespanType
      })
      : this._renderEmpty();
  }
  _createGraph(el, props) {
    d3.select(el).append('svg').attr('width', props.width).attr('height', props.height).attr('class', 'svg-container');
  }
  _updateGraph(el, props) {
    const {padding} = this.props;
    const {timespanType, prices, width, height} = props;
    // SCALES
    const xScale = d3.scaleLinear().domain([
      d3.min(prices, price => new Date(price.startDate)),
      d3.max(prices, price => new Date(price.startDate))
    ]).range([
      padding, width - padding
    ]);
    const yScale = d3.scaleLinear().domain([
      Math.floor(d3.min(prices, price => price.price)),
      Math.ceil(d3.max(prices, price => price.price))
    ]).range([
      height - padding,
      padding
    ]);
    // LABELS
    // d3.select(el).selectAll('.svg-container').selectAll('text').data(prices).enter().append('text').text(d=>d.price).attr('class', 'line-label').attr('x', d => xScale(new Date(d.startDate))).attr('y', d => yScale(d.price))
    // .attr('transform', `translate(${-20},${-10})`);
    // AXIS
    //  YAXIS
    const yAxis = d3.axisRight(yScale);
    yAxis.tickSize(width - (padding));
    yAxis.ticks(4);
    const gy = d3.select(el).selectAll('.svg-container').append('g').call(yAxis).attr('class', 'yaxis-container').attr('transform', `translate(${padding},0)`);
    gy.selectAll('line').attr('class', 'yaxis-line')
    gy.selectAll('text').attr('class', 'yaxis-text').attr('x', -(padding));
    //  XAXIS
    const xAxis = d3.axisBottom(xScale);
    xAxis.tickFormat(d3.timeFormat('%H:%M'));
    const gx = d3.select(el).selectAll('.svg-container').append('g').call(xAxis).attr('class', 'xaxis-container').attr('transform', `translate(0,${height - padding})`);
    // LINE
    const lineFun = d3.line().x(d => xScale(new Date(d.startDate))).y(d => yScale(d.price));
    d3.select(el).selectAll('.svg-container').append('path').attr('d', lineFun(prices)).attr('class', 'line-container');
    // LABELS
    d3.select(el).selectAll('.svg-container').selectAll('.label-container').data(prices).enter().append('text').attr('class', 'label-container').text(d => d.price).attr('x', d => xScale(new Date(d.startDate))).attr('y', d => yScale(d.price)).attr('transform', `translate(${ - 20},${ - 10})`);
  }
  _renderEmpty() {}
  render() {
    return (
      <div className="price-timeline-line-graph-container" ref={(c) => this._chartContainer = c}></div>
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
