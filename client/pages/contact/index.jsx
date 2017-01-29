import React from 'react';
import ContactHeader from './contact-header';
import ContactContent from './contact-content';
import ContactFooter from './contact-footer';
import './styles/index.scss';

const Contact = (props) => (
  <div className="contact-container">
    <div className="contact-header-wrapper">
      <ContactHeader/>
    </div>
    <div className="contact-content-wrapper">
      <ContactContent/>
    </div>
    <div className="contact-footer-wrapper">
      <ContactFooter/>
    </div>
  </div>
);

export default Contact;
