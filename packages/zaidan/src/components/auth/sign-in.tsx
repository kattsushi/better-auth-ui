import { createSignInEmail } from "@better-auth-ui/solid"
import { createSignal, Show } from "solid-js"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Spinner } from "@/components/ui/spinner"
import { cn } from "@/lib/utils"
import { MagicLinkButton } from "./magic-link-button"
import type { SocialLayout } from "./provider-buttons"

export type SignInProps = {
  className?: string
  socialLayout?: SocialLayout
  socialPosition?: "top" | "bottom"
}

/**
 * Render the sign-in form UI with email/password, magic link, and social provider options.
 *
 * @param className - Optional additional container class names
 * @param socialLayout - Layout style for social provider buttons
 * @param socialPosition - Position of social provider buttons; `"top"` or `"bottom"`. Defaults to `"bottom"`.
 * @returns The rendered sign-in UI as a JSX element
 */
export function SignIn(props: SignInProps) {
  const [password, setPassword] = createSignal("")

  const { signInEmail, isLoading: signInPending } = createSignInEmail()

  const [fieldErrors, setFieldErrors] = createSignal<{
    email?: string
    password?: string
  }>({})

  const handleSubmit = async (e: Event) => {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const email = formData.get("email") as string

    try {
      await signInEmail({
        email,
        password: password()
      })
    } catch (error) {
      console.error("Sign in error:", error)
    }
  }

  return (
    <Card class={cn("w-full max-w-sm py-4 md:py-6 gap-4", props.className)}>
      <CardHeader class="px-4 md:px-6 gap-0">
        <CardTitle class="text-xl">Sign In</CardTitle>
      </CardHeader>

      <CardContent class="px-4 md:px-6">
        <FieldGroup class="gap-4">
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
                  disabled={signInPending()}
                  onInput={() => {
                    setFieldErrors((prev) => ({
                      ...prev,
                      email: undefined
                    }))
                  }}
                />

                <FieldError>{fieldErrors().email}</FieldError>
              </Field>

              <Field class="gap-1" data-invalid={!!fieldErrors().password}>
                <FieldLabel for="password">Password</FieldLabel>

                <Input
                  id="password"
                  name="password"
                  type="password"
                  autocomplete="current-password"
                  value={password()}
                  onInput={(e: Event) => {
                    const target = e.target as HTMLInputElement
                    setPassword(target.value)
                    setFieldErrors((prev) => ({
                      ...prev,
                      password: undefined
                    }))
                  }}
                  placeholder="Enter your password"
                  required
                  disabled={signInPending()}
                />

                <FieldError>{fieldErrors().password}</FieldError>
              </Field>

              <Field class="my-1">
                <div class="flex items-center gap-2">
                  <Checkbox disabled={signInPending()} />

                  <Label class="cursor-pointer text-sm font-normal">
                    Remember me
                  </Label>
                </div>
              </Field>

              <Field class="mt-1">
                <Button type="submit" disabled={signInPending()}>
                  <Show when={signInPending()}>
                    <Spinner />
                  </Show>
                  Sign In
                </Button>

                <MagicLinkButton view="signIn" isPending={signInPending()} />
              </Field>
            </FieldGroup>
          </form>

          <div class="flex flex-col gap-3">
            <FieldDescription class="text-center">
              Don't have an account?{" "}
              <a href="/auth/sign-up" class="underline underline-offset-4">
                Sign Up
              </a>
            </FieldDescription>
          </div>
        </FieldGroup>
      </CardContent>
    </Card>
  )
}
