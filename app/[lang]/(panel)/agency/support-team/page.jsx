"use client";

import { DataTable } from "@/components/ui/data-table";
import { columns } from "./components/columns";
import { useEffect, useState } from "react";
import LoadingPage from "@/components/loading-page";
import { axios } from "@/lib/axios";
import DataTableHeader from "@/components/data-table-header";
import { useDictionary } from "@/providers/dictionary-provider";
import { routes } from "@/routes/routes";
import { useTour } from "@/hooks/use-tour";

const AdminDashboardPage = () => {
  const dictionary = useDictionary();

  const tourHook = useTour();

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchCities();
  }, [tourHook.flag]);

  const fetchCities = async () => {
    setIsLoading(true);
    await axios
      .get("/api/agency/supports")
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
        title="پشتیبان ها"
        description="لیست تمامی پشتیبان های شما"
        btnText="افزودن پشتیبان"
        href={routes.agency["support-team"].add}
      />

      {isLoading ? (
        <LoadingPage />
      ) : (
        <DataTable columns={columns} data={data} />
      )}
    </div>
  );
};

export default AdminDashboardPage;
