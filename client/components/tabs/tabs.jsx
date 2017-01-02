import React, {Component} from 'react';

import './styles/tabs.scss';

class Tabs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: props.selected
    };
  }
  handleClick = (index, event) => {
    event.preventDefault();
    this.setState({selected: index});
  };
  _renderTitles() {
    return (
      <ul className="tabs__labels">
        {this.props.children.map((child, index) => {
          const activeClass = (this.state.selected === index
            ? 'active'
            : '');
          return (
            <li key={index} className={activeClass} onClick={(e) => {
              this.handleClick(index, e);
            }}>
              <a href="#">
                {child.props.label}
              </a>
            </li>
          );
        })}
      </ul>
    );
  }
  _renderContent() {
    const {selected} = this.state;
    return (
      <div className="tabs__content">
        {this.props.children[selected]}
      </div>
    );
  }
  render() {
    const {searchText} = this.state;
    return (
      <div className="tabs">
        {this._renderTitles()}
        {this._renderContent()}
      </div>
    );
  }
}
Tabs.propTypes = {
  selected: React.PropTypes.number,
  children: React.PropTypes.oneOfType([React.PropTypes.array, React.PropTypes.element]).isRequired
};
Tabs.defaultProps = {
  selected: 0
};
export default Tabs;
