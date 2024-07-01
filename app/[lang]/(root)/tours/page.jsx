"use client";

import LoadingChita from "@/components/loading-chita";
import NoItem from "@/components/no-item";
import TourCard from "@/components/pages/tour-card";
import TourSearch from "@/components/pages/tour-search";
import PaginationComponent from "@/components/pagination";
import { airplain } from "@/constants/images";
import { axios } from "@/lib/axios";
import { useDictionary } from "@/providers/dictionary-provider";
import Image from "next/image";
import { useEffect, useState } from "react";

const TourPage = ({
  searchParams: { page, all, origin, destination, start, end },
}) => {
  const dictionary = useDictionary();

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, [page, all, destination, start, end]);

  const fetchData = async () => {
    setIsLoading(true);

    const url = () => {
      if (!origin && !destination && !start && !end) {
        return `/api/tours?all=true&page=${page || 1}`;
      } else {
        return `/api/tours?page=${page || 1}&origin=${origin}&destination=${destination}&start=${start}&end=${end}`;
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
  };

  return (
    <main>
      <div className="min-h-screen bg-primary pt-16">
        <>
          <div>
            <Image
              src={airplain}
              alt="airolane"
              width={200}
              height={100}
              className="h-60 w-screen object-cover"
            />
          </div>
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
          <div>
            {!isLoading ? (
              data.data && data.data.length > 0 ? (
                <>
                  <div className="mx-auto flex w-full flex-col gap-3 md:w-3/4 lg:w-2/3">
                    {data.data.map((item, index) => (
                      <TourCard data={item} key={index} />
                    ))}
                  </div>

                  <div className="pb-8 pt-3">
                    <PaginationComponent
                      total={data?.meta?.total || 0}
                      page={data?.meta?.current_page || 1}
                      perPage={data?.meta?.per_page || 10}
                    />
                  </div>
                </>
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
        </>
      </div>
    </main>
  );
};

export default TourPage;
