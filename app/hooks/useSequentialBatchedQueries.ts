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

  const { progress, isLastQuerySuccess, data } = useQueries({
    queries: selectedBatches.map((batch) => getQueryOptions(batch)),
    combine: (results) => {
      const successfulQueryCount = results.filter((r) => r.isSuccess).length
      const progress = Math.round((successfulQueryCount / batches.length) * 100)

      return {
        data: results.map((r) => r.data).filter(Boolean) as TData[],
        progress,
        isLastQuerySuccess: !!results[results.length - 1]?.isSuccess,
      }
    },
  })

  useEffect(() => {
    if (isLastQuerySuccess && currentBatchIndex < batches.length) {
      setCurrentBatchIndex((prev) => prev + 1)
    }
  }, [isLastQuerySuccess, currentBatchIndex, batches.length])

  return {
    data,
    progress,
    currentBatch: currentBatchIndex,
    totalBatches: batches.length,
  }
}
