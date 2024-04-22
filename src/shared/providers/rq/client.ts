import { QueryClient } from "@tanstack/react-query";

export const rqClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      // throwOnError: (error) => {
      //   if (
      //     error &&
      //     typeof error === "object" &&
      //     "message" in error &&
      //     typeof error.message === "string"
      //   ) {
      //     if (error.message.includes("Assertion failed")) {
      //       toastError(
      //         "Assertion failed. Try to reinstall your snap with other Wi-Fi or VPN"
      //       );
      //     }
      //   }
      // },
    },
  },
});
