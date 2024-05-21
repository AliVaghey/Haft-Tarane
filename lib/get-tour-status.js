export const getTourStatus = (status) => {
  switch (status) {
    case "active":
      return <span className="font-medium text-green-500">فعال</span>;
    case "pending":
      return <span className="font-medium text-primary">در انتظار تایید</span>;
    case "rejected":
      return <span className="font-medium text-red-primary">رد شده</span>;
    case "expired":
      return <span className="font-medium text-teal-500">تمام شده</span>;
    case "draft":
      return <span className="font-medium text-blue-500">پیش نویس</span>;

    default:
      return null;
  }
};
