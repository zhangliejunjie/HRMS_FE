import React from "react";
import { toast } from "react-toastify";
import cookie from "react-cookies";
export const showToast = (type, message) => {
  switch (type) {
    case "success":
      toast.success(message, {
        position: toast.POSITION.BOTTOM_LEFT,
      });
      break;
    case "error":
      toast.error(message, {
        position: toast.POSITION.BOTTOM_LEFT,
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
