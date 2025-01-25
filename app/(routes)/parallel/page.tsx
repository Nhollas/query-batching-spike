"use client"

import React from "react"
import { quoteQueryOptions } from "@/quote-query-options"
import products from "@/large_products_payload.json"
import { useParallelBatchedQueries } from "@/hooks/useParallelBatchedQueries"

export default function Home() {
  const { data: quotes } = useParallelBatchedQueries({
    items: products,
    getQueryOptions: ({ batchId, items }) =>
      quoteQueryOptions({
        queryKey: ["quote", batchId],
        items,
      }),
    maxBytesPerQuery: 50_000,
  })

  return (
    <div className="min-h-screen bg-black text-white">
      <h1>Parallel Batched Queries</h1>
      {quotes.map((quote) => (
        <div key={quote.id}>{quote.id}</div>
      ))}
    </div>
  )
}
