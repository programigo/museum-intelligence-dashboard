import type { Artwork } from "../types/artwork";
import type { FilterModel } from "../types/filter";
import { mapArtwork } from "../utils/modelMapping";

const BASE_URL = "https://collectionapi.metmuseum.org/public/collection/v1";

async function getArtworkIds(filters: FilterModel, signal?: AbortSignal): Promise<number[]> {
    try {
        const params = new URLSearchParams();

        params.set("q", filters.keyword || "painting");

        if (filters.departmentId) {
            params.set("departmentId", filters.departmentId);
        }

        const response = await fetch(`${BASE_URL}/search?${params.toString()}`, { signal });

        if (!response.ok) {
            throw new Error("Failed to fetch artwork IDs");
        }

        const data = await response.json();

        return (data.objectIDs ?? []).slice(0, 1000);
    } catch (error: any) {
        if (error.name === "AbortError") {
            return [];
        }

        throw error;
    }
}

async function getArtworkById(id: number, signal?: AbortSignal): Promise<Artwork | null> {
    try {
        const response = await fetch(`${BASE_URL}/objects/${id}`, { signal });

        if (!response.ok) {
            return null;
        }

        const data = await response.json();

        return mapArtwork(data);
    } catch (error: any) {
        if (error.name === "AbortError") {
            return null;
        }

        throw error;
    }
}

export async function fetchArtworksBatch(
    ids: number[],
    signal?: AbortSignal,
    concurrency = 5
): Promise<Artwork[]> {
    const results: Artwork[] = [];

    try {
        for (let i = 0; i < ids.length; i += concurrency) {
            const chunk = ids.slice(i, i + concurrency);

            const promises = chunk.map(async (id) => {
                try {
                    const res = await fetch(
                        `https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`,
                        { signal }
                    );

                    if (!res.ok) {
                        if (import.meta.env.DEV) {
                            console.warn(`Failed to fetch artwork ${id}`);
                        }
                        return null;
                    }

                    const data = await res.json();
                    return mapArtwork(data);
                } catch (error: any) {
                    if (error.name === "AbortError") throw error;
                    return null;
                }
            });

            const chunkResults = await Promise.all(promises);

            const validResults = chunkResults.filter(
                (item): item is Artwork => item !== null
            );

            results.push(...validResults);
        }
    } catch (error: any) {
        if (error.name === "AbortError") {
            return results; // return partial data
        }

        throw error;
    }

    return results;
}

const artworkService = {
    getArtworkIds,
    getArtworkById,
    fetchArtworksBatch,
};

export default artworkService;