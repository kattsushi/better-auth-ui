export type QueryClientLike<
  TOptions,
  TEnsureResult = unknown,
  TFetchResult = TEnsureResult,
  TPrefetchResult = void | Promise<void>
> = {
  ensureQueryData: (options: TOptions) => TEnsureResult
  prefetchQuery: (options: TOptions) => TPrefetchResult
  fetchQuery: (options: TOptions) => TFetchResult
}

export type ServerQueryClientLike<
  TOptions = unknown,
  TEnsureResult = unknown,
  TFetchResult = TEnsureResult,
  TPrefetchResult = void | Promise<void>
> = QueryClientLike<TOptions, TEnsureResult, TFetchResult, TPrefetchResult>

export const ensureServerQuery = <
  TOptions,
  TClient extends Pick<QueryClientLike<TOptions>, "ensureQueryData">
>(
  queryClient: TClient,
  options: TOptions
): ReturnType<TClient["ensureQueryData"]> =>
  queryClient.ensureQueryData(options) as ReturnType<TClient["ensureQueryData"]>

export const prefetchServerQuery = <
  TOptions,
  TClient extends Pick<QueryClientLike<TOptions>, "prefetchQuery">
>(
  queryClient: TClient,
  options: TOptions
): ReturnType<TClient["prefetchQuery"]> =>
  queryClient.prefetchQuery(options) as ReturnType<TClient["prefetchQuery"]>

export const fetchServerQuery = <
  TOptions,
  TClient extends Pick<QueryClientLike<TOptions>, "fetchQuery">
>(
  queryClient: TClient,
  options: TOptions
): ReturnType<TClient["fetchQuery"]> =>
  queryClient.fetchQuery(options) as ReturnType<TClient["fetchQuery"]>
