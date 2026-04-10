import ArtworkCardSkeleton from "../../../components/skeletons/ArtworkCardSkeleton";

export function RelatedArtworksSkeleton() {
    return (
        <div className="mt-12">

            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <div className="h-5 w-40 bg-gray-200 rounded animate-shimmer" />
                <div className="h-4 w-24 bg-gray-200 rounded animate-shimmer" />
            </div>

            {/* Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {Array.from({ length: 4 }).map((_, i) => (
                    <ArtworkCardSkeleton key={i} />
                ))}
            </div>
        </div>
    );
}