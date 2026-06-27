import type { AuthClient } from "@better-auth-ui/core"
import { describe, expectTypeOf, it } from "vitest"
import type { UseAccountInfoOptions } from "../src/hooks/queries/use-account-info"
import type { UseListAccountsOptions } from "../src/hooks/queries/use-list-accounts"
import type { UseListSessionsOptions } from "../src/hooks/queries/use-list-sessions"
import type { UseSessionOptions } from "../src/hooks/queries/use-session"

describe("Solid base query option typing", () => {
  it("preserves Solid Query options while carrying Better Auth params", () => {
    expectTypeOf<UseSessionOptions<AuthClient>>().toHaveProperty("query")
    expectTypeOf<UseSessionOptions<AuthClient>>().toHaveProperty("fetchOptions")
    expectTypeOf<UseSessionOptions<AuthClient>>().toHaveProperty("enabled")

    expectTypeOf<UseAccountInfoOptions<AuthClient>>().toHaveProperty("enabled")
    expectTypeOf<UseAccountInfoOptions<AuthClient>>().toHaveProperty("query")
    expectTypeOf<UseListAccountsOptions<AuthClient>>().toHaveProperty("enabled")
    expectTypeOf<UseListSessionsOptions<AuthClient>>().toHaveProperty("enabled")
  })
})
