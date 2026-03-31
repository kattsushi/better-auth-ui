import { createSignal, onMount, Show } from "solid-js"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Spinner } from "@/components/ui/spinner"
import { cn } from "@/lib/utils"

export type ResetPasswordProps = {
  className?: string
}

/**
 * Render a password reset form that validates the reset token from the URL, accepts a new password (and optional confirmation), and submits it to the auth client.
 *
 * @returns The password reset form UI ready to be mounted in the app layout.
 */
export function ResetPassword(props: ResetPasswordProps) {
  const [isPending, setIsPending] = createSignal(false)
  const [hasToken, setHasToken] = createSignal(false)

  const [fieldErrors, setFieldErrors] = createSignal<{
    password?: string
    confirmPassword?: string
  }>({})

  onMount(() => {
    const searchParams = new URLSearchParams(window.location.search)
    const token = searchParams.get("token")
    setHasToken(!!token)
  })

  const handleSubmit = async (e: Event) => {
    e.preventDefault()

    const searchParams = new URLSearchParams(window.location.search)
    const token = searchParams.get("token")

    if (!token) {
      setHasToken(false)
      return
    }

    const formData = new FormData(e.target as HTMLFormElement)
    const password = formData.get("password") as string
    const confirmPassword = formData.get("confirmPassword") as string

    if (password !== confirmPassword) {
      console.error("Passwords do not match")
      return
    }

    setIsPending(true)
    try {
      // Simulate API call - in real implementation, use createResetPassword
      console.log("Resetting password with token")
      await new Promise((resolve) => setTimeout(resolve, 1000))
    } catch (error) {
      console.error("Reset password error:", error)
    } finally {
      setIsPending(false)
    }
  }

  return (
    <Card class={cn("w-full max-w-sm py-4 md:py-6 gap-4", props.className)}>
      <CardHeader class="px-4 md:px-6 gap-0">
        <CardTitle class="text-xl">Reset Password</CardTitle>
      </CardHeader>

      <CardContent class="px-4 md:px-6">
        <Show
          when={hasToken()}
          fallback={
            <FieldDescription class="text-center">
              Invalid reset token.{" "}
              <a
                href="/auth/forgot-password"
                class="underline underline-offset-4"
              >
                Try again
              </a>
            </FieldDescription>
          }
        >
          <form onSubmit={handleSubmit}>
            <FieldGroup class="gap-4">
              <Field class="gap-1" data-invalid={!!fieldErrors().password}>
                <FieldLabel for="password">New Password</FieldLabel>

                <Input
                  id="password"
                  name="password"
                  type="password"
                  autocomplete="new-password"
                  placeholder="Enter new password"
                  required
                  disabled={isPending()}
                  onInput={() => {
                    setFieldErrors((prev) => ({
                      ...prev,
                      password: undefined
                    }))
                  }}
                />

                <FieldError>{fieldErrors().password}</FieldError>
              </Field>

              <Field
                class="gap-1"
                data-invalid={!!fieldErrors().confirmPassword}
              >
                <FieldLabel for="confirmPassword">Confirm Password</FieldLabel>

                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autocomplete="new-password"
                  placeholder="Confirm new password"
                  required
                  disabled={isPending()}
                  onInput={() => {
                    setFieldErrors((prev) => ({
                      ...prev,
                      confirmPassword: undefined
                    }))
                  }}
                />

                <FieldError>{fieldErrors().confirmPassword}</FieldError>
              </Field>

              <Field class="mt-1">
                <Button type="submit" disabled={isPending()} class="w-full">
                  <Show when={isPending()}>
                    <Spinner />
                  </Show>
                  Reset Password
                </Button>
              </Field>

              <FieldDescription class="text-center">
                Remember your password?{" "}
                <a href="/auth/sign-in" class="underline underline-offset-4">
                  Sign In
                </a>
              </FieldDescription>
            </FieldGroup>
          </form>
        </Show>
      </CardContent>
    </Card>
  )
}
