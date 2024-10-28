"use client";

import { DataTable } from "@/components/ui/data-table";
import { columns } from "./components/columns";
import { useEffect, useState } from "react";
import LoadingPage from "@/components/loading-page";
import { axios } from "@/lib/axios";
import DataTableHeader from "@/components/data-table-header";
import { useDictionary } from "@/providers/dictionary-provider";
import PaginationComponent from "@/components/pagination";
import { routes } from "@/routes/routes";
import { useTour } from "@/hooks/use-tour";

const HotelPage = ({ searchParams: { page, name, country, state, city } }) => {
  const dictionary = useDictionary();

  const tourHook = useTour();

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchHotels();
  }, [page, name, country, state, city, tourHook.flag]);

  const fetchHotels = async () => {
    setIsLoading(true);

    await axios
      .get(
        `/api/admin/my-hotels?page=${page || 1}&name=${name || ""}&country=${country || ""}&state=${state || ""}&city=${city || ""}`,
      )
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => {
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  return (
    <div className="px-0 lg:px-10">
      <DataTableHeader
        title="هتل های شما"
        description="لیست تمامی هتل شما"
        btnText="افزودن هتل"
        href={routes.admin["your-hotels"].add}
      />

      {isLoading ? (
        <LoadingPage />
      ) : (
        <>
          <DataTable columns={columns} data={data.data} />
          <PaginationComponent
            total={data?.meta?.total || 0}
            page={data?.meta?.current_page || 1}
            perPage={data?.meta?.per_page || 10}
          />
        </>
      )}
    </div>
  );
};

export default HotelPage;
