import React from 'react';
import {browserHistory} from 'react-router';
import './styles/contact-header.scss';

const ContactHeader = () => {
  const handleGotoHome = () => {
    browserHistory.push('/');
  };
  return (
    <div className="contact-header-container">
      <div className="contact-header--fixed mdc-elevation--z4">
        <div className="contact-header-primary__content">
          <div className="contact-header-action__button" onClick={() => handleGotoHome()}>
            <i className="material-icons">home</i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactHeader;
