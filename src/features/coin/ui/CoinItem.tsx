import { useNavigate } from "react-router-dom"
import type { Coin } from "../model/Coin"
import { theme } from "../../../shared/theme/colors"

interface CoinItemProps {
  coin: Coin;
}

function CoinItem({ coin }: CoinItemProps) {
  const navigate = useNavigate()
  const priceChange = coin.price_change_percentage_24h || 0;
  const isPositive = priceChange >= 0;

  return (
    <li
      onClick={() => navigate(`/coin/${coin.id}`)}
      className={`flex items-center gap-3 p-4 ${theme.card.bg} ${theme.card.border} border rounded-xl ${theme.card.shadow} hover:shadow-xl transition active:scale-95 cursor-pointer`}
    >
      {coin.market_cap_rank && (
        <div className="w-8 h-8 bg-blue-900 text-blue-300 rounded-full flex items-center justify-center font-bold text-sm">
          {coin.market_cap_rank}
        </div>
      )}
      <img src={coin.image} alt={coin.name} className="w-12 h-12 rounded-full" />
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1">
          <h3 className={`font-semibold ${theme.text.primary} text-sm`}>{coin.name}</h3>
          <span className={`text-xs ${theme.text.muted} uppercase`}>{coin.symbol}</span>
        </div>
      </div>

      <div className="text-right">
        <p className={`font-bold ${theme.text.primary} text-sm`}>
          ${coin.current_price?.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 }) || 'N/A'}
        </p>
        <p className={`text-xs font-semibold ${isPositive ? theme.status.success : theme.status.error}`}>
          {isPositive ? '▲' : '▼'} {Math.abs(priceChange).toFixed(1)}%
        </p>
      </div>
    </li>
  )
}

export default CoinItem
