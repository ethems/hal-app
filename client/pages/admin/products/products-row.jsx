import React, {Component} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import * as productActions from '../../../actions/product-action';

import './styles/products-row.scss';

const ProductsRow = (props) => {
  const {index, _id, name, priceHistory, active} = props;
  const type = +index % 2 === 0
    ? ' even '
    : ' odd ';
  const priceText = priceHistory.length == 0
    ? 'No price'
    : `\u20BA${priceHistory[0].price} / ${priceHistory[0].unit}`;
  const status = active
    ? 'Active'
    : 'Inactive';
  return (
    <tr className={`products-row ${type}`}>
      <td>
        <Link to={`/admin/product/${_id}`}>{name}</Link>
      </td>
      <td>{status}</td>
      <td>{priceText}</td>
      <td>
        <button onClick={e => {
          props.deleteProduct(1)
        }}>
          <i className="material-icons">delete</i>
        </button>
      </td>
    </tr>
  );
}
export default connect(null, productActions)(ProductsRow);
