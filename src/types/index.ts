import {
  array,
  boolean,
  number,
  object,
  pipe,
  string,
  transform,
  unknown,
  type InferOutput,
} from "valibot";

export const DraftProductSchema = object({
  name: string(),
  price: number(),
});

export const ProductSchema = object({
  id: number(),
  name: string(),
  price: number(),
  availability: boolean(),
});

export const ProductsSchema = array(ProductSchema);

export type Product = InferOutput<typeof ProductSchema>;

export const NumberSchema = pipe(
  unknown(),
  transform((value) => Number(value)),
  number(),
);
