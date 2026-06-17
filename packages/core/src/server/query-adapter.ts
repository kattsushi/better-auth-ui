export type ServerQueryClientLike<TOptions = unknown> = {
  ensureQueryData: (options: TOptions) => unknown
  prefetchQuery: (options: TOptions) => unknown
  fetchQuery: (options: TOptions) => unknown
}

export const ensureServerQuery = <
  TOptions,
  TClient extends ServerQueryClientLike<TOptions>
>(
  queryClient: TClient,
  options: TOptions
) => queryClient.ensureQueryData(options)

export const prefetchServerQuery = <
  TOptions,
  TClient extends ServerQueryClientLike<TOptions>
>(
  queryClient: TClient,
  options: TOptions
) => queryClient.prefetchQuery(options)

export const fetchServerQuery = <
  TOptions,
  TClient extends ServerQueryClientLike<TOptions>
>(
  queryClient: TClient,
  options: TOptions
) => queryClient.fetchQuery(options)
