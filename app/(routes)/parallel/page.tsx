"use client"

import React, { useCallback } from "react"
import { quoteQueryOptions } from "@/quote-query-options"
import products from "@/large_products_payload.json"
import { useParallelBatchedQueries } from "@/hooks/useParallelBatchedQueries"
import { batchItemsByByteLimit } from "@/lib/batch-items-by-byte-limit"

export default function Home() {
  const getBatchedItems = useCallback(
    () => batchItemsByByteLimit(products, 50_000),
    [],
  )

  const { data: quotes } = useParallelBatchedQueries({
    getBatchedItems,
    getQueryOptions: ({ batchId, items }) =>
      quoteQueryOptions({
        queryKey: ["quote", batchId],
        items,
      }),
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
