import { ArtworkImageSkeleton } from "./ArtworkImageSkeleton";
import { ArtworkInfoSkeleton } from "./ArtworkInfoSkeleton";
import { ArtworkTagsSkeleton } from "./ArtworkTagsSkeleton";
import { RelatedArtworksSkeleton } from "./RelatedArtworksSkeleton";

export default function ArtworkDetailsSkeleton() {
    return (
        <div className="p-6 max-w-7xl mx-auto">

            {/* Back */}
            <div className="mb-6">
                <div className="h-4 w-40 bg-gray-200 rounded animate-shimmer" />
            </div>

            {/* Main section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

                <ArtworkImageSkeleton />

                <ArtworkInfoSkeleton />
            </div>

            <ArtworkTagsSkeleton />

            <RelatedArtworksSkeleton />
        </div>
    );
}