import { useInfiniteQuery } from "@tanstack/react-query";
import artworkService from "../services/artworkService";
import type { FilterModel } from "../types/filter";

const PAGE_SIZE = 20;

export function useInfiniteArtworksSearch(
    filters: FilterModel,
    options?: { enabled: boolean }
) {
    return useInfiniteQuery({
        queryKey: ["artworksSerch", filters],
        queryFn: async ({ pageParam = 0, signal }) => {
            const ids = await artworkService.getArtworkIds(filters, signal);

            const pageIds = ids.slice(pageParam, pageParam + PAGE_SIZE);

            const artworks = await Promise.all(
                pageIds.map((id) => artworkService.getArtworkById(id, signal))
            );

            return {
                artworks: artworks.filter(Boolean),
                nextPage: pageParam + PAGE_SIZE,
                hasMore: pageParam + PAGE_SIZE < ids.length
            };
        },
        getNextPageParam: (lastPage) =>
            lastPage.hasMore ? lastPage.nextPage : undefined,
        enabled: options?.enabled ?? true,
        staleTime: 1000 * 60 * 5,
        initialPageParam: 0,
    });
}