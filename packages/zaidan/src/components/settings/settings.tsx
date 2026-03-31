import type { User } from "better-auth/types"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export type SettingsTab =
  | "profile"
  | "security"
  | "sessions"
  | "appearance"
  | "notifications"

export type SettingsProps = {
  user: User
  class?: string
  defaultTab?: SettingsTab
  onProfileSave?: (data: { name: string; email: string }) => void
  onPasswordChange?: () => void
  onTwoFactorEnable?: () => void
  onTwoFactorDisable?: () => void
  onSessionRevoke?: (sessionId: string) => void
  onLogoutAll?: () => void
}

/**
 * General settings component with tabs for profile, security, sessions, etc.
 *
 * @param user - The current user object
 * @param class - Optional additional class names
 * @param defaultTab - The default tab to show (default: "profile")
 * @param onProfileSave - Callback when profile is saved
 * @param onPasswordChange - Callback to change password
 * @param onTwoFactorEnable - Callback to enable 2FA
 * @param onTwoFactorDisable - Callback to disable 2FA
 * @param onSessionRevoke - Callback to revoke a session
 * @param onLogoutAll - Callback to logout from all sessions
 * @returns The rendered settings component as a JSX element
 */
export function Settings(props: SettingsProps) {
  const defaultTab = () => props.defaultTab ?? "profile"

  return (
    <Tabs defaultValue={defaultTab()} class={props.class}>
      <TabsList>
        <TabsTrigger value="profile">Profile</TabsTrigger>
        <TabsTrigger value="security">Security</TabsTrigger>
        <TabsTrigger value="sessions">Sessions</TabsTrigger>
        <TabsTrigger value="appearance">Appearance</TabsTrigger>
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
      </TabsList>

      <TabsContent value="profile">
        <SettingsProfile user={props.user} onSave={props.onProfileSave} />
      </TabsContent>

      <TabsContent value="security">
        <SettingsSecurity
          onPasswordChange={props.onPasswordChange}
          onTwoFactorEnable={props.onTwoFactorEnable}
          onTwoFactorDisable={props.onTwoFactorDisable}
        />
      </TabsContent>

      <TabsContent value="sessions">
        <SettingsSessions
          onSessionRevoke={props.onSessionRevoke}
          onLogoutAll={props.onLogoutAll}
        />
      </TabsContent>

      <TabsContent value="appearance">
        <SettingsAppearance />
      </TabsContent>

      <TabsContent value="notifications">
        <SettingsNotifications />
      </TabsContent>
    </Tabs>
  )
}

// Profile Settings Sub-component
function SettingsProfile(props: {
  user: User
  onSave?: (data: { name: string; email: string }) => void
}) {
  return (
    <div class="space-y-4">
      <h3 class="text-lg font-semibold">Profile Settings</h3>
      <p class="text-sm text-muted-foreground">
        Manage your account information
      </p>
      <div class="space-y-2">
        <div>
          <label class="text-sm font-medium">Name</label>
          <p class="text-sm">{props.user.name}</p>
        </div>
        <div>
          <label class="text-sm font-medium">Email</label>
          <p class="text-sm">{props.user.email}</p>
        </div>
      </div>
    </div>
  )
}

// Security Settings Sub-component
function SettingsSecurity(props: {
  onPasswordChange?: () => void
  onTwoFactorEnable?: () => void
  onTwoFactorDisable?: () => void
}) {
  return (
    <div class="space-y-4">
      <h3 class="text-lg font-semibold">Security Settings</h3>
      <p class="text-sm text-muted-foreground">Manage your account security</p>
      <div class="space-y-2">
        <button
          type="button"
          onClick={props.onPasswordChange}
          class="text-sm text-primary hover:underline"
        >
          Change Password
        </button>
        <div>
          <p class="text-sm font-medium">Two-Factor Authentication</p>
          <p class="text-xs text-muted-foreground">
            Add an extra layer of security to your account
          </p>
          <button
            type="button"
            onClick={props.onTwoFactorEnable}
            class="text-sm text-primary hover:underline"
          >
            Enable 2FA
          </button>
        </div>
      </div>
    </div>
  )
}

// Sessions Settings Sub-component
function SettingsSessions(props: {
  onSessionRevoke?: (sessionId: string) => void
  onLogoutAll?: () => void
}) {
  return (
    <div class="space-y-4">
      <h3 class="text-lg font-semibold">Sessions</h3>
      <p class="text-sm text-muted-foreground">Manage your active sessions</p>
      <div class="space-y-2">
        <p class="text-sm">No active sessions</p>
        <button
          type="button"
          onClick={props.onLogoutAll}
          class="text-sm text-red-600 hover:underline"
        >
          Logout from all devices
        </button>
      </div>
    </div>
  )
}

// Appearance Settings Sub-component
function SettingsAppearance() {
  return (
    <div class="space-y-4">
      <h3 class="text-lg font-semibold">Appearance</h3>
      <p class="text-sm text-muted-foreground">
        Customize how the application looks
      </p>
      <div class="space-y-2">
        <p class="text-sm">Theme: System</p>
      </div>
    </div>
  )
}

// Notifications Settings Sub-component
function SettingsNotifications() {
  return (
    <div class="space-y-4">
      <h3 class="text-lg font-semibold">Notifications</h3>
      <p class="text-sm text-muted-foreground">
        Configure your notification preferences
      </p>
      <div class="space-y-2">
        <p class="text-sm">Email notifications enabled</p>
      </div>
    </div>
  )
}
