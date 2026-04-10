import type { Tag } from "../../types/artwork"

export default function ArtworkTag({ tag }: ArtworkTagProps) {
    return (
        <span className="px-3 py-1 bg-gray-200 rounded-full text-sm">
            {tag.term}
        </span>
    )
}

type ArtworkTagProps = {
    tag: Tag;
}