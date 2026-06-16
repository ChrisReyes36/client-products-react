import { safeParse } from "valibot";
import { DraftProductSchema, ProductsSchema } from "../types";
import api from "../config/api";

type ProductData = {
  [k: string]: FormDataEntryValue;
};

export async function addProduct(data: ProductData) {
  try {
    const result = safeParse(DraftProductSchema, {
      ...data,
      price: +data.price,
    });

    if (result.success) {
      await api.post("/products", {
        name: result.output.name,
        price: result.output.price,
      });
    } else {
      throw new Error("Datos no válidos");
    }
  } catch (error) {
    console.log(error);
  }
}

export async function getProducts() {
  try {
    const {
      data: { data },
    } = await api.get("/products");
    const result = safeParse(ProductsSchema, data);
    if (result.success) {
      return result.output;
    }
  } catch (error) {
    console.log(error);
  }
}
