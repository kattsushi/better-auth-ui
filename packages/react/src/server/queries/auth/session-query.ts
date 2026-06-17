import {
  type AuthServer,
  sessionOptions as coreSessionOptions,
  type Session,
  type SessionData,
  type SessionParams
} from "@better-auth-ui/core/server"
import type { QueryClient } from "@tanstack/react-query"
import {
  adaptServerQueryOptions,
  ensureServerQuery,
  fetchServerQuery,
  prefetchServerQuery
} from "../../query-adapter"

export type { Session, SessionData, SessionParams }

export function sessionOptions<TAuth extends AuthServer>(
  auth: TAuth,
  params: SessionParams<TAuth>
) {
  return adaptServerQueryOptions(coreSessionOptions(auth, params))
}

export const ensureSession = <TAuth extends AuthServer>(
  queryClient: QueryClient,
  auth: TAuth,
  params: SessionParams<TAuth>
) =>
  ensureServerQuery<SessionData<TAuth>>(
    queryClient,
    sessionOptions(auth, params)
  )

export const prefetchSession = <TAuth extends AuthServer>(
  queryClient: QueryClient,
  auth: TAuth,
  params: SessionParams<TAuth>
) => prefetchServerQuery(queryClient, sessionOptions(auth, params))

export const fetchSession = <TAuth extends AuthServer>(
  queryClient: QueryClient,
  auth: TAuth,
  params: SessionParams<TAuth>
) =>
  fetchServerQuery<SessionData<TAuth>>(
    queryClient,
    sessionOptions(auth, params)
  )
