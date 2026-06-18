import { existsSync, readFileSync } from "node:fs"
import { join } from "node:path"
import { describe, expect, it } from "vitest"

const docsRoot = join(import.meta.dirname, "../content/docs")

function readDocsFile(...segments: string[]) {
  return readFileSync(join(docsRoot, ...segments), "utf8")
}

function readMeta(framework: "react" | "solid", area: "queries" | "mutations") {
  return JSON.parse(readDocsFile(framework, area, "meta.json")) as {
    pages: string[]
  }
}

function pageSlugs(pages: string[]) {
  return pages.filter((page) => !page.startsWith("---"))
}

function expectPagesExist(
  framework: "react" | "solid",
  area: "queries" | "mutations",
  pages: string[]
) {
  for (const page of pageSlugs(pages)) {
    expect(existsSync(join(docsRoot, framework, area, `${page}.mdx`))).toBe(
      true
    )
  }
}

const sharedQueryPages = [
  "session",
  "user",
  "authenticate",
  "list-accounts",
  "account-info",
  "list-sessions",
  "list-device-sessions",
  "list-passkeys"
]

const apiKeyQueryPages = ["list-api-keys"]

const organizationQueryPages = [
  "active-organization",
  "full-organization",
  "list-organizations",
  "list-members",
  "list-invitations",
  "list-user-invitations",
  "has-permission"
]

const sharedAuthMutationPages = [
  "sign-in-email",
  "sign-in-username",
  "sign-in-magic-link",
  "sign-in-passkey",
  "sign-in-social",
  "sign-up-email",
  "sign-out",
  "request-password-reset",
  "reset-password",
  "send-verification-email",
  "is-username-available"
]

const sharedMutationPages = [
  ...sharedAuthMutationPages,
  "update-user",
  "change-email",
  "change-password",
  "delete-user",
  "link-social",
  "unlink-account",
  "add-passkey",
  "delete-passkey",
  "revoke-session",
  "revoke-multi-session",
  "set-active-session"
]

const apiKeyMutationPages = ["create-api-key", "delete-api-key"]

const organizationMutationPagesReact = [
  "create-organization",
  "update-organization",
  "delete-organization",
  "set-active-organization",
  "invite-member",
  "remove-member",
  "update-member-role",
  "leave-organization",
  "accept-invitation",
  "cancel-invitation",
  "reject-invitation",
  "check-slug"
]

const organizationMutationPagesSolid = [
  "create-organization",
  "update-organization",
  "delete-organization",
  "set-active-organization",
  "invite-member",
  "remove-member",
  "update-member-role",
  "leave-organization",
  "accept-invitation",
  "cancel-invitation",
  "reject-invitation",
  "check-organization-slug"
]

describe("React/Solid docs parity", () => {
  it("keeps react and solid query docs aligned with documented runtime families", () => {
    const reactQueriesMeta = readMeta("react", "queries")
    const solidQueriesMeta = readMeta("solid", "queries")

    const expectedReact = [
      ...sharedQueryPages,
      ...apiKeyQueryPages,
      ...organizationQueryPages
    ]
    const expectedSolid = [
      ...sharedQueryPages,
      ...apiKeyQueryPages,
      ...organizationQueryPages
    ]

    expect(reactQueriesMeta.pages).toEqual(
      expect.arrayContaining(["index", "---Settings---", ...expectedReact])
    )
    expect(solidQueriesMeta.pages).toEqual(
      expect.arrayContaining(["index", "---Settings---", ...expectedSolid])
    )

    expectPagesExist("react", "queries", expectedReact)
    expectPagesExist("solid", "queries", expectedSolid)
  })

  it("keeps react and solid mutation docs aligned with documented runtime families", () => {
    const reactMutationsMeta = readMeta("react", "mutations")
    const solidMutationsMeta = readMeta("solid", "mutations")

    const expectedReact = [
      ...sharedMutationPages,
      ...apiKeyMutationPages,
      ...organizationMutationPagesReact
    ]
    const expectedSolid = [
      ...sharedMutationPages,
      ...apiKeyMutationPages,
      ...organizationMutationPagesSolid
    ]

    expect(reactMutationsMeta.pages).toEqual(
      expect.arrayContaining(["index", "---Settings---", ...expectedReact])
    )
    expect(solidMutationsMeta.pages).toEqual(
      expect.arrayContaining(["index", "---Settings---", ...expectedSolid])
    )

    expectPagesExist("react", "mutations", expectedReact)
    expectPagesExist("solid", "mutations", expectedSolid)
  })

  it("keeps Solid auth mutation docs ordered and documents options factories", () => {
    const solidMutationsMeta = readMeta("solid", "mutations")
    const authStart = solidMutationsMeta.pages.indexOf("---Auth---") + 1
    const authEnd = solidMutationsMeta.pages.indexOf("---Settings---")

    expect(solidMutationsMeta.pages.slice(authStart, authEnd)).toEqual(
      sharedAuthMutationPages
    )

    for (const page of sharedAuthMutationPages) {
      const content = readDocsFile("solid", "mutations", `${page}.mdx`)

      expect(content).toContain("## Options factory")
    }
  })

  it("removes stale solid-only wording that contradicts runtime parity", () => {
    const solidListApiKeys = readDocsFile(
      "solid",
      "queries",
      "list-api-keys.mdx"
    )
    const solidCreateApiKey = readDocsFile(
      "solid",
      "mutations",
      "create-api-key.mdx"
    )
    const solidMutationsIndex = readDocsFile("solid", "mutations", "index.mdx")

    expect(solidListApiKeys).not.toContain("no React docs counterpart")
    expect(solidListApiKeys).not.toContain("intentionally has no React")
    expect(solidCreateApiKey).not.toContain(
      "React docs do not currently have a matching page"
    )
    expect(solidMutationsIndex).not.toContain(
      "not purpose-built `use*` mutation hooks"
    )
  })

  it("keeps Solid settings query docs aligned with React invalidation guidance", () => {
    const solidSettingsQueries = [
      ["list-accounts", "listAccountsOptions"],
      ["account-info", "accountInfoOptions"],
      ["list-sessions", "listSessionsOptions"],
      ["list-device-sessions", "listDeviceSessionsOptions"],
      ["list-passkeys", "listPasskeysOptions"],
      ["list-api-keys", "listApiKeysOptions"]
    ] as const

    for (const [page, factory] of solidSettingsQueries) {
      const content = readDocsFile("solid", "queries", `${page}.mdx`)

      expect(content).toContain("## Invalidation")
      expect(content).toContain(
        `import { ${factory} } from "@better-auth-ui/solid"`
      )
      expect(content).toContain(`${factory}(authClient, userId`)
    }
  })

  it("keeps Solid organization query docs aligned with React server-prefetch scope", () => {
    const solidOrganizationQueries = [
      "active-organization",
      "full-organization",
      "list-organizations",
      "list-members",
      "list-invitations",
      "list-user-invitations",
      "has-permission"
    ] as const

    for (const page of solidOrganizationQueries) {
      const content = readDocsFile("solid", "queries", `${page}.mdx`)

      expect(content).toContain("## Usage")
      expect(content).toContain("## Options factory")
      expect(content).toContain("## Server-side prefetching")
      expect(content).toContain('from "@better-auth-ui/solid"')
      expect(content).toContain('from "@better-auth-ui/core/server"')
      expect(content).toContain("adaptServerQueryOptions")
      expect(content).toContain("ensureServerQuery")
      expect(content).not.toContain(
        "client-shaped `authClient`/`userId` signature"
      )
    }
  })

  it("documents server-side prefetch entrypoints with the correct API shape", () => {
    const reactSession = readDocsFile("react", "queries", "session.mdx")
    const solidSession = readDocsFile("solid", "queries", "session.mdx")
    const reactListApiKeys = readDocsFile(
      "react",
      "queries",
      "list-api-keys.mdx"
    )
    const reactActiveOrganization = readDocsFile(
      "react",
      "queries",
      "active-organization.mdx"
    )
    const reactHasPermission = readDocsFile(
      "react",
      "queries",
      "has-permission.mdx"
    )
    const reactSsr = readDocsFile("react", "ssr.mdx")
    const solidSsr = readDocsFile("solid", "ssr.mdx")

    for (const content of [reactSession, solidSession]) {
      expect(content).toContain('from "@better-auth-ui/core/server"')
      expect(content).toContain("adaptServerQueryOptions")
      expect(content).toContain("ensureServerQuery")
      expect(content).toContain("sessionOptions(auth")
      expect(content).toContain(
        "Both entrypoints share the same session query key"
      )
      expect(content).not.toContain("ensureSession(queryClient, auth,")
      expect(content).not.toContain("packages/react/src/server/queries")
      expect(content).not.toContain("packages/solid/src/server/queries")
    }

    expect(reactSession).toContain("headers: getRequestHeaders()")
    expect(solidSession).toContain("headers: request.headers")

    for (const content of [
      reactListApiKeys,
      reactActiveOrganization,
      reactHasPermission
    ]) {
      expect(content).toContain('from "@better-auth-ui/core/server"')
      expect(content).toContain('from "@better-auth-ui/react/server"')
      expect(content).toContain("adaptServerQueryOptions")
      expect(content).toContain("ensureServerQuery")
      expect(content).not.toContain("ensureListApiKeys(queryClient, auth,")
      expect(content).not.toContain(
        "ensureActiveOrganization(queryClient, auth,"
      )
      expect(content).not.toContain("ensureHasPermission(queryClient, auth,")
    }

    expect(reactListApiKeys).toContain("listApiKeysOptions(auth, userId")
    expect(reactActiveOrganization).toContain(
      "activeOrganizationOptions(auth, userId"
    )
    expect(reactHasPermission).toContain("hasPermissionOptions(auth, userId")
    expect(reactHasPermission).toContain("body: {")
    expect(reactHasPermission).toContain(
      'permissions: { organization: ["update"] }'
    )

    for (const content of [reactSsr, solidSsr]) {
      expect(content).toContain('from "@better-auth-ui/core/server"')
      expect(content).toContain("adaptServerQueryOptions")
      expect(content).toContain("ensureServerQuery")
      expect(content).toContain("prefetchServerQuery")
      expect(content).toContain("fetchServerQuery")
      expect(content).toContain("sessionOptions(auth")
      expect(content).toContain("listApiKeysOptions")
      expect(content).toContain("activeOrganizationOptions")
      expect(content).toContain("removed endpoint-specific framework wrappers")
      expect(content).not.toContain("ensureListApiKeys")
      expect(content).not.toContain("ensureActiveOrganization")
      expect(content).not.toContain("ensureHasPermission")
      expect(content).not.toContain("ensureListPasskeys")
      expect(content).not.toContain("ensureListSessions")
      expect(content).not.toContain("server-auth API is provided for session")
      expect(content).not.toContain(
        "client-shaped `authClient`/`userId` signatures"
      )
    }
  })
})
