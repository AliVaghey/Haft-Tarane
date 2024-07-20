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

const UserToursPage = ({ searchParams: { page } }) => {
  const dictionary = useDictionary();

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchCities();
  }, [page]);

  const fetchCities = async () => {
    setIsLoading(true);
    await axios
      .get(`/api/agency/reservations?page=${page || 1}&pending=true`)
      .then((response) => {
        console.log("responsepending", response.data);
        setData(response.data);
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
        title={"در انتظار پرداخت"}
        description={"رزرو های در انتظار پرداخت آژانس شما"}
        // btnText="افزودن شهر"
        // href={routes.admin.cities.add}
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

export default UserToursPage;
