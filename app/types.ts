export type ItemBatch<TItem> = {
  batchId: string
  items: TItem[]
}

export type Product = {
  id: string
  name: string
  description: string
  price: number
  category: string
  stock: number
  sku: string
  release_date: string
  is_available: boolean
}
