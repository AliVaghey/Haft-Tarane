"use server";

import { redirect } from "next/navigation";

export const redirectZP = async (id) => {
  console.log("ZP-url", `${process.env.BACKEND_URL}/pay/reservation/${id}`);
  redirect(`${process.env.BACKEND_URL}/pay/reservation/${id}`);
};
