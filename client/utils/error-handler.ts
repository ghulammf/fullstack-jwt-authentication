import { isAxiosError } from "axios";

const errorMessage = (error: unknown): string => {
  // 1. If error from Response API
  if (isAxiosError(error)) {
    if (error.response?.data?.message) {
      return error.response.data.message;
    }
    if (error.response?.status === 401) return "Unauthorized access";
    if (error.response?.status === 500) return "Internal Server Error";

    return error.message;
  }

  //   2. If error from Javascript
  if (error instanceof Error) {
    return error.message;
  }

  //   3. If error is a string
  if (typeof error === "string") {
    return error;
  }

  // 4. If error is unknown
  return "An unexpected error occured";
};

export default errorMessage;
