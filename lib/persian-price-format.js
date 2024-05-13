export const persianPriceFormat = (price) => {
  const formattedPrice = price.toLocaleString("fa-IR", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
  return formattedPrice;
};
