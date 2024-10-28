"use client";

import { DataTable } from "@/components/ui/data-table";
import { columns } from "./components/columns";
import { useEffect, useState } from "react";
import LoadingPage from "@/components/loading-page";
import { axios } from "@/lib/axios";
import DataTableHeader from "@/components/data-table-header";
import { useDictionary } from "@/providers/dictionary-provider";
import PaginationComponent from "@/components/pagination";

const UsersPage = ({ searchParams: { page, phone, username } }) => {
  const dictionary = useDictionary();

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchCities();
  }, [page, phone, username]);

  const fetchCities = async () => {
    setIsLoading(true);
    await axios
      .get(
        `/api/admin/users?admin=true&page=${page || 1}&phone=${phone || ""}&username=${username || ""}`,
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
      <DataTableHeader title={"ادمین ها"} description={"لیست ادمین های سایت"} />

      {isLoading ? (
        <LoadingPage />
      ) : (
        <>
          <DataTable columns={columns} data={data.data} />
          <PaginationComponent
            total={data.meta.total || 0}
            page={data.meta.current_page || 1}
            perPage={data.meta.per_page || 10}
          />
        </>
      )}
    </div>
  );
};

export default UsersPage;
