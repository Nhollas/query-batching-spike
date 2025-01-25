import { useQueries, UseQueryOptions } from "@tanstack/react-query"
import { ItemBatch } from "@/types"
import { useEffect, useState } from "react"

interface UseSequentialBatchedQueriesProps<TItem, TData> {
  getQueryOptions: (batch: ItemBatch<TItem>) => UseQueryOptions<TData>
  batches: ItemBatch<TItem>[]
}

export const useSequentialBatchedQueries = <TItem, TData>({
  getQueryOptions,
  batches,
}: UseSequentialBatchedQueriesProps<TItem, TData>) => {
  const [currentBatchIndex, setCurrentBatchIndex] = useState(1)

  const selectedBatches = batches.slice(0, currentBatchIndex)

  const { progress, isLastQueryFetched, results } = useQueries({
    queries: selectedBatches.map((batch) => getQueryOptions(batch)),
    combine: (results) => {
      const completedQueryCount = results.filter((r) => r.isFetched).length
      const progress = Math.round((completedQueryCount / batches.length) * 100)

      return {
        results,
        progress,
        isLastQueryFetched: results[results.length - 1]?.isFetched,
      }
    },
  })

  useEffect(() => {
    if (isLastQueryFetched && currentBatchIndex < batches.length) {
      setCurrentBatchIndex((prev) => prev + 1)
    }
  }, [isLastQueryFetched, currentBatchIndex, batches.length])

  return {
    results,
    progress,
    currentBatch: currentBatchIndex,
    totalBatches: batches.length,
  }
}
