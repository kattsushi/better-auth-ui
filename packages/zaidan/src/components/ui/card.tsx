import { type ComponentProps, mergeProps, splitProps } from "solid-js"
import { cn } from "@/lib/utils"

type CardProps = ComponentProps<"div"> & { size?: "default" | "sm" }

const Card = (props: CardProps) => {
  const mergedProps = mergeProps({ size: "default" } as const, props)
  const [local, others] = splitProps(mergedProps, ["class", "size"])
  return (
    <div
      data-slot="card"
      data-size={local.size}
      class={cn(
        "bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm",
        local.class
      )}
      {...others}
    />
  )
}

type CardHeaderProps = ComponentProps<"div">

const CardHeader = (props: CardHeaderProps) => {
  const [local, others] = splitProps(props, ["class"])
  return (
    <div
      data-slot="card-header"
      class={cn(
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
        local.class
      )}
      {...others}
    />
  )
}

type CardTitleProps = ComponentProps<"div">

const CardTitle = (props: CardTitleProps) => {
  const [local, others] = splitProps(props, ["class"])
  return (
    <div
      data-slot="card-title"
      class={cn("leading-none font-semibold", local.class)}
      {...others}
    />
  )
}

type CardDescriptionProps = ComponentProps<"div">

const CardDescription = (props: CardDescriptionProps) => {
  const [local, others] = splitProps(props, ["class"])
  return (
    <div
      data-slot="card-description"
      class={cn("text-muted-foreground text-sm", local.class)}
      {...others}
    />
  )
}

type CardActionProps = ComponentProps<"div">

const CardAction = (props: CardActionProps) => {
  const [local, others] = splitProps(props, ["class"])
  return (
    <div
      data-slot="card-action"
      class={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        local.class
      )}
      {...others}
    />
  )
}

type CardContentProps = ComponentProps<"div">

const CardContent = (props: CardContentProps) => {
  const [local, others] = splitProps(props, ["class"])
  return (
    <div data-slot="card-content" class={cn("px-6", local.class)} {...others} />
  )
}

type CardFooterProps = ComponentProps<"div">

const CardFooter = (props: CardFooterProps) => {
  const [local, others] = splitProps(props, ["class"])
  return (
    <div
      data-slot="card-footer"
      class={cn("flex items-center px-6 [.border-t]:pt-6", local.class)}
      {...others}
    />
  )
}

export {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  type CardProps,
  CardTitle
}
