"use client";

import LoadingChita from "@/components/loading-chita";
import NoItem from "@/components/no-item";
import FlightSearch from "@/components/pages/flight-search";
// import PaginationComponent from "@/components/pagination";
import { airplain } from "@/constants/images";
import { axios } from "@/lib/axios";
import { useDictionary } from "@/providers/dictionary-provider";
import Image from "next/image";
import { useEffect, useState } from "react";
import querystring from "querystring";
import FlightCard from "@/components/pages/flight-card";

const TourPage = ({ searchParams: { from, to, date } }) => {
  const dictionary = useDictionary();

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, [from, to, date]);

  const fetchData = async () => {
    setIsLoading(true);

    const url = () => {
      return `/api/flights`;
    };

    const encodedFormData = querystring.stringify({
      from,
      to,
      date,
    });

    setTimeout(async () => {
      await axios
        .post(url(), encodedFormData)
        .then((response) => {
          
          setData(response.data);
        })
        .catch((err) => {
        })
        .finally(() => {
          setIsLoading(false);
        });
    }, 1000);
  };

  return (
    <main>
      <div className="min-h-screen bg-yellow-primary pt-16">
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
            <FlightSearch
              currentSearchParams={{
                from,
                to,
                date,
              }}
            />
          </div>
          <div>
            {!isLoading ? (
              data && data.length > 0 ? (
                <>
                  <div className="mx-auto flex w-[95%] flex-col gap-3 pb-5 md:w-5/6 lg:w-4/5 xl:w-2/3">
                    {data.map((item, index) => (
                      <FlightCard data={item} key={index} />
                    ))}
                  </div>

                  {/* <div className="pb-8 pt-3">
                    <PaginationComponent
                      total={data?.meta?.total || 0}
                      page={data?.meta?.current_page || 1}
                      perPage={data?.meta?.per_page || 10}
                    />
                  </div> */}
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
