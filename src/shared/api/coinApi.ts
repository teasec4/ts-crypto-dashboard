import type { Coin } from "../../features/coin/model/Coin";

const API_BASE = "https://api.coingecko.com/api/v3";
const REQUEST_TIMEOUT = 15000; // 15 seconds

const fetchWithTimeout = async (url: string, options: RequestInit = {}, timeoutMs: number = REQUEST_TIMEOUT) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    if (error instanceof Error && error.name === "AbortError") {
      throw new Error("Request timeout - took too long to fetch data");
    }
    throw error;
  }
};

export const coinApi = {
  getMarkets: async (params: { per_page: number; page: number }): Promise<Coin[]> => {
    const response = await fetchWithTimeout(
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
