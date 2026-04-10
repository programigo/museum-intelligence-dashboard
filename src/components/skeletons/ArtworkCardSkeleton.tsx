export default function ArtworkCardSkeleton() {
    return (
        <div className="bg-white rounded-2xl overflow-hidden border border-gray-200">

            {/* Image (matches aspect-[4/3]) */}
            <div className="w-full aspect-[4/3] bg-gray-200 animate-shimmer" />

            {/* Content (matches p-4 space-y-1 text-center) */}
            <div className="p-4 space-y-1 text-center">

                {/* Title */}
                <div className="flex justify-center">
                    <div className="h-4 bg-gray-200 rounded w-3/4 animate-shimmer" />
                </div>

                {/* Artist */}
                <div className="flex justify-center">
                    <div className="h-3 bg-gray-200 rounded w-2/3 animate-shimmer" />
                </div>

                {/* Date */}
                <div className="flex justify-center">
                    <div className="h-3 bg-gray-200 rounded w-1/2 animate-shimmer" />
                </div>

            </div>
        </div>
    );
}