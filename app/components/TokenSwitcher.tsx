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
    enter: (direction: number) => ({
      y: direction > 0 ? 38 : -38,
      opacity: 0,
    }),
    center: {
      y: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      y: direction < 0 ? 38 : -38,
      opacity: 0,
    }),
  }

  return (
    <div className="token-picker flex items-center gap-2 cursor-pointer group" onClick={onToggle}>
      <div className="relative w-[140px] h-[38px] overflow-hidden">
        <AnimatePresence initial={false} custom={currentToken === "SUI" ? 1 : -1}>
          <motion.div
            key={currentToken}
            custom={currentToken === "SUI" ? 1 : -1}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              y: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            className="flex items-center justify-end gap-2 absolute inset-0"
            style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
          >
            {currentToken === "SUI" ? (
              <>
                <SuiIcon className="token-icon w-6 h-6 flex-shrink-0" />
                <span className="token-type text-lg font-semibold whitespace-nowrap">SUI</span>
              </>
            ) : (
              <>
                <UsdcIcon className="token-icon w-6 h-6 flex-shrink-0" />
                <span className="token-type text-lg font-semibold whitespace-nowrap">USDC</span>
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
      <ArrowUpDown className="token-toggle-icon w-5 h-5 flex-shrink-0 transition-colors group-hover:text-[#24262e]" />
    </div>
  )
}

