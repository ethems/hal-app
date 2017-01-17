const calculatePriceRate = (props) => {
  const oldPrice = props.oldPrice && props.oldPrice.price;
  const newPrice = props.newPrice && props.newPrice.price;
  if (oldPrice && newPrice) {
    const result = ((newPrice / oldPrice) - 1) * 100;
    return result.toFixed(1);
  }
  return 0;
};

const MathUtil = {
  calculatePriceRate
};

module.exports = MathUtil;
