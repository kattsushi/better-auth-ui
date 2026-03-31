import type { User } from "better-auth/types"
import { Show } from "solid-js"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { UserAvatar } from "./user-avatar"

export type UserButtonProps = {
  user: User
  onSignOut?: () => void
  onSettings?: () => void
  onProfile?: () => void
  class?: string
}

/**
 * User button with avatar that shows a dropdown menu on click.
 *
 * @param user - The current user object
 * @param onSignOut - Callback when sign out is clicked
 * @param onSettings - Callback when settings is clicked
 * @param onProfile - Callback when profile is clicked
 * @param class - Optional additional class names
 * @returns The rendered user button as a JSX element
 */
export function UserButton(props: UserButtonProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger class={props.class} aria-label="User menu">
        <UserAvatar user={props.user} />
      </DropdownMenuTrigger>

      <DropdownMenuContent class="w-56">
        <div class="flex items-center gap-2 p-2">
          <UserAvatar user={props.user} size="sm" />
          <div class="flex flex-col space-y-1">
            <Show when={props.user.name}>
              <p class="text-sm font-medium leading-none">{props.user.name}</p>
            </Show>
            <Show when={props.user.email}>
              <p class="text-xs leading-none text-muted-foreground">
                {props.user.email}
              </p>
            </Show>
          </div>
        </div>

        <DropdownMenuSeparator />

        <DropdownMenuItem onSelect={props.onProfile}>Profile</DropdownMenuItem>

        <DropdownMenuItem onSelect={props.onSettings}>
          Settings
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem onSelect={props.onSignOut} class="text-red-600">
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
