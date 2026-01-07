import type { Coin } from "../../features/coin/model/Coin";

const API_BASE = "https://api.coingecko.com/api/v3";

export const coinApi = {
  getMarkets: async (params: { per_page: number; page: number }): Promise<Coin[]> => {
    const response = await fetch(
      `${API_BASE}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${params.per_page}&page=${params.page}&sparkline=false`,
      {
        headers: {
          "Accept": "application/json"
        }
      }
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch coins: ${response.status}`);
    }
    return response.json();
  }
};
