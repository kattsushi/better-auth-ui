import {
  type AuthClient,
  type ListSessionsOptions,
  type ListSessionsParams,
  listSessionsOptions
} from "@better-auth-ui/core"
import { useQuery } from "@tanstack/solid-query"
import { getSessionUserId } from "../../queries/create-user-scoped-query"
import { useSession } from "./use-session"

export type UseListSessionsOptions<TAuthClient extends AuthClient> = Omit<
  ListSessionsOptions<TAuthClient>,
  "enabled" | "initialData"
> &
  Partial<NonNullable<ListSessionsParams<TAuthClient>>> & {
    enabled?: boolean | ((query: never) => boolean)
  }

export function useListSessions<TAuthClient extends AuthClient>(
  authClient: TAuthClient,
  options: UseListSessionsOptions<TAuthClient> = {}
) {
  const session = useSession(authClient)
  const userId = () => getSessionUserId(session)
  const { query, fetchOptions, enabled, ...restOptions } = options
  const queryOptions = restOptions as Omit<
    ListSessionsOptions<TAuthClient>,
    "enabled" | "initialData"
  >

  return useQuery(() => {
    const { initialData: _initialData, ...baseOptions } = listSessionsOptions(
      authClient,
      userId(),
      {
        query,
        fetchOptions
      }
    )

    return {
      ...queryOptions,
      ...baseOptions,
      enabled: (query) =>
        Boolean(userId()) &&
        (typeof enabled === "function"
          ? enabled(query as never)
          : enabled !== false)
    }
  })
}
