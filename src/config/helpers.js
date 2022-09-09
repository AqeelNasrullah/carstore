import { toast } from "react-toastify";

export const setAlert = (message, type = "error") => {
  toast(message, { type });
};
