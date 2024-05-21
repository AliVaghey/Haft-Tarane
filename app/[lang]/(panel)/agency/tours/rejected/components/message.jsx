"use client";

import MessageDialog from "@/components/helpers/message-dialog";
import { Button } from "@/components/ui/button";
import { axios } from "@/lib/axios";
import { MailSearch } from "lucide-react";
import { File } from "lucide-react";
import { useState } from "react";

const Message = ({ data }) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState([{ message: "" }]);

  const getMessage = async () => {
    setLoading(true);
    setOpen(true);

    await axios
      .get(`/api/agency/tour/${data.id}/messages`)
      .then((response) => {
        setMessage(response?.data[0]?.message || "");
      })
      .catch((error) => {
        toast.error("مشکلی پیش آمده است. لطفا مجددا تلاش فرمایید");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div>
      <MessageDialog
        isOpen={open}
        loading={loading}
        onClose={() => setOpen(false)}
        message={message}
      />

      <Button
        variant=""
        className="h-8 w-16 rounded-2xl bg-white shadow-lg hover:bg-white hover:shadow-2xl"
        onClick={getMessage}
      >
        <MailSearch className="text-red-primary" size={18} strokeWidth={1.5} />
      </Button>
    </div>
  );
};

export default Message;
