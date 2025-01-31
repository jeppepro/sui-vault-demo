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
    initial: {
      y: 38,
      opacity: 0,
    },
    animate: {
      y: 0,
      opacity: 1,
    },
    exit: {
      y: -38,
      opacity: 0,
    },
  }

  return (
    <div className="token-picker flex items-center gap-2 cursor-pointer group" onClick={onToggle}>
      <div className="relative w-[140px] h-[38px] bg-[#ffffff] overflow-hidden">
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={currentToken}
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{
              y: { type: "tween", duration: 0.2, ease: "easeOut" },
              opacity: { duration: 0.1 },
            }}
            className="flex items-center justify-end gap-2 absolute inset-0 bg-[#ffffff]"
            style={{ display: "flex", alignItems: "center", gap: "8px" }}
          >
            {currentToken === "SUI" ? (
              <>
                <SuiIcon className="token-icon w-6 h-6 flex-shrink-0" />
                <p className="token-type text-lg font-semibold text-[#000000] whitespace-nowrap">SUI</p>
              </>
            ) : (
              <>
                <UsdcIcon className="token-icon w-6 h-6 flex-shrink-0" />
                <p className="token-type text-lg font-semibold text-[#000000] whitespace-nowrap">USDC</p>
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
      <ArrowUpDown className="token-toggle-icon w-5 h-5 flex-shrink-0 transition-colors text-[#7d84a0] group-hover:text-[#000000]" />
    </div>
  )
}

