import { Routes, Route } from 'react-router-dom'
import Sidebar from '../shared/ui/Sidebar'
import { theme } from '../shared/theme/colors'
import CoinListPage from '../pages/CoinListPage'
import CoinDetailPage from '../pages/CoinDetailPage'
import FavoritesPage from '../pages/FavoritesPage'
import DashboardPage from '../pages/DashboardPage'

function App() {
  return (
    <div className={`flex h-screen ${theme.bg.primary}`}>
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Routes>
          <Route path="/" element={<CoinListPage />} />
          <Route path="/coin/:coinId" element={<CoinDetailPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
