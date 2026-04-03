import { createSignUpEmail } from "@better-auth-ui/solid"
import { createEffect, createSignal } from "solid-js"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { MagicLinkButton } from "./magic-link-button"
import type { SocialLayout } from "./provider-buttons"

export type SignUpProps = {
  className?: string
  socialLayout?: SocialLayout
  socialPosition?: "top" | "bottom"
}

export function SignUp(props: SignUpProps) {
  const [password, setPassword] = createSignal("")
  const [confirmPassword, setConfirmPassword] = createSignal("")
  const [loading, setLoading] = createSignal(false)
  const [debug, setDebug] = createSignal("init")

  const { signUpEmail, isLoading: signUpPending } = createSignUpEmail()

  createEffect(() => {
    setDebug("createEffect: signUpPending = " + signUpPending())
  })

  const [fieldErrors, setFieldErrors] = createSignal<{
    name?: string
    email?: string
    password?: string
    confirmPassword?: string
  }>({})

  // Native DOM event handler
  const handleButtonClick = () => {
    console.log("NATIVE: button clicked")
    setDebug("NATIVE: button clicked at " + new Date().toISOString())

    const nameInput = document.getElementById("name") as HTMLInputElement
    const emailInput = document.getElementById("email") as HTMLInputElement
    const passwordInput = document.getElementById(
      "password"
    ) as HTMLInputElement
    const confirmPasswordInput = document.getElementById(
      "confirmPassword"
    ) as HTMLInputElement

    const name = nameInput?.value || ""
    const email = emailInput?.value || ""
    const passwordValue = passwordInput?.value || ""
    const confirmPasswordValue = confirmPasswordInput?.value || ""

    setDebug("values: " + name + ", " + email)

    if (passwordValue !== confirmPasswordValue) {
      setFieldErrors((prev) => ({
        ...prev,
        confirmPassword: "Passwords do not match"
      }))
      return
    }

    if (!name || !email || !passwordValue) {
      setFieldErrors((prev) => ({
        ...prev,
        name: !name ? "Name is required" : undefined,
        email: !email ? "Email is required" : undefined,
        password: !passwordValue ? "Password is required" : undefined
      }))
      return
    }

    setLoading(true)
    setDebug("calling signUpEmail...")

    signUpEmail({
      name,
      email,
      password: passwordValue,
      callbackURL: "/dashboard"
    })
      .then(() => {
        setDebug("signUpEmail resolved!")
        setLoading(false)
      })
      .catch((err) => {
        setDebug("Error: " + err?.message)
        setFieldErrors((prev) => ({
          ...prev,
          email: err?.message || "Signup failed"
        }))
        setLoading(false)
      })
  }

  return (
    <>
      {/* Debug div - always visible */}
      <div
        style={{
          position: "fixed",
          top: "10px",
          right: "10px",
          padding: "15px",
          background: "#ff0",
          "z-index": 9999,
          "font-size": "14px",
          border: "2px solid red"
        }}
      >
        <div>
          <strong>DEBUG:</strong> {debug()}
        </div>
        <div>
          <strong>signUpPending:</strong> {String(signUpPending())}
        </div>
        <div>
          <strong>loading:</strong> {String(loading())}
        </div>
      </div>

      <Card class={cn("w-full max-w-sm py-4 md:py-6 gap-4", props.className)}>
        <CardHeader class="px-4 md:px-6 gap-0">
          <CardTitle class="text-xl">Sign Up</CardTitle>
        </CardHeader>

        <CardContent class="px-4 md:px-6">
          <FieldGroup class="gap-4">
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
                />

                <FieldError>{fieldErrors().confirmPassword}</FieldError>
              </Field>

              <Field class="mt-1">
                <button
                  type="button"
                  onClick={handleButtonClick}
                  disabled={loading()}
                  style={{
                    display: "inline-flex",
                    "align-items": "center",
                    "justify-content": "center",
                    padding: "0.5rem 1rem",
                    "border-radius": "0.375rem",
                    width: "100%",
                    "font-weight": "500",
                    background: loading() ? "#ccc" : "#000",
                    color: "#fff",
                    border: "none",
                    cursor: loading() ? "not-allowed" : "pointer"
                  }}
                >
                  {loading() ? "Loading..." : "Sign Up"}
                </button>

                <MagicLinkButton view="signUp" isPending={loading()} />
              </Field>
            </FieldGroup>

            <FieldDescription class="text-center">
              Already have an account?{" "}
              <a href="/auth/sign-in" class="underline underline-offset-4">
                Sign In
              </a>
            </FieldDescription>
          </FieldGroup>
        </CardContent>
      </Card>
    </>
  )
}
