"use client";

import { DataTable } from "@/components/ui/data-table";
import { columns } from "./components/columns";
import { useEffect, useState } from "react";
import LoadingPage from "@/components/loading-page";
import { axios } from "@/lib/axios";
import DataTableHeader from "@/components/data-table-header";
import { useDictionary } from "@/providers/dictionary-provider";
import PaginationComponent from "@/components/pagination";
import PayDates from "./components/pay-dates";
import PayAll from "./components/pay-all";
import { useTour } from "@/hooks/use-tour";

const AgencyPage = ({ searchParams: { page, name }, params }) => {
  const dictionary = useDictionary();

  const tourHook = useTour();

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchCities();
  }, [page, name, tourHook.flag]);

  const fetchCities = async () => {
    setIsLoading(true);

    await axios
      .get(`/api/admin/agency/${params.id}/sales`)
      .then((response) => {
        console.log("agencySalesResponse", response.data);
        setData(response.data);
      })
      .catch((err) => {
        console.log("agencySalesError", err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  return (
    <div className="px-0 lg:px-10">
      <DataTableHeader
        title="فروش های آژانس"
        description="لیست فروش های این آژانس"
      />

      {isLoading ? (
        <LoadingPage />
      ) : (
        <>
          <PayAll agencyId={params.id} data={data.data} />
          <PayDates className="" agencyId={params.id} data={data.data} />
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

export default AgencyPage;
