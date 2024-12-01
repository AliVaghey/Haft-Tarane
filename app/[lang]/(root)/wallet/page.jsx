"use client"
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const WalletPage = () => {
  const [amount, setAmount] = useState("");
  const router = useRouter();

  const suggestedAmounts = [5000, 10000, 20000, 50000]; // مبالغ پیشنهادی

  const handleRedirect = (selectedAmount) => {
    const finalAmount = selectedAmount || amount;
    if (!finalAmount || isNaN(finalAmount)) {
      alert("لطفاً مبلغ معتبر وارد کنید.");
      return;
    }
    router.push(`${process.env.NEXT_PUBLIC_BACKEND_URL}/pay/balance/increase?amount=${finalAmount}`);
  };

  return (
    <div className="flex h-screen items-center justify-center bg-yellow-100">
      <div className="w-[90%] max-w-md rounded-lg bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-xl font-bold text-yellow-800">افزایش موجودی کیف پول</h2>
        <div className="mb-4">
          <label
            htmlFor="amount"
            className="block mb-2 text-sm font-medium text-yellow-700"
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
