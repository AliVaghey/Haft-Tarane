export const farsiNumber = (number) => {
  if (isNaN(number)) {
    return null;
  }

  const farsiDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];

  return number.toString().replace(/\d/g, (x) => farsiDigits[x]);
};
