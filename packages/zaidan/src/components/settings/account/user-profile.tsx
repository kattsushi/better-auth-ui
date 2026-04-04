import { createAuth, createUserSettings } from "@better-auth-ui/solid"
import { createSignal, Show } from "solid-js"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import { Spinner } from "@/components/ui/spinner"
import { UserAvatar } from "@/components/user/user-avatar"

export type UserProfileProps = {
  className?: string
}

/**
 * Render a profile card that lets the authenticated user view and update their display name.
 *
 * @param className - Optional additional CSS class names applied to the card container
 * @returns A JSX element containing the profile card with editable name field
 */
export function UserProfile(props: UserProfileProps) {
  const { user } = createAuth()
  const { updateUser, refetch } = createUserSettings()
  const [fieldErrors, setFieldErrors] = createSignal<{ name?: string }>({})
  const [isSaving, setIsSaving] = createSignal(false)

  const handleSubmit = async (
    e: Event & { currentTarget: HTMLFormElement }
  ) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const name = formData.get("name") as string

    setIsSaving(true)
    try {
      await updateUser({ name })
      setFieldErrors({})
      refetch()
    } catch (error: any) {
      setFieldErrors({ name: error?.message || "Failed to update profile" })
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card class={`w-full py-4 md:py-6 gap-4 ${props.className || ""}`}>
        <CardHeader class="px-4 md:px-6 gap-0">
          <CardTitle class="text-xl">Profile</CardTitle>
        </CardHeader>

        <CardContent class="px-4 md:px-6 grid gap-4">
          <div class="flex items-center gap-2.5">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              class="relative p-0 h-auto w-auto rounded-full"
              disabled={!user()}
            >
              <UserAvatar user={user()} class="size-12 text-base" />
              <span class="absolute right-0 bottom-0 size-4 rounded-full bg-background ring-2 ring-secondary flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="text-muted-foreground"
                  aria-hidden="true"
                >
                  <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                  <path d="m15 5 4 4" />
                </svg>
              </span>
            </Button>

            <Show
              when={user()}
              fallback={
                <div class="flex flex-col gap-1">
                  <Skeleton class="h-4 w-24 mt-0.5" />
                  <Skeleton class="h-3 w-32" />
                </div>
              }
            >
              <div class="grid flex-1 text-left text-sm leading-tight">
                <span class="truncate font-medium">
                  {user()?.name || user()?.email}
                </span>
                {user()?.name && (
                  <span class="text-muted-foreground truncate text-xs">
                    {user()?.email}
                  </span>
                )}
              </div>
            </Show>
          </div>

          <Field class="gap-1" data-invalid={!!fieldErrors().name}>
            <FieldLabel for="name">Name</FieldLabel>

            <Show when={user()} fallback={<Skeleton class="h-9 w-full" />}>
              <Input
                id="name"
                name="name"
                autocomplete="name"
                value={user()?.name || ""}
                placeholder="Enter your name"
                disabled={isSaving()}
                required
                onInput={() => {
                  setFieldErrors((prev) => ({ ...prev, name: undefined }))
                }}
                aria-invalid={!!fieldErrors().name}
              />
            </Show>

            <FieldError>{fieldErrors().name}</FieldError>
          </Field>
        </CardContent>

        <CardFooter class="px-4 md:px-6">
          <Button type="submit" disabled={isSaving() || !user()}>
            {isSaving() ? (
              <Spinner />
            ) : (
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
                <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                <polyline points="17,21 17,13 7,13 7,21" />
                <polyline points="7,3 7,8 15,8" />
              </svg>
            )}
            Save changes
          </Button>
        </CardFooter>
      </Card>
    </form>
  )
}
