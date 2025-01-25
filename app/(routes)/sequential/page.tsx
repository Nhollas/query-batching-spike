"use client"

import React from "react"
import { quoteQueryOptions } from "@/quote-query-options"
import products from "@/large_products_payload.json"
import { useSequentialBatchedQueries } from "@/hooks/useSequentialBatchedQueries"

export default function Home() {
  const {
    data: quotes,
    progress,
    totalBatches,
    currentBatch,
  } = useSequentialBatchedQueries({
    items: products,
    getQueryOptions: ({ batchId, items }) =>
      quoteQueryOptions({
        queryKey: ["quote", batchId],
        items,
      }),
    maxBytesPerQuery: 50_000,
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
