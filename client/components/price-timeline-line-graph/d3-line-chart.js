import * as d3 from 'd3';
import _ from 'lodash';
import moment from 'moment';

export default class LineChart {
  constructor(props) {
    const {
      el,
      width,
      height,
      prices,
      timespanType,
      padding
    } = props;
    if (!el) {
      throw new Error('Root element could not be found !!!');
    }
    this.el = el;
    this.width = width || 100;
    this.height = height || 100;
    this.prices = prices || [];
    this.timespanType = timespanType || 'hourly';
    this.padding = padding || 10;
    this.createGraph();
    prices && this.updateGraph();
  }
  updateProperties(props) {
    const {timespanType, prices} = props;
    prices && (this.prices = prices);
    timespanType && (this.timespanType = timespanType);
    this.cleanGraph();
    this.renderGraph();
  }
  cleanGraph() {
    d3.select(this.el).selectAll('.line-graph-svg').selectAll('*').remove();
  }
  createGraph() {
    d3.select(this.el).append('svg').attr('preserveAspectRatio', 'xMinYMin meet').attr('viewBox', `0 0 ${this.width} ${this.height}`).attr('class', 'line-graph-svg');
  }
  _renderXAxis(xScale) {
    const {height, padding, el, timespanType} = this;
    const xAxis = d3.axisBottom(xScale);
    switch (timespanType) {
      case 'daily':
        xAxis.tickFormat(d3.timeFormat('%H:%M'));
        break;
      case 'weekly':
        xAxis.tickFormat(d3.timeFormat('%a %d'));
        break;
      case 'monthly':
        xAxis.tickFormat(d3.timeFormat('%b %d'));
        break;
      case 'yearly':
        xAxis.tickFormat(d3.timeFormat('%B'));
        break;
      default:
        xAxis.tickFormat(d3.timeFormat('%H:%M'));
    }

    const gx = d3.select(el).selectAll('.line-graph-svg').append('g').call(xAxis).attr('class', 'line-graph-xaxis').attr('transform', `translate(0,${height - padding})`);
    gx.selectAll('line').attr('class', 'xaxis-line');
    gx.selectAll('text').attr('class', 'xaxis-text');
  }
  _renderYAxis(yScale) {
    const {width, padding, el} = this;
    const yAxis = d3.axisRight(yScale);
    yAxis.tickSize(width - (padding));
    yAxis.ticks(4);
    const gy = d3.select(el).selectAll('.line-graph-svg').append('g').call(yAxis).attr('class', 'line-graph-yaxis').attr('transform', `translate(${padding},0)`);
    gy.selectAll('line').attr('class', 'yaxis-line');
    gy.selectAll('text').attr('class', 'yaxis-text').attr('x', -(padding));
  }
  prepareData() {
    const {prices, timespanType} = this;
    switch (timespanType) {
      case 'daily':
        return prices;
      case 'weekly':
      case 'monthly':
      case 'yearly':
        {
          const timespanMap = {
            weekly: 'day',
            monthly: 'week',
            yearly: 'month'
          };
          const oldPrices = _.chain(prices.filter(price => price.active === false)).groupBy(price => moment(price.startDate).startOf(timespanMap[timespanType]).format()).map((group, day) => {
            const startDate = day;
            const lastPriceEnterSpecificDay = group.reduce((pre, cur) => new Date(pre.startDate) > new Date(cur.startDate)
              ? pre
              : cur);
            return Object.assign({}, lastPriceEnterSpecificDay, {startDate});
          }).value();
          return [
            ...oldPrices,
            ...prices.filter(price => price.active === true)
          ];
        }
      default:
        return prices;
    }
  }
  sortData(prices) {
    return _.sortBy(prices, price => new Date(price.startDate));
  }
  renderGraph() {
    const {width, height, padding, el} = this;
    const prices = this.sortData(this.prepareData());
    const xScale = d3.scaleLinear().domain([
      d3.min(prices, price => new Date(price.startDate)),
      d3.max(prices, price => new Date(price.startDate))
    ]).range([
      padding * 1.5,
      width - padding 
    ]);
    const yScale = d3.scaleLinear().domain([
      Math.floor(d3.min(prices, price => price.price)),
      Math.ceil(d3.max(prices, price => price.price))
    ]).range([
      height - padding,
      padding
    ]);
    this._renderYAxis(yScale);
    this._renderXAxis(xScale);

    // AREA
    const area = d3.area().x(d => xScale(new Date(d.startDate))).y0(height - padding).y1(d => yScale(d.price)).curve(d3.curveCatmullRom.alpha(0.5));
    d3.select(el).selectAll('.line-graph-svg').append('path').attr('d', area(prices)).attr('class', 'area-container');

    // LINE
    const lineFun = d3.line().x(d => xScale(new Date(d.startDate))).y(d => yScale(d.price)).curve(d3.curveCatmullRom.alpha(0.5));
    d3.select(el).selectAll('.line-graph-svg').append('path').attr('d', lineFun(prices)).attr('class', 'line-container');

    // LABELS
    d3.select(el).selectAll('.line-graph-svg').selectAll('.label-container').data(prices).enter().append('text').attr('class', 'label-container').text(d => d.price).attr('font-size', d => (d.active === false
      ? 11
      : 15)).attr('x', d => xScale(new Date(d.startDate))).attr('y', d => yScale(d.price)).attr('transform', `translate(${ - 10},${ - 10})`);
    d3.select(el).selectAll('.line-graph-svg').selectAll('.circle-container').data(prices).enter().append('circle').attr('class', 'circle-container').attr('r', d => (d.active === false
      ? 5
      : 7)).attr('cx', d => xScale(new Date(d.startDate))).attr('cy', d => yScale(d.price));
  }
}
