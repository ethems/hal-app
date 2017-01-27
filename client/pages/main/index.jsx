import React, {Component} from 'react';
import MainProductsTable from './products-table';
import IndexHeader from './index-header';
import IndexFooter from './index-footer';
import ProductTimelineGraph from './product-timeline-graph';
import './styles/index.scss';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      timelineProductId: undefined
    };
  }
  handleChangeSeachText = (searchText) => {
    this.setState({searchText});
  }
  handleChangeTimelineProductId = (timelineProductId) => {
    this.setState({timelineProductId});
  }
  render() {
    const {searchText, timelineProductId} = this.state;
    return (
      <div className="index-container">
        <div className="index-header-wrapper">
          <IndexHeader searchText={searchText} onChangeSearchText={this.handleChangeSeachText}/>
        </div>
        <div className="index-content-container">
          <div className="product-table-wrapper"><MainProductsTable searchText={searchText} onChangeTimelineProductId={this.handleChangeTimelineProductId}/></div>
          <div className="graph-wrapper">
            <ProductTimelineGraph timelineProductId={timelineProductId}/>
          </div>
        </div>
        <div className="index-footer-wrapper">
          <IndexFooter/>
        </div>
      </div>
    );
  }
}

export default Main;
