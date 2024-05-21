import { format } from "date-fns-jalali";

export const jaliliDate = (createdAt) => {
  if (!createdAt) {
    return null;
  }
  return format(new Date(createdAt), "yyyy/MM/dd");
};
