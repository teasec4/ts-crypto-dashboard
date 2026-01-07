import { create } from "zustand";

interface FavoritesState {
  favorites: string[]; // coin IDs
  addFavorite: (coinId: string) => void;
  removeFavorite: (coinId: string) => void;
  isFavorite: (coinId: string) => boolean;
}

export const useFavoritesStore = create<FavoritesState>((set, get) => ({
  favorites: ["bitcoin", "ethereum", "ripple"], // мок данные

  addFavorite: (coinId: string) => {
    set((state) => ({
      favorites: [...new Set([...state.favorites, coinId])],
    }));
  },

  removeFavorite: (coinId: string) => {
    set((state) => ({
      favorites: state.favorites.filter((id) => id !== coinId),
    }));
  },

  isFavorite: (coinId: string) => {
    return get().favorites.includes(coinId);
  },
}));
