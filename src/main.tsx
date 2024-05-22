"use client";
import React from "react";
import ReactDOM from "react-dom/client";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./containers/Application";
import "./index.css";
import ErrorPage from "./shared/components/error-page";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fetchStaffListLoader } from "./loaders/fetchStaffList";
import { fetchStaffLoader } from "./loaders/fetchStaff";
import EditStaff, {
  action as editAction,
} from "./containers/Staff/SingleStaff/edit";
import { fetchUserLoader } from "./loaders/fetchUser";
import SingleStaff from "./containers/Staff/SingleStaff";
import Staff from "./containers/Staff";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    },
  },
});

const router = createBrowserRouter([
  {
    path: "/:businessId",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: fetchUserLoader(queryClient),
    children: [
      {
        path: "/:businessId/staff/",
        element: <Staff />,
        errorElement: <ErrorPage />,
        loader: fetchStaffListLoader(queryClient),
        // id: "staffRoot",
        children: [
          {
            path: "/:businessId/staff/:staffId",
            element: <SingleStaff />,
            errorElement: <ErrorPage />,
            loader: fetchStaffLoader(queryClient),
            id: "staffRoot",
            children: [
              {
                path: "/:businessId/staff/:staffId/edit",
                element: <EditStaff />,
                action: editAction(queryClient), // this is needed here, otherwise will 405 throw error
                // loader: fetchStaffLoader(queryClient),
              },
            ],
          },
        ],
      },
      {
        path: "/:businessId/staff2/",
        element: <Staff />,
        errorElement: <ErrorPage />,
        loader: fetchStaffListLoader(queryClient),
        // id: "staffRoot",
        children: [
          {
            path: "/:businessId/staff2/:staffId",
            element: <SingleStaff />,
            errorElement: <ErrorPage />,
            loader: fetchStaffLoader(queryClient),
            // id: "staffRoot",
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      {/* <ReactQueryDevtools initialIsOpen={false} client={queryClient} /> */}
    </QueryClientProvider>
  </React.StrictMode>
);
