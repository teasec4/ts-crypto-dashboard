import { useFavoritesStore } from "../shared/store/favoritesStore"
import { theme } from "../shared/theme/colors"

function FavoritesPage() {
  const favorites = useFavoritesStore((state) => state.favorites)

  return (
    <div className="flex flex-col h-full">
      <header className={`${theme.header.bg} ${theme.header.text} p-4 shadow-lg hidden md:block`}>
        <h1 className="text-2xl font-bold">Favorites</h1>
      </header>
      <div className="flex-1 overflow-y-auto p-4 pt-16 md:pt-4">
        <div className="w-full max-w-2xl mx-auto">
          <h2 className={`text-3xl font-bold ${theme.text.primary} mb-6 md:hidden`}>⭐ Favorites</h2>
          {favorites.length > 0 ? (
            <div className="space-y-3">
              {favorites.map((coinId) => (
                <div
                  key={coinId}
                  className={`${theme.card.bg} ${theme.card.border} border rounded-xl ${theme.card.shadow} p-4`}
                >
                  <p className={`${theme.text.primary} font-semibold`}>{coinId}</p>
                  <p className={`${theme.text.secondary} text-sm`}>Мок данные</p>
                </div>
              ))}
            </div>
          ) : (
            <div className={`text-center ${theme.text.muted} py-12`}>
              <p className="text-lg">No favorite coins yet</p>
              <p className="text-sm">Add coins to your favorites to see them here</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default FavoritesPage
