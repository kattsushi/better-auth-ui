import { describe, expect, it } from "vitest"
import type {
  ApiKeyAuthServer,
  AuthServer,
  ListDeviceSession,
  ListedApiKey,
  ListOrganization,
  ListPasskey,
  MultiSessionAuthServer,
  OrganizationAuthServer,
  PasskeyAuthServer
} from "../src/server"

type IsNever<T> = [T] extends [never] ? true : false
type ExpectFalse<T extends false> = T

describe("core server auth types", () => {
  it("exports portable server auth contracts", () => {
    const acceptsAuthServer = <TAuth extends AuthServer>(_auth?: TAuth) => true
    const acceptsApiKeyAuthServer = <TAuth extends ApiKeyAuthServer>(
      _auth?: TAuth
    ) => true
    const acceptsOrganizationAuthServer = <
      TAuth extends OrganizationAuthServer
    >(
      _auth?: TAuth
    ) => true
    const acceptsPasskeyAuthServer = <TAuth extends PasskeyAuthServer>(
      _auth?: TAuth
    ) => true
    const acceptsMultiSessionAuthServer = <
      TAuth extends MultiSessionAuthServer
    >(
      _auth?: TAuth
    ) => true

    expect(acceptsAuthServer()).toBe(true)
    expect(acceptsApiKeyAuthServer()).toBe(true)
    expect(acceptsOrganizationAuthServer()).toBe(true)
    expect(acceptsPasskeyAuthServer()).toBe(true)
    expect(acceptsMultiSessionAuthServer()).toBe(true)
  })

  it("keeps public default extracted aliases usable", () => {
    type ListedApiKeyIsUsable = ExpectFalse<IsNever<ListedApiKey>>
    type ListDeviceSessionIsUsable = ExpectFalse<IsNever<ListDeviceSession>>
    type ListOrganizationIsUsable = ExpectFalse<IsNever<ListOrganization>>
    type ListPasskeyIsUsable = ExpectFalse<IsNever<ListPasskey>>

    const assertions: [
      ListedApiKeyIsUsable,
      ListDeviceSessionIsUsable,
      ListOrganizationIsUsable,
      ListPasskeyIsUsable
    ] = [false, false, false, false]

    expect(assertions).toEqual([false, false, false, false])
  })
})
