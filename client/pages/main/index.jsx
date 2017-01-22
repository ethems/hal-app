import React, {Component} from 'react';
import MainProductsTable from './products-table';
import IndexHeader from './index-header';
import './styles/index.scss';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: ''
    };
  }
  handleChangeSeachText = (searchText) => {
    this.setState({searchText});
  }
  render() {
    const {searchText} = this.state;
    return (
      <div className="index-container">
        <div className="index-header-wrapper">
          <IndexHeader searchText={searchText} onChangeSearchText={this.handleChangeSeachText}/>
        </div>
        <div className="product-table-wrapper"><MainProductsTable searchText={searchText}/></div>
        <div className="graph-wrapper">Graph</div>
      </div>
    );
  }
}

export default Main;
