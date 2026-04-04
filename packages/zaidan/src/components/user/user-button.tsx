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
 */
export function UserButton(props: UserButtonProps) {
  const { user: contextUser } = useAuthContext()
  const { signOut, isLoading: isSigningOut } = createSignOut()

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

  const navigateTo = (path: string) => {
    if (typeof window !== "undefined") {
      window.location.href = path
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
            {/* User info header */}
            <div class="flex items-center gap-3 p-3">
              <UserAvatar user={currentUser()} size="sm" />
              <div class="flex flex-col space-y-1">
                <p class="text-sm font-medium leading-none">
                  {currentUser().name}
                </p>
                <p class="text-xs leading-none text-muted-foreground">
                  {currentUser().email}
                </p>
              </div>
            </div>

            <DropdownMenuSeparator />

            {/* Settings */}
            <DropdownMenuItem onSelect={() => navigateTo("/settings/account")}>
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
                class="mr-2"
                aria-hidden="true"
              >
                <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.73v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.38a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.73v-.51a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
              Settings
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            {/* Theme switcher */}
            <DropdownMenuItem
              onSelect={() => {
                // Toggle theme - simple implementation
                const isDark =
                  document.documentElement.classList.contains("dark")
                if (isDark) {
                  document.documentElement.classList.remove("dark")
                  localStorage.setItem("theme", "light")
                } else {
                  document.documentElement.classList.add("dark")
                  localStorage.setItem("theme", "dark")
                }
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
                class="mr-2"
                aria-hidden="true"
              >
                <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
              </svg>
              Toggle theme
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            {/* Sign out */}
            <DropdownMenuItem
              onSelect={handleSignOut}
              class="text-red-600 hover:text-red-600"
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
                class="mr-2"
                aria-hidden="true"
              >
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" x2="9" y1="12" y2="12" />
              </svg>
              {isSigningOut() ? "Signing out..." : "Sign out"}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </Show>
  )
}
