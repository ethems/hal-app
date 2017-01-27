import React from 'react';
import moment from 'moment';
import './styles/index-footer.scss';

const IndexFooter = () => (
  <div className="index-footer-container">
    <div className="index-footer-copyright-section">Copyright © {moment().format('YYYY')} Halcyoon</div>
  </div>
);

export default IndexFooter;
