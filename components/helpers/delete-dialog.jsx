"use client";

import { useEffect, useState } from "react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";

const DeleteModal = ({ isOpen, onClose, onConfirm, loading, title, dict }) => {
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
      description={dict["This action cannot be reversed"]}
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="mr-2 flex w-full items-center justify-start gap-3 space-x-2 pt-6">
        <Button disabled={loading} variant="outline" onClick={onClose}>
          {dict["cancel"]}
        </Button>
        <Button
          disabled={loading}
          variant="destructive"
          onClick={onConfirm}
          className="flex items-center justify-center gap-2"
        >
          <span>{dict["confirm"]}</span>
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

export default DeleteModal;
