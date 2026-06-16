import { safeParse, parse } from "valibot";
import {
  DraftProductSchema,
  NumberSchema,
  ProductSchema,
  ProductsSchema,
  type Product,
} from "../types";
import api from "../config/api";
import { toBoolean } from "../utils";

type ProductData = {
  [k: string]: FormDataEntryValue;
};

export async function addProduct(data: ProductData) {
  try {
    const { success, output } = safeParse(DraftProductSchema, {
      ...data,
      price: parse(NumberSchema, data.price),
    });

    if (success) {
      await api.post("/products", {
        name: output.name,
        price: output.price,
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
    const { success, output } = safeParse(ProductsSchema, data);
    if (success) {
      return output;
    }
  } catch (error) {
    console.log(error);
  }
}

export async function getProductById(id: Product["id"]) {
  try {
    const {
      data: { data },
    } = await api.get(`/products/${id}`);
    const { success, output } = safeParse(ProductSchema, data);
    if (success) {
      return output;
    }
  } catch (error) {
    console.log(error);
  }
}

export async function updateProduct(id: Product["id"], data: ProductData) {
  try {
    const { success, output } = safeParse(ProductSchema, {
      id,
      ...data,
      price: parse(NumberSchema, data.price),
      availability: toBoolean(data.availability.toString()),
    });

    if (success) {
      await api.put(`/products/${id}`, {
        name: output.name,
        price: output.price,
        availability: output.availability,
      });
    } else {
      throw new Error("Datos no válidos");
    }
  } catch (error) {
    console.log(error);
  }
}
