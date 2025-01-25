import { ItemBatch, Product } from "@/types"

export const batchProductsByCategory = (
  products: Product[],
): ItemBatch<Product>[] =>
  Object.entries(Object.groupBy(products, (product) => product.category)).map(
    ([, items]) => ({
      batchId: crypto.randomUUID(),
      items: items ?? [],
    }),
  )
