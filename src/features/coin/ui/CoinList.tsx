import { useCoin } from "../hooks/useCoin"
import CoinItem from "./CoinItem"

function CoinList() {
  const { coins, loading, error, refetch } = useCoin();

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-4xl font-bold text-gray-800">Top 20 Coins</h1>
        <button
          onClick={refetch}
          disabled={loading}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400 transition font-semibold flex items-center gap-2"
        >
          {loading ? (
            <>
              <span className="animate-spin">⟳</span>
              Loading...
            </>
          ) : (
            <>
              <span>⟳</span>
              Refresh
            </>
          )}
        </button>
      </div>

      {error && (
        <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg mb-6">
          Error: {error}
        </div>
      )}

      {loading && coins.length === 0 ? (
        <div className="flex justify-center items-center py-12">
          <div className="text-center">
            <div className="animate-spin text-4xl mb-4">⟳</div>
            <p className="text-gray-600">Loading coins...</p>
          </div>
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
  )
}

export default CoinList
