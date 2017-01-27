import React from 'react';
import './styles/products-table-empty.scss';

const MainEmptyProductTable = () => {
  const height = $(window).height();
  const divStyle = {
    height: height - 180
  };
  return (
    <div className="products-empty-table-container" style={divStyle}>
      <div className="products-empty-table__content">
        <div>
          <i className="material-icons md-100">mood_bad</i>
        </div>
        <div>Aradiginiz Urun Bulunmamaktadir.</div>
      </div>
    </div>
  );
};

export default MainEmptyProductTable;
