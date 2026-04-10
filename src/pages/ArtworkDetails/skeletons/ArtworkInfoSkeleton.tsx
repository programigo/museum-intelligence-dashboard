export function ArtworkInfoSkeleton() {
    return (
        <div className="flex flex-col gap-4">

            {/* Title */}
            <div className="h-6 bg-gray-200 rounded w-3/4 animate-shimmer" />

            {/* Artist */}
            <div className="h-4 bg-gray-200 rounded w-1/2 animate-shimmer" />

            {/* Info block */}
            <div className="space-y-2 mt-2">
                <div className="h-3 bg-gray-200 rounded w-2/3 animate-shimmer" />
                <div className="h-3 bg-gray-200 rounded w-3/4 animate-shimmer" />
                <div className="h-3 bg-gray-200 rounded w-1/2 animate-shimmer" />
                <div className="h-3 bg-gray-200 rounded w-2/3 animate-shimmer" />
            </div>

        </div>
    );
}