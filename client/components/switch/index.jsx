import React from 'react';
import classNames from 'classnames';
import './styles/index.scss';

const Switch = (props) => {
  const isActive = props.active;

  return (
    <div className="switch-container" onClick={() => {
      props.onClickSwitch(!isActive);
    }}>
      <div className={classNames('Switch', {
        On: isActive
      }, {
        Off: !isActive
      })}>
        <div className="Toggle">{isActive
            ? 'On'
            : 'Off'}</div>
        <span className="On"></span>
        <span className="Off"></span>
      </div>
    </div>
  );
};
Switch.propTypes = {
  active: React.PropTypes.bool,
  onClickSwitch: React.PropTypes.func
};
Switch.defaultProps = {
  active: false,
  onClickSwitch: () => {}
};
export default Switch;
