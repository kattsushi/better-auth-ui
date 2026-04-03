import { basePaths, viewPaths } from "@better-auth-ui/core"
import type { User } from "better-auth/types"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export type SettingsTab = "account" | "security"

export type SettingsProps = {
  user: User
  class?: string
  defaultTab?: SettingsTab
  path?: string
  view?: SettingsTab
  hideNav?: boolean
  onProfileSave?: (data: { name: string; email: string }) => void
  onPasswordChange?: () => void
  onTwoFactorEnable?: () => void
  onTwoFactorDisable?: () => void
  onSessionRevoke?: (sessionId: string) => void
  onLogoutAll?: () => void
}

/**
 * General settings component with tabs for account, security, etc.
 * Uses vertical layout on desktop like shadcn.
 */
export function Settings(props: SettingsProps) {
  // Get view from path or prop
  const currentView = () => {
    if (props.view) return props.view
    if (props.path) {
      const pathToView: Record<string, SettingsTab> = {
        [viewPaths.settings.account]: "account",
        [viewPaths.settings.security]: "security"
      }
      return pathToView[props.path] || props.defaultTab || "account"
    }
    return props.defaultTab || "account"
  }

  const navigateTo = (view: SettingsTab) => {
    const path =
      view === "account"
        ? viewPaths.settings.account
        : viewPaths.settings.security
    if (typeof window !== "undefined") {
      window.location.href = `${basePaths.settings}/${path}`
    }
  }

  return (
    <Tabs value={currentView()} orientation="vertical">
      <TabsList>
        <TabsTrigger
          value="account"
          onSelect={(e) => {
            e.preventDefault()
            navigateTo("account")
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="10" />
            <circle cx="12" cy="10" r="3" />
            <path d="M6.168 18.849A4 4 0 0 1 10 16h4a4 4 0 0 1 1.71 3.85" />
          </svg>
          Account
        </TabsTrigger>
        <TabsTrigger
          value="security"
          onSelect={(e) => {
            e.preventDefault()
            navigateTo("security")
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
            <path d="m9 12 2 2 4-4" />
          </svg>
          Security
        </TabsTrigger>
      </TabsList>

      <div class="rounded-lg border p-4">
        <TabsContent value="account">
          <SettingsAccount user={props.user} onSave={props.onProfileSave} />
        </TabsContent>
        <TabsContent value="security">
          <SettingsSecurity
            onPasswordChange={props.onPasswordChange}
            onTwoFactorEnable={props.onTwoFactorEnable}
            onTwoFactorDisable={props.onTwoFactorDisable}
          />
        </TabsContent>
      </div>
    </Tabs>
  )
}

function SettingsAccount(props: {
  user: User
  onSave?: (data: { name: string; email: string }) => void
}) {
  return (
    <div class="space-y-6">
      <div>
        <h3 class="text-lg font-semibold">Account</h3>
        <p class="text-sm text-muted-foreground">
          Manage your account information
        </p>
      </div>
      <div class="grid gap-4">
        <div class="grid gap-2">
          <label for="name" class="text-sm font-medium">
            Name
          </label>
          <input
            id="name"
            type="text"
            value={props.user.name || ""}
            class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            readOnly
          />
        </div>
        <div class="grid gap-2">
          <label for="email" class="text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={props.user.email || ""}
            class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            readOnly
          />
        </div>
      </div>
    </div>
  )
}

function SettingsSecurity(props: {
  onPasswordChange?: () => void
  onTwoFactorEnable?: () => void
  onTwoFactorDisable?: () => void
}) {
  return (
    <div class="space-y-6">
      <div>
        <h3 class="text-lg font-semibold">Security</h3>
        <p class="text-sm text-muted-foreground">
          Manage your account security
        </p>
      </div>
      <div class="space-y-4">
        <div class="grid gap-2">
          <span class="text-sm font-medium">Password</span>
          <button
            type="button"
            onClick={props.onPasswordChange}
            class="text-sm text-primary hover:underline text-left"
          >
            Change Password
          </button>
        </div>
        <div class="grid gap-2">
          <span class="text-sm font-medium">Two-Factor Authentication</span>
          <p class="text-xs text-muted-foreground">
            Add an extra layer of security to your account
          </p>
          <button
            type="button"
            onClick={props.onTwoFactorEnable}
            class="text-sm text-primary hover:underline text-left"
          >
            Enable 2FA
          </button>
        </div>
      </div>
    </div>
  )
}
