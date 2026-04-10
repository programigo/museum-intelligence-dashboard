import type { Artwork } from "../types/artwork"
import ArtworkCard from "./ArtworkCard";
import GridContainer from "./GridContainer";

export default function ArtworkGrid({ artworks }: ArtworkGridProps) {
    return (
        <GridContainer>
            {artworks.map((artwork) => (
                <ArtworkCard
                    key={artwork.id}
                    artwork={artwork}
                />
            ))}
        </GridContainer>
    );
}

type ArtworkGridProps = {
    artworks: Artwork[];
}