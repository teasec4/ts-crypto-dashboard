import { useState } from "react"
import { Link } from "react-router-dom"
import { theme } from "../theme/colors"

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Burger button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed top-4 left-4 z-40 w-10 h-10 flex flex-col justify-center items-center gap-1.5 ${theme.header.bg} ${theme.header.text} rounded-lg shadow-lg md:hidden`}
      >
        <span className={`w-5 h-0.5 ${isOpen ? "rotate-45 translate-y-2" : ""} transition bg-white`}></span>
        <span className={`w-5 h-0.5 ${isOpen ? "opacity-0" : ""} transition bg-white`}></span>
        <span className={`w-5 h-0.5 ${isOpen ? "-rotate-45 -translate-y-2" : ""} transition bg-white`}></span>
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <nav
        className={`fixed left-0 top-0 h-screen w-64 ${theme.bg.secondary} ${theme.text.primary} p-4 z-30 transform transition-transform md:relative md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="mt-12 md:mt-0 space-y-4">
          <Link
            to="/"
            onClick={() => setIsOpen(false)}
            className={`block px-4 py-3 ${theme.bg.tertiary} rounded-lg hover:${theme.bg.primary} transition`}
          >
            📊 All Coins
          </Link>
          <Link
            to="/favorites"
            onClick={() => setIsOpen(false)}
            className={`block px-4 py-3 ${theme.bg.tertiary} rounded-lg hover:${theme.bg.primary} transition`}
          >
            ⭐ Favorites
          </Link>
          <Link
            to="/dashboard"
            onClick={() => setIsOpen(false)}
            className={`block px-4 py-3 ${theme.bg.tertiary} rounded-lg hover:${theme.bg.primary} transition`}
          >
            📈 Dashboard
          </Link>
        </div>
      </nav>
    </>
  )
}

export default Sidebar
