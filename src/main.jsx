import ReactDOM from "react-dom/client";
import "./index.css";
import Router from "./Router/Router";
import { RouterProvider } from "react-router-dom";
import AuthProvider from "./Provider/AuthProvider";
import { Toaster } from "react-hot-toast";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <AuthProvider>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={Router}></RouterProvider>
      <Toaster />
    </QueryClientProvider>
  </AuthProvider>
  // </React.StrictMode>,
);
