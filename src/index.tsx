import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Users from "./components/Users";
import Product from "./components/Products";
import { ErrorBoundary } from "react-error-boundary";
import ProductDetail from "./components/ProductDetail";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "user",
        element: <Users />,
      },
      {
        path: "product",
        children: [
          {
            path: "",
            element: <Product />,
          },
          {
            path: ":id",
            element: <ProductDetail />,
          },
        ],
      },
    ],
  },
]);

// Create a client
const queryClient = new QueryClient();

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<div>Loading...</div>}>
        <ErrorBoundary fallback={<div>On no!</div>}>
          <RouterProvider router={router} />
          <ReactQueryDevtools initialIsOpen={false} />
        </ErrorBoundary>
      </Suspense>
    </QueryClientProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
