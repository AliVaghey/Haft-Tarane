import { format } from "date-fns-jalali";

export const jaliliDate = (createdAt) => {
  return format(new Date(createdAt), "yyyy/MM/dd");
};
