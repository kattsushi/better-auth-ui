import { authQueryKeys } from "../../../lib/auth-query-keys"
import type { AuthServer } from "../../auth-server"
import { createServerQueryDescriptor } from "../../query-factory"

export type ListSessionsData<TAuth extends AuthServer = AuthServer> = Awaited<
  ReturnType<TAuth["api"]["listSessions"]>
>

export type ListSessionsParams<TAuth extends AuthServer> = Parameters<
  TAuth["api"]["listSessions"]
>[0]

export type ListSession<TAuth extends AuthServer = AuthServer> = NonNullable<
  ListSessionsData<TAuth>
>[number]

export function listSessionsOptions<TAuth extends AuthServer>(
  auth: TAuth,
  userId: string,
  params: ListSessionsParams<TAuth>
) {
  type TData = ListSessionsData<TAuth>
  const queryKey = authQueryKeys.listSessions(userId, params?.query)

  return createServerQueryDescriptor<typeof queryKey, TData>({
    queryKey,
    queryFn: () => auth.api.listSessions(params) as Promise<TData>,
    name: "listSessions"
  })
}
