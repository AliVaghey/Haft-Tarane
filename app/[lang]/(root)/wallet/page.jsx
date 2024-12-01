"use client";
import ToastError from "@/components/toast/toast-error";
import { useUser } from "@/hooks/use-user";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

const WalletPage = () => {
  const [amount, setAmount] = useState("");
  const router = useRouter();
  const userHook = useUser();
  const suggestedAmounts = [5000, 10000, 20000, 50000]; // مبالغ پیشنهادی

  const handleRedirect = (selectedAmount) => {
    const finalAmount = selectedAmount || amount;
    if (userHook.userData) {
      if (!finalAmount || isNaN(finalAmount)) {
        toast.error(<ToastError text={"لطفاً مبلغ معتبر وارد کنید."} />);
        setError("لطفاً مبلغ معتبر وارد کنید.");
        return;
      }
      if (finalAmount < 1000) {
        toast.error(
          <ToastError text={"مبلغ نباید کمتر از ۱۰۰۰ تومان باشد."} />,
        );
        return;
      }
      if (finalAmount > 50000000) {
        toast.error(
          <ToastError text={"مبلغ نباید بیشتر از 50 میلیون تومان باشد."} />,
        );
        return;
      }

      router.push(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/pay/balance/increase?amount=${finalAmount}&user=${userHook.userData.id}`,
      );
    } else {
      toast.error("لطفا ابتدا وارد سایت شوید");
      router.push(routes.auth.signIn);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-yellow-100">
      <div className="w-[90%] max-w-md rounded-lg bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-xl font-bold text-yellow-800">
          افزایش موجودی کیف پول
        </h2>
        <div className="mb-4">
          <label
            htmlFor="amount"
            className="mb-2 block text-sm font-medium text-yellow-700"
          >
            مبلغ مورد نظر:
          </label>
          <input
            id="amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="مبلغ را وارد کنید"
            className="w-full rounded-lg border border-yellow-400 p-2 text-yellow-800 focus:border-yellow-500 focus:ring-yellow-500"
          />
        </div>
        <div className="mb-4">
          <p className="mb-2 font-medium text-yellow-700">مبالغ پیشنهادی:</p>
          <div className="flex flex-wrap gap-2">
            {suggestedAmounts.map((amt) => (
              <button
                key={amt}
                onClick={() => setAmount(amt)}
                className="rounded-lg bg-yellow-500 px-4 py-2 text-white hover:bg-yellow-600"
              >
                {amt.toLocaleString("fa-IR")} تومان
              </button>
            ))}
          </div>
        </div>
        <button
          onClick={() => handleRedirect()}
          className="w-full rounded-lg bg-yellow-500 py-3 font-bold text-white hover:bg-yellow-600"
        >
          افزایش موجودی
        </button>
      </div>
    </div>
  );
};

export default WalletPage;
