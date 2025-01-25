import { ItemBatch, Product } from "@/types"

export function batchProductsByCategory(
  products: Product[],
): ItemBatch<Product>[] {
  const items = Object.groupBy(products, (product) => product.category)

  const itemBatches: ItemBatch<Product>[] = []

  for (const category in items) {
    itemBatches.push({
      batchId: crypto.randomUUID(),
      items: items[category] ?? [],
    })
  }

  return itemBatches
}
