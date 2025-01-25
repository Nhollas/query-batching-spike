import { useQueries, UseQueryOptions } from "@tanstack/react-query"
import { batchItemsByByteLimit } from "@/lib/batch-items-by-byte-limit"
import { ItemBatch } from "@/types"
import { useEffect, useMemo, useState } from "react"

interface UseSequentialBatchedQueriesProps<TItem, TData> {
  items: TItem[]
  getQueryOptions: (batch: ItemBatch<TItem>) => UseQueryOptions<TData>
  maxBytesPerQuery: number
}

export const useSequentialBatchedQueries = <TItem, TData>({
  items,
  getQueryOptions,
  maxBytesPerQuery,
}: UseSequentialBatchedQueriesProps<TItem, TData>) => {
  const [currentBatchIndex, setCurrentBatchIndex] = useState(1)

  const batches = useMemo(
    () => batchItemsByByteLimit(items, maxBytesPerQuery),
    [items, maxBytesPerQuery],
  )

  const selectedBatches = useMemo(
    () => batches.slice(0, currentBatchIndex),
    [batches, currentBatchIndex],
  )

  const { progress, isLastQuerySuccess, data } = useQueries({
    queries: selectedBatches.map((batch) => getQueryOptions(batch)),
    combine: (results) => {
      const successfulQueryCount = results.filter((r) => r.isSuccess).length
      const progress = Math.round((successfulQueryCount / batches.length) * 100)

      return {
        data: results.map((r) => r.data).filter(Boolean) as TData[],
        progress,
        isLastQuerySuccess: results[results.length - 1]?.isSuccess,
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
