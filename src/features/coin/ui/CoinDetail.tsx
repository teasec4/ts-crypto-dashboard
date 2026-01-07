import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { theme } from "../../../shared/theme/colors"

interface CoinDetailProps {
  coinId: string;
}

interface CoinData {
  id: string;
  name: string;
  symbol: string;
  image: { large?: string };
  market_data: {
    current_price?: { usd?: number };
    price_change_percentage_24h?: number;
    market_cap_rank?: number;
    market_cap?: { usd?: number };
    total_volume?: { usd?: number };
    ath?: { usd?: number };
  };
  description?: { en?: string };
}

function CoinDetail({ coinId }: CoinDetailProps) {
  const navigate = useNavigate()
  const [coin, setCoin] = useState<CoinData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true

    const fetchCoinDetail = async () => {
      setLoading(true)
      setError(null)
      
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 15000)

      try {
        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/${coinId}?localization=false`,
          { signal: controller.signal }
        )
        clearTimeout(timeoutId)
        
        if (!response.ok) throw new Error("Failed to fetch coin details")
        const data = await response.json()
        if (isMounted) {
          setCoin(data)
        }
      } catch (err) {
        clearTimeout(timeoutId)
        if (isMounted) {
          if (err instanceof Error && err.name === "AbortError") {
            setError("Request timeout - took too long to fetch data")
          } else {
            setError(err instanceof Error ? err.message : "Unknown error")
          }
          console.error("Fetch error:", err)
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    fetchCoinDetail()

    return () => {
      isMounted = false
    }
  }, [coinId])

  if (loading) {
    return (
      <div className={`flex flex-col h-screen ${theme.bg.primary}`}>
        <header className={`${theme.header.bg} ${theme.header.text} p-4 shadow-lg`}>
          <button
            onClick={() => navigate("/")}
            className="text-xl hover:opacity-80"
          >
            ← Back
          </button>
        </header>
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-spin text-4xl text-blue-500">⟳</div>
        </div>
      </div>
    )
  }

  if (error || !coin) {
    return (
      <div className={`flex flex-col h-screen ${theme.bg.primary}`}>
        <header className={`${theme.header.bg} ${theme.header.text} p-4 shadow-lg`}>
          <button
            onClick={() => navigate("/")}
            className="text-xl hover:opacity-80"
          >
            ← Back
          </button>
        </header>
        <div className="flex-1 flex items-center justify-center">
          <p className={theme.status.error}>{error || "Coin not found"}</p>
        </div>
      </div>
    )
  }

  const priceChange = coin.market_data?.price_change_percentage_24h || 0
  const isPositive = priceChange >= 0

  return (
    <div className={`flex flex-col h-full`}>
      {/* Header */}
      <header className={`${theme.header.bg} ${theme.header.text} p-4 shadow-lg hidden md:block`}>
        <button
          onClick={() => navigate("/")}
          className="text-xl hover:opacity-80 transition"
        >
          ← Back
        </button>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 pt-16 md:pt-4">
        <div className="w-full max-w-sm mx-auto md:max-w-2xl">
          {/* Coin Header */}
          <div className={`${theme.card.bg} ${theme.card.border} border rounded-xl ${theme.card.shadow} p-6 mb-4`}>
            <div className="flex items-center gap-4 mb-4">
              <img src={coin.image?.large} alt={coin.name} className="w-20 h-20 rounded-full" />
              <div>
                <h1 className={`text-3xl font-bold ${theme.text.primary}`}>{coin.name}</h1>
                <p className={`${theme.text.muted} uppercase`}>{coin.symbol}</p>
              </div>
            </div>

            {/* Price */}
            <div className="mb-4">
              <p className={`text-5xl font-bold ${theme.text.primary}`}>
                ${coin.market_data?.current_price?.usd?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || 'N/A'}
              </p>
              <p className={`text-xl font-semibold mt-2 ${isPositive ? theme.status.success : theme.status.error}`}>
                {isPositive ? '▲' : '▼'} {Math.abs(priceChange).toFixed(2)}% (24h)
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className={`${theme.card.bg} ${theme.card.border} border rounded-xl ${theme.card.shadow} p-4`}>
              <p className={`${theme.text.muted} text-xs mb-1`}>Market Cap Rank</p>
              <p className={`text-2xl font-bold ${theme.text.primary}`}>#{coin.market_cap_rank || 'N/A'}</p>
            </div>
            <div className={`${theme.card.bg} ${theme.card.border} border rounded-xl ${theme.card.shadow} p-4`}>
              <p className={`${theme.text.muted} text-xs mb-1`}>Market Cap</p>
              <p className={`text-lg font-bold ${theme.text.primary}`}>
                ${coin.market_data?.market_cap?.usd ? (coin.market_data.market_cap.usd / 1e9).toFixed(1) + 'B' : 'N/A'}
              </p>
            </div>
            <div className={`${theme.card.bg} ${theme.card.border} border rounded-xl ${theme.card.shadow} p-4`}>
              <p className={`${theme.text.muted} text-xs mb-1`}>24h Volume</p>
              <p className={`text-lg font-bold ${theme.text.primary}`}>
                ${coin.market_data?.total_volume?.usd ? (coin.market_data.total_volume.usd / 1e9).toFixed(2) + 'B' : 'N/A'}
              </p>
            </div>
            <div className={`${theme.card.bg} ${theme.card.border} border rounded-xl ${theme.card.shadow} p-4`}>
              <p className={`${theme.text.muted} text-xs mb-1`}>ATH</p>
              <p className={`text-lg font-bold ${theme.text.primary}`}>
                ${coin.market_data?.ath?.usd?.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 }) || 'N/A'}
              </p>
            </div>
          </div>

          {/* Description */}
          {coin.description?.en && (
            <div className={`${theme.card.bg} ${theme.card.border} border rounded-xl ${theme.card.shadow} p-4`}>
              <h2 className={`text-lg font-bold ${theme.text.primary} mb-2`}>About</h2>
              <p className={`${theme.text.secondary} text-sm line-clamp-3`}>
                {coin.description.en.replace(/<[^>]*>/g, '')}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CoinDetail
