import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export type LinkedAccountsProps = {
  className?: string
}

/**
 * Render a card showing linked social accounts and available social providers to link.
 *
 * Linked accounts (excluding the "credential" provider) are shown with an unlink control;
 * available providers are shown with a link control.
 *
 * @returns A JSX element containing the linked accounts card
 */
export function LinkedAccounts(props: LinkedAccountsProps) {
  // TODO: Replace with createListAccounts, createLinkSocial, createUnlinkAccount hooks
  // TODO: Get socialProviders from auth context
  const socialProviders: string[] = []
  const accounts: any[] = []

  return (
    <Card class={`w-full py-4 md:py-6 gap-4 ${props.className || ""}`}>
      <CardHeader class="px-4 md:px-6 gap-0">
        <CardTitle class="text-xl">Linked accounts</CardTitle>
      </CardHeader>

      <CardContent class="px-4 md:px-6 grid gap-3">
        <p class="text-sm text-muted-foreground">
          Coming soon — Social account linking is under development.
        </p>

        {/* TODO: Render LinkedAccount components when hooks are available */}
        {/* 
        <For each={accounts?.filter((account) => account.providerId !== "credential")}>
          {(account) => <LinkedAccount account={account} provider={account.providerId} />}
        </For>

        <For each={socialProviders}>
          {(provider) => <LinkedAccount provider={provider} />}
        </For>
        */}
      </CardContent>
    </Card>
  )
}
