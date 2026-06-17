import { redirect, type ActionFunctionArgs } from "react-router-dom";
import {
  addProduct,
  deleteProduct,
  updateProduct,
  updateProductAvailability,
} from "../../services/ProductService";

export async function action({ request }: ActionFunctionArgs) {
  const data = Object.fromEntries(await request.formData());

  let error = "";
  if (Object.values(data).includes("")) {
    error = "Todos los campos son obligatorios";
  }

  if (error.length) {
    return error;
  }

  await addProduct(data);

  return redirect("/");
}

export async function productAction({ request, params }: ActionFunctionArgs) {
  const { id } = params;
  const data = Object.fromEntries(await request.formData());

  let error = "";
  if (Object.values(data).includes("")) {
    error = "Todos los campos son obligatorios";
  }

  if (error.length) {
    return error;
  }

  if (id) {
    await updateProduct(+id, data);

    return redirect("/");
  }
}

export async function deleteProductAction({ params }: ActionFunctionArgs) {
  const { id } = params;

  if (id) {
    await deleteProduct(+id);

    return redirect("/");
  }
}

export async function updateAvailabilityProduct({
  request,
}: ActionFunctionArgs) {
  const { id } = Object.fromEntries(await request.formData());

  if (id) {
    await updateProductAvailability(+id);
    return null;
  }
}
