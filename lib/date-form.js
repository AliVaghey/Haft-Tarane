export const DateForm = (date) => {
  if (!date) {
    return null;
  }
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;
};

export const baseDateForm = (date) => {
  if (!date) {
    return null;
  }
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
};
