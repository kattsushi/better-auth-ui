import type { User } from "better-auth/types"
import { Show } from "solid-js"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export type SwitchAccountItemProps = {
  user: User
  isActive?: boolean
  class?: string
}

/**
 * Individual account item for the switch account menu.
 *
 * @param user - The user account to display
 * @param isActive - Whether this is the currently active account
 * @param class - Optional additional class names
 * @returns The rendered account item as a JSX element
 */
export function SwitchAccountItem(props: SwitchAccountItemProps) {
  const getInitials = (name: string | null) => {
    if (!name) return "?"
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <div class={props.class} data-active={props.isActive}>
      <Avatar class="h-8 w-8">
        <Show
          when={props.user.image}
          fallback={
            <AvatarFallback class="text-xs">
              {getInitials(props.user.name)}
            </AvatarFallback>
          }
        >
          <AvatarImage
            src={props.user.image ?? undefined}
            alt={props.user.name ?? "User"}
          />
        </Show>
      </Avatar>

      <div class="flex flex-col">
        <span class="text-sm font-medium">{props.user.name}</span>
        <Show when={props.user.email}>
          <span class="text-xs text-muted-foreground">{props.user.email}</span>
        </Show>
      </div>

      <Show when={props.isActive}>
        <span class="ml-auto text-xs text-muted-foreground">Active</span>
      </Show>
    </div>
  )
}
