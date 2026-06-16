import { createBrowserRouter } from "react-router-dom";
import Layout from "./layouts/Layout";
import Products from "./views/Products";
import NewProduct from "./views/NewProduct";

import { action as productsAction } from "./routes/products/action";
import { loader as productsLoader } from "./routes/products/loader";

export const Router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Products />,
        loader: productsLoader,
        HydrateFallback: () => <div>Cargando...</div>,
      },
      {
        path: "productos/nuevo",
        element: <NewProduct />,
        action: productsAction,
        HydrateFallback: () => <div>Cargando...</div>,
      },
    ],
  },
]);
