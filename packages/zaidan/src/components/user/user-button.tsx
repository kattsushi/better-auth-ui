import { createSignOut, useAuthContext } from "@better-auth-ui/solid"
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
  user?: User | null
  onSignOut?: () => void
  onSettings?: () => void
  onProfile?: () => void
  class?: string
  size?: "default" | "icon"
  align?: "center" | "end" | "start"
}

/**
 * User button with avatar that shows a dropdown menu on click.
 * Gets user from auth context if not provided as prop.
 *
 * @param user - Optional user object. If not provided, gets from auth context.
 */
export function UserButton(props: UserButtonProps) {
  const { user: contextUser } = useAuthContext()
  const { signOut, isLoading: isSigningOut } = createSignOut()

  // Use provided user or get from context
  const user = () => props.user ?? contextUser()

  const handleSignOut = async () => {
    try {
      await signOut()
      if (typeof window !== "undefined") {
        window.location.href = "/"
      }
      props.onSignOut?.()
    } catch (err) {
      console.error("Sign out error:", err)
    }
  }

  const handleProfile = () => {
    if (props.onProfile) {
      props.onProfile()
    } else {
      // Default: navigate to settings
      if (typeof window !== "undefined") {
        window.location.href = "/settings"
      }
    }
  }

  const handleSettings = () => {
    if (props.onSettings) {
      props.onSettings()
    } else {
      // Default: navigate to settings
      if (typeof window !== "undefined") {
        window.location.href = "/settings"
      }
    }
  }

  return (
    <Show
      when={user()}
      fallback={
        <a
          href="/auth/sign-in"
          class="px-4 py-2 text-sm font-medium hover:bg-accent rounded-md"
        >
          Sign In
        </a>
      }
    >
      {(currentUser) => (
        <DropdownMenu>
          <DropdownMenuTrigger class={props.class} aria-label="User menu">
            <UserAvatar user={currentUser()} />
          </DropdownMenuTrigger>

          <DropdownMenuContent class="w-56">
            <div class="flex items-center gap-2 p-2">
              <UserAvatar user={currentUser()} size="sm" />
              <div class="flex flex-col space-y-1">
                <Show when={currentUser().name}>
                  <p class="text-sm font-medium leading-none">
                    {currentUser().name}
                  </p>
                </Show>
                <Show when={currentUser().email}>
                  <p class="text-xs leading-none text-muted-foreground">
                    {currentUser().email}
                  </p>
                </Show>
              </div>
            </div>

            <DropdownMenuSeparator />

            <DropdownMenuItem onSelect={handleProfile}>
              Profile
            </DropdownMenuItem>

            <DropdownMenuItem onSelect={handleSettings}>
              Settings
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              onSelect={handleSignOut}
              class="text-red-600 hover:text-red-600"
            >
              {isSigningOut() ? "Signing out..." : "Sign Out"}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </Show>
  )
}
