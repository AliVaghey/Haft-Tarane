"use client";

import { useEffect, useState } from "react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";
import { useDictionary } from "@/providers/dictionary-provider";

const ConfirmTourModal = ({ isOpen, onClose, onConfirm, loading, title }) => {
  const dictionary = useDictionary();

  const [isMounted, setIsmounted] = useState(false);

  useEffect(() => {
    setIsmounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Modal
      title={title}
      description={"آیا از تایید این تور مطمئنید؟"}
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="mr-2 flex w-full items-center justify-center gap-3 space-x-2 pt-6">
        <Button
          disabled={loading}
          variant="outline"
          onClick={onClose}
          className="h-8 w-24"
        >
          {dictionary["delete-dialog"]["cancel"]}
        </Button>
        <Button
          disabled={loading}
          onClick={onConfirm}
          className="flex h-8 w-24 items-center justify-center gap-2 bg-green-500 text-white hover:bg-green-700"
        >
          <span>تایید</span>
          {loading && (
            <span className="animate-spin">
              <LoaderCircle size={18} strokeWidth={2} />
            </span>
          )}
        </Button>
      </div>
    </Modal>
  );
};

export default ConfirmTourModal;
