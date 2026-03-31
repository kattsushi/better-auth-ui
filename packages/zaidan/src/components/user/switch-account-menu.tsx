import type { User } from "better-auth/types"
import { For, Show } from "solid-js"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { SwitchAccountItem } from "./switch-account-item"

export type SwitchAccountMenuProps = {
  user: User
  accounts: User[]
  onSwitchAccount?: (user: User) => void
  onAddAccount?: () => void
  class?: string
}

/**
 * Menu for switching between accounts for users with multi-account support.
 *
 * @param user - The current active user
 * @param accounts - Array of all available accounts
 * @param onSwitchAccount - Callback when switching to a different account
 * @param onAddAccount - Callback when adding a new account
 * @param class - Optional additional class names
 * @returns The rendered switch account menu as a JSX element
 */
export function SwitchAccountMenu(props: SwitchAccountMenuProps) {
  const otherAccounts = () =>
    props.accounts.filter((account) => account.id !== props.user.id)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger class={props.class}>
        Switch Account
      </DropdownMenuTrigger>

      <DropdownMenuContent class="w-56">
        <DropdownMenuLabel>Current Account</DropdownMenuLabel>

        <DropdownMenuItem disabled>
          <SwitchAccountItem user={props.user} isActive />
        </DropdownMenuItem>

        <Show when={otherAccounts().length > 0}>
          <DropdownMenuSeparator />
          <DropdownMenuLabel>Other Accounts</DropdownMenuLabel>

          <For each={otherAccounts()}>
            {(account) => (
              <DropdownMenuItem
                onSelect={() => props.onSwitchAccount?.(account)}
              >
                <SwitchAccountItem user={account} />
              </DropdownMenuItem>
            )}
          </For>
        </Show>

        <DropdownMenuSeparator />

        <DropdownMenuItem onSelect={props.onAddAccount}>
          Add Account
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
