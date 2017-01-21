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
    modifiedDate,
    isDeleteSectionOpen,
    onOpenDeleteSection,
    onCloseDeleteSection,
    deleteProduct
  } = props;

  const priceText = priceHistory.length == 0
    ? 'No price'
    : `\u20BA${priceHistory[0].price} / ${priceHistory[0].unit}`;
  const status = active
    ? 'active'
    : 'inactive';
  const updateDate = modifiedDate || createdDate;
  const _renderActions = () => {
    if (!isDeleteSectionOpen) {
      return (
        <div className="action-buttons-container">

          <button onClick={() => onOpenDeleteSection(id)}>
            <i className="material-icons">delete</i>
          </button>
          <button onClick={() => props.duplicateProduct(id)}>
            <i className="material-icons">content_copy</i>
          </button>
        </div>
      );
    } else {
      return (
        <div className="delete-section">
          {'Delete product ?'}
          <div>
            <button className="pure-button  button-primary valign-center" onClick={() => deleteProduct(id)}>Delete</button>
            <button className="pure-button" onClick={() => onCloseDeleteSection()}>Cancel</button>
          </div>
        </div>
      )
    }
  };
  return (
    <tr className={`admin--products-row ${status}`}>
      <td>
        <Link to={`/admin/product/${id}`}>{name}</Link>
      </td>
      <td>{priceText}</td>
      <td className="products-update-date">{moment(updateDate).format('DD-MM-YYYY, hh:mm')}</td>
      <td>
        {_renderActions()}
      </td>
    </tr>
  );
}
export default connect(null, productActions)(ProductsRow);
