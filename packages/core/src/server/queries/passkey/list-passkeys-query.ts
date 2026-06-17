import { passkeyQueryKeys } from "../../../plugins/passkey/passkey-query-keys"
import type { PasskeyAuthServer } from "../../auth-server"
import { createServerQueryDescriptor } from "../../query-factory"

export type ListPasskeysData<TAuth extends PasskeyAuthServer> = Awaited<
  ReturnType<TAuth["api"]["listPasskeys"]>
>

export type ListPasskeysParams<TAuth extends PasskeyAuthServer> = Parameters<
  TAuth["api"]["listPasskeys"]
>[0]

export type ListPasskey<TAuth extends PasskeyAuthServer = PasskeyAuthServer> =
  NonNullable<ListPasskeysData<TAuth>> extends Array<infer TPasskey>
    ? TPasskey
    : never

export function listPasskeysOptions<TAuth extends PasskeyAuthServer>(
  auth: TAuth,
  userId: string,
  params: ListPasskeysParams<TAuth>
) {
  type TData = ListPasskeysData<TAuth>
  const queryKey = passkeyQueryKeys.list(userId, params?.query)

  return createServerQueryDescriptor<typeof queryKey, TData>({
    queryKey,
    queryFn: () => auth.api.listPasskeys(params) as Promise<TData>,
    name: "listPasskeys"
  })
}
