"use client"

import * as React from "react"
import { CheckIcon, ClipboardIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button, ButtonProps } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"

interface CopyButtonProps extends ButtonProps {
  value: string
}

export function CopyButton({
  value,
  className,
  variant = "ghost",
  ...props
}: CopyButtonProps) {
  const [hasCopied, setHasCopied] = React.useState(false)

  React.useEffect(() => {
    setTimeout(() => {
      setHasCopied(false)
    }, 2000)
  }, [hasCopied])

  const copyToClipboard = async (value: string) => {
    try {
      await navigator.clipboard.writeText(value)
      setHasCopied(true)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  return (
    <Button
      size="icon"
      variant={variant}
      className={cn(
        "relative h-8 w-8 bg-zinc-800/50 hover:bg-zinc-800 text-white hover:text-white focus:text-white active:text-white [&>div>svg]:text-white [&>div>svg]:stroke-white",
        className
      )}
      onClick={() => copyToClipboard(value)}
      {...props}
    >
      <span className="sr-only">Copy</span>
      <AnimatePresence initial={false} mode="wait">
        <motion.div
          key={hasCopied ? "check" : "copy"}
          initial={{ opacity: 0, y: 2 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -2 }}
          transition={{ duration: 0.15 }}
        >
          {hasCopied ? (
            <CheckIcon className="h-3 w-3 md:h-4 md:w-4" />
          ) : (
            <ClipboardIcon className="h-3 w-3 md:h-4 md:w-4" />
          )}
        </motion.div>
      </AnimatePresence>
    </Button>
  )
}
