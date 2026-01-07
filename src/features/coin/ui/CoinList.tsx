import { useState, useEffect } from "react"
import { useCoin } from "../hooks/useCoin"
import CoinItem from "./CoinItem"
import { theme } from "../../../shared/theme/colors"

function CoinList() {
  const { coins, loading, error } = useCoin();
  const [showError, setShowError] = useState(true);

  useEffect(() => {
    if (error) {
      setShowError(true);
      const timer = setTimeout(() => setShowError(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <div className={`flex flex-col h-screen ${theme.bg.primary}`}>
      {/* Header */}
      <div className={`${theme.header.bg} ${theme.header.text} p-4 shadow-lg`}>
        <h1 className="text-2xl font-bold">Crypto</h1>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-3">
        <div className="w-full max-w-sm mx-auto">
          {error && showError && (
            <div className={`p-4 ${theme.error.bg} border ${theme.error.border} ${theme.error.text} rounded-lg mb-6 flex items-center justify-between`}>
              <span>⚠️ {error}</span>
              <button
                onClick={() => setShowError(false)}
                className={`${theme.error.text} hover:opacity-80 font-bold text-lg`}
              >
                ✕
              </button>
            </div>
          )}

          {loading && coins.length === 0 ? (
            <div className="space-y-3">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm animate-pulse">
                  <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                  <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-gray-300 rounded w-24 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-16"></div>
                  </div>
                  <div className="text-right">
                    <div className="h-4 bg-gray-300 rounded w-16 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-12"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <ul className="space-y-3">
              {coins.map(coin => (
                <CoinItem key={coin.id} coin={coin} />
              ))}
            </ul>
          )}

          {!loading && coins.length === 0 && !error && (
            <p className="text-center text-gray-400 mt-8">No coins found</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default CoinList
