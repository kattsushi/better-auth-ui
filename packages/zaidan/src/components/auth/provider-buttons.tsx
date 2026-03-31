// Social providers supported by better-auth
export type SocialProvider =
  | "google"
  | "github"
  | "apple"
  | "discord"
  | "facebook"
  | "twitter"
  | "linkedin"
  | "microsoft"

import { createMemo, Show } from "solid-js"

import { Button } from "@/components/ui/button"
import { Field } from "@/components/ui/field"
import { cn } from "@/lib/utils"

export type ProviderButtonsProps = {
  isPending: boolean
  socialLayout?: SocialLayout
  signInSocial: (params: {
    provider: SocialProvider
    callbackURL: string
  }) => void
}

export type SocialLayout = "auto" | "horizontal" | "vertical" | "grid"

/**
 * Render sign-in buttons for configured social providers.
 *
 * @param isPending - When true, disables all provider buttons.
 * @param socialLayout - Preferred layout for the provider buttons
 * @param signInSocial - Callback invoked with the provider and callbackURL when a button is clicked.
 * @returns A JSX element containing provider sign-in buttons.
 */
export function ProviderButtons(props: ProviderButtonsProps) {
  const resolvedSocialLayout = createMemo(() => {
    if (props.socialLayout === "auto") {
      return "vertical"
    }
    return props.socialLayout ?? "vertical"
  })

  return (
    <Field
      class={cn(
        "gap-3",
        resolvedSocialLayout() === "grid" && "grid grid-cols-2",
        resolvedSocialLayout() === "vertical" && "flex-col",
        resolvedSocialLayout() === "horizontal" && "flex-row flex-wrap"
      )}
    >
      <Show when={true}>
        <Button
          class={cn(
            "flex-1",
            resolvedSocialLayout() === "horizontal" && "flex-1"
          )}
          variant="outline"
          disabled={props.isPending}
          onClick={() =>
            props.signInSocial({ provider: "google", callbackURL: "/" })
          }
        >
          Google
        </Button>
      </Show>
    </Field>
  )
}
