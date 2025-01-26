"use client"

import React, { useMemo } from "react"
import { quoteQueryOptions } from "@/quote-query-options"
import products from "@/large_products_payload.json"
import { useParallelQueries } from "@/hooks/use-parallel-queries"
import { batchItemsByByteLimit } from "@/lib/batch-items-by-byte-limit"
import { QuoteDisplay } from "@/components/quote-display"

export default function Home() {
  const batchedProducts = useMemo(
    () => batchItemsByByteLimit(products, 25_000),
    [],
  )

  const results = useParallelQueries({
    items: batchedProducts,
    getQueryOptions: ({ items, batchId }) =>
      quoteQueryOptions({
        queryKey: ["quote", `batch-${batchId}`],
        items,
      }),
  })

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">
        Parallel Batched Queries (30% Error Rate)
      </h1>
      <div className="flex flex-col gap-2">
        {results.map((result, index) => (
          <QuoteDisplay key={index} result={result} />
        ))}
      </div>
    </div>
  )
}
