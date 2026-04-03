import { cleanup, render } from "@solidjs/testing-library";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { createAuth } from "../../src/hooks/auth/create-auth";
import { AuthProvider } from "../../src/lib/auth-context";
// Mock user and session data matching SolidAuthClient interface
const mockUser = {
    id: "user-1",
    email: "test@example.com",
    name: "Test User",
    image: null,
    emailVerified: true,
    createdAt: new Date(),
    updatedAt: new Date()
};
const mockSession = {
    id: "session-1",
    userId: "user-1",
    expiresAt: new Date(Date.now() + 86400000),
    token: "token-123",
    createdAt: new Date(),
    updatedAt: new Date(),
    ipAddress: null,
    userAgent: null
};
// Factory to create mock auth client
const createMockAuthClient = (overrides = {}) => ({
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
});
// Test component to use createAuth hook
const TestComponent = (props) => {
    const auth = createAuth();
    // Pass auth back to test
    props.onAuth(auth);
    return <div data-testid="test-component">Test</div>;
};
describe("createAuth", () => {
    beforeEach(() => {
        cleanup();
    });
    afterEach(() => {
        cleanup();
    });
    it("should return user, session, isLoading signals", async () => {
        const mockAuthClient = createMockAuthClient({
            getSession: vi.fn().mockResolvedValue({
                data: { user: mockUser, session: mockSession }
            })
        });
        let authResult = null;
        render(() => (<AuthProvider authClient={mockAuthClient}>
        <TestComponent onAuth={(auth) => {
                authResult = auth;
            }}/>
      </AuthProvider>));
        // Wait for initial load
        await new Promise((resolve) => setTimeout(resolve, 100));
        expect(authResult).not.toBeNull();
        expect(authResult.user).toBeDefined();
        expect(authResult.session).toBeDefined();
        expect(authResult.isLoading).toBeDefined();
    });
    it("should return null user and session when not authenticated", async () => {
        const mockAuthClient = createMockAuthClient({
            getSession: vi.fn().mockResolvedValue({ data: null })
        });
        let authResult = null;
        render(() => (<AuthProvider authClient={mockAuthClient}>
        <TestComponent onAuth={(auth) => {
                authResult = auth;
            }}/>
      </AuthProvider>));
        await new Promise((resolve) => setTimeout(resolve, 100));
        expect(authResult.user()).toBeNull();
        expect(authResult.session()).toBeNull();
    });
    it("should return signOut and refresh functions", async () => {
        const mockAuthClient = createMockAuthClient();
        let authResult = null;
        render(() => (<AuthProvider authClient={mockAuthClient}>
        <TestComponent onAuth={(auth) => {
                authResult = auth;
            }}/>
      </AuthProvider>));
        await new Promise((resolve) => setTimeout(resolve, 100));
        expect(typeof authResult.signOut).toBe("function");
        expect(typeof authResult.refresh).toBe("function");
    });
    it("should call authClient.signOut when signOut is called", async () => {
        const mockAuthClient = createMockAuthClient();
        let authResult = null;
        render(() => (<AuthProvider authClient={mockAuthClient}>
        <TestComponent onAuth={(auth) => {
                authResult = auth;
            }}/>
      </AuthProvider>));
        await new Promise((resolve) => setTimeout(resolve, 100));
        await authResult.signOut();
        expect(mockAuthClient.signOut).toHaveBeenCalledTimes(1);
    });
});
