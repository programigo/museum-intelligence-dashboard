export function ArtworkTagsSkeleton() {
    return (
        <div className="mt-10">
            <div className="h-5 w-24 bg-gray-200 rounded mb-3 animate-shimmer" />

            <div className="flex flex-wrap gap-2">
                {Array.from({ length: 6 }).map((_, i) => (
                    <div
                        key={i}
                        className="h-8 w-20 bg-gray-200 rounded-full animate-shimmer"
                    />
                ))}
            </div>
        </div>
    );
}