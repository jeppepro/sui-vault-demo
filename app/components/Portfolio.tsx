import React, { useState, useEffect } from "react"

interface PortfolioProps {
  actualDeposit: number
  currentToken: string
}

export default function Portfolio({ actualDeposit, currentToken }: PortfolioProps) {
  const [rewards, setRewards] = useState(0)

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null
    if (actualDeposit > 0) {
      timer = setInterval(() => {
        setRewards((prevRewards) => prevRewards + 0.001)
      }, 5000)
    }
    return () => {
      if (timer) clearInterval(timer)
    }
  }, [actualDeposit])

  const handleRedeemRewards = () => {
    // Implement reward redeeming logic here
    setRewards(0)
  }

  const formatRewards = (value: number) => {
    if (value === 0 && actualDeposit === 0) return "0 SUI"
    return `${(value || 0).toFixed(4)} SUI`
  }

  return (
    <div className="wrap" style={{ gap: "8px" }}>
      <h2>Portfolio</h2>
      <div className="portfolio">
        <div className="stat align-left">
          <p className="stat-title">Your deposits</p>
          <p className="stat-value deposit-value">${(actualDeposit || 0).toFixed(2)}</p>
        </div>
        <div className="stat align-center">
          <p className="stat-title">Your APY</p>
          <p className="stat-value blue apy-value">{actualDeposit > 0 ? "10.46%" : "0%"}</p>
        </div>
        <div className="stat align-right">
          <p className="stat-title">Your rewards</p>
          <p className="stat-value rewards-value">{formatRewards(rewards)}</p>
        </div>
      </div>
      <button className="btn-secondary" onClick={handleRedeemRewards}>
        Redeem Rewards
      </button>
    </div>
  )
}

