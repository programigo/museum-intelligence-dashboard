import type { Artwork } from "../types/artwork";
import { parseYear } from "./year";

export function filterArtworks(
    artworks: Artwork[],
    from: number | null,
    to: number | null,
    excludeId?: number
) {
    return artworks.filter((artwork) => {
        const year = parseYear(artwork.date);

        if (!year) return true;

        if (excludeId && artwork.id === excludeId) return false;

        return (!from || year >= from) && (!to || year <= to);
    });
}