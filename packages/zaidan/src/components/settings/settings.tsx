import { viewPaths } from "@better-auth-ui/core"
import { createMemo } from "solid-js"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { AccountSettings } from "./account/account-settings"
import { SecuritySettings } from "./security/security-settings"

export type SettingsTab = "account" | "security"

export type SettingsProps = {
  class?: string
  defaultTab?: SettingsTab
  path?: string
  view?: SettingsTab
  hideNav?: boolean
}

/**
 * Settings component with vertical tabs for account and security.
 * Reusable - uses auth context internally for user data.
 */
export function Settings(props: SettingsProps) {
  const getInitialTab = (): SettingsTab => {
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

  const currentView = createMemo(() => {
    // If view prop is provided, use it (controlled mode)
    if (props.view) return props.view
    // Otherwise derive from path or default
    return getInitialTab()
  })

  return (
    <Tabs
      value={currentView()}
      defaultValue={!props.view ? getInitialTab() : undefined}
      orientation="vertical"
      class="flex flex-col md:flex-row gap-4 md:gap-6 w-full"
    >
      <div class="overflow-auto rounded-md">
        <TabsList class="min-w-full md:w-64 lg:w-72 xl:w-80 md:flex-col md:h-fit md:items-stretch">
          <TabsTrigger value="account">
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
              <path d="M18 21a8 8 0 0 0-16 0" />
              <circle cx="10" cy="8" r="5" />
              <path d="M22 20c0-3-2-5-4-6" />
              <path d="M22 16c0-3-2-5-5-5.5" />
            </svg>
            Account
          </TabsTrigger>

          <TabsTrigger value="security">
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
      </div>

      <TabsContent value="account" tabIndex={-1}>
        <AccountSettings />
      </TabsContent>

      <TabsContent value="security" tabIndex={-1}>
        <SecuritySettings />
      </TabsContent>
    </Tabs>
  )
}

export {
  AccountSettings,
  type AccountSettingsProps
} from "./account/account-settings"
export {
  SecuritySettings,
  type SecuritySettingsProps
} from "./security/security-settings"
