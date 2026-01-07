import { useEffect } from "react";
import { useCoinStore } from "../../../shared/store/coinStore";

export function useCoin() {
  const coins = useCoinStore((state) => state.coins);
  const loading = useCoinStore((state) => state.loading);
  const error = useCoinStore((state) => state.error);
  const fetchCoins = useCoinStore((state) => state.fetchCoins);

  useEffect(() => {
    fetchCoins();
  }, []);

  return { coins, loading, error, refetch: fetchCoins };
}
