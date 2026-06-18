export type AuthMethodLike<TParams = unknown, TResult = unknown> =
  | ((params: TParams) => Promise<TResult>)
  | ((...args: never[]) => Promise<TResult>)

export type AuthClientLike = Record<string, unknown>

export type AuthMethodParams<TMethod> = TMethod extends (
  ...args: infer TArgs
) => Promise<unknown>
  ? TArgs extends []
    ? undefined
    : TArgs[0]
  : never

export type AuthMethodResult<TMethod> = TMethod extends (
  ...args: never[]
) => Promise<infer TResult>
  ? TResult
  : never

export type AuthMethodData<TMethod> =
  AuthMethodResult<TMethod> extends {
    data: infer TData
  }
    ? TData
    : AuthMethodResult<TMethod>

export type AuthMethodError<TMethod> =
  AuthMethodResult<TMethod> extends {
    error: infer TError
  }
    ? TError
    : unknown
