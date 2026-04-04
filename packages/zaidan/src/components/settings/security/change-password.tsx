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
import { Spinner } from "@/components/ui/spinner"

export type ChangePasswordProps = {
  className?: string
}

/**
 * Render a card form for changing the authenticated user's password.
 *
 * Displays a card with fields for current password, new password, and optionally
 * confirm password. All other sessions are revoked upon successful password change.
 *
 * @returns A JSX element containing the change-password card and form
 */
export function ChangePassword(props: ChangePasswordProps) {
  // TODO: Replace with createChangePassword hook from @better-auth-ui/solid
  // TODO: Get emailAndPassword config from auth context
  const emailAndPassword = {
    confirmPassword: true,
    minPasswordLength: 8,
    maxPasswordLength: 128
  }

  const [currentPassword, setCurrentPassword] = createSignal("")
  const [newPassword, setNewPassword] = createSignal("")
  const [confirmPassword, setConfirmPassword] = createSignal("")
  const [isPending, setIsPending] = createSignal(false)

  const [isNewPasswordVisible, setIsNewPasswordVisible] = createSignal(false)
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    createSignal(false)

  const [fieldErrors, setFieldErrors] = createSignal<{
    currentPassword?: string
    newPassword?: string
    confirmPassword?: string
  }>({})

  const handleSubmit = async (
    e: Event & { currentTarget: HTMLFormElement }
  ) => {
    e.preventDefault()

    if (
      emailAndPassword.confirmPassword &&
      newPassword() !== confirmPassword()
    ) {
      setCurrentPassword("")
      setNewPassword("")
      setConfirmPassword("")
      // TODO: Use localization from auth context
      console.error("Passwords do not match")
      return
    }

    // TODO: Implement with createChangePassword hook
    setIsPending(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setCurrentPassword("")
      setNewPassword("")
      setConfirmPassword("")
      // TODO: Show success toast
    } catch (error) {
      // TODO: Show error toast
    } finally {
      setIsPending(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card class={`w-full py-4 md:py-6 gap-4 ${props.className || ""}`}>
        <CardHeader class="px-4 md:px-6 gap-0">
          <CardTitle class="text-xl">Change password</CardTitle>
        </CardHeader>

        <CardContent class="px-4 md:px-6 grid gap-4">
          <Field class="gap-1" data-invalid={!!fieldErrors().currentPassword}>
            <FieldLabel for="currentPassword">Current password</FieldLabel>

            <Input
              id="currentPassword"
              name="currentPassword"
              type="password"
              autocomplete="current-password"
              placeholder="Enter current password"
              value={currentPassword()}
              onInput={(e) => {
                setCurrentPassword(e.currentTarget.value)
                setFieldErrors((prev) => ({
                  ...prev,
                  currentPassword: undefined
                }))
              }}
              disabled={isPending()}
              required
            />

            <FieldError>{fieldErrors().currentPassword}</FieldError>
          </Field>

          <Field class="gap-1" data-invalid={!!fieldErrors().newPassword}>
            <FieldLabel for="newPassword">New password</FieldLabel>

            <div class="relative">
              <Input
                id="newPassword"
                name="newPassword"
                type={isNewPasswordVisible() ? "text" : "password"}
                autocomplete="new-password"
                placeholder="Enter new password"
                value={newPassword()}
                onInput={(e) => {
                  setNewPassword(e.currentTarget.value)
                  setFieldErrors((prev) => ({
                    ...prev,
                    newPassword: undefined
                  }))
                }}
                minLength={emailAndPassword.minPasswordLength}
                maxLength={emailAndPassword.maxPasswordLength}
                disabled={isPending()}
                required
                class="pr-10"
              />

              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                class="absolute right-0 top-1/2 -translate-y-1/2"
                aria-label={
                  isNewPasswordVisible() ? "Hide password" : "Show password"
                }
                onClick={() => setIsNewPasswordVisible(!isNewPasswordVisible())}
                disabled={isPending()}
              >
                <Show
                  when={isNewPasswordVisible()}
                  fallback={
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
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  }
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
                    aria-hidden="true"
                  >
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                    <line x1="1" x2="23" y1="1" y2="23" />
                  </svg>
                </Show>
              </Button>
            </div>

            <FieldError>{fieldErrors().newPassword}</FieldError>
          </Field>

          <Show when={emailAndPassword.confirmPassword}>
            <Field class="gap-1" data-invalid={!!fieldErrors().confirmPassword}>
              <FieldLabel for="confirmPassword">Confirm password</FieldLabel>

              <div class="relative">
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={isConfirmPasswordVisible() ? "text" : "password"}
                  autocomplete="new-password"
                  placeholder="Confirm new password"
                  value={confirmPassword()}
                  onInput={(e) => {
                    setConfirmPassword(e.currentTarget.value)
                    setFieldErrors((prev) => ({
                      ...prev,
                      confirmPassword: undefined
                    }))
                  }}
                  minLength={emailAndPassword.minPasswordLength}
                  maxLength={emailAndPassword.maxPasswordLength}
                  disabled={isPending()}
                  required
                  class="pr-10"
                />

                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  class="absolute right-0 top-1/2 -translate-y-1/2"
                  aria-label={
                    isConfirmPasswordVisible()
                      ? "Hide password"
                      : "Show password"
                  }
                  onClick={() =>
                    setIsConfirmPasswordVisible(!isConfirmPasswordVisible())
                  }
                  disabled={isPending()}
                >
                  <Show
                    when={isConfirmPasswordVisible()}
                    fallback={
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
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    }
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
                      aria-hidden="true"
                    >
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                      <line x1="1" x2="23" y1="1" y2="23" />
                    </svg>
                  </Show>
                </Button>
              </div>

              <FieldError>{fieldErrors().confirmPassword}</FieldError>
            </Field>
          </Show>
        </CardContent>

        <CardFooter class="px-4 md:px-6">
          <Button type="submit" disabled={isPending()}>
            <Show
              when={isPending()}
              fallback={
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
              }
            >
              <Spinner />
            </Show>
            Update password
          </Button>
        </CardFooter>
      </Card>
    </form>
  )
}
