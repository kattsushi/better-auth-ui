import { UserButton } from "@better-auth-ui/zaidan"
import { Logo } from "./logo"

export function Header() {
  return (
    <header class="sticky top-0 z-10 bg-background border-b shadow-xs">
      <div class="py-3 px-4 md:px-6 mx-auto justify-between flex items-center">
        <a href="/" class="flex items-center gap-2.5">
          <Logo />
          <h1 class="text-base">BETTER-AUTH. UI</h1>
        </a>
        <UserButton />
      </div>
    </header>
  )
}
