"use client"

import React, { useMemo } from "react"
import { quoteQueryOptions } from "@/quote-query-options"
import products from "@/large_products_payload.json"
import { useSequentialQueries } from "@/hooks/use-sequential-queries"
import { batchProductsByCategory } from "@/lib/batch-products-by-category"
import { QuoteDisplay } from "@/components/quote-display"

export default function Home() {
  const batchedProducts = useMemo(() => batchProductsByCategory(products), [])

  const { results, progress, currentQuery } = useSequentialQueries({
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
        Sequential Queries (30% Error Rate)
      </h1>
      <div>Total Queries: {batchedProducts.length}</div>
      <div>Current Query: {currentQuery}</div>
      <div>Processing: {progress}%</div>
      <div className="flex flex-col gap-2">
        {results.map((result, index) => (
          <QuoteDisplay key={index} result={result} />
        ))}
      </div>
    </div>
  )
}
