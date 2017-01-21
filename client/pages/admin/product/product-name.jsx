import React, {Component} from 'react';
import enhanceWithClickOutside from 'react-click-outside';
import classNames from 'classnames';

import './styles/product-name.scss';

class ProductName extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpened: !!!props.id
    };
  }
  componentWillReceiveProps(nextProps) {
    const {id} = this.props;
    if (nextProps.id !== id) {
      this.setState({
        isOpened: !!!nextProps.id
      });
    }
  }
  onClickNameLabel = () => {
    this.setState({isOpened: true});
  }
  handleClickOutside() {
    this.setState({isOpened: false});
  }
  render() {
    const {name, onChangeName} = this.props;
    const {isOpened} = this.state;
    const hide = isOpened || !name;
    return (
      <div className="product-name-container">
        <div className={classNames('product-name-label', {hide})} onClick={() => this.onClickNameLabel()}>{name || ''}</div>
        <input className={classNames('product-name', {
          hide: !hide
        })} value={name || ''} onChange={event => onChangeName(event)}/>
      </div>
    );
  }
}

export default enhanceWithClickOutside(ProductName);
