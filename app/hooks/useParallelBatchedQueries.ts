import { useQueries, UseQueryOptions } from "@tanstack/react-query"
import { ItemBatch } from "@/types"
import { useMemo } from "react"

interface UseParallelBatchedQueriesProps<TItem, TData> {
  getQueryOptions: (batch: ItemBatch<TItem>) => UseQueryOptions<TData>
  getBatchedItems: () => ItemBatch<TItem>[]
}

export const useParallelBatchedQueries = <TItem, TData>({
  getBatchedItems,
  getQueryOptions,
}: UseParallelBatchedQueriesProps<TItem, TData>) => {
  const batches = useMemo(() => getBatchedItems(), [getBatchedItems])

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
