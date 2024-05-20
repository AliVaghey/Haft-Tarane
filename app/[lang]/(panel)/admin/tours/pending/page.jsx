"use client";

import { DataTable } from "@/components/ui/data-table";
import { columns } from "./components/columns";
import { useEffect, useState } from "react";
import LoadingPage from "@/components/loading-page";
import { axios } from "@/lib/axios";
import DataTableHeader from "@/components/data-table-header";
import { useDictionary } from "@/providers/dictionary-provider";
import { routes } from "@/routes/routes";
import PaginationComponent from "@/components/pagination";

const AdminDashboardPage = () => {
  const dictionary = useDictionary();

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchPendingTours();
  }, []);

  const fetchPendingTours = async () => {
    setIsLoading(true);
    await axios
      .get("/api/admin/my-pending-tours")
      .then((response) => {
        console.log("fetchPendingToursres", response.data);
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
        title={dictionary["city"]["title"]}
        description={dictionary["city"]["description"]}
        btnText="افزودن شهر"
        href={routes.admin.cities.add}
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

export default AdminDashboardPage;
