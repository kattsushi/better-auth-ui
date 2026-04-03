import { cleanup, render } from "@solidjs/testing-library"
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import { createSignOut } from "../../src/hooks/auth/create-sign-out"
import type { SolidAuthClient } from "../../src/lib/auth-client"
import { AuthProvider } from "../../src/lib/auth-context"

// Factory to create mock auth client
const createMockAuthClient = (
  overrides: Partial<SolidAuthClient> = {}
): SolidAuthClient => ({
  getSession: vi.fn().mockResolvedValue({ data: null }),
  signIn: {
    email: vi.fn(),
    social: vi.fn(),
    magicLink: vi.fn()
  },
  signUp: {
    email: vi.fn()
  },
  signOut: vi.fn().mockResolvedValue(undefined),
  updateUser: vi.fn(),
  changePassword: vi.fn(),
  mfa: {
    enable: vi.fn(),
    disable: vi.fn()
  },
  ...overrides
})

// Test component to use createSignOut hook
const TestComponent = (props: {
  onSignOut: (signOut: ReturnType<typeof createSignOut>) => void
  trigger?: () => void
}) => {
  const signOut = createSignOut()
  props.onSignOut(signOut)
  if (props.trigger) {
    props.trigger()
  }
  return <div data-testid="test-component">Test</div>
}

describe("createSignOut", () => {
  beforeEach(() => {
    cleanup()
  })

  afterEach(() => {
    cleanup()
  })

  it("should return isLoading and error signals", async () => {
    const mockAuthClient = createMockAuthClient()

    let signOutResult: ReturnType<typeof createSignOut> | null = null

    render(() => (
      <AuthProvider authClient={mockAuthClient}>
        <TestComponent
          onSignOut={(signOut) => {
            signOutResult = signOut
          }}
        />
      </AuthProvider>
    ))

    expect(signOutResult).not.toBeNull()
    expect(signOutResult!.isLoading).toBeDefined()
    expect(signOutResult!.error).toBeDefined()
  })

  it("should return signOut function", async () => {
    const mockAuthClient = createMockAuthClient()

    let signOutResult: ReturnType<typeof createSignOut> | null = null

    render(() => (
      <AuthProvider authClient={mockAuthClient}>
        <TestComponent
          onSignOut={(signOut) => {
            signOutResult = signOut
          }}
        />
      </AuthProvider>
    ))

    expect(typeof signOutResult!.signOut).toBe("function")
  })

  it("should execute mutation when signOut is called", async () => {
    const mockAuthClient = createMockAuthClient()

    let signOutResult: ReturnType<typeof createSignOut> | null = null

    render(() => (
      <AuthProvider authClient={mockAuthClient}>
        <TestComponent
          onSignOut={(signOut) => {
            signOutResult = signOut
          }}
        />
      </AuthProvider>
    ))

    await signOutResult!.signOut()

    expect(mockAuthClient.signOut).toHaveBeenCalledTimes(1)
    expect(mockAuthClient.signOut).toHaveBeenCalledWith({
      fetchOptions: { throw: true }
    })
  })

  it("should handle success case", async () => {
    const mockAuthClient = createMockAuthClient({
      signOut: vi.fn().mockResolvedValue(undefined)
    })

    let signOutResult: ReturnType<typeof createSignOut> | null = null

    render(() => (
      <AuthProvider authClient={mockAuthClient}>
        <TestComponent
          onSignOut={(signOut) => {
            signOutResult = signOut
          }}
        />
      </AuthProvider>
    ))

    await signOutResult!.signOut()

    expect(signOutResult!.isLoading()).toBe(false)
    expect(signOutResult!.error()).toBeNull()
  })

  it("should handle error case", async () => {
    const errorMessage = "Failed to sign out"
    const mockAuthClient = createMockAuthClient({
      signOut: vi.fn().mockRejectedValue(new Error(errorMessage))
    })

    let signOutResult: ReturnType<typeof createSignOut> | null = null

    render(() => (
      <AuthProvider authClient={mockAuthClient}>
        <TestComponent
          onSignOut={(signOut) => {
            signOutResult = signOut
          }}
        />
      </AuthProvider>
    ))

    await expect(signOutResult!.signOut()).rejects.toThrow(errorMessage)

    expect(signOutResult!.error()).not.toBeNull()
    expect(signOutResult!.error()?.message).toBe(errorMessage)
    expect(signOutResult!.isLoading()).toBe(false)
  })

  it("should handle loading state correctly", async () => {
    let resolveSignOut: (value: unknown) => void
    const signOutPromise = new Promise((resolve) => {
      resolveSignOut = resolve
    })

    const mockAuthClient = createMockAuthClient({
      signOut: vi.fn().mockImplementation(() => signOutPromise)
    })

    let signOutResult: ReturnType<typeof createSignOut> | null = null
    let triggerFn: (() => void) | null = null

    render(() => (
      <AuthProvider authClient={mockAuthClient}>
        <TestComponent
          onSignOut={(signOut) => {
            signOutResult = signOut
          }}
          trigger={() => {
            triggerFn = () => {
              signOutResult!.signOut()
            }
          }}
        />
      </AuthProvider>
    ))

    // Initial state
    expect(signOutResult!.isLoading()).toBe(false)

    // Trigger sign out
    triggerFn!()

    // Should be loading now
    expect(signOutResult!.isLoading()).toBe(true)

    // Resolve the promise
    resolveSignOut!(undefined)

    // Wait for the promise to settle
    await new Promise((resolve) => setTimeout(resolve, 50))

    // Should not be loading anymore
    expect(signOutResult!.isLoading()).toBe(false)
  })
})
