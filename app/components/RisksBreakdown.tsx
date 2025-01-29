import React, { useState } from "react"
import { ChevronDown } from "lucide-react"

export default function RisksBreakdown() {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className="wrap" style={{ gap: "8px" }}>
      <div className="risk-wrap" onClick={() => setIsExpanded(!isExpanded)}>
        <div className="risk-header">
          <span className="risk-title">Risks & Breakdown</span>
          <ChevronDown className={`risk-caret ${isExpanded ? "risk-caret-expanded" : ""}`} />
        </div>
      </div>
      {isExpanded && (
        <div className="summary-box" style={{ gap: "8px" }}>
          <div className="metric-group" style={{ gap: "8px" }}>
            <div className="metric-row">
              <p className="metric-type">Risk Level</p>
              <p className="risk-value">Medium</p>
            </div>
            <div className="metric-row">
              <p className="metric-type">Strategy</p>
              <p className="risk-value">Liquidity Provision</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

