import { Show } from "solid-js"
import { Appearance } from "./appearance"
import { ChangeEmail } from "./change-email"
import { ManageAccounts } from "./manage-accounts"
import { UserProfile } from "./user-profile"

export type AccountSettingsProps = {
  className?: string
}

/**
 * Account settings component with Profile, Change Email, Appearance, and Manage Accounts.
 * Reusable - renders appropriate sections based on auth state.
 */
export function AccountSettings(props: AccountSettingsProps) {
  // TODO: multiSession support when available in auth context
  const multiSession = false

  return (
    <div class={`flex w-full flex-col gap-4 md:gap-6 ${props.className || ""}`}>
      <UserProfile />
      <ChangeEmail />
      <Appearance />
      <Show when={multiSession}>
        <ManageAccounts />
      </Show>
    </div>
  )
}
