"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import useMount from "@/hooks/use-mount";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleCheckBig } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import SubmitButton from "@/components/submit-button";
import { toast } from "sonner";
import { CSRFToken, axios } from "@/lib/axios";
import { useDictionary } from "@/providers/dictionary-provider";
import querystring from "querystring";
import ToastError from "@/components/toast/toast-error";
import { defaultMessages } from "@/lib/default-messages";
import { useState } from "react";
import SearchableSelect from "@/components/ui/searchable-select";
import { Button } from "@/components/ui/button";
import { useTour } from "@/hooks/use-tour";
import { Input } from "@/components/ui/input";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import { DateForm } from "@/lib/date-form";
import {
  entransportationSchema,
  transportationSchema,
} from "@/lib/validation/tour/transportation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import GetFlights from "./add-system-transportation/get-flights";
import FlightList from "./add-system-transportation/flight-list";

const AddMyTransportation = ({ tour_id }) => {
  const dictionary = useDictionary();

  const [flights, setFlights] = useState([]);

  const tourHook = useTour();

  const [isOpen, setIsOpen] = useState(false);

  const mount = useMount();

  const router = useRouter();

  const addTransportation = async (values) => {
    console.log("valuesssssss", values);

    const encodedFormData = querystring.stringify(values);

    await CSRFToken();

    await axios
      .post(`/api/agency/tour/${tour_id}/sys-transportation`, encodedFormData)
      .then((response2) => {
        if (response2.status === 201) {
          toast.success(
            <div className="flex items-center gap-2">
              <span>
                <CircleCheckBig className="text-green-600" />
              </span>
              <span>{"حمل و نقل با موفقیت اضافه شد"}</span>
            </div>,
          );

          tourHook.setFlag(!tourHook.flag);
        }
      })
      .catch((error) => {
        console.log("login-error", error);
        toast.error(
          <ToastError
            text={
              error?.response?.data?.message ||
              defaultMessages.errors.internalError
            }
          />,
        );
      });
  };

  if (!mount) {
    return null;
  }

  return (
    <div className="">
      <Button onClick={() => setIsOpen(true)}>افزودن حمل و نقل</Button>
      <Dialog open={isOpen} onOpenChange={() => setIsOpen(false)}>
        <DialogContent className="top-10 flex h-5/6 -translate-y-0 flex-col items-start gap-5 overflow-y-auto sm:max-w-[825px]">
          <DialogHeader>
            <DialogTitle className="mr-4 text-right">
              افزودن حمل و نقل
            </DialogTitle>
          </DialogHeader>
          <GetFlights setFlights={setFlights} />

          {flights.length === 0 ? (
            <div className="w-full rounded-lg border border-muted-foreground p-2 text-muted-foreground">
              در این تاریخ پروازی وجود ندارد
            </div>
          ) : (
            <FlightList
              flights={flights}
              addTransportation={addTransportation}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddMyTransportation;
