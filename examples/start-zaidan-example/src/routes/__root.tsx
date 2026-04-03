import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRouteWithContext,
} from '@tanstack/solid-router'
import { HydrationScript } from 'solid-js/web'
import { Suspense } from 'solid-js'
import { Header } from '../components/header'
import styleCss from '../styles.css?url'
import { Providers } from '../components/providers'
import { setAuthClientFactory } from "@better-auth-ui/solid"
import { getAuthClient } from "@/lib/auth-client"

// Set the factory at module load time
setAuthClientFactory(() => getAuthClient())

export const Route = createRootRouteWithContext()({
  head: () => ({
    links: [{ rel: 'stylesheet', href: styleCss }],
  }),
  shellComponent: RootComponent,
})

function RootComponent() {
  return (
    <html>
      <head>
        <HydrationScript />
        <HeadContent />
      </head>
      <body>
        <Suspense>
          <Providers>
            <Header />
            <Outlet />
          </Providers>
        </Suspense>
        <Scripts />
      </body>
    </html>
  )
}
