"use server";

import { redirect } from "next/navigation";

export const redirectZP = async (id) => {
  redirect(`${process.env.BACKEND_URL}/pay/reservation/${id}`);
};
