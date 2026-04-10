import GridContainer from "../GridContainer";
import ArtworkCardSkeleton from "./ArtworkCardSkeleton";

export function ArtworkGridSkeleton({ count = 6 }: { count?: number }) {
    return (
        <GridContainer>
            {Array.from({ length: count }).map((_, i) => (
                <ArtworkCardSkeleton key={i} />
            ))}
        </GridContainer>
    );
}