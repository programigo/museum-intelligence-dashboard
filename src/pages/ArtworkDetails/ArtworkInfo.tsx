import type { Artwork } from "../../types/artwork"

export default function ArtworkInfo({ artwork }: ArtworkInfoProps) {
    return (
        <div className="flex flex-col gap-4">

            <h1 className="text-2xl font-semibold">
                {artwork.title || "Untitled"}
            </h1>

            <p className="text-gray-600">
                {artwork.artist || "Unknown Artist"}
            </p>

            <div className="text-sm text-gray-700 space-y-2">
                <p><strong>Accession:</strong> {artwork.accessionNumber ?? "N/A"}</p>
                <p><strong>Medium:</strong> {artwork.medium ?? "N/A"}</p>
                <p><strong>Dimensions:</strong> {artwork.dimensions ?? "N/A"}</p>
                <p><strong>Credit Line:</strong> {artwork.creditLine ?? "N/A"}</p>
            </div>

        </div>
    )
}

type ArtworkInfoProps = {
    artwork: Artwork;
}