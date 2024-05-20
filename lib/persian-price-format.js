export const persianPriceFormat = (price) => {
  if (!price) {
    return null;
  }
  const formattedPrice = price.toLocaleString("fa-IR", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
  return formattedPrice;
};
