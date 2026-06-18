import { describe, expect, expectTypeOf, it } from "vitest"
import type {
  AuthClientLike,
  AuthMethodData,
  AuthMethodError,
  AuthMethodLike,
  AuthMethodParams,
  AuthMethodResult
} from "../src"

type ReactLikeClient = {
  getSession: (params: {
    query?: { fresh?: boolean }
    fetchOptions?: { throw?: boolean }
  }) => Promise<{
    data: { userId: string; framework: "react-like" }
    error: { code: "UNAUTHORIZED" } | null
  }>
}

type SolidLikeClient = {
  passkey: {
    listUserPasskeys: (params?: {
      query?: { userId?: string }
      fetchOptions?: { signal?: AbortSignal; throw?: boolean }
    }) => Promise<{
      data: Array<{ id: string; framework: "solid-like" }>
      error: null
    }>
  }
}

type PlainMethod = (params: { id: string }) => Promise<{ id: string }>
type ZeroArgMethod = () => Promise<{ data: { ready: true }; error: null }>

describe("core structural auth method inference", () => {
  it("infers params, result, data, and error from react-like auth methods", () => {
    type Method = ReactLikeClient["getSession"]

    expectTypeOf<Method>().toMatchTypeOf<AuthMethodLike>()
    expectTypeOf<ReactLikeClient>().toMatchTypeOf<AuthClientLike>()
    expectTypeOf<AuthMethodParams<Method>>().toEqualTypeOf<{
      query?: { fresh?: boolean }
      fetchOptions?: { throw?: boolean }
    }>()
    expectTypeOf<AuthMethodResult<Method>>().toEqualTypeOf<{
      data: { userId: string; framework: "react-like" }
      error: { code: "UNAUTHORIZED" } | null
    }>()
    expectTypeOf<AuthMethodData<Method>>().toEqualTypeOf<{
      userId: string
      framework: "react-like"
    }>()
    expectTypeOf<AuthMethodError<Method>>().toEqualTypeOf<{
      code: "UNAUTHORIZED"
    } | null>()

    expect(true).toBe(true)
  })

  it("infers optional params from solid-like nested auth methods", () => {
    type Method = SolidLikeClient["passkey"]["listUserPasskeys"]

    expectTypeOf<Method>().toMatchTypeOf<AuthMethodLike>()
    expectTypeOf<SolidLikeClient>().toMatchTypeOf<AuthClientLike>()
    expectTypeOf<AuthMethodParams<Method>>().toEqualTypeOf<
      | {
          query?: { userId?: string }
          fetchOptions?: { signal?: AbortSignal; throw?: boolean }
        }
      | undefined
    >()
    expectTypeOf<AuthMethodData<Method>>().toEqualTypeOf<
      Array<{ id: string; framework: "solid-like" }>
    >()
    expectTypeOf<AuthMethodError<Method>>().toEqualTypeOf<null>()

    expect(true).toBe(true)
  })

  it("infers zero-arg auth methods as undefined params", () => {
    expectTypeOf<AuthMethodParams<ZeroArgMethod>>().toEqualTypeOf<undefined>()
    expectTypeOf<AuthMethodData<ZeroArgMethod>>().toEqualTypeOf<{
      ready: true
    }>()
    expectTypeOf<AuthMethodError<ZeroArgMethod>>().toEqualTypeOf<null>()

    expect(true).toBe(true)
  })

  it("falls back to the whole resolved result when a method has no data envelope", () => {
    expectTypeOf<AuthMethodData<PlainMethod>>().toEqualTypeOf<{ id: string }>()
    expectTypeOf<AuthMethodError<PlainMethod>>().toEqualTypeOf<unknown>()

    expect(true).toBe(true)
  })
})
