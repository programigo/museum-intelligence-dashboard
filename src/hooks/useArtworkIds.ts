import { useQuery } from "@tanstack/react-query";
import artworkService from "../services/artworkService";
import type { FilterModel } from "../types/filter";

export function useArtworkIds(filters: FilterModel, options?: { enabled?: boolean }) {
    return useQuery({
        queryKey: ["artworkIds", filters.keyword, filters.departmentId],
        queryFn: ({ signal }) => artworkService.getArtworkIds(filters, signal),
        enabled: options?.enabled ?? true,
        retry: false,
    });
}