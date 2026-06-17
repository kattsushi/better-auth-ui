import {
  ensureServerQuery as ensureCoreServerQuery,
  fetchServerQuery as fetchCoreServerQuery,
  prefetchServerQuery as prefetchCoreServerQuery,
  type ServerQueryClientLike,
  type ServerQueryDescriptor
} from "@better-auth-ui/core/server"
import {
  type DataTag,
  type QueryClient,
  type QueryKey,
  queryOptions
} from "@tanstack/solid-query"
import type { APIError } from "better-auth"

export type SolidServerQueryOptions<
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
): SolidServerQueryOptions<TQueryKey, TData, TError> {
  const options = queryOptions<TData, TError, TData, TQueryKey>({
    queryKey: descriptor.queryKey,
    queryFn: descriptor.queryFn
  })

  return options as SolidServerQueryOptions<TQueryKey, TData, TError>
}

const asServerQueryClient = (queryClient: QueryClient) =>
  queryClient as unknown as ServerQueryClientLike<unknown>

export const ensureServerQuery = <TData>(
  queryClient: QueryClient,
  options: unknown
) =>
  ensureCoreServerQuery(
    asServerQueryClient(queryClient),
    options
  ) as Promise<TData>

export const prefetchServerQuery = (
  queryClient: QueryClient,
  options: unknown
) =>
  prefetchCoreServerQuery(
    asServerQueryClient(queryClient),
    options
  ) as Promise<void>

export const fetchServerQuery = <TData>(
  queryClient: QueryClient,
  options: unknown
) =>
  fetchCoreServerQuery(
    asServerQueryClient(queryClient),
    options
  ) as Promise<TData>
