import { authQueryKeys } from "../../../lib/auth-query-keys"
import type { AuthServer } from "../../auth-server"
import { createServerQueryDescriptor } from "../../query-factory"

export type ListAccountsData<TAuth extends AuthServer = AuthServer> = Awaited<
  ReturnType<TAuth["api"]["listUserAccounts"]>
>

export type ListAccountsParams<TAuth extends AuthServer> = Parameters<
  TAuth["api"]["listUserAccounts"]
>[0]

export type ListAccount<TAuth extends AuthServer = AuthServer> = NonNullable<
  ListAccountsData<TAuth>
>[number]

export function listAccountsOptions<TAuth extends AuthServer>(
  auth: TAuth,
  userId: string,
  params: ListAccountsParams<TAuth>
) {
  type TData = ListAccountsData<TAuth>
  const queryKey = authQueryKeys.listAccounts(userId, params?.query)

  return createServerQueryDescriptor<typeof queryKey, TData>({
    queryKey,
    queryFn: () => auth.api.listUserAccounts(params) as Promise<TData>,
    name: "listAccounts"
  })
}
