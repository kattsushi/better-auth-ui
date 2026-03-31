import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export type MagicLinkButtonProps = {
  isPending: boolean
  view?: string
}

/**
 * Renders a full-width outline button that navigates to either the magic-link flow or the sign-in flow and shows the matching icon and label.
 *
 * @param isPending - If true, disables the button and applies pending styling
 * @param view - Current auth view
 * @returns The button element configured to navigate to the appropriate auth route
 */
export function MagicLinkButton(props: MagicLinkButtonProps) {
  const isMagicLinkView = () => props.view === "magicLink"

  return (
    <Button
      type="button"
      variant="outline"
      disabled={props.isPending}
      class={cn("w-full", props.isPending && "opacity-50 pointer-events-none")}
    >
      <a href={isMagicLinkView() ? "/auth/sign-in" : "/auth/magic-link"}>
        {isMagicLinkView()
          ? "Sign in with password"
          : "Sign in with magic link"}
      </a>
    </Button>
  )
}
