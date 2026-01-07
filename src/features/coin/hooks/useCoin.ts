import { useEffect, useCallback } from "react";
import { useCoinStore } from "../../../shared/store/coinStore";

export function useCoin() {
  const coins = useCoinStore((state) => state.coins);
  const loading = useCoinStore((state) => state.loading);
  const error = useCoinStore((state) => state.error);
  const fetchCoins = useCoinStore((state) => state.fetchCoins);

  const memoizedFetch = useCallback(() => {
    fetchCoins();
  }, [fetchCoins]);

  useEffect(() => {
    memoizedFetch();
  }, [memoizedFetch]);

  return { coins, loading, error, refetch: fetchCoins };
}
