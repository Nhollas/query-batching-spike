"use client"

import { QueryClientProvider as QCP, QueryClient } from "@tanstack/react-query"

function QueryClientProvider({ children }: React.PropsWithChildren) {
  const queryClient = new QueryClient()

  return <QCP client={queryClient}>{children}</QCP>
}

export default QueryClientProvider
