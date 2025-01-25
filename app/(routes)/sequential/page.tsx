"use client"

import React, { useMemo } from "react"
import { quoteQueryOptions } from "@/quote-query-options"
import products from "@/large_products_payload.json"
import { useSequentialBatchedQueries } from "@/hooks/useSequentialBatchedQueries"
import { batchProductsByCategory } from "@/lib/batch-products-by-category"

export default function Home() {
  const batches = useMemo(() => batchProductsByCategory(products), [])

  const {
    data: quotes,
    progress,
    totalBatches,
    currentBatch,
  } = useSequentialBatchedQueries({
    batches,
    getQueryOptions: ({ items, batchId }) =>
      quoteQueryOptions({
        queryKey: ["quote", `batch-${batchId}`],
        items,
      }),
  })

  return (
    <div className="min-h-screen bg-black text-white p-4">
      <h1>Sequential Batched Queries</h1>
      <div>Total Batches: {totalBatches}</div>
      <div>CurrentBatch Batch: {currentBatch}</div>
      <div>Processing: {progress}%</div>
      <div>
        {quotes.map((quote) => (
          <div key={quote.id}>{quote.id}</div>
        ))}
      </div>
    </div>
  )
}
