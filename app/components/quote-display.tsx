import { GetQuoteResponse } from "@/quote-query-options"
import { UseQueryResult } from "@tanstack/react-query"

export const QuoteDisplay = ({
  result,
}: {
  result: UseQueryResult<GetQuoteResponse, Error>
}) => {
  const { error, data, isPending } = result

  if (error)
    return <div className="text-red-500">Quote Error: {error.message}</div>

  /*
    TODO: Instead of just showing loading, show a faded out version of the product we are quoting for.

    Maybe start with the product category and name.
  */
  if (isPending) {
    return <div className="text-white/50">Loading...</div>
  }

  return <div>Quote: {data.id}</div>
}
