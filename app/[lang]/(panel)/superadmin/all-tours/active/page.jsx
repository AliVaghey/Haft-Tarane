"use client";

import { DataTable } from "@/components/ui/data-table";
import { columns } from "./components/columns";
import { useEffect, useState } from "react";
import LoadingPage from "@/components/loading-page";
import { axios } from "@/lib/axios";
import DataTableHeader from "@/components/data-table-header";
// import { useDictionary } from "@/providers/dictionary-provider";
import PaginationComponent from "@/components/pagination";

const AdminDashboardPage = ({ searchParams: { page, id } }) => {
  // const dictionary = useDictionary();

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchPendingTours();
  }, [page, id]);

  const fetchPendingTours = async () => {
    setIsLoading(true);
    await axios
      .get(
        `/api/admin/super-admin/tours/active?page=${page || 1}&id=${id || ""}`,
      )
      .then((response) => {
        console.log("fetchPendingToursres", response);
        setData(response.data);
      })
      .catch((err) => {
        console.log("fetchPendingTourserror", err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  return (
    <div className="px-0 lg:px-10">
      <DataTableHeader
        title="تور های فعال"
        description="لیست تمامی تور های فعال"
      />

      {isLoading ? (
        <LoadingPage />
      ) : (
        <>
          <DataTable columns={columns} data={data.data} />
          <PaginationComponent
            total={data?.total || 0}
            page={data?.current_page || 1}
            perPage={data?.per_page || 10}
          />
        </>
      )}
    </div>
  );
};

export default AdminDashboardPage;
