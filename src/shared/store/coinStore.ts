import { create } from "zustand";
import type { Coin } from "../../features/coin/model/Coin";
import { coinApi } from "../api/coinApi";

interface CoinState {
  coins: Coin[];
  loading: boolean;
  error: string | null;
  fetchCoins: () => Promise<void>;
}

export const useCoinStore = create<CoinState>((set) => ({
  coins: [],
  loading: false,
  error: null,

  fetchCoins: async () => {
    set({ loading: true, error: null });
    try {
      const data = await coinApi.getMarkets({ per_page: 20, page: 1 });
      set({ coins: data, loading: false });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      set({ error: errorMessage, loading: false });
      console.error("Fetch error:", err);
    }
  }
}));
