import { toast as libraryToast } from "react-hot-toast";

const toast = {
  success: (message: string) =>
    libraryToast.success(message, { position: "bottom-center" }),
  error: (message: string) =>
    libraryToast.error(message, { position: "bottom-center" }),
};

export default toast;
