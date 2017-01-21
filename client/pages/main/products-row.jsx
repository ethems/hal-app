import React, {Component} from 'react';
import moment from 'moment';
import {connect} from 'react-redux';

import './styles/products-row.scss';

const renderRateIcon = (rate) => {
  switch (true) {
    case(+ rate > 0):
      return (
        <span className="rate__content up">
          <i className="material-icons ">arrow_drop_up</i>%&nbsp;{rate}</span>
      )
    case(+ rate < 0):
      return (
        <span className="rate__content down">
          <i className="material-icons ">arrow_drop_down</i>%&nbsp;{rate}</span>
      )
    default:
      return null;
  }
}
const renderPrice = (price) => {
  if (price) {
    const stringPrice = price.toString();
    const [integer,
      fractional] = stringPrice.split('.');
    return (
      <span>
        {integer}{fractional
          ? <sup>.{fractional}</sup>
          : null}
      </span>
    )
  }
}
const MainProductsRow = (props) => {
  const {
    id,
    name,
    priceHistory,
    rate,
    createdDate,
    modifiedDate
  } = props;
  const price = priceHistory[0].price;
  const unit = priceHistory[0].unit;
  const updateDate = modifiedDate || createdDate;
  return (
    <div className="products-row-container">
      <div className="products-row-price-section">
        <div className="price-unit__container">
          <div className="price__content">&#8378;{renderPrice(price)}</div>
          <div className="unit__content">/{unit}</div>
        </div>
        <div className="rate__container">{renderRateIcon(rate)}</div>
      </div>
      <div className="products-row__content-section">
        <div className="name-container">
          <div className="name__content">{name}</div>
        </div>
        <div className="attribute-container">
          <div className="update__content">
            <i className="material-icons md-12">schedule</i>&nbsp;{moment(updateDate).format('DD/MM hh:mm')}
          </div>
        </div>
      </div>
    </div>
  );
}
export default MainProductsRow;
