import QueryClientProvider from "@/providers/query-client-provider"
import "./globals.css"
import { PropsWithChildren } from "react"

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <QueryClientProvider>
      <html lang="en" className="bg-black">
        <body>
          <main>{children}</main>
        </body>
      </html>
    </QueryClientProvider>
  )
}
