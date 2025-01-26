"use client"

import React, { useMemo } from "react"
import { quoteQueryOptions } from "@/quote-query-options"
import products from "@/large_products_payload.json"
import { useSequentialBatchedQueries } from "@/hooks/use-sequential-batched-queries"
import { batchProductsByCategory } from "@/lib/batch-products-by-category"
import { QuoteDisplay } from "@/components/quote-display"

export default function Home() {
  const batches = useMemo(() => batchProductsByCategory(products), [])

  const { results, progress, currentBatch } = useSequentialBatchedQueries({
    batches,
    getQueryOptions: ({ items, batchId }) =>
      quoteQueryOptions({
        queryKey: ["quote", `batch-${batchId}`],
        items,
      }),
  })

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">
        Sequential Batched Queries (30% Error Rate)
      </h1>
      <div>Total Batches: {batches.length}</div>
      <div>Current Batch: {currentBatch}</div>
      <div>Processing: {progress}%</div>
      <div className="flex flex-col gap-2">
        {results.map((result, index) => (
          <QuoteDisplay key={index} result={result} />
        ))}
      </div>
    </div>
  )
}
