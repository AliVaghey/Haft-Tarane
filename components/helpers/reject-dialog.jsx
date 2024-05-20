"use client";

import { useEffect, useState } from "react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";
import { useDictionary } from "@/providers/dictionary-provider";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import SubmitButton from "@/components/submit-button";
import {
  enRejectMessageSchema,
  rejectMessageSchema,
} from "@/lib/validation/auth/reject-message";

const RejectModal = ({ isOpen, onClose, onConfirm, loading, title }) => {
  const dictionary = useDictionary();

  const [isMounted, setIsmounted] = useState(false);

  const form = useForm({
    resolver: zodResolver(
      dictionary["language"] === "fa"
        ? rejectMessageSchema
        : enRejectMessageSchema,
    ),
    defaultValues: {
      message: "",
    },
    mode: "onSubmit",
  });

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = form;

  useEffect(() => {
    setIsmounted(true);
  }, []);

  const onSubmit = async (values) => {
    console.log("values", values);
    onConfirm(values.message);
  };

  if (!isMounted) {
    return null;
  }

  return (
    <Modal
      title={title}
      description={
        "شما می توانید این تور را به حالت رد شده و نیازمند اصلاح تبدیل کنید و در عین حال یک پیام برای سازنده تور ارسال نمایید."
      }
      isOpen={isOpen}
      onClose={onClose}
    >
      <div>
        <div className="w-full">
          <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="">
              <FormField
                control={control}
                name="message"
                render={({ field }) => (
                  <FormItem className="col-span-3 lg:col-span-1">
                    <FormControl>
                      <Input
                        className="rounded-2xl focus-visible:ring-primary"
                        autoComplete="off"
                        placeholder="پیام خود را وارد نمایید..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="mr-2 flex w-full items-center justify-center gap-3 space-x-2 pt-6">
                <Button
                  disabled={loading}
                  variant="destructive"
                  // onClick={onConfirm}
                  className="flex h-8 w-24 items-center justify-center gap-2"
                >
                  <span>رد کردن</span>
                  {loading && (
                    <span className="animate-spin">
                      <LoaderCircle size={18} strokeWidth={2} />
                    </span>
                  )}
                </Button>

                <Button
                  type="button"
                  disabled={loading}
                  variant="outline"
                  onClick={onClose}
                  className="h-8 w-24"
                >
                  لغو
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </Modal>
  );
};

export default RejectModal;
