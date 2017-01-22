import React, {Component} from 'react';
import Sticky from '../../components/sticky';
import './styles/index-header.scss';

class IndexHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      state: props.searchText === ''
        ? 'view'
        : 'search'
    };
  }
  _changeState = (state) => {
    if (state === 'view') {
      this.props.onChangeSearchText('');
    }
    this.setState({state});
  }
  _renderState() {
    const {state} = this.state;
    const {searchText} = this.props;
    switch (state) {
      case 'view':
        return (
          <div className="index-header-actions__button-container">
            <div className="index-header-action__button" onClick={() => this._changeState('search')}>
              <i className="material-icons">search</i>
            </div>
          </div>
        );
      case 'search':
        return (
          <div className="index-header-actions__search-container">
            <div className="index-header-action__button" onClick={() => this._changeState('view')}>
              <i className="material-icons">keyboard_backspace</i>
            </div>
            <div className="mdc-textfield mdc-textfield--fullwidth index-header-action__search">
              <input className="mdc-textfield__input" value={searchText} placeholder="Urun Ara" onChange={e => this.props.onChangeSearchText(e.target.value)}/>
            </div>
          </div>
        );
      default:
        return (
          <div className="index-header-actions__button-container">
            <div className="index-header-action__button" onClick={() => this._changeState('search')}>
              <i className="material-icons">search</i>
            </div>
          </div>
        );
    }
  }
  render() {
    return (
      <div className="index-header-container">
        <div className="index-header--fixed mdc-elevation--z4">
          {this._renderState()}
        </div>
        <Sticky className="index-secondary-header" enter="30"></Sticky>
      </div>
    );
  }
}

export default IndexHeader;
