const mbConventer = (item) => {
  const mb = item / 1000000;
  return `${mb.toFixed(2)}MB`;
};

export default mbConventer;
