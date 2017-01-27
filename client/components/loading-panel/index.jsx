import React from 'react';
import './styles/index.scss';

const LoadingPanel = (props) => {
  const {width, strokeWidth, strokeMiterlimit} = props;
  const style = {
    width
  }
  return (
    <div className="loader" style={style}>
      <svg className="circular" viewBox="25 25 50 50">
        <circle className="path" cx="50" cy="50" r="20" fill="none" strokeWidth={strokeWidth} strokeMiterlimit={strokeMiterlimit}/>
      </svg>
    </div>
  );
};
LoadingPanel.propTypes = {
  width: React.PropTypes.number,
  strokeWidth: React.PropTypes.number,
  strokeMiterlimit: React.PropTypes.number
};
LoadingPanel.defaultProps = {
  width: 100,
  strokeWidth: 2,
  strokeMiterlimit: 10
};
export default LoadingPanel;
