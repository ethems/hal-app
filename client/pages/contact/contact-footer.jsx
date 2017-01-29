import React from 'react';
import moment from 'moment';
import './styles/contact-footer.scss';

const ContactFooter = () => {
  return (
    <div className="contact-footer-container">
      <div className="contact-footer-copyright-section">Copyright © {moment().format('YYYY')}
        Halcyoon</div>
    </div>
  );
};

export default ContactFooter;
