import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./containers/Application";
import "./index.css";
import ErrorPage from "./shared/components/error-page";
import Staff from "./containers/Staff/SingleStaff";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fetchStaffListLoader } from "./loaders/fetchStaffList";
import { fetchStaffLoader } from "./loaders/fetchStaff";
import EditStaff, {
  action as editAction,
} from "./containers/Staff/SingleStaff/edit";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/:businessId",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: fetchStaffListLoader(queryClient),
    children: [
      {
        path: "/:businessId/staff/:staffId",
        element: <Staff />,
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
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
