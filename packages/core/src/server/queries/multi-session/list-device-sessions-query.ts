import { multiSessionQueryKeys } from "../../../plugins/multi-session/multi-session-query-keys"
import type { MultiSessionAuthServer } from "../../auth-server"
import { createServerQueryDescriptor } from "../../query-factory"

export type ListDeviceSessionsData<TAuth extends MultiSessionAuthServer> =
  Awaited<ReturnType<TAuth["api"]["listDeviceSessions"]>>

export type ListDeviceSession<
  TAuth extends MultiSessionAuthServer = MultiSessionAuthServer
> =
  NonNullable<ListDeviceSessionsData<TAuth>> extends Array<infer TSession>
    ? TSession
    : never

export type ListDeviceSessionsParams<TAuth extends MultiSessionAuthServer> =
  Parameters<TAuth["api"]["listDeviceSessions"]>[0]

export function listDeviceSessionsOptions<TAuth extends MultiSessionAuthServer>(
  auth: TAuth,
  userId: string,
  params: ListDeviceSessionsParams<TAuth>
) {
  type TData = ListDeviceSessionsData<TAuth>
  const queryKey = multiSessionQueryKeys.list(userId, params?.query)

  return createServerQueryDescriptor<typeof queryKey, TData>({
    queryKey,
    queryFn: () => auth.api.listDeviceSessions(params) as Promise<TData>,
    name: "listDeviceSessions"
  })
}
