import React from "react"
import { ArrowRight } from "lucide-react"

interface SummaryProps {
  depositAmount: number
  totalTVL: number
  currentToken: string
}

export default function Summary({ depositAmount, totalTVL, currentToken }: SummaryProps) {
  const tokenPrice = currentToken === "SUI" ? 4.09 : 0.998
  const dollarEquivalent = depositAmount * tokenPrice
  const currentTVL = totalTVL + dollarEquivalent

  // Calculate APR and APY based on deposit amount
  const calculateYield = (amount: number) => {
    if (amount === 0) return { apr: 0, apy: 0, dailyApr: 0 }

    const baseAPR = 10.1
    const baseAPY = 10.5
    const baseDailyAPR = baseAPR / 365

    // Adjust these factors to make the yield more sensitive to smaller amounts
    const scaleFactor = 100000
    const sensitivity = 2

    const reductionFactor = Math.pow(scaleFactor / (scaleFactor + amount), sensitivity)
    const newAPR = Math.max(baseAPR * reductionFactor, 0.1) // Ensure APR doesn't go below 0.1%
    const newAPY = Math.min(baseAPY, Math.max((Math.pow(1 + newAPR / 100 / 365, 365) - 1) * 100, 0.1)) // Ensure APY doesn't exceed baseAPY and doesn't go below 0.1%
    const dailyAPR = Math.max(newAPR / 365, 0.0003) // Ensure daily APR doesn't go below 0.0003%

    return { apr: newAPR, apy: newAPY, dailyApr: dailyAPR }
  }

  const { apr, apy, dailyApr } = calculateYield(dollarEquivalent)

  const priceImpact = depositAmount > 0 ? (dollarEquivalent / totalTVL) * 100 : 0
  const swapFee = depositAmount > 0 ? dollarEquivalent * 0.001 : 0

  const getPriceImpactColor = (impact: number) => {
    if (impact <= 0.75) return "price-impact-low"
    if (impact < 2) return "price-impact-medium"
    return "price-impact-high"
  }

  return (
    <div className="wrap" style={{ gap: "8px" }}>
      <h2>Summary</h2>
      <div className="summary-box" style={{ gap: "8px" }}>
        <div className="metric-group" style={{ gap: "8px" }}>
          <div className="metric-row">
            <p className="metric-type font-medium">Total APR</p>
            <div className="metric-amount">
              {depositAmount > 0 ? (
                <>
                  <p className="metric-before">10.10%</p>
                  <ArrowRight className="metric-arrow" />
                  <p className="metric-after">{apr.toFixed(2)}%</p>
                </>
              ) : (
                <p className="metric-before">0%</p>
              )}
            </div>
          </div>
          <div className="metric-row">
            <p className="metric-type font-medium">Total APY</p>
            <div className="metric-amount">
              {depositAmount > 0 ? (
                <>
                  <p className="metric-before">10.50%</p>
                  <ArrowRight className="metric-arrow" />
                  <p className="metric-after">{apy.toFixed(2)}%</p>
                </>
              ) : (
                <p className="metric-before">0%</p>
              )}
            </div>
          </div>
          <div className="metric-row">
            <p className="metric-type font-medium">Daily APR</p>
            <div className="metric-amount">
              {depositAmount > 0 ? (
                <>
                  <p className="metric-before">{(10.1 / 365).toFixed(4)}%</p>
                  <ArrowRight className="metric-arrow" />
                  <p className="metric-after">{dailyApr.toFixed(4)}%</p>
                </>
              ) : (
                <p className="metric-before">0%</p>
              )}
            </div>
          </div>
        </div>
        <div className="divider"></div>
        <div className="metric-group" style={{ gap: "8px" }}>
          <div className="metric-row">
            <p className="metric-type font-medium">Price Impact</p>
            <div className="metric-amount">
              <p className={`metric-second ${getPriceImpactColor(priceImpact)}`}>{priceImpact.toFixed(2)}%</p>
            </div>
          </div>
          <div className="metric-row">
            <p className="metric-type font-medium">Swap Fee</p>
            <div className="metric-amount">
              <p className="metric-second swap-fee">0.1% (${swapFee.toFixed(2)})</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

