import { useQueries, UseQueryOptions } from "@tanstack/react-query"
import { ItemBatch } from "@/types"

interface UseParallelBatchedQueriesProps<TItem, TData> {
  getQueryOptions: (batch: ItemBatch<TItem>) => UseQueryOptions<TData>
  batches: ItemBatch<TItem>[]
}

export const useParallelBatchedQueries = <TItem, TData>({
  batches,
  getQueryOptions,
}: UseParallelBatchedQueriesProps<TItem, TData>) => {
  return useQueries({
    queries: batches.map((batch) => getQueryOptions(batch)),
  })
}
