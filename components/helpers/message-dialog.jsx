"use client";

import { useEffect, useState } from "react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { useDictionary } from "@/providers/dictionary-provider";
import { Loader2Icon } from "lucide-react";

const MessageDialog = ({ isOpen, onClose, title, message, loading }) => {
  const dictionary = useDictionary();

  const [isMounted, setIsmounted] = useState(false);

  useEffect(() => {
    setIsmounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Modal title={title} isOpen={isOpen} onClose={onClose}>
      <div className="flex w-full flex-col items-center justify-center">
        {loading ? (
          <Loader2Icon className="animate-spin text-muted-foreground" />
        ) : (
          <p className="text-center text-sm text-muted-foreground">{message}</p>
        )}
        <Button onClick={onClose} className="mx-auto mt-5 h-8 w-24">
          بستن
        </Button>
      </div>
    </Modal>
  );
};

export default MessageDialog;
