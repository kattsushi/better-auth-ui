import { render } from "@solidjs/testing-library"
import { describe, expect, it } from "vitest"
import { Input } from "../../../src/components/ui/input"

describe("Input", () => {
  it("should render correctly", () => {
    const { container } = render(() => <Input />)
    const input = container.querySelector("input")
    expect(input).not.toBeNull()
  })

  it("should render with placeholder", () => {
    const { container } = render(() => <Input placeholder="Enter text" />)
    const input = container.querySelector("input")
    expect(input?.placeholder).toBe("Enter text")
  })

  it("should render with type", () => {
    const { container } = render(() => <Input type="email" />)
    const input = container.querySelector("input")
    expect(input?.type).toBe("email")
  })

  it("should render with password type", () => {
    const { container } = render(() => <Input type="password" />)
    const input = container.querySelector("input")
    expect(input?.type).toBe("password")
  })

  it("should render with custom class", () => {
    const { container } = render(() => <Input class="custom-class" />)
    const input = container.querySelector("input")
    expect(input?.className).toContain("custom-class")
  })

  it("should have data-slot attribute", () => {
    const { container } = render(() => <Input />)
    const input = container.querySelector("input")
    expect(input?.getAttribute("data-slot")).toBe("input")
  })

  it("should have z-input class", () => {
    const { container } = render(() => <Input />)
    const input = container.querySelector("input")
    expect(input?.className).toContain("z-input")
  })

  it("should handle value changes", () => {
    const { container } = render(() => <Input />)
    const inputElement = container.querySelector("input")
    expect(inputElement).not.toBeNull()

    // Simulate user input
    inputElement!.value = "test value"
    inputElement!.dispatchEvent(new Event("input", { bubbles: true }))

    expect(inputElement?.value).toBe("test value")
  })

  it("should be disabled when disabled prop is true", () => {
    const { container } = render(() => <Input disabled />)
    const input = container.querySelector("input")
    expect(input?.hasAttribute("disabled")).toBe(true)
  })

  it("should be readonly when readOnly prop is true", () => {
    const { container } = render(() => <Input readOnly />)
    const input = container.querySelector("input")
    expect(input?.hasAttribute("readonly")).toBe(true)
  })

  it("should render with id", () => {
    const { container } = render(() => <Input id="test-input" />)
    const input = container.querySelector("input")
    expect(input?.id).toBe("test-input")
  })

  it("should render with name", () => {
    const { container } = render(() => <Input name="test-name" />)
    const input = container.querySelector("input")
    expect(input?.name).toBe("test-name")
  })
})
