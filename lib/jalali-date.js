import { format, isDate } from "date-fns-jalali";

export const jaliliDate = (date) => {
  console.log("jalali-data", date);
  if (!date) {
    return null;
  }

  if (isDate(date)) {
    return format(new Date(date), "yyyy/MM/dd");
  } else {
    return date;
  }
};

export const jaliliDateHour = (date) => {
  if (!date) {
    return null;
  }

  if (isDate(date)) {
    return format(new Date(date), "yyyy/MM/dd HH:mm");
  } else {
    return date;
  }
};
