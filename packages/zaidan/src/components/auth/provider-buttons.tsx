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

import { For, Show } from "solid-js"

import { Button } from "@/components/ui/button"
import { Field } from "@/components/ui/field"
import { cn } from "@/lib/utils"

export type ProviderButtonsProps = {
  isPending: boolean
  socialLayout?: SocialLayout
  socialProviders?: { id: string; name: string }[]
  signInSocial: (params: {
    provider: SocialProvider
    callbackURL: string
  }) => void | Promise<void>
}

export type SocialLayout = "auto" | "horizontal" | "vertical" | "grid"

// Provider labels
const providerLabels: Record<SocialProvider, string> = {
  google: "Google",
  github: "GitHub",
  apple: "Apple",
  discord: "Discord",
  facebook: "Facebook",
  twitter: "Twitter",
  linkedin: "LinkedIn",
  microsoft: "Microsoft"
}

/**
 * Render sign-in buttons for configured social providers.
 */
export function ProviderButtons(props: ProviderButtonsProps) {
  const providers = () => props.socialProviders ?? []

  const resolvedSocialLayout = () => {
    if (props.socialLayout === "auto") {
      return "vertical"
    }
    return props.socialLayout ?? "vertical"
  }

  const getProviderLabel = (providerId: string) => {
    return providerLabels[providerId as SocialProvider] ?? providerId
  }

  return (
    <Field
      class={cn(
        "gap-3",
        resolvedSocialLayout() === "grid" && "grid grid-cols-2",
        resolvedSocialLayout() === "vertical" && "flex-col",
        resolvedSocialLayout() === "horizontal" && "flex-row flex-wrap"
      )}
    >
      <Show when={providers() && providers().length > 0}>
        <For each={providers()}>
          {(provider) => (
            <Button
              class={cn(
                "flex-1",
                resolvedSocialLayout() === "horizontal" && "flex-1"
              )}
              variant="outline"
              disabled={props.isPending}
              onClick={() => {
                props.signInSocial({
                  provider: provider.id as SocialProvider,
                  callbackURL: "/"
                })
              }}
            >
              {provider.name || getProviderLabel(provider.id)}
            </Button>
          )}
        </For>
      </Show>
    </Field>
  )
}
