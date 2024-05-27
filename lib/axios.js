"use client";
import { getCookie } from "cookies-next";

import Axios from "axios";

export const baseBackUrl = process.env.BACKEND_URL;

export const axios = Axios.create({
  baseURL: baseBackUrl,
  headers: {
    "X-Requested-With": "XMLHttpRequest",
    "X-XSRF-TOKEN": getCookie("XSRF-TOKEN"),
  },
  withCredentials: true,
  withXSRFToken: true,
});

export const CSRFToken = async () => {
  await axios
    .get("/sanctum/csrf-cookie")
    .then((response) => {
      console.log("csrf-response", response);
    })
    .catch((error) => {
      console.log("CSRF_TOKEN_ERROR", error);
    })
    .finally(() => {
      console.log(
        "getCookieswwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
        getCookie("XSRF-TOKEN"),
      );
    });
};
