import { render } from "@solidjs/testing-library"
import { describe, expect, it } from "vitest"
import { Button } from "../../../src/components/ui/button"

describe("Button", () => {
  it("should render correctly", () => {
    const { container } = render(() => <Button>Click me</Button>)
    const button = container.querySelector("button")
    expect(button).not.toBeNull()
    expect(button?.textContent).toBe("Click me")
  })

  it("should have z-button class", () => {
    const { container } = render(() => <Button>Test</Button>)
    const button = container.querySelector("button")
    expect(button?.className).toContain("z-button")
  })

  it("should apply default variant classes", () => {
    const { container } = render(() => <Button>Default Button</Button>)
    const button = container.querySelector("button")
    expect(button?.className).toContain("z-button-variant-default")
  })

  it("should apply outline variant classes", () => {
    const { container } = render(() => (
      <Button variant="outline">Outline</Button>
    ))
    const button = container.querySelector("button")
    expect(button?.className).toContain("z-button-variant-outline")
  })

  it("should apply secondary variant classes", () => {
    const { container } = render(() => (
      <Button variant="secondary">Secondary</Button>
    ))
    const button = container.querySelector("button")
    expect(button?.className).toContain("z-button-variant-secondary")
  })

  it("should apply destructive variant classes", () => {
    const { container } = render(() => (
      <Button variant="destructive">Delete</Button>
    ))
    const button = container.querySelector("button")
    expect(button?.className).toContain("z-button-variant-destructive")
  })

  it("should apply ghost variant classes", () => {
    const { container } = render(() => <Button variant="ghost">Ghost</Button>)
    const button = container.querySelector("button")
    expect(button?.className).toContain("z-button-variant-ghost")
  })

  it("should apply link variant classes", () => {
    const { container } = render(() => <Button variant="link">Link</Button>)
    const button = container.querySelector("button")
    expect(button?.className).toContain("z-button-variant-link")
  })

  it("should apply default size classes", () => {
    const { container } = render(() => <Button>Default Size</Button>)
    const button = container.querySelector("button")
    expect(button?.className).toContain("z-button-size-default")
  })

  it("should apply sm size classes", () => {
    const { container } = render(() => <Button size="sm">Small</Button>)
    const button = container.querySelector("button")
    expect(button?.className).toContain("z-button-size-sm")
  })

  it("should apply lg size classes", () => {
    const { container } = render(() => <Button size="lg">Large</Button>)
    const button = container.querySelector("button")
    expect(button?.className).toContain("z-button-size-lg")
  })

  it("should apply icon size classes", () => {
    const { container } = render(() => <Button size="icon">Icon</Button>)
    const button = container.querySelector("button")
    expect(button?.className).toContain("z-button-size-icon")
  })

  it("should apply custom class", () => {
    const { container } = render(() => (
      <Button class="custom-class">Custom</Button>
    ))
    const button = container.querySelector("button")
    expect(button?.className).toContain("custom-class")
  })

  it("should be disabled when disabled prop is true", () => {
    const { container } = render(() => <Button disabled>Disabled</Button>)
    const button = container.querySelector("button")
    expect(button?.hasAttribute("disabled")).toBe(true)
  })

  it("should have data-slot attribute", () => {
    const { container } = render(() => <Button>Slot Test</Button>)
    const button = container.querySelector("button")
    expect(button?.getAttribute("data-slot")).toBe("button")
  })
})
