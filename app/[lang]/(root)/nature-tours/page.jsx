"use client";

import LoadingChita from "@/components/loading-chita";
import NoItem from "@/components/no-item";
import TourCard from "@/components/pages/tour-card";
import TourFilters from "@/components/pages/tour-filters";
import TourSearch from "@/components/pages/tour-search";
import TourSort from "@/components/pages/tour-sort";
import PaginationComponent from "@/components/pagination";
import { Separator } from "@/components/ui/separator";
import { airplain, nature } from "@/constants/images";
import { axios } from "@/lib/axios";
import { useDictionary } from "@/providers/dictionary-provider";
import Image from "next/image";
import { useEffect, useState } from "react";

const TourPage = ({
  searchParams: { page, all, origin, destination, start, end },
}) => {
  const dictionary = useDictionary();

  const [data, setData] = useState([]);
  const [similarData, setSimilarData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const checkSearchParams = !origin && !destination && !start && !end;

  useEffect(() => {
    fetchData();
  }, [page, all, destination, start, end]);

  const fetchData = async () => {
    setIsLoading(true);

    const url = () => {
      if (checkSearchParams) {
        return `/api/tours/nature?all=true&page=${page || 1}`;
      } else {
        return `/api/tours/nature?page=${page || 1}&origin=${origin}&destination=${destination}&start=${start}&end=${end}`;
      }
    };

    setTimeout(async () => {
      await axios
        .get(url())
        .then((response) => {
          setData(response.data);
        })
        .catch((err) => {
          console.log("getToursErrrrrrrrrrrrrrrrrrrrr", err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }, 1000);

    if (!checkSearchParams) {
      await fetchSimilarData();
    }
  };

  const fetchSimilarData = async () => {
    const url = () => {
      return `/api/close-dates?origin=${origin}&destination=${destination}&start=${start}`;
    };

    setTimeout(async () => {
      console.log("first");
      await axios
        .get(url())
        .then((response) => {
          setSimilarData(response.data);
        })
        .catch((err) => {
          console.log("getToursErrrrrrrrrrrrrrrrrrrrr", err);
        })
        .finally(() => {});
    }, 1000);
  };

  const onFilter = (filteredData) => {
    setData({ ...data, data: filteredData });
  };

  return (
    <main>
      <div className="min-h-80 bg-yellow-primary pt-16">
        <>
          <div>
            <Image
              src={nature}
              alt="airolane"
              width={200}
              height={100}
              className="h-72 w-screen object-cover"
            />
          </div>
          <div className="flex">
            <div className="hidden h-fit w-[27%] p-2 lg:flex">
              {!isLoading && <TourFilters data={data} onFilter={onFilter} />}
            </div>

            <div className="lg:[53%] w-full">
              <div>
                <TourSearch
                  currentSearchParams={{
                    page,
                    all,
                    origin,
                    destination,
                    start,
                    end,
                  }}
                />
              </div>
              <div className="mt-10">
                <div className="mb-3 w-full">
                  {!isLoading && <TourSort data={data} onFilter={onFilter} />}
                </div>
                {!isLoading ? (
                  data.data && data.data.length > 0 ? (
                    <>
                      <div className="mx-auto flex w-full flex-col gap-3 ">
                        {data.data.map((item, index) => (
                          <TourCard data={item} key={index} />
                        ))}
                      </div>

                      {checkSearchParams && (
                        <div className="pb-8 pt-3">
                          <PaginationComponent
                            total={data?.meta?.total || 0}
                            page={data?.meta?.current_page || 1}
                            perPage={data?.meta?.per_page || 10}
                          />
                        </div>
                      )}
                    </>
                  ) : (
                    <div>
                      {/* <NoItem /> */}
                      <p className="mx-auto text-center">
                        در تاریخی که شما جستوجو کردید توری یافت نشد
                      </p>
                    </div>
                  )
                ) : (
                  // <LoadingPage />
                  <LoadingChita />
                )}
              </div>
            </div>

            <div className="hidden w-[20%] lg:flex"></div>
          </div>
        </>
      </div>

      <div className="mt-3 bg-yellow-primary">
        <div className="flex">
          <div className="hidden h-fit w-[27%] p-2 lg:flex"></div>

          {!checkSearchParams && (
            <div className="lg:[53%] w-full">
              <span className="mt-5 font-semibold">تاریخ های مشابه</span>
              <Separator className=" mb-5 mt-2 bg-yellow-light" />
              <div>
                {!isLoading ? (
                  similarData.data && similarData.data.length > 0 ? (
                    <div className="mx-auto mb-5 flex w-full flex-col gap-3">
                      {similarData.data.map((item, index) => (
                        <TourCard data={item} key={index} />
                      ))}
                    </div>
                  ) : (
                    <div>
                      <NoItem />
                    </div>
                  )
                ) : (
                  // <LoadingPage />
                  <LoadingChita />
                )}
              </div>
            </div>
          )}

          <div className="hidden w-[20%] lg:flex"></div>
        </div>
      </div>
    </main>
  );
};

export default TourPage;
