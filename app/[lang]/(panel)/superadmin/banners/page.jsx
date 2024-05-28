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

const BannersPage = ({ searchParams: { page } }) => {
  const dictionary = useDictionary();

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchHotels();
  }, [page]);

  const fetchHotels = async () => {
    setIsLoading(true);

    await axios
      .get(`/api/admin/banners?page=${page || 1}}`)
      .then((response) => {
        console.log("special", response.data);
        setData(response.data);
      })
      .catch((err) => {
        console.log("getHotelsError", err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  return (
    <div className="px-0 lg:px-10">
      <DataTableHeader
        title="افزودن بنر"
        description="افزودن بنر برای نمایش در صفحه اول"
        btnText="افزودن بنر"
        href={routes.superadmin.banners.add}
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
