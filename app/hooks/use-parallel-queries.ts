import { useQueries, UseQueryOptions } from "@tanstack/react-query"

interface UseParallelQueriesProps<TItem, TData> {
  getQueryOptions: (item: TItem) => UseQueryOptions<TData>
  items: TItem[]
}

export const useParallelQueries = <TItem, TData>({
  items,
  getQueryOptions,
}: UseParallelQueriesProps<TItem, TData>) => {
  return useQueries({
    queries: items.map((item) => getQueryOptions(item)),
  })
}
