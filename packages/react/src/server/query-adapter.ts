import {
  ensureServerQuery as ensureCoreServerQuery,
  fetchServerQuery as fetchCoreServerQuery,
  prefetchServerQuery as prefetchCoreServerQuery,
  type ServerQueryDescriptor
} from "@better-auth-ui/core/server"
import {
  type DataTag,
  type QueryClient,
  type QueryKey,
  queryOptions
} from "@tanstack/react-query"
import type { APIError } from "better-auth"

export type ReactServerQueryOptions<
  TQueryKey extends QueryKey,
  TData,
  TError = APIError
> = ReturnType<typeof queryOptions<TData, TError, TData, TQueryKey>> & {
  queryKey: DataTag<TQueryKey, TData, TError>
}

export function adaptServerQueryOptions<
  const TQueryKey extends QueryKey,
  TData,
  TError = APIError
>(
  descriptor: ServerQueryDescriptor<TQueryKey, TData, TError>
): ReactServerQueryOptions<TQueryKey, TData, TError> {
  const options = queryOptions<TData, TError, TData, TQueryKey>({
    queryKey: descriptor.queryKey,
    queryFn: descriptor.queryFn
  })

  return options as ReactServerQueryOptions<TQueryKey, TData, TError>
}

export function ensureServerQuery<
  const TQueryKey extends QueryKey,
  TData,
  TError = APIError
>(
  queryClient: QueryClient,
  options: ReactServerQueryOptions<TQueryKey, TData, TError>
): Promise<TData> {
  return ensureCoreServerQuery(
    queryClient as unknown as {
      ensureQueryData: (
        options: ReactServerQueryOptions<TQueryKey, TData, TError>
      ) => Promise<TData>
    },
    options
  )
}

export function prefetchServerQuery<
  const TQueryKey extends QueryKey,
  TData,
  TError = APIError
>(
  queryClient: QueryClient,
  options: ReactServerQueryOptions<TQueryKey, TData, TError>
): Promise<void> {
  return prefetchCoreServerQuery(
    queryClient as unknown as {
      prefetchQuery: (
        options: ReactServerQueryOptions<TQueryKey, TData, TError>
      ) => Promise<void>
    },
    options
  )
}

export function fetchServerQuery<
  const TQueryKey extends QueryKey,
  TData,
  TError = APIError
>(
  queryClient: QueryClient,
  options: ReactServerQueryOptions<TQueryKey, TData, TError>
): Promise<TData> {
  return fetchCoreServerQuery(
    queryClient as unknown as {
      fetchQuery: (
        options: ReactServerQueryOptions<TQueryKey, TData, TError>
      ) => Promise<TData>
    },
    options
  )
}
