export const DateForm = (date) => {
  if (!date) {
    return null;
  }
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
};
