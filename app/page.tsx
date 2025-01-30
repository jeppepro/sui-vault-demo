"use client"

import { useState } from "react"
import Navbar from "./components/Navbar"
import Portfolio from "./components/Portfolio"
import EarnSection from "./components/EarnSection"
import Summary from "./components/Summary"
import RisksBreakdown from "./components/RisksBreakdown"

export default function Home() {
  const [depositAmount, setDepositAmount] = useState(0)
  const [suiDeposit, setSuiDeposit] = useState(0)
  const [usdcDeposit, setUsdcDeposit] = useState(0)
  const [currentToken, setCurrentToken] = useState("SUI")
  const [totalTVL, setTotalTVL] = useState(13567985) // Starting with the provided TVL

  const tokenPrice: { [key: string]: number } = {
    SUI: 4.09,
    USDC: 0.998,
  }

  const handleDeposit = (amount: number) => {
    if (currentToken === "SUI") {
      setSuiDeposit((prevDeposit) => prevDeposit + amount)
    } else {
      setUsdcDeposit((prevDeposit) => prevDeposit + amount)
    }
    setTotalTVL((prevTVL) => prevTVL + amount * tokenPrice[currentToken])
  }

  const handleWithdraw = (amount: number) => {
    if (currentToken === "SUI") {
      setSuiDeposit((prevDeposit) => Math.max(0, prevDeposit - amount))
    } else {
      setUsdcDeposit((prevDeposit) => Math.max(0, prevDeposit - amount))
    }
    setTotalTVL((prevTVL) => Math.max(0, prevTVL - amount * tokenPrice[currentToken]))
  }

  const actualDeposit = suiDeposit * tokenPrice.SUI + usdcDeposit * tokenPrice.USDC

  return (
    <>
      <Navbar tvl={totalTVL} />
      <div className="container section-spacing">
        <h1>Dashboard</h1>
        <Portfolio actualDeposit={actualDeposit} currentToken={currentToken} />
        <EarnSection
          depositAmount={depositAmount}
          setDepositAmount={setDepositAmount}
          currentToken={currentToken}
          setCurrentToken={setCurrentToken}
          onDeposit={handleDeposit}
          onWithdraw={handleWithdraw}
          suiDeposit={suiDeposit}
          usdcDeposit={usdcDeposit}
        />
        <Summary depositAmount={depositAmount} totalTVL={totalTVL} currentToken={currentToken} />
        <RisksBreakdown />
      </div>
    </>
  )
}

