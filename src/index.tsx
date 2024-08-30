import {
  matchQuery,
  MutationCache,
  Query,
  QueryClient,
  QueryClientProvider,
  QueryKey,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { ErrorBoundary } from "react-error-boundary";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import ProductDetail from "./components/ProductDetail";
import Product from "./components/Products";
import UserDetail from "./components/UserDetail";
import Users from "./components/Users";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

interface MyMeta extends Record<string, unknown> {
  // Your meta type definition.
}

declare module "@tanstack/react-query" {
  interface Register {
    queryMeta: MyMeta;
    mutationMeta: {
      invalidates?: Array<QueryKey>;
      awaits?: Array<string>;
    };
  }
}

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const router = createBrowserRouter(
  // createRoutesFromElements(
  //   <>
  //     <Route path="/" element={<App />}>
  //       <Route path="user" element={<Users />} />
  //       <Route path="product">
  //         <Route index element={<Product />} />
  //         <Route path=":id" element={<ProductDetail />} />
  //       </Route>
  //     </Route>
  //   </>
  // )
  [
    {
      path: "/",
      element: <App />,
      children: [
        {
          path: "user",
          children: [
            {
              path: "",
              element: <Users />,
            },
            {
              path: ":id",
              element: <UserDetail />,
            },
          ],
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
  ]
);

// Create a client
const queryClient = new QueryClient({
  mutationCache: new MutationCache({
    onSuccess: async (_data, _variables, _context, mutation) => {
      //Exclude Queries depending on staleTime

      // const nonStaticQueries = (query: Query) => {
      //   const defaultStaleTime =
      //     queryClient.getQueryDefaults(query.queryKey).staleTime ?? 0;
      //   const staleTimes = query.observers
      //     .map((observer) => observer.options.staleTime)
      //     .filter((staleTime) => staleTime !== undefined) as [];

      //   const staleTime =
      //     query.getObserversCount() > 0
      //       ? Math.min(...staleTimes)
      //       : defaultStaleTime;

      //   return staleTime !== Number.POSITIVE_INFINITY;
      // };

      //Use the meta option

      await queryClient.invalidateQueries({
        // queryKey: mutation.options.mutationKey,
        // predicate: (query) =>
        //   // invalidate all matching tags at once
        //   // or everything if no meta is provided
        //   mutation.meta?.invalidates?.some((queryKey) =>
        //     matchQuery({ queryKey }, query)
        //   ) ?? true,
      });
    },
  }),
});

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
