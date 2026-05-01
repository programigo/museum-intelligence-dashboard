import { useEffect, useState } from "react";

const STORAGE_KEY = "favoriteIds";

export function useFavorites() {
    const [favorites, setFavorites] = useState<number[]>(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored ? JSON.parse(stored) : [];
    });

    // Sync the localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    }, [favorites]);

    function toggleFavorite(id: number): void {
        setFavorites(prev =>
            prev.includes(id)
                ? prev.filter(fav => fav !== id)
                : [...prev, id]);
    }

    function isFavorite(id: number): boolean {
        return favorites.includes(id);
    }

    return {
        favorites,
        toggleFavorite,
        isFavorite,
    };
}