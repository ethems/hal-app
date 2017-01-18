const calculatePriceRate = (props) => {
  const oldPrice = props.oldPrice;
  const newPrice = props.newPrice;
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
