import { Link } from "react-router";
import type { Artwork } from "../../types/artwork";
import ArtworkCard from "../../components/ArtworkCard";
import { RelatedArtworksSkeleton } from "./skeletons/RelatedArtworksSkeleton";

export default function RelatedArtworks({ artworks, isLoading, departmentId }: RelatedArtworksProps) {
    const previewItems = artworks.slice(0, 10);

    const viewMoreUrl = `/?${departmentId ? `departmentId=${departmentId}` : ""}`;

    return (
        <div className="mt-12">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">
                    Related Works
                </h2>

                {!isLoading && artworks.length > 0 && (
                    <Link
                        to={viewMoreUrl}
                        className="text-sm font-medium text-blue-600 hover:underline"
                    >
                        View more →
                    </Link>
                )}
            </div>

            {/* Content */}
            {isLoading ? (
                <RelatedArtworksSkeleton />
            ) : artworks.length === 0 ? (
                <p className="text-gray-500">
                    No related works found.
                </p>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {previewItems.map((artwork) => (
                        <ArtworkCard key={artwork.id} artwork={artwork} />
                    ))}
                </div>
            )}
        </div>
    );
}

type RelatedArtworksProps = {
    artworks: Artwork[];
    isLoading: boolean;
    departmentId?: string;
}