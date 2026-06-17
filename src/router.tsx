import { createBrowserRouter } from "react-router-dom";
import Layout from "./layouts/Layout";
import Loading from "./components/Loading";
import Products from "./views/Products";
import NewProduct from "./views/NewProduct";
import EditProduct from "./views/EditProduct";

import {
  action as productsAction,
  productAction,
  deleteProductAction,
  updateAvailabilityProduct,
} from "./routes/products/action";
import {
  loader as productsLoader,
  productLoader,
} from "./routes/products/loader";

export const Router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    hydrateFallbackElement: <Loading />,
    children: [
      {
        index: true,
        element: <Products />,
        loader: productsLoader,
        action: updateAvailabilityProduct,
      },
      {
        path: "productos/nuevo",
        element: <NewProduct />,
        action: productsAction,
      },
      {
        path: "productos/:id/editar",
        element: <EditProduct />,
        loader: productLoader,
        action: productAction,
      },
      {
        path: "productos/:id/eliminar",
        action: deleteProductAction,
      },
    ],
  },
]);
