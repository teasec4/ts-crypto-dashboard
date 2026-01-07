import type { Coin } from "../model/Coin"

interface CoinItemProps {
  coin: Coin;
}

function CoinItem({ coin }: CoinItemProps) {
  const priceChange = coin.price_change_percentage_24h || 0;
  const isPositive = priceChange >= 0;

  return (
    <li className="flex items-center gap-4 p-4 bg-gradient-to-r from-gray-50 to-white border border-gray-200 rounded-lg hover:shadow-lg transition">
      <img src={coin.image} alt={coin.name} className="w-10 h-10 rounded-full" />
      
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-semibold text-gray-800">{coin.name}</h3>
          <span className="text-sm text-gray-500 uppercase">{coin.symbol}</span>
          {coin.market_cap_rank && (
            <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-full">
              #{coin.market_cap_rank}
            </span>
          )}
        </div>
      </div>

      <div className="text-right">
        <p className="text-xl font-bold text-gray-800">
          ${coin.current_price?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || 'N/A'}
        </p>
        <p className={`text-sm font-semibold ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
          {isPositive ? '↑' : '↓'} {Math.abs(priceChange).toFixed(2)}%
        </p>
      </div>
    </li>
  )
}

export default CoinItem
