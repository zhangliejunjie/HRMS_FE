import React from "react";
import { toast } from "react-toastify";
import cookie from "react-cookies";
export const showToast = (type, message) => {
  switch (type) {
    case "success":
      toast.success(message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      break;
    case "error":
      toast.error(message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      break;
    default:
      return false;
  }
};
export const errorHelper = (formik, value) => {
  return {
    error: formik.errors[value] && formik.touched[value] ? true : false,
    helperText:
      formik.errors[value] && formik.touched[value]
        ? formik.errors[value]
        : null,
  };
};

export const getTokenCookie = () => cookie.load("x-access-token");
export const removeTokenCookie = () =>
  cookie.remove("x-access-token", { path: "/" });
export const getAuthHeader = () => {
  return { headers: { Authorization: `Bearer ${getTokenCookie()}` } };
};
export const getDateOfISOWeek = (w, slot) => {
  const y = 2022;
  let day = Math.floor((slot - 1) / 4);
  let simple = new Date(y, 0, 1 + (w - 1) * 7 + day);
  let dow = simple.getDay();
  let ISOweekStart = simple;
  if (dow <= 4)
    ISOweekStart.setDate(simple.getDate() - simple.getDay() + 1 + day);
  else ISOweekStart.setDate(simple.getDate() + 8 - simple.getDay() + day);
  return ISOweekStart;
};
