import type { User } from "better-auth/types"
import { Show } from "solid-js"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { UserAvatar } from "./user-avatar"

export type UserViewProps = {
  user: User
  class?: string
  showMetadata?: boolean
  onEdit?: () => void
}

/**
 * User profile view displaying avatar, name, email, and optional metadata.
 *
 * @param user - The user object
 * @param class - Optional additional class names
 * @param showMetadata - Whether to show additional metadata (default: true)
 * @param onEdit - Optional callback for edit action
 * @returns The rendered user profile view as a JSX element
 */
export function UserView(props: UserViewProps) {
  const showMetadata = () => props.showMetadata ?? true

  return (
    <Card class={props.class}>
      <CardHeader>
        <div class="flex items-center gap-4">
          <UserAvatar user={props.user} size="lg" />
          <div>
            <CardTitle>{props.user.name}</CardTitle>
            <Show when={props.user.email}>
              <CardDescription>{props.user.email}</CardDescription>
            </Show>
          </div>
        </div>
      </CardHeader>

      <Separator />

      <CardContent class="pt-6">
        <Show when={showMetadata()}>
          <div class="space-y-4">
            <Show when={props.user.email}>
              <div class="flex flex-col gap-1">
                <span class="text-sm font-medium text-muted-foreground">
                  Email
                </span>
                <span>{props.user.email}</span>
              </div>
            </Show>

            <Show when={props.user.name}>
              <div class="flex flex-col gap-1">
                <span class="text-sm font-medium text-muted-foreground">
                  Name
                </span>
                <span>{props.user.name}</span>
              </div>
            </Show>

            <Show when={props.user.id}>
              <div class="flex flex-col gap-1">
                <span class="text-sm font-medium text-muted-foreground">
                  User ID
                </span>
                <span class="text-xs font-mono">{props.user.id}</span>
              </div>
            </Show>

            <Show when={props.user.createdAt}>
              <div class="flex flex-col gap-1">
                <span class="text-sm font-medium text-muted-foreground">
                  Member since
                </span>
                <span>
                  {new Date(props.user.createdAt).toLocaleDateString()}
                </span>
              </div>
            </Show>
          </div>
        </Show>
      </CardContent>

      <Show when={props.onEdit}>
        <Separator />
        <CardFooter class="pt-6">
          <button
            type="button"
            onClick={props.onEdit}
            class="text-sm text-primary hover:underline"
          >
            Edit Profile
          </button>
        </CardFooter>
      </Show>
    </Card>
  )
}
