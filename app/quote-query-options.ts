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
    retry: false,
  } satisfies QueryOptions
}

export type GetQuoteResponse = {
  id: string
}

export const getQuotes = async (
  items: Product[],
): Promise<GetQuoteResponse> => {
  const response = await NextApiClient.fetch("/quote", {
    method: "POST",
    body: JSON.stringify(items),
  })

  if (!response.ok) {
    throw new Error("Failed to fetch quotes")
  }
  return response.json()
}
