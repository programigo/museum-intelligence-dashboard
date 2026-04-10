import { useQuery } from "@tanstack/react-query";
import { Link, useLocation, useParams } from "react-router";
import artworkService from "../../services/artworkService";
import { parseYear } from "../../utils/year";
import { useDepartments } from "../../hooks/useDepartments";
import { useMemo } from "react";
import { useInfiniteArtworksSearch } from "../../hooks/useInfiniteArtworkSearch";
import type { Artwork } from "../../types/artwork";
import ArtworkImage from "./ArtworkImage";
import ArtworkInfo from "./ArtworkInfo";
import ArtworkTags from "./ArtworkTags";
import RelatedArtworks from "./RelatedArtworks";
import ArtworkDetailsSkeleton from "./skeletons/ArtworkDetailsSkeleton";

export default function ArtworkDetails() {
    const { id: artworkId } = useParams<{ id: string }>();
    const location = useLocation();

    const {
        data: artwork,
        isLoading: isArtworkDetailsLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ["artworks", artworkId],
        queryFn: () => artworkService.getArtworkById(Number(artworkId)),
    });

    const departmentsQuery = useDepartments();

    const departmentMap = useMemo(() => {
        const map: Record<string, string> = {};

        (departmentsQuery.data ?? []).forEach((d) => {
            map[d.name] = String(d.id);
        });

        return map;
    }, [departmentsQuery.data]);

    const artworkYear = parseYear(artwork?.date ?? "");

    const departmentId = artwork?.department
        ? departmentMap[artwork.department]
        : "";

    const {
        data: relatedData,
        isLoading: isRelatedDataLoading,
    } = useInfiniteArtworksSearch(
        {
            keyword: "",
            departmentId,
        },
        {
            enabled: !!departmentId,
        },
    );

    const relatedArtworksRaw: Artwork[] = relatedData?.pages
        .flatMap(page => page.artworks)
        .filter(artwork => artwork !== null)
        ?? [];

    const relatedArtworks: Artwork[] = relatedArtworksRaw.filter(a => {
        const currentArtworkYear = parseYear(a.date);

        if (!artworkYear || !currentArtworkYear || artwork?.id === a.id) {
            return false;
        }

        return Math.abs(currentArtworkYear - artworkYear) <= 50;
    });

    if (isArtworkDetailsLoading) {
        return <ArtworkDetailsSkeleton />
    }

    if (!artwork) {
        return <p className="p-6">Artwork not found</p>;
    }

    return (
        <div className="p-6 max-w-7xl mx-auto">

            {/* Back */}
            <div className="mb-6">
                <Link
                    to={`/${location.search}`}
                    className="text-sm text-gray-500 hover:text-black"
                >
                    ← Back to results
                </Link>
            </div>

            {/* Main section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

                {/* Image */}
                <ArtworkImage
                    src={artwork.images.large}
                    alt={artwork.title}
                />

                {/* Info */}
                <ArtworkInfo artwork={artwork} />
            </div>

            {/* Tags */}
            <ArtworkTags tags={artwork.tags} />

            {/* Related works */}
            <RelatedArtworks
                artworks={relatedArtworks}
                isLoading={isRelatedDataLoading}
                departmentId={departmentId}
            />
        </div>
    );
}