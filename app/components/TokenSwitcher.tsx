"use client"

import { motion, AnimatePresence } from "framer-motion"
import { ArrowUpDown } from "lucide-react"
import SuiIcon from "./icons/SuiIcon"
import UsdcIcon from "./icons/UsdcIcon"

interface TokenSwitcherProps {
  currentToken: string
  onToggle: () => void
}

export default function TokenSwitcher({ currentToken, onToggle }: TokenSwitcherProps) {
  const variants = {
    initial: (isSUI: boolean) => ({
      y: isSUI ? -30 : 30,
      opacity: 0,
    }),
    animate: {
      y: 0,
      opacity: 1,
    },
    exit: (isSUI: boolean) => ({
      y: isSUI ? 30 : -30,
      opacity: 0,
    }),
  }

  return (
    <div className="token-picker flex items-center gap-2 cursor-pointer group" onClick={onToggle}>
      <div className="relative w-[140px] h-[38px] overflow-hidden">
        <AnimatePresence initial={false} mode="popLayout">
          <motion.div
            key={currentToken}
            custom={currentToken === "SUI"}
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{
              y: { type: "spring", stiffness: 500, damping: 25 },
              opacity: { duration: 0.15 },
            }}
            className="flex items-center justify-end gap-2 absolute inset-0"
          >
            <div className="flex items-center justify-end gap-2 absolute inset-0">
              {currentToken === "SUI" ? (
                <>
                  <SuiIcon className="token-icon w-6 h-6" />
                  <p className="token-type text-lg font-semibold">SUI</p>
                </>
              ) : (
                <>
                  <UsdcIcon className="token-icon w-6 h-6" />
                  <p className="token-type text-lg font-semibold">USDC</p>
                </>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      <ArrowUpDown className="token-toggle-icon w-5 h-5 flex-shrink-0 transition-colors group-hover:text-[#24262e]" />
    </div>
  )
}

