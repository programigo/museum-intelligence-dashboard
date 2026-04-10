import { useSearchParams } from "react-router";
import { useArtworkIds } from "../hooks/useArtworkIds";
import Filter from "../components/Filter";
import type { FilterModel } from "../types/filter";
import ArtworkGrid from "../components/ArtworkGrid";
import type { Artwork } from "../types/artwork";
import { useDepartments } from "../hooks/useDepartments";
import { useEffect, useMemo, useRef } from "react";
import { useInfiniteArtworks } from "../hooks/useInfiniteArtworks";
import { convertYear, parseYear } from "../utils/year";
import { ArtworkGridSkeleton } from "../components/skeletons/ArtworkGridSkeleton";
import ErrorBlock from "../components/ErrorBlock";

export default function Gallery() {
    const [searchParams, setSearchParams] = useSearchParams();

    const filters: FilterModel = useMemo(() => ({
        keyword: searchParams.get("q") ?? "",
        departmentId: searchParams.get("departmentId") ?? "",
        dateBegin: searchParams.get("dateBegin") ?? "",
        dateEnd: searchParams.get("dateEnd") ?? "",
        dateBeginEra: searchParams.get("dateBeginEra") === "BC" ? "BC" : "AD",
        dateEndEra: searchParams.get("dateEndEra") === "BC" ? "BC" : "AD",
    }), [searchParams]);

    const idsQuery = useArtworkIds(filters);
    const ids = idsQuery.data ?? [];

    const {
        data,
        isLoading,
        isError,
        error,
        isFetchingNextPage,
        fetchNextPage,
        hasNextPage,
    } = useInfiniteArtworks(ids);

    // Flatten pages
    const rawArtworks: Artwork[] = data?.pages.flatMap(page => page.artworks) ?? [];

    const filteredArtworks = rawArtworks.filter((artwork) => {
        const year = parseYear(artwork.date);

        if (year === null) return true;

        const from = convertYear(filters.dateBegin, filters.dateBeginEra);
        const to = convertYear(filters.dateEnd, filters.dateEndEra);

        return (!from || year >= from) && (!to || year <= to);
    });

    const observerRef = useRef<HTMLDivElement | null>(null);

    // Infinite scroll observer
    useEffect(() => {
        if (!observerRef.current) {
            return;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
                    fetchNextPage();
                }
            },
            { rootMargin: "200px" }
        );

        observer.observe(observerRef.current);

        return () => observer.disconnect();
    }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

    function handleFilterChange(nextFilters: FilterModel) {
        const params = new URLSearchParams();

        if (nextFilters.keyword) {
            params.set("q", nextFilters.keyword);
        }

        if (nextFilters.departmentId) {
            params.set("departmentId", nextFilters.departmentId);
        }

        if (nextFilters.dateBegin) {
            params.set("dateBegin", nextFilters.dateBegin);
        }

        if (nextFilters.dateEnd) {
            params.set("dateEnd", nextFilters.dateEnd);
        }

        if (nextFilters.dateBeginEra) {
            params.set("dateBeginEra", nextFilters.dateBeginEra);
        }

        if (nextFilters.dateEndEra) {
            params.set("dateEndEra", nextFilters.dateEndEra);
        }

        setSearchParams(params);
    };

    const departmentsQuery = useDepartments();

    const hasQueryData =
        data?.pages?.some(page => page.artworks?.length > 0);

    const isInitialLoading = isLoading || (!data && !hasQueryData);

    const isEmpty =
        !isLoading &&
        !isFetchingNextPage &&
        !hasQueryData;

    if (isError) {
        return (
            <ErrorBlock
                title="An error occured"
                message={error.message || "Failed to fetch artworks"}
            />
        )
    }

    return (
        <div className="p-6">
            <Filter
                departments={departmentsQuery.data ?? []}
                isLoadingDepartments={departmentsQuery.isLoading}
                filters={filters}
                onChange={handleFilterChange}
            />

            {/* INITIAL LOADING (full skeleton grid) */}
            {isInitialLoading ? (
                <ArtworkGridSkeleton count={12} />
            ) : (
                <>
                    {/* GRID */}
                    <ArtworkGrid artworks={filteredArtworks} />

                    {/* LOADING NEXT PAGE (infinite scroll) */}
                    {isFetchingNextPage && (
                        <div className="mt-6">
                            <ArtworkGridSkeleton count={8} />
                        </div>
                    )}

                    {/* EMPTY STATE */}
                    {isEmpty && (
                        <p className="text-gray-500 mt-4">
                            No results found.
                        </p>
                    )}
                </>
            )}

            {/* Infinite scroll trigger */}
            <div ref={observerRef} className="h-1" />
        </div>
    );
}