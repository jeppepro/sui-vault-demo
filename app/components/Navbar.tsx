import React from "react"
import { Wallet } from "lucide-react"

interface NavbarProps {
  tvl: number
}

export default function Navbar({ tvl }: NavbarProps) {
  return (
    <nav className="navbar">
      <div className="navbar-content">
        <div className="logo">Logo</div>
        <div className="navbar-right">
          <div className="tvl">TVL: ${tvl.toLocaleString()}</div>
          <button className="btn-connect">
            <Wallet size={16} />
            <span>Connect</span>
          </button>
        </div>
      </div>
    </nav>
  )
}

