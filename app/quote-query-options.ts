import { Product } from "@/types"
import { NextApiClient } from "./lib/clients/next-api-client"
import { QueryOptions } from "@tanstack/react-query"

type QuoteQueryOptionsParams = {
  queryKey: unknown[]
  items: Product[]
}

export const quoteQueryOptions = ({
  queryKey,
  items,
}: QuoteQueryOptionsParams) => {
  return {
    queryKey,
    queryFn: () => getQuotes(items),
  } satisfies QueryOptions
}

export const getQuotes = async (items: Product[]): Promise<{ id: string }> => {
  const response = await NextApiClient.fetch("/quote", {
    method: "POST",
    body: JSON.stringify(items),
  })
  return response.json()
}
