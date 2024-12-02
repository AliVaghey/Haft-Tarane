"use client";

import ToastError from "@/components/toast/toast-error";
import LoadingPage from "@/components/loading-page";
import { useEffect, useState } from "react";
import { axios } from "@/lib/axios";
import { toast } from "sonner";
import { jaliliDate } from "@/lib/jalali-date";
import { farsiNumber } from "@/lib/farsi-number";
import Link from "next/link";

const EditCityPage = ({ params }) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchDefaultData();
  }, []);

  const fetchDefaultData = async () => {
    setIsLoading(true);
    await axios
      .get(`/api/user/plane/tickets/${params.id}`)
      .then((response) => {
        setData(response.data.data);
      })
      .catch((error) => {
        toast.error(
          <ToastError
            text={
              error?.response?.data?.message ||
              "An error occurred. Please try again."
            }
          />
        );
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  if (isLoading) {
    return <LoadingPage />;
  }

  if (!data) {
    return <div className="text-center text-yellow-600">No data available</div>;
  }

  const { flightInfo, passengers, total_price, status, voucher,buy_ticket_results } = data;

  return (
    <div className="h-full bg-yellow-50 p-4">
  <div className="max-w-3xl mx-auto bg-yellow-100 rounded-lg shadow-lg p-6">
    <h1 className="text-2xl font-bold text-yellow-700 mb-4">
      جزئیات پرواز
    </h1>
    <div className="mb-6">
      <h2 className="text-lg font-semibold text-yellow-800">اطلاعات پرواز</h2>
      <p>
        <strong>مبدا:</strong> {flightInfo.from} -{" "}
        <strong>مقصد:</strong> {flightInfo.to}
      </p>
      <p>
        <strong>تاریخ:</strong> {farsiNumber(jaliliDate( flightInfo.date_flight))} |{" "}
        <strong>ساعت:</strong> {farsiNumber(flightInfo.time_flight)}
      </p>
      <p>
        <strong>خط هوایی:</strong> {flightInfo.airline} |{" "}
        <strong>شماره پرواز:</strong> {flightInfo.number_flight}
      </p>
      <p>
        <strong>نوع پرواز:</strong> {flightInfo.type_flight} |{" "}
        <strong>هواپیما:</strong> {flightInfo.carrier}
      </p>
      {/* <p>
        <strong>ظرفیت:</strong> {flightInfo.capacity} صندلی باقی‌مانده
      </p> */}
    </div>
    <div className="mb-6">
      <h2 className="text-lg font-semibold text-yellow-800">مسافران</h2>
      {passengers.map((passenger, index) => (
        <div key={index} className="p-2 bg-yellow-200 rounded-md mb-2">
          <p>
            <strong>نام:</strong> {passenger.firstname_fa}{" "}
            {passenger.lastname_fa}
          </p>
          <p>
            <strong>نوع:</strong> {passenger.type} |{" "}
            <strong>جنسیت:</strong> {passenger.gender === "male" ? "مرد" : "زن"}
          </p>
          <p>
            <strong>ملیت:</strong> {passenger.nationality_code} |{" "}
            <strong>کد مسافر:</strong> {passenger.passenger_code}
          </p>
        </div>
      ))}
    </div>
    <div className="mb-6">
      <h2 className="text-lg font-semibold text-yellow-800">خلاصه</h2>
      <p>
        <strong>مبلغ کل:</strong> {new Intl.NumberFormat("fa-IR").format(
                  +total_price,
                )}
                تومان 
      </p>
      <p>
        <strong>وضعیت:</strong> {status === "canceled" ? "لغو شده" : "فعال"}
      </p>
      <p>
        <strong>ووچر:</strong> {voucher}
      </p>
      {buy_ticket_results && <Link href={buy_ticket_results}>
        <strong>دانلود</strong>
      </Link>}
    </div>
  </div>
</div>

  );
};

export default EditCityPage;
