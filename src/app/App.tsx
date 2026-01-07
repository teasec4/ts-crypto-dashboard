import { Routes, Route } from 'react-router-dom'
import CoinListPage from '../pages/CoinListPage'
import CoinDetailPage from '../pages/CoinDetailPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<CoinListPage />} />
      <Route path="/coin/:coinId" element={<CoinDetailPage />} />
    </Routes>
  )
}

export default App
