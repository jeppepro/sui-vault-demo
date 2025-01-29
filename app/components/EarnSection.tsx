import type React from "react"
import { useState, useEffect } from "react"
import { ArrowUpDown } from "lucide-react"
import SuiIcon from "./icons/SuiIcon"
import UsdcIcon from "./icons/UsdcIcon"

interface EarnSectionProps {
  depositAmount: number
  setDepositAmount: (amount: number) => void
  currentToken: string
  setCurrentToken: (token: string) => void
  onDeposit: (amount: number) => void
  onWithdraw: (amount: number) => void
  suiDeposit: number
  usdcDeposit: number
}

export default function EarnSection({
  depositAmount,
  setDepositAmount,
  currentToken,
  setCurrentToken,
  onDeposit,
  onWithdraw,
  suiDeposit,
  usdcDeposit,
}: EarnSectionProps) {
  const [isDeposit, setIsDeposit] = useState(true)
  const [inputValue, setInputValue] = useState("")
  const tokenPrice = currentToken === "SUI" ? 4.09 : 0.998

  const availableAmount = currentToken === "SUI" ? suiDeposit : usdcDeposit

  useEffect(() => {
    setInputValue("")
    setDepositAmount(0)
  }, [setDepositAmount])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/^0+/, "") // Remove leading zeros
    setInputValue(value)
    setDepositAmount(Number.parseFloat(value) || 0)
  }

  const handleToggleToken = () => {
    setCurrentToken(currentToken === "SUI" ? "USDC" : "SUI")
  }

  const handleAction = () => {
    if (isDeposit) {
      onDeposit(depositAmount)
    } else {
      onWithdraw(depositAmount)
    }
    setDepositAmount(0)
    setInputValue("")
  }

  const TokenIcon = currentToken === "SUI" ? SuiIcon : UsdcIcon

  const handleHalfAmount = () => {
    const maxBalance = currentToken === "SUI" ? 1000 : 750
    const halfAmount = isDeposit ? maxBalance / 2 : availableAmount / 2
    setInputValue(halfAmount.toString())
    setDepositAmount(halfAmount)
  }

  const handleMaxAmount = () => {
    const maxAmount = isDeposit ? (currentToken === "SUI" ? 1000 : 750) : availableAmount
    setInputValue(maxAmount.toString())
    setDepositAmount(maxAmount)
  }

  return (
    <div className="wrap" style={{ gap: "8px" }}>
      <h2>Earn</h2>
      <div className="toggle-container">
        <div className="toggle toggle-full-width">
          <div className="toggle-highlight" style={{ transform: isDeposit ? "translateX(0)" : "translateX(100%)" }} />
          <div className="toggle-option" onClick={() => setIsDeposit(true)}>
            <p className={isDeposit ? "toggle-select" : "toggle-nonselect"}>Deposit</p>
          </div>
          <div className="toggle-option" onClick={() => setIsDeposit(false)}>
            <p className={!isDeposit ? "toggle-select" : "toggle-nonselect"}>Withdraw</p>
          </div>
        </div>
      </div>
      <div className="input-box">
        <div className="input-top">
          <input
            type="text"
            inputMode="decimal"
            className="input-amount"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="0"
          />
          <div className="token-picker" onClick={handleToggleToken}>
            <TokenIcon className="token-icon" />
            <p className="token-type">{currentToken}</p>
            <ArrowUpDown className="token-toggle-icon" />
          </div>
        </div>
        <div className="input-bottom">
          <p className="dollar-eqv font-medium">~${(depositAmount * tokenPrice || 0).toFixed(2)}</p>
          <div className="balance-wrap">
            <p className="balance-amount font-medium">
              {isDeposit
                ? `Balance: ${currentToken === "SUI" ? "1000" : "750"} ${currentToken}`
                : `Available: ${(availableAmount || 0).toFixed(2)} ${currentToken}`}
            </p>
            <div className="amount-btn font-medium" onClick={handleHalfAmount}>
              Half
            </div>
            <div className="amount-btn font-medium" onClick={handleMaxAmount}>
              Max
            </div>
          </div>
        </div>
      </div>
      <div className="button-container">
        <button className="btn-primary btn-full-width" onClick={handleAction}>
          {isDeposit ? "Deposit" : "Withdraw"}
        </button>
      </div>
    </div>
  )
}

