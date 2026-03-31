import { createSignal, Show } from "solid-js"

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

export type ForgotPasswordProps = {
  className?: string
}

/**
 * Render a card-based "Forgot Password" form that sends a password-reset email.
 *
 * @param className - Optional additional CSS class names applied to the card
 * @returns The forgot-password form UI as a JSX element
 */
export function ForgotPassword(props: ForgotPasswordProps) {
  const [isPending, setIsPending] = createSignal(false)

  const [fieldErrors, setFieldErrors] = createSignal<{
    email?: string
  }>({})

  const handleSubmit = async (e: Event) => {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const email = formData.get("email") as string

    setIsPending(true)
    try {
      // Simulate API call - in real implementation, use createRequestPasswordReset
      console.log("Requesting password reset for:", email)
      await new Promise((resolve) => setTimeout(resolve, 1000))
    } catch (error) {
      console.error("Password reset error:", error)
    } finally {
      setIsPending(false)
    }
  }

  return (
    <Card class={cn("w-full max-w-sm py-4 md:py-6 gap-4", props.className)}>
      <CardHeader class="px-4 md:px-6 gap-0">
        <CardTitle class="text-xl">Forgot Password</CardTitle>
      </CardHeader>

      <CardContent class="px-4 md:px-6">
        <form onSubmit={handleSubmit}>
          <FieldGroup class="gap-4">
            <Field class="gap-1" data-invalid={!!fieldErrors().email}>
              <FieldLabel for="email">Email</FieldLabel>

              <Input
                id="email"
                name="email"
                type="email"
                autocomplete="email"
                placeholder="email@example.com"
                required
                disabled={isPending()}
                onInput={() => {
                  setFieldErrors((prev) => ({
                    ...prev,
                    email: undefined
                  }))
                }}
              />

              <FieldError>{fieldErrors().email}</FieldError>
            </Field>

            <Field class="mt-1">
              <Button type="submit" disabled={isPending()} class="w-full">
                <Show when={isPending()}>
                  <Spinner />
                </Show>
                Send Reset Link
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
      </CardContent>
    </Card>
  )
}
