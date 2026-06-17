import { authQueryKeys } from "../../../lib/auth-query-keys"
import type { AuthServer } from "../../auth-server"
import { createServerQueryDescriptor } from "../../query-factory"

export type AccountInfoData<TAuth extends AuthServer = AuthServer> = Awaited<
  ReturnType<TAuth["api"]["accountInfo"]>
>

export type AccountInfoParams<TAuth extends AuthServer> = Parameters<
  TAuth["api"]["accountInfo"]
>[0]

export type AccountInfo<TAuth extends AuthServer = AuthServer> = NonNullable<
  AccountInfoData<TAuth>
>

export function accountInfoOptions<TAuth extends AuthServer>(
  auth: TAuth,
  userId: string,
  params: AccountInfoParams<TAuth>
) {
  type TData = AccountInfoData<TAuth>
  const queryKey = authQueryKeys.accountInfo(userId, params?.query)

  return createServerQueryDescriptor<typeof queryKey, TData>({
    queryKey,
    queryFn: () => auth.api.accountInfo(params) as Promise<TData>,
    name: "accountInfo"
  })
}
