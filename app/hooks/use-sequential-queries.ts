import { useQueries, UseQueryOptions } from "@tanstack/react-query"
import { useEffect, useState } from "react"

interface UseSequentialQueriesProps<TItem, TData> {
  getQueryOptions: (item: TItem) => UseQueryOptions<TData>
  items: TItem[]
}

export const useSequentialQueries = <TItem, TData>({
  getQueryOptions,
  items,
}: UseSequentialQueriesProps<TItem, TData>) => {
  const [currentQueryIndex, setCurrentQueryIndex] = useState(1)

  const selectedItems = items.slice(0, currentQueryIndex)

  const { progress, isLastQueryFetched, results } = useQueries({
    queries: selectedItems.map((item) => getQueryOptions(item)),
    combine: (results) => {
      const completedQueryCount = results.filter((r) => r.isFetched).length
      const progress = Math.round((completedQueryCount / items.length) * 100)

      return {
        results,
        progress,
        isLastQueryFetched: results[results.length - 1]?.isFetched,
      }
    },
  })

  useEffect(() => {
    if (isLastQueryFetched && currentQueryIndex < items.length) {
      setCurrentQueryIndex((prev) => prev + 1)
    }
  }, [isLastQueryFetched, currentQueryIndex, items.length])

  return {
    results,
    progress,
    currentQuery: currentQueryIndex,
  }
}
