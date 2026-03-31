import type { User } from "better-auth/types"
import { Show } from "solid-js"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export type UserAvatarProps = {
  user: User
  class?: string
  size?: "sm" | "md" | "lg"
}

/**
 * Avatar component displaying the current user's profile image or fallback.
 *
 * @param user - The user object containing avatar and name data
 * @param class - Optional additional class names
 * @param size - Size of the avatar; "sm" (32px), "md" (40px, default), or "lg" (64px)
 * @returns The rendered user avatar as a JSX element
 */
export function UserAvatar(props: UserAvatarProps) {
  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-16 w-16"
  }

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
    <Avatar class={sizeClasses[props.size ?? "md"]}>
      <Show
        when={props.user.image}
        fallback={
          <AvatarFallback class="text-sm">
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
  )
}
