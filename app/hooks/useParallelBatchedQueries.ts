import { useQueries, UseQueryOptions } from "@tanstack/react-query"
import { batchItemsByByteLimit } from "@/lib/batch-items-by-byte-limit"
import { ItemBatch } from "@/types"
import { useMemo } from "react"

interface UseParallelBatchedQueriesProps<TItem, TData> {
  items: TItem[]
  getQueryOptions: (batch: ItemBatch<TItem>) => UseQueryOptions<TData>
  maxBytesPerQuery: number
}

export const useParallelBatchedQueries = <TItem, TData>({
  items,
  getQueryOptions,
  maxBytesPerQuery,
}: UseParallelBatchedQueriesProps<TItem, TData>) => {
  const batches = useMemo(
    () => batchItemsByByteLimit(items, maxBytesPerQuery),
    [items, maxBytesPerQuery],
  )

  return useQueries({
    queries: batches.map((batch) => getQueryOptions(batch)),
    combine(results) {
      return {
        data: results.map((r) => r.data).filter(Boolean) as TData[],
        isPending: results.some((result) => result.isPending),
        isError: results.find((result) => result.isError),
      }
    },
  })
}
