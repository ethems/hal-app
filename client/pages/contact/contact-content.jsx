import React from 'react';
import './styles/contact-content.scss';

const ContactContent = () => {
  return (
    <div className="contact-content-container">
      <div className="contact-content-header">
        Bizimle Iletisime Gecin
      </div>
      <div className="contact-main-content">
        <p>Halcyoon'a ilginizden dolayi tesekkur ederiz.</p>
        <p>
          Restaurant, cafe, bar, otel, catering, market ve manavların tüm meyve-sebze ihtiyaçlarını en kısa sürede ve en uygun fiyata karşılıyoruz.
          Bizimle çalışmak isteyen işletme sahipleri bizi telefonla arayarak ulaşmaları yeterlidir
        </p>
        <p>Eger satis elemanimizla konusmak isterseniz</p>
        <ul>
          <li>
            Yurtici icin +(90) 536-722-2966  arayin
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ContactContent;
