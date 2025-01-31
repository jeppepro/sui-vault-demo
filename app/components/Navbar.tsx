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
          <button className="btn-connect hover:bg-[#DDE4FD] active:bg-[#CDD5F9] active:text-[#2F53E1] transition-colors duration-100">
            <Wallet size={16} />
            <span>Connect</span>
          </button>
        </div>
      </div>
    </nav>
  )
}

