import { format } from "date-fns-jalali";

export const jaliliDate = (date) => {
  if (!date) {
    return null;
  }
  return format(new Date(date), "yyyy/MM/dd");
};

export const jaliliDateHour = (date) => {
  if (!date) {
    return null;
  }
  return format(new Date(date), "yyyy/MM/dd HH:mm");
};
