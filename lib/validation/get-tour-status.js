export const getTourStatus = (status) => {
  switch (status) {
    case "active":
      return <span className="font-medium text-green-500">فعال</span>;
    case "pending":
      return (
        <span className="font-medium text-yellow-500">در انتظار تایید</span>
      );
    case "rejected":
      return <span className="font-medium text-red-500">رد شده</span>;
    case "expired":
      return <span className="font-medium text-teal-500">تمام شده</span>;
    case "draft":
      return (
        <span style={{ color: "blue" }} className="font-medium">
          پیش نویس
        </span>
      );

    default:
      return null;
  }
};
