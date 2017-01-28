import React from 'react';
import './styles/index.scss';

const CircularLoadingPanel = (props) => {
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
CircularLoadingPanel.propTypes = {
  width: React.PropTypes.number,
  strokeWidth: React.PropTypes.number,
  strokeMiterlimit: React.PropTypes.number
};
CircularLoadingPanel.defaultProps = {
  width: 100,
  strokeWidth: 2,
  strokeMiterlimit: 10
};
export default CircularLoadingPanel;
