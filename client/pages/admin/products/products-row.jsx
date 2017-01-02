import React, {Component} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import * as productActions from '../../../actions/product-action';
import moment from 'moment';

import './styles/products-row.scss';

const ProductsRow = (props) => {
  const {
    index,
    id,
    name,
    priceHistory,
    active,
    createdDate,
    modifiedDate
  } = props;
  const type = +index % 2 === 0
    ? ' even '
    : ' odd ';
  const priceText = priceHistory.length == 0
    ? 'No price'
    : `\u20BA${priceHistory[0].price} / ${priceHistory[0].unit}`;
  const status = active
    ? 'Active'
    : 'Inactive';
  const updateDate = modifiedDate || createdDate;
  return (
    <tr className={`products-row ${type}`}>
      <td>
        <Link to={`/admin/product/${id}`}>{name}</Link>
        <div className="products-row-id">
          {id}
        </div>
      </td>
      <td>{status}</td>
      <td>{priceText}</td>
      <td>{moment(updateDate).format('DD-MM-YYYY, hh:mm')}</td>
      <td>
        <div className="action-buttons-container">
          <button onClick={e => {
            props.deleteProduct(id);
          }}>
            <i className="material-icons">delete</i>
          </button>
        </div>
      </td>
    </tr>
  );
}
export default connect(null, productActions)(ProductsRow);
