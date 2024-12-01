"use client";

import { pinkPlain } from "@/constants/images";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ToastError from "@/components/toast/toast-error";
import { useEffect, useState } from "react";
import { axios } from "@/lib/axios";
import LoadingPage from "@/components/loading-page";
import DetailsBasicInformation from "@/components/tour-details/basic-information";
import DetailsTourPlan from "@/components/tour-details/tour-plan";
import DetailsDocuments from "@/components/tour-details/documents";
import DetailsHotels from "@/components/tour-details/hotel";
import DetailsDates from "@/components/tour-details/dates";
import ReservationForm from "@/components/FlightReservationForm";
import { toast } from "sonner";
import FlightReservationForm from "@/components/FlightReservationForm";

const TourDetailsPage = ({ params }) => {
  const [data, setData] = useState({});

  const [isLoading, setIsLoading] = useState(false);



  return (
    <FlightReservationForm params={params} />
  );
};

export default TourDetailsPage;
