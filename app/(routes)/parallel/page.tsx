"use client"

import React, { useMemo } from "react"
import { quoteQueryOptions } from "@/quote-query-options"
import products from "@/large_products_payload.json"
import { useParallelBatchedQueries } from "@/hooks/use-parallel-batched-queries"
import { batchItemsByByteLimit } from "@/lib/batch-items-by-byte-limit"

export default function Home() {
  const batches = useMemo(() => batchItemsByByteLimit(products, 50_000), [])

  const { data: quotes } = useParallelBatchedQueries({
    batches,
    getQueryOptions: ({ items, batchId }) =>
      quoteQueryOptions({
        queryKey: ["quote", `batch-${batchId}`],
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
