import { createSignUpEmail } from "@better-auth-ui/solid"
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
import { MagicLinkButton } from "./magic-link-button"
import type { SocialLayout } from "./provider-buttons"

export type SignUpProps = {
  className?: string
  socialLayout?: SocialLayout
  socialPosition?: "top" | "bottom"
}

/**
 * Render a sign-up form with name, email, and password fields, optional social provider buttons, and submission handling.
 *
 * @param className - Additional CSS classes applied to the outer container
 * @param socialLayout - Social layout to apply to the component
 * @param socialPosition - Social position to apply to the component
 * @returns The sign-up form JSX element
 */
export function SignUp(props: SignUpProps) {
  const [password, setPassword] = createSignal("")
  const [confirmPassword, setConfirmPassword] = createSignal("")

  const { signUpEmail, isLoading: signUpPending } = createSignUpEmail()

  const [fieldErrors, setFieldErrors] = createSignal<{
    name?: string
    email?: string
    password?: string
    confirmPassword?: string
  }>({})

  const handleSubmit = async (e: Event) => {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const name = formData.get("name") as string
    const email = formData.get("email") as string

    if (password() !== confirmPassword()) {
      console.error("Passwords do not match")
      return
    }

    try {
      await signUpEmail({ name, email, password: password() })
    } catch (error) {
      console.error("Sign up error:", error)
    }
  }

  return (
    <Card class={cn("w-full max-w-sm py-4 md:py-6 gap-4", props.className)}>
      <CardHeader class="px-4 md:px-6 gap-0">
        <CardTitle class="text-xl">Sign Up</CardTitle>
      </CardHeader>

      <CardContent class="px-4 md:px-6">
        <FieldGroup class="gap-4">
          <form onSubmit={handleSubmit}>
            <FieldGroup class="gap-4">
              <Field class="gap-1" data-invalid={!!fieldErrors().name}>
                <FieldLabel for="name">Name</FieldLabel>

                <Input
                  id="name"
                  name="name"
                  type="text"
                  autocomplete="name"
                  placeholder="Your name"
                  required
                  disabled={signUpPending()}
                />

                <FieldError>{fieldErrors().name}</FieldError>
              </Field>

              <Field class="gap-1" data-invalid={!!fieldErrors().email}>
                <FieldLabel for="email">Email</FieldLabel>

                <Input
                  id="email"
                  name="email"
                  type="email"
                  autocomplete="email"
                  placeholder="email@example.com"
                  required
                  disabled={signUpPending()}
                />

                <FieldError>{fieldErrors().email}</FieldError>
              </Field>

              <Field class="gap-1" data-invalid={!!fieldErrors().password}>
                <FieldLabel for="password">Password</FieldLabel>

                <Input
                  id="password"
                  name="password"
                  type="password"
                  autocomplete="new-password"
                  value={password()}
                  onInput={(e: Event) => {
                    const target = e.target as HTMLInputElement
                    setPassword(target.value)
                    setFieldErrors((prev) => ({
                      ...prev,
                      password: undefined
                    }))
                  }}
                  placeholder="Create a password"
                  required
                  disabled={signUpPending()}
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
                  value={confirmPassword()}
                  onInput={(e: Event) => {
                    const target = e.target as HTMLInputElement
                    setConfirmPassword(target.value)
                    setFieldErrors((prev) => ({
                      ...prev,
                      confirmPassword: undefined
                    }))
                  }}
                  placeholder="Confirm your password"
                  required
                  disabled={signUpPending()}
                />

                <FieldError>{fieldErrors().confirmPassword}</FieldError>
              </Field>

              <Field class="mt-1">
                <Button type="submit" disabled={signUpPending()}>
                  <Show when={signUpPending()}>
                    <Spinner />
                  </Show>
                  Sign Up
                </Button>

                <MagicLinkButton view="signUp" isPending={signUpPending()} />
              </Field>
            </FieldGroup>
          </form>

          <FieldDescription class="text-center">
            Already have an account?{" "}
            <a href="/auth/sign-in" class="underline underline-offset-4">
              Sign In
            </a>
          </FieldDescription>
        </FieldGroup>
      </CardContent>
    </Card>
  )
}
