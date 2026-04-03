import { render } from "@solidjs/testing-library";
import { describe, expect, it } from "vitest";
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../../src/components/ui/card";
describe("Card", () => {
    it("should render correctly", () => {
        const { container } = render(() => <Card />);
        const card = container.querySelector("div");
        expect(card).not.toBeNull();
        expect(card?.getAttribute("data-slot")).toBe("card");
    });
    it("should have z-card class", () => {
        const { container } = render(() => <Card />);
        const card = container.querySelector("div");
        expect(card?.className).toContain("z-card");
    });
    it("should apply custom class", () => {
        const { container } = render(() => <Card class="custom-class"/>);
        const card = container.querySelector("div");
        expect(card?.className).toContain("custom-class");
    });
    it("should render children", () => {
        const { container } = render(() => <Card>Card Content</Card>);
        const card = container.querySelector("div");
        expect(card?.textContent).toBe("Card Content");
    });
});
describe("CardHeader", () => {
    it("should render correctly", () => {
        const { container } = render(() => <CardHeader />);
        const header = container.querySelector("div");
        expect(header).not.toBeNull();
        expect(header?.getAttribute("data-slot")).toBe("card-header");
    });
    it("should have z-card-header class", () => {
        const { container } = render(() => <CardHeader />);
        const header = container.querySelector("div");
        expect(header?.className).toContain("z-card-header");
    });
    it("should render children", () => {
        const { container } = render(() => <CardHeader>Header Content</CardHeader>);
        const header = container.querySelector("div");
        expect(header?.textContent).toBe("Header Content");
    });
});
describe("CardTitle", () => {
    it("should render correctly", () => {
        const { container } = render(() => <CardTitle />);
        const title = container.querySelector("div");
        expect(title).not.toBeNull();
        expect(title?.getAttribute("data-slot")).toBe("card-title");
    });
    it("should have z-card-title class", () => {
        const { container } = render(() => <CardTitle />);
        const title = container.querySelector("div");
        expect(title?.className).toContain("z-card-title");
    });
    it("should render children", () => {
        const { container } = render(() => <CardTitle>My Title</CardTitle>);
        const title = container.querySelector("div");
        expect(title?.textContent).toBe("My Title");
    });
});
describe("CardDescription", () => {
    it("should render correctly", () => {
        const { container } = render(() => <CardDescription />);
        const description = container.querySelector("div");
        expect(description).not.toBeNull();
        expect(description?.getAttribute("data-slot")).toBe("card-description");
    });
    it("should have z-card-description class", () => {
        const { container } = render(() => <CardDescription />);
        const description = container.querySelector("div");
        expect(description?.className).toContain("z-card-description");
    });
    it("should render children", () => {
        const { container } = render(() => (<CardDescription>Description text</CardDescription>));
        const description = container.querySelector("div");
        expect(description?.textContent).toBe("Description text");
    });
});
describe("CardContent", () => {
    it("should render correctly", () => {
        const { container } = render(() => <CardContent />);
        const content = container.querySelector("div");
        expect(content).not.toBeNull();
        expect(content?.getAttribute("data-slot")).toBe("card-content");
    });
    it("should have z-card-content class", () => {
        const { container } = render(() => <CardContent />);
        const content = container.querySelector("div");
        expect(content?.className).toContain("z-card-content");
    });
    it("should render children", () => {
        const { container } = render(() => <CardContent>Content here</CardContent>);
        const content = container.querySelector("div");
        expect(content?.textContent).toBe("Content here");
    });
});
describe("CardFooter", () => {
    it("should render correctly", () => {
        const { container } = render(() => <CardFooter />);
        const footer = container.querySelector("div");
        expect(footer).not.toBeNull();
        expect(footer?.getAttribute("data-slot")).toBe("card-footer");
    });
    it("should have z-card-footer class", () => {
        const { container } = render(() => <CardFooter />);
        const footer = container.querySelector("div");
        expect(footer?.className).toContain("z-card-footer");
    });
    it("should render children", () => {
        const { container } = render(() => <CardFooter>Footer content</CardFooter>);
        const footer = container.querySelector("div");
        expect(footer?.textContent).toBe("Footer content");
    });
});
describe("CardAction", () => {
    it("should render correctly", () => {
        const { container } = render(() => <CardAction />);
        const action = container.querySelector("div");
        expect(action).not.toBeNull();
        expect(action?.getAttribute("data-slot")).toBe("card-action");
    });
    it("should have z-card-action class", () => {
        const { container } = render(() => <CardAction />);
        const action = container.querySelector("div");
        expect(action?.className).toContain("z-card-action");
    });
    it("should render children", () => {
        const { container } = render(() => <CardAction>Action Button</CardAction>);
        const action = container.querySelector("div");
        expect(action?.textContent).toBe("Action Button");
    });
});
describe("Card structure validation", () => {
    it("should render complete card structure", () => {
        const { container } = render(() => (<Card>
        <CardHeader>
          <CardTitle>Title</CardTitle>
          <CardDescription>Description</CardDescription>
          <CardAction>Action</CardAction>
        </CardHeader>
        <CardContent>Content</CardContent>
        <CardFooter>Footer</CardFooter>
      </Card>));
        // Verify Card
        expect(container.querySelector('[data-slot="card"]')).not.toBeNull();
        // Verify CardHeader
        expect(container.querySelector('[data-slot="card-header"]')).not.toBeNull();
        // Verify CardTitle
        expect(container.querySelector('[data-slot="card-title"]')).not.toBeNull();
        // Verify CardDescription
        expect(container.querySelector('[data-slot="card-description"]')).not.toBeNull();
        // Verify CardAction
        expect(container.querySelector('[data-slot="card-action"]')).not.toBeNull();
        // Verify CardContent
        expect(container.querySelector('[data-slot="card-content"]')).not.toBeNull();
        // Verify CardFooter
        expect(container.querySelector('[data-slot="card-footer"]')).not.toBeNull();
    });
});
