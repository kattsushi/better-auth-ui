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

export type MagicLinkProps = {
  className?: string
  socialLayout?: SocialLayout
  socialPosition?: "top" | "bottom"
}

/**
 * Render a card-based sign-in form that sends an email magic link and optionally shows social provider buttons.
 *
 * @param className - Additional CSS class names applied to the card container
 * @param socialLayout - Layout style for social provider buttons
 * @param socialPosition - Position of social provider buttons; `"top"` or `"bottom"`. Defaults to `"bottom"`.
 * @returns The magic-link sign-in UI as a JSX element
 */
export function MagicLink(props: MagicLinkProps) {
  const [email, setEmail] = createSignal("")
  const [isPending, setIsPending] = createSignal(false)

  const [fieldErrors, setFieldErrors] = createSignal<{
    email?: string
  }>({})

  const handleSubmit = async (e: Event) => {
    e.preventDefault()
    setIsPending(true)
    try {
      // Simulate API call - in real implementation, use createSignInMagicLink
      console.log("Sending magic link to:", email())
      await new Promise((resolve) => setTimeout(resolve, 1000))
    } catch (error) {
      console.error("Magic link error:", error)
    } finally {
      setIsPending(false)
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
                  value={email()}
                  onInput={(e: Event) => {
                    const target = e.target as HTMLInputElement
                    setEmail(target.value)
                    setFieldErrors((prev) => ({
                      ...prev,
                      email: undefined
                    }))
                  }}
                  placeholder="email@example.com"
                  required
                  disabled={isPending()}
                />

                <FieldError>{fieldErrors().email}</FieldError>
              </Field>

              <Field class="mt-1">
                <Button type="submit" disabled={isPending()} class="w-full">
                  <Show when={isPending()}>
                    <Spinner />
                  </Show>
                  Send Magic Link
                </Button>

                <MagicLinkButton view="magicLink" isPending={isPending()} />
              </Field>
            </FieldGroup>
          </form>

          <FieldDescription class="text-center">
            Don't have an account?{" "}
            <a href="/auth/sign-up" class="underline underline-offset-4">
              Sign Up
            </a>
          </FieldDescription>
        </FieldGroup>
      </CardContent>
    </Card>
  )
}
