import QueryClientProvider from "@/providers/query-client-provider"
import "./globals.css"
import { PropsWithChildren } from "react"
import Link from "next/link"

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <QueryClientProvider>
      <html lang="en" className="bg-black">
        <body>
          <header>
            <nav>
              <ul className="flex gap-4 p-4 *:bg-white *:p-2 *:rounded-md *:text-black">
                <li>
                  <Link href="/sequential">Sequential</Link>
                </li>
                <li>
                  <Link href="/parallel">Parallel</Link>
                </li>
              </ul>
            </nav>
          </header>
          <main className="p-4">{children}</main>
        </body>
      </html>
    </QueryClientProvider>
  )
}
