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
      y: "100%",
      opacity: 1,
    },
    animate: {
      y: 0,
      opacity: 1,
    },
    exit: {
      y: "-100%",
      opacity: 1,
    },
  }

  return (
    <div className="token-picker flex items-center gap-2 cursor-pointer group" onClick={onToggle}>
      <div className="relative w-[140px] h-[38px] overflow-hidden">
        <div className="absolute inset-0">
          <AnimatePresence initial={false} mode="popLayout">
            <motion.div
              key={currentToken}
              variants={variants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{
                y: { type: "tween", duration: 0.2, ease: "easeOut" },
              }}
              className="flex items-center justify-end gap-2 absolute inset-0 bg-white"
              style={{ display: "flex", flexDirection: "row", gap: "8px", alignItems: "center" }}
            >
              {currentToken === "SUI" ? (
                <>
                  <SuiIcon className="token-icon w-6 h-6 flex-shrink-0" />
                  <p className="token-type text-lg font-semibold whitespace-nowrap" style={{ display: "inline" }}>
                    SUI
                  </p>
                </>
              ) : (
                <>
                  <UsdcIcon className="token-icon w-6 h-6 flex-shrink-0" />
                  <p className="token-type text-lg font-semibold whitespace-nowrap" style={{ display: "inline" }}>
                    USDC
                  </p>
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      <ArrowUpDown className="token-toggle-icon w-5 h-5 flex-shrink-0 transition-colors group-hover:text-[#24262e]" />
    </div>
  )
}

