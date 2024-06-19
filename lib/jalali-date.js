import { format, isDate } from "date-fns-jalali";

function isValidDate(date) {
  const newDate = new Date(date);
  return !isNaN(newDate);
}

export const jaliliDate = (date) => {
  console.log("date", date);
  console.log("jalali-date", isDate(date));
  if (!date) {
    return null;
  }

  if (isValidDate(date)) {
    return format(new Date(date), "yyyy/MM/dd");
  } else {
    return date;
  }
};

export const jaliliDateHour = (date) => {
  if (!date) {
    return null;
  }

  console.log("isDate(date", isDate(date));

  if (isValidDate(date)) {
    return format(new Date(date), "yyyy/MM/dd HH:mm");
  } else {
    return date;
  }
};
