import { cleanup, render } from "@solidjs/testing-library"
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import { createSignInEmail } from "../../src/hooks/auth/create-sign-in-email"
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

// Test component to use createSignInEmail hook
const TestComponent = (props: {
  onSignIn: (signIn: ReturnType<typeof createSignInEmail>) => void
  trigger?: () => void
}) => {
  const signIn = createSignInEmail()
  // Pass signIn back to test
  props.onSignIn(signIn)
  // If trigger is provided, call it after mount
  if (props.trigger) {
    props.trigger()
  }
  return <div data-testid="test-component">Test</div>
}

describe("createSignInEmail", () => {
  beforeEach(() => {
    cleanup()
  })

  afterEach(() => {
    cleanup()
  })

  it("should return isLoading and error signals", async () => {
    const mockAuthClient = createMockAuthClient()

    let signInResult: ReturnType<typeof createSignInEmail> | null = null

    render(() => (
      <AuthProvider authClient={mockAuthClient}>
        <TestComponent
          onSignIn={(signIn) => {
            signInResult = signIn
          }}
        />
      </AuthProvider>
    ))

    expect(signInResult).not.toBeNull()
    expect(signInResult!.isLoading).toBeDefined()
    expect(signInResult!.error).toBeDefined()
  })

  it("should return signInEmail function", async () => {
    const mockAuthClient = createMockAuthClient()

    let signInResult: ReturnType<typeof createSignInEmail> | null = null

    render(() => (
      <AuthProvider authClient={mockAuthClient}>
        <TestComponent
          onSignIn={(signIn) => {
            signInResult = signIn
          }}
        />
      </AuthProvider>
    ))

    expect(typeof signInResult!.signInEmail).toBe("function")
  })

  it("should update isLoading to true when signing in", async () => {
    // Create a promise that we can resolve manually
    let resolveSignIn: (value: unknown) => void
    const signInPromise = new Promise((resolve) => {
      resolveSignIn = resolve
    })

    const mockAuthClient = createMockAuthClient({
      signIn: {
        email: vi.fn().mockImplementation(() => signInPromise),
        social: vi.fn(),
        magicLink: vi.fn()
      }
    })

    let signInResult: ReturnType<typeof createSignInEmail> | null = null

    render(() => (
      <AuthProvider authClient={mockAuthClient}>
        <TestComponent
          onSignIn={(signIn) => {
            signInResult = signIn
          }}
          trigger={() => {
            signInResult!.signInEmail({
              email: "test@example.com",
              password: "password"
            })
          }}
        />
      </AuthProvider>
    ))

    // Wait for the signInEmail to be called
    await new Promise((resolve) => setTimeout(resolve, 50))

    // isLoading should be true while signing in
    expect(signInResult!.isLoading()).toBe(true)
  })

  it("should handle success case", async () => {
    const mockAuthClient = createMockAuthClient({
      signIn: {
        email: vi.fn().mockResolvedValue({ data: { user: {}, session: {} } }),
        social: vi.fn(),
        magicLink: vi.fn()
      }
    })

    let signInResult: ReturnType<typeof createSignInEmail> | null = null

    render(() => (
      <AuthProvider authClient={mockAuthClient}>
        <TestComponent
          onSignIn={(signIn) => {
            signInResult = signIn
          }}
        />
      </AuthProvider>
    ))

    await signInResult!.signInEmail({
      email: "test@example.com",
      password: "password123"
    })

    expect(mockAuthClient.signIn.email).toHaveBeenCalledWith({
      email: "test@example.com",
      password: "password123",
      fetchOptions: { throw: true }
    })
    expect(signInResult!.isLoading()).toBe(false)
    expect(signInResult!.error()).toBeNull()
  })

  it("should handle error case with invalid credentials", async () => {
    const errorMessage = "Invalid credentials"
    const mockAuthClient = createMockAuthClient({
      signIn: {
        email: vi.fn().mockRejectedValue(new Error(errorMessage)),
        social: vi.fn(),
        magicLink: vi.fn()
      }
    })

    let signInResult: ReturnType<typeof createSignInEmail> | null = null

    render(() => (
      <AuthProvider authClient={mockAuthClient}>
        <TestComponent
          onSignIn={(signIn) => {
            signInResult = signIn
          }}
        />
      </AuthProvider>
    ))

    await expect(
      signInResult!.signInEmail({
        email: "test@example.com",
        password: "wrongpassword"
      })
    ).rejects.toThrow(errorMessage)

    expect(signInResult!.error()).not.toBeNull()
    expect(signInResult!.error()?.message).toBe(errorMessage)
    expect(signInResult!.isLoading()).toBe(false)
  })
})
