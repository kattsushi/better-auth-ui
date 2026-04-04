import type { PolymorphicProps } from "@kobalte/core"
import {
  Content,
  List,
  Root,
  type TabsContentProps as TabsContentPrimitiveProps,
  type TabsListProps as TabsListPrimitiveProps,
  type TabsRootProps,
  type TabsTriggerProps as TabsTriggerPrimitiveProps,
  Trigger
} from "@kobalte/core/tabs"
import { type ComponentProps, splitProps, type ValidComponent } from "solid-js"
import { cn } from "@/lib/utils"

type TabsProps<T extends ValidComponent = "div"> = PolymorphicProps<
  T,
  TabsRootProps<T>
> &
  Pick<ComponentProps<T>, "class" | "children">

const Tabs = <T extends ValidComponent = "div">(props: TabsProps<T>) => {
  const [local, others] = splitProps(props as TabsProps, ["class"])
  return (
    <Root
      data-slot="tabs"
      class={cn("flex flex-col gap-2", local.class)}
      {...others}
    />
  )
}

type TabsListProps<T extends ValidComponent = "div"> = PolymorphicProps<
  T,
  TabsListPrimitiveProps<T>
> &
  Pick<ComponentProps<T>, "class" | "children">

const TabsList = <T extends ValidComponent = "div">(
  props: TabsListProps<T>
) => {
  const [local, others] = splitProps(props as TabsListProps, ["class"])
  return (
    <List
      data-slot="tabs-list"
      class={cn(
        "bg-muted text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-lg p-[3px]",
        local.class
      )}
      {...others}
    />
  )
}

type TabTriggerProps<T extends ValidComponent = "button"> = PolymorphicProps<
  T,
  TabsTriggerPrimitiveProps<T>
> &
  Pick<ComponentProps<T>, "class" | "children">

const TabsTrigger = <T extends ValidComponent = "button">(
  props: TabTriggerProps<T>
) => {
  const [local, others] = splitProps(props as TabTriggerProps, ["class"])
  return (
    <Trigger
      data-slot="tabs-trigger"
      class={cn(
        "data-[state=active]:bg-background dark:data-[state=active]:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 text-foreground dark:text-muted-foreground inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        local.class
      )}
      {...others}
    />
  )
}

type TabsContentProps<T extends ValidComponent = "div"> = PolymorphicProps<
  T,
  TabsContentPrimitiveProps<T>
> &
  Pick<ComponentProps<T>, "class" | "children" | "tabIndex">

const TabsContent = <T extends ValidComponent = "div">(
  props: TabsContentProps<T>
) => {
  const [local, others] = splitProps(props as TabsContentProps, [
    "class",
    "tabIndex"
  ])
  return (
    <Content
      data-slot="tabs-content"
      class={cn("z-tabs-content flex-1 outline-none", local.class)}
      tabIndex={local.tabIndex}
      {...others}
    />
  )
}

export {
  Tabs,
  TabsContent,
  type TabsContentProps,
  TabsList,
  type TabsListProps,
  type TabsProps,
  TabsTrigger,
  type TabTriggerProps
}
