"use client";

import { DataTable } from "@/components/ui/data-table";
import { columns } from "./components/columns";
import { useEffect, useState } from "react";
import LoadingPage from "@/components/loading-page";
import { axios } from "@/lib/axios";
import DataTableHeader from "@/components/data-table-header";
import { useDictionary } from "@/providers/dictionary-provider";
import PaginationComponent from "@/components/pagination";
import { useTour } from "@/hooks/use-tour";

const AdminDashboardPage = ({ searchParams: { page, id } }) => {
  const dictionary = useDictionary();

  const tourHook = useTour();

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, [page, id, tourHook.flag]);

  const fetchData = async () => {
    setIsLoading(true);
    await axios
      .get(`/api/agency/tours?page=${page || 1}&id=${id || ""}`)
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
      <DataTableHeader title="تور ها" description="لیست همه تور ها" />

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

export default AdminDashboardPage;
