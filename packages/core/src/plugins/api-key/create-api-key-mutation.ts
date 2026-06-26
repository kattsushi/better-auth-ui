import type { MutationOptions } from "@tanstack/query-core"
import type { BetterFetchError } from "better-auth/client"
import type { ApiKeyAuthClient } from "./api-key-auth-client"
import { apiKeyMutationKeys } from "./api-key-mutation-keys"
import { apiKeyQueryKeys } from "./api-key-query-keys"

export type CreateApiKeyParams<TAuthClient extends ApiKeyAuthClient> =
  Parameters<TAuthClient["apiKey"]["create"]>[0]

type CreateApiKeyResult<TAuthClient extends ApiKeyAuthClient> = Awaited<
  ReturnType<TAuthClient["apiKey"]["create"]>
>

type CreateApiKeyData<TAuthClient extends ApiKeyAuthClient> = [
  Extract<CreateApiKeyResult<TAuthClient>, { data: unknown }>
] extends [never]
  ? CreateApiKeyResult<TAuthClient>
  : Extract<CreateApiKeyResult<TAuthClient>, { data: unknown }>["data"]

export type CreateApiKeyOptions<TAuthClient extends ApiKeyAuthClient> = Omit<
  ReturnType<typeof createApiKeyOptions<TAuthClient>>,
  "mutationKey" | "mutationFn" | "meta"
>

/**
 * Mutation options factory for creating an API key.
 *
 * @param authClient - The Better Auth API key client.
 * @param userId - The current signed-in user's ID. Used for cache partitioning.
 */
export function createApiKeyOptions<TAuthClient extends ApiKeyAuthClient>(
  authClient: TAuthClient,
  userId?: string
): MutationOptions<
  CreateApiKeyData<TAuthClient>,
  BetterFetchError,
  CreateApiKeyParams<TAuthClient>
> {
  const mutationKey = apiKeyMutationKeys.create

  const mutationFn = (params: CreateApiKeyParams<TAuthClient>) =>
    authClient.apiKey.create({
      ...params,
      fetchOptions: { ...params?.fetchOptions, throw: true }
    })

  return {
    mutationKey,
    mutationFn,
    meta: {
      awaits: [apiKeyQueryKeys.lists(userId)]
    }
  } as MutationOptions<
    CreateApiKeyData<TAuthClient>,
    BetterFetchError,
    CreateApiKeyParams<TAuthClient>
  >
}
