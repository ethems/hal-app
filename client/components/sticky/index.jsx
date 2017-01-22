import React from 'react';
import ReactDOM from 'react-dom';

import './styles/index.scss';

class Sticky extends React.Component {
  componentDidMount() {
    const setInitialHeights = (element) => {
      element.setAttribute('data-sticky-initial', element.getBoundingClientRect().top);
    };

    const stickyContainerDOM = ReactDOM.findDOMNode(this._stickyContainer);
    setInitialHeights(stickyContainerDOM);
    var el = document.querySelectorAll('.app-container')[0];
    $(el).bind('scroll', function() {
      const container = $(this)[0];
      const top = container.scrollTop;
      const bottom = container.scrollHeight;

      const stickyInitial = parseInt(stickyContainerDOM.getAttribute('data-sticky-initial'), 10);
      const stickyEnter = parseInt(stickyContainerDOM.getAttribute('data-sticky-enter'), 10) || stickyInitial;
      const stickyExit = parseInt(stickyContainerDOM.getAttribute('data-sticky-exit'), 10) || bottom;
      if (top >= stickyEnter && top <= stickyExit) {
        $(stickyContainerDOM).addClass('sticky');
      } else {
        $(stickyContainerDOM).removeClass('sticky');
      }

    });
  }
  render() {
    const {className, enter, exit, children} = this.props;
    return (
      <div className={`${className}`} ref={c => this._stickyContainer = c} data-sticky-enter={enter} data-sticky-exit={exit}>
        {children}
      </div>
    );
  }
}

Sticky.propTypes = {
  className: React.PropTypes.string,
  enter: React.PropTypes.string,
  exit: React.PropTypes.string,
  children: React.PropTypes.node
};

export default Sticky;
