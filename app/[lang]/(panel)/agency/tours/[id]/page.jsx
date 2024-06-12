"use client";

import { pinkPlain } from "@/constants/images";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ToastError from "@/components/toast/toast-error";
import { useEffect, useState } from "react";
import { axios } from "@/lib/axios";
import LoadingPage from "@/components/loading-page";
import DetailsBasicInformation from "@/components/tour-details/basic-information";
import DetailsTourPlan from "@/components/tour-details/tour-plan";
import DetailsDocuments from "@/components/tour-details/documents";
import DetailsHotels from "@/components/tour-details/hotel";
import DetailsDates from "@/components/tour-details/dates";
import { toast } from "sonner";

const TourDetailsPage = ({ params }) => {
  const [data, setData] = useState({});

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchDefaultData();
  }, []);

  const fetchDefaultData = async () => {
    setIsLoading(true);
    await axios
      .get(`/api/agency/tour/${params.id}`)
      .then((response) => {
        console.log("response", response);
        setData(response.data.data);
      })
      .catch((error) => {
        toast.error(
          <ToastError
            text={
              error?.response?.data?.message ||
              defaultMessages.errors.internalError
            }
          />,
        );
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  console.log("data", data);

  return (
    <div className="relative min-h-[80vh] bg-primary pt-24">
      {/* <Image
        src={effect3}
        width={150}
        height={250}
        alt="effect"
        className="absolute -right-10 bottom-0 h-60 w-60"
      /> */}
      <div className="flex gap-2 px-2">
        <div className="w-full">
          <Tabs defaultValue="basic-information" className="w-full" dir="rtl">
            <TabsList className="flex h-fit w-fit flex-col gap-2 md:flex-row">
              <TabsTrigger
                value="basic-information"
                className="mx-2 bg-yellow-dark px-6"
              >
                مشخصات اصلی
              </TabsTrigger>
              <TabsTrigger
                value="tour-plan"
                className="mx-2 bg-yellow-dark px-6"
              >
                برنامه سفر
              </TabsTrigger>
              <TabsTrigger
                value="documents"
                className="mx-2 bg-yellow-dark px-6"
              >
                مدارک
              </TabsTrigger>
              <TabsTrigger value="hotels" className="mx-2 bg-yellow-dark px-6">
                اقامت
              </TabsTrigger>
              <TabsTrigger value="dates" className="mx-2 bg-yellow-dark px-6">
                تاریخ ها
              </TabsTrigger>
            </TabsList>
            <TabsContent value="basic-information">
              {isLoading ? (
                <div className="h-96 rounded-lg bg-white">
                  <LoadingPage />
                </div>
              ) : (
                <DetailsBasicInformation data={data} />
              )}
            </TabsContent>
            <TabsContent value="tour-plan">
              {isLoading ? (
                <div className="h-96 rounded-lg bg-white">
                  <LoadingPage />
                </div>
              ) : (
                <DetailsTourPlan data={data.transportations} />
              )}
            </TabsContent>
            <TabsContent value="documents">
              {isLoading ? (
                <div className="h-96 rounded-lg bg-white">
                  <LoadingPage />
                </div>
              ) : (
                <DetailsDocuments data={data.certificate} />
              )}
            </TabsContent>
            <TabsContent value="hotels">
              {isLoading ? (
                <div className="h-96 rounded-lg bg-white">
                  <LoadingPage />
                </div>
              ) : (
                <DetailsHotels data={data.costs} />
              )}
            </TabsContent>
            <TabsContent value="dates">
              {isLoading ? (
                <div className="h-96 rounded-lg bg-white">
                  <LoadingPage />
                </div>
              ) : (
                <DetailsDates data={data.dates} />
              )}
            </TabsContent>
          </Tabs>
        </div>
        {/* <div className="relative hidden flex-1 items-center justify-center lg:flex">
          <Image
            src={pinkPlain}
            width={480}
            height={360}
            alt="effect"
            className="z-10 mx-auto h-80 w-3/4"
          />
        </div> */}
      </div>
    </div>
  );
};

export default TourDetailsPage;
