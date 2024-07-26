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

const BannersPage = ({ searchParams: { page } }) => {
  const dictionary = useDictionary();

  const tourHook = useTour();

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchHotels();
  }, [tourHook.flag, page]);

  const fetchHotels = async () => {
    setIsLoading(true);

    await axios
      .get(`/api/options?category=airplain_type`)
      .then((response) => {
        console.log("airplain", response.data);
        setData(response.data.data);
      })
      .catch((err) => {
        console.log("airplainError", err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  return (
    <div className="px-0 lg:px-10">
      <DataTableHeader
        title="افزودن نوع هواپیما"
        description="افزودن نوع هواپیما"
        btnText="افزودن نوع هواپیما"
        href={routes.superadmin["transportation-options"]["airplane-type"].add}
      />

      {isLoading ? (
        <LoadingPage />
      ) : (
        <>
          <DataTable columns={columns} data={data} />
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

export default BannersPage;
