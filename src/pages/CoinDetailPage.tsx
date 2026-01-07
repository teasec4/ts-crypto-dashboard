import { useParams, useNavigate } from "react-router-dom"
import { useEffect } from "react"
import CoinDetail from "../features/coin/ui/CoinDetail"

function CoinDetailPage() {
  const { coinId } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    if (!coinId) {
      navigate("/")
    }
  }, [coinId, navigate])

  if (!coinId) {
    return null
  }

  return <CoinDetail coinId={coinId} />
}

export default CoinDetailPage
