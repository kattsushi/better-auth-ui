import { createSignal, onMount, Show } from "solid-js"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Field, FieldLabel } from "@/components/ui/field"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  ThemePreviewDark,
  ThemePreviewLight,
  ThemePreviewSystem
} from "./theme-preview"

export type AppearanceProps = {
  className?: string
}

/**
 * Render a theme selector card with visual theme previews.
 *
 * @param className - Optional CSS class name
 * @returns A JSX element containing the theme selector card
 */
export function Appearance(props: AppearanceProps) {
  const [theme, setTheme] = createSignal("system")
  const [isHydrated, setIsHydrated] = createSignal(false)

  onMount(() => {
    const stored = localStorage.getItem("theme") || "system"
    setTheme(stored)
    setIsHydrated(true)
    applyTheme(stored, false)
  })

  const applyTheme = (newTheme: string, persist = true) => {
    if (persist) {
      localStorage.setItem("theme", newTheme)
    }

    if (newTheme === "dark") {
      document.documentElement.classList.add("dark")
    } else if (newTheme === "light") {
      document.documentElement.classList.remove("dark")
    } else {
      document.documentElement.classList.remove("dark")
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        document.documentElement.classList.add("dark")
      }
    }
  }

  const handleThemeChange = (value: string) => {
    setTheme(value)
    applyTheme(value, true)
  }

  return (
    <Card class={`py-4 md:py-6 gap-4 ${props.className || ""}`}>
      <CardHeader class="px-4 md:px-6 gap-0">
        <CardTitle class="text-xl">Appearance</CardTitle>
      </CardHeader>

      <CardContent class="px-4 md:px-6">
        <Label class="mb-4 block">Theme</Label>

        <Show
          when={isHydrated()}
          fallback={<div class="h-40 bg-muted animate-pulse" />}
        >
          <RadioGroup
            value={theme()}
            onChange={handleThemeChange}
            class="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
          >
            <FieldLabel for="system">
              <Field orientation="horizontal">
                <div class="flex flex-col gap-3">
                  <span class="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="text-muted-foreground"
                      aria-hidden="true"
                    >
                      <rect width="20" height="14" x="2" y="3" rx="2" />
                      <path d="M8 21h8M12 17v4" />
                    </svg>
                    System
                  </span>
                  <ThemePreviewSystem class="w-full" />
                </div>
                <RadioGroupItem value="system" id="system" />
              </Field>
            </FieldLabel>

            <FieldLabel for="light">
              <Field orientation="horizontal">
                <div class="flex flex-col gap-3">
                  <span class="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="text-muted-foreground"
                      aria-hidden="true"
                    >
                      <circle cx="12" cy="12" r="4" />
                      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
                    </svg>
                    Light
                  </span>
                  <ThemePreviewLight class="w-full" />
                </div>
                <RadioGroupItem value="light" id="light" />
              </Field>
            </FieldLabel>

            <FieldLabel for="dark">
              <Field orientation="horizontal">
                <div class="flex flex-col gap-3">
                  <span class="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="text-muted-foreground"
                      aria-hidden="true"
                    >
                      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
                    </svg>
                    Dark
                  </span>
                  <ThemePreviewDark class="w-full" />
                </div>
                <RadioGroupItem value="dark" id="dark" />
              </Field>
            </FieldLabel>
          </RadioGroup>
        </Show>
      </CardContent>
    </Card>
  )
}
