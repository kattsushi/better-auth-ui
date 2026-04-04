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

export type ChangeEmailProps = {
  className?: string
}

/**
 * Render a card containing a form to view and update the authenticated user's email.
 *
 * Shows a loading skeleton until session data is available, displays the current
 * email as the form's default value, and sends a verification email to the
 * new address upon successful submission.
 *
 * @returns A JSX element rendering the change-email card and form
 */
export function ChangeEmail(props: ChangeEmailProps) {
  const { user } = createAuth()
  const { updateUser, refetch } = createUserSettings()
  const [fieldErrors, setFieldErrors] = createSignal<{ email?: string }>({})
  const [isSaving, setIsSaving] = createSignal(false)

  const handleSubmit = async (
    e: Event & { currentTarget: HTMLFormElement }
  ) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const email = formData.get("email") as string

    setIsSaving(true)
    try {
      await updateUser({ email })
      setFieldErrors({})
      refetch()
    } catch (error: any) {
      setFieldErrors({ email: error?.message || "Failed to update email" })
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card class={`w-full py-4 md:py-6 gap-4 ${props.className || ""}`}>
        <CardHeader class="px-4 md:px-6 gap-0">
          <CardTitle class="text-xl">Email</CardTitle>
        </CardHeader>

        <CardContent class="px-4 md:px-6">
          <Field class="gap-1" data-invalid={!!fieldErrors().email}>
            <FieldLabel for="email">Email address</FieldLabel>

            <Show when={user()} fallback={<Skeleton class="h-9 w-full" />}>
              <div class="flex items-center gap-2">
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autocomplete="email"
                  value={user()?.email || ""}
                  placeholder="Enter your email"
                  disabled={isSaving()}
                  required
                  onInput={() => {
                    setFieldErrors((prev) => ({ ...prev, email: undefined }))
                  }}
                  aria-invalid={!!fieldErrors().email}
                />
                {user()?.emailVerified && (
                  <span
                    class="text-xs text-green-600 flex items-center gap-1"
                    role="status"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                      <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                    Verified
                  </span>
                )}
              </div>
            </Show>

            <FieldError>{fieldErrors().email}</FieldError>
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
                <polyline points="20 6 9 17 4 12" />
              </svg>
            )}
            Update email
          </Button>
        </CardFooter>
      </Card>
    </form>
  )
}
