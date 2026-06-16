import type { LoaderFunctionArgs } from "react-router-dom";
import { getProductById, getProducts } from "../../services/ProductService";

export async function loader() {
  const products = await getProducts();
  return { products };
}

export async function productLoader({ params }: LoaderFunctionArgs) {
  const { id } = params;

  if (!id) throw new Response("ID requerido", { status: 400 });

  const product = await getProductById(+id);

  if (!product) throw new Response("Producto no encontrado", { status: 404 });

  return { product };
}
