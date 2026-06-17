import { authQueryKeys } from "../../../lib/auth-query-keys"
import type { AuthServer } from "../../auth-server"
import { createServerQueryDescriptor } from "../../query-factory"

export type SessionData<TAuth extends AuthServer = AuthServer> = Awaited<
  ReturnType<TAuth["api"]["getSession"]>
>

export type Session<TAuth extends AuthServer = AuthServer> = NonNullable<
  SessionData<TAuth>
>

export type SessionParams<TAuth extends AuthServer> = Parameters<
  TAuth["api"]["getSession"]
>[0]

export function sessionOptions<TAuth extends AuthServer>(
  auth: TAuth,
  params: SessionParams<TAuth>
) {
  type TData = SessionData<TAuth>

  return createServerQueryDescriptor<typeof authQueryKeys.session, TData>({
    queryKey: authQueryKeys.session,
    queryFn: () => auth.api.getSession(params) as Promise<TData>,
    name: "session"
  })
}
