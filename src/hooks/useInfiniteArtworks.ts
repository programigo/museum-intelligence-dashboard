import { useInfiniteQuery } from "@tanstack/react-query";
import artworkService from "../services/artworkService";

const PAGE_SIZE = 20;

export function useInfiniteArtworks(ids: number[]) {
    return useInfiniteQuery({
        queryKey: ["artworks", ids],

        queryFn: async ({ pageParam = 0, signal }) => {

            // 2️⃣ Slice IDs for current page
            const pageIds = ids.slice(pageParam, pageParam + PAGE_SIZE);

            // 3️⃣ Use batch instead of parallel queries
            const artworks = await artworkService.fetchArtworksBatch(
                pageIds,
                signal
            );

            return {
                artworks,
                nextPage: pageParam + PAGE_SIZE,
                hasMore: pageParam + PAGE_SIZE < ids.length,
            };
        },

        getNextPageParam: (lastPage) =>
            lastPage.hasMore ? lastPage.nextPage : undefined,

        enabled: ids.length > 0,
        retry: false,
        initialPageParam: 0,
    });
}