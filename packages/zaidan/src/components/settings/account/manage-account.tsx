import type { User } from "better-auth/types"
import { Show } from "solid-js"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import { UserAvatar } from "@/components/user/user-avatar"

export type DeviceSession = {
  session: {
    id: string
    token: string
    userId: string
  }
  user: User
}

export type ManageAccountProps = {
  deviceSession?: DeviceSession | null
  isPending?: boolean
}

/**
 * Render a single account card with user info and switch/revoke controls.
 *
 * Shows the user's avatar and info. For non-active sessions, provides a switch button.
 * All sessions have a revoke/sign-out button.
 *
 * @param deviceSession - The device session object containing session and user data
 * @param isPending - Whether the device session is pending
 * @returns A JSX element containing the account card
 */
export function ManageAccount(props: ManageAccountProps) {
  // TODO: Implement with createSetActiveSession and createRevokeMultiSession hooks
  // Currently a stub that shows user info with stub actions

  return (
    <div class="flex items-center p-3 gap-3 border rounded-lg">
      <UserAvatar user={props.deviceSession?.user ?? null} />

      <Show
        when={props.deviceSession}
        fallback={
          <div class="flex flex-col">
            <span class="text-sm text-muted-foreground">Loading...</span>
          </div>
        }
      >
        <div class="flex flex-col flex-1 min-w-0">
          <span class="text-sm font-medium truncate">
            {props.deviceSession?.user.name || props.deviceSession?.user.email}
          </span>
          <span class="text-xs text-muted-foreground truncate">
            {props.deviceSession?.user.email}
          </span>
        </div>
      </Show>

      <Show when={props.deviceSession}>
        <div class="flex items-center gap-1 shrink-0 ml-auto">
          <Button variant="ghost" size="icon-sm" disabled>
            <Spinner />
          </Button>

          <Button variant="ghost" size="icon-sm" disabled>
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
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" x2="9" y1="12" y2="12" />
            </svg>
          </Button>
        </div>
      </Show>
    </div>
  )
}
