import { Link, useSearchParams } from "react-router";
import type { Artwork } from "../types/artwork";
import noImgPlaceholder from "../assets/no-image-card.svg";
import FavoriteIcon from "./FavoriteIcon";
import ArtworkImageContainer from "./ArtworkImageContainer";

export default function ArtworkCard({ artwork }: ArtworkCardProps) {
    const [searchParams] = useSearchParams();

    const imageSrc = artwork.images?.small || noImgPlaceholder;
    const title = artwork.title || "Untitled";
    const artist = artwork.artist || "Unknown Artist";
    const date = artwork.date || "Unknown date";

    return (
        <Link
            to={`/artworks/${artwork.id}?${searchParams.toString()}`}
            className="group bg-white rounded-2xl overflow-hidden border border-gray-200 hover:shadow-lg hover:scale-105 transition"
        >
            <ArtworkImageContainer className="aspect-4/3">
                <img
                    src={imageSrc}
                    alt={title}
                    className="w-full aspect-4/3 object-cover bg-gray-100"
                />
                <div className="absolute top-2 right-2 z-10">
                    <FavoriteIcon artworkId={artwork.id} />
                </div>
            </ArtworkImageContainer>

            <div className="p-4 space-y-1 text-center">
                <h3 className="text-sm font-semibold text-gray-900 leading-snug line-clamp-2">
                    {title}
                </h3>
                <p className="text-xs text-gray-600">
                    <b>Artist:</b> {artist}
                </p>
                <p className="text-xs text-gray-600">
                    <b>Date:</b> {date}
                </p>
            </div>
        </Link>
    )
}

type ArtworkCardProps = {
    artwork: Artwork;
}