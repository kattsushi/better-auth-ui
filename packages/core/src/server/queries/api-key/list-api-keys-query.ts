import { apiKeyQueryKeys } from "../../../plugins/api-key/api-key-query-keys"
import type { ApiKeyAuthServer } from "../../auth-server"
import { createServerQueryDescriptor } from "../../query-factory"

export type ListApiKeysData<TAuth extends ApiKeyAuthServer = ApiKeyAuthServer> =
  Awaited<ReturnType<TAuth["api"]["listApiKeys"]>>

export type ListedApiKey<TAuth extends ApiKeyAuthServer = ApiKeyAuthServer> =
  NonNullable<ListApiKeysData<TAuth>> extends { apiKeys: Array<infer TApiKey> }
    ? TApiKey
    : never

export type ListApiKeysParams<
  TAuth extends ApiKeyAuthServer = ApiKeyAuthServer
> = Parameters<TAuth["api"]["listApiKeys"]>[0]

export function listApiKeysOptions<TAuth extends ApiKeyAuthServer>(
  auth: TAuth,
  userId: string,
  params: ListApiKeysParams<TAuth>
) {
  type TData = ListApiKeysData<TAuth>
  const queryKey = apiKeyQueryKeys.list(userId, params?.query)

  return createServerQueryDescriptor<typeof queryKey, TData>({
    queryKey,
    queryFn: () => auth.api.listApiKeys(params) as Promise<TData>,
    name: "listApiKeys"
  })
}
