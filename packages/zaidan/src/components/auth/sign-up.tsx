import { createSignInSocial, createSignUpEmail } from "@better-auth-ui/solid"
import { Eye, EyeOff } from "lucide-solid"
import { createSignal, Show } from "solid-js"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Spinner } from "@/components/ui/spinner"
import { cn } from "@/lib/utils"
import { MagicLinkButton } from "./magic-link-button"
import { ProviderButtons, type SocialLayout } from "./provider-buttons"

export type SignUpProps = {
  className?: string
  socialLayout?: SocialLayout
  socialPosition?: "top" | "bottom"
}

export function SignUp(props: SignUpProps) {
  const [password, setPassword] = createSignal("")
  const [confirmPassword, setConfirmPassword] = createSignal("")
  const [isPasswordVisible, setIsPasswordVisible] = createSignal(false)
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    createSignal(false)

  const { signUpEmail, isLoading: signUpPending } = createSignUpEmail()
  const { signInSocial, isLoading: socialPending } = createSignInSocial()

  const isPending = () => signUpPending() || socialPending()

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
    const passwordValue = formData.get("password") as string
    const confirmPasswordValue = formData.get("confirmPassword") as string

    if (passwordValue !== confirmPasswordValue) {
      setFieldErrors((prev) => ({
        ...prev,
        confirmPassword: "Passwords do not match"
      }))
      return
    }

    try {
      await signUpEmail({
        name,
        email,
        password: passwordValue,
        callbackURL: "/dashboard"
      })
    } catch (err: any) {
      setFieldErrors((prev) => ({
        ...prev,
        email: err?.message || "Signup failed"
      }))
    }
  }

  // Mock social providers for now
  const socialProviders = [
    { id: "google", name: "Google" },
    { id: "github", name: "GitHub" }
  ]
  const showSeparator = socialProviders && socialProviders.length > 0

  return (
    <Card class={cn("w-full max-w-sm py-4 md:py-6 gap-4", props.className)}>
      <CardHeader class="px-4 md:px-6 gap-0">
        <CardTitle class="text-xl">Sign Up</CardTitle>
      </CardHeader>

      <CardContent class="px-4 md:px-6">
        <FieldGroup class="gap-4">
          {/* Social buttons at top */}
          <Show
            when={props.socialPosition === "top" && socialProviders.length > 0}
          >
            <ProviderButtons
              socialLayout={props.socialLayout}
              signInSocial={signInSocial}
              isPending={isPending()}
            />
            <Show when={showSeparator}>
              <FieldSeparator class="*:data-[slot=field-separator-content]:bg-card m-0 text-xs flex items-center">
                or
              </FieldSeparator>
            </Show>
          </Show>

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
                  disabled={isPending()}
                  onInput={() => {
                    setFieldErrors((prev) => ({
                      ...prev,
                      name: undefined
                    }))
                  }}
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

              <Field class="gap-1" data-invalid={!!fieldErrors().password}>
                <FieldLabel for="password">Password</FieldLabel>

                <div class="relative">
                  <Input
                    id="password"
                    name="password"
                    type={isPasswordVisible() ? "text" : "password"}
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
                    disabled={isPending()}
                    class="pr-10"
                  />
                  <button
                    type="button"
                    class="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    onClick={() => setIsPasswordVisible(!isPasswordVisible())}
                  >
                    <Show
                      when={isPasswordVisible()}
                      fallback={<Eye size={16} />}
                    >
                      <EyeOff size={16} />
                    </Show>
                  </button>
                </div>

                <FieldError>{fieldErrors().password}</FieldError>
              </Field>

              <Field
                class="gap-1"
                data-invalid={!!fieldErrors().confirmPassword}
              >
                <FieldLabel for="confirmPassword">Confirm Password</FieldLabel>

                <div class="relative">
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={isConfirmPasswordVisible() ? "text" : "password"}
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
                    disabled={isPending()}
                    class="pr-10"
                  />
                  <button
                    type="button"
                    class="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    onClick={() =>
                      setIsConfirmPasswordVisible(!isConfirmPasswordVisible())
                    }
                  >
                    <Show
                      when={isConfirmPasswordVisible()}
                      fallback={<Eye size={16} />}
                    >
                      <EyeOff size={16} />
                    </Show>
                  </button>
                </div>

                <FieldError>{fieldErrors().confirmPassword}</FieldError>
              </Field>

              <Field class="mt-1">
                <Button type="submit" disabled={isPending()}>
                  <Show when={isPending()}>
                    <Spinner />
                  </Show>
                  Sign Up
                </Button>

                <MagicLinkButton view="signUp" isPending={isPending()} />
              </Field>
            </FieldGroup>
          </form>

          {/* Social buttons at bottom */}
          <Show
            when={
              props.socialPosition === "bottom" && socialProviders.length > 0
            }
          >
            <Show when={showSeparator}>
              <FieldSeparator class="*:data-[slot=field-separator-content]:bg-card m-0 text-xs flex items-center">
                or
              </FieldSeparator>
            </Show>
            <ProviderButtons
              socialLayout={props.socialLayout}
              signInSocial={signInSocial}
              isPending={isPending()}
            />
          </Show>

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
