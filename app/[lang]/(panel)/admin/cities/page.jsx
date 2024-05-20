"use client";

import { DataTable } from "@/components/ui/data-table";
import { columns } from "./components/columns";
import { useEffect, useState } from "react";
import LoadingPage from "@/components/loading-page";
import { axios } from "@/lib/axios";
import DataTableHeader from "@/components/data-table-header";
import { useDictionary } from "@/providers/dictionary-provider";
import { routes } from "@/routes/routes";

const AdminDashboardPage = () => {
  const dictionary = useDictionary();

  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchCities();
  }, []);

  const fetchCities = async () => {
    setIsLoading(true);
    await axios
      .get("/api/cities")
      .then((response) => {
        setCities(response.data.data);
      })
      .catch((err) => {
        console.log("getCitiesError", err);
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
        <DataTable columns={columns} data={cities} />
      )}
    </div>
  );
};

export default AdminDashboardPage;
