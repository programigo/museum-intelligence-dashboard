import type { Tag } from "../../types/artwork"
import ArtworkTag from "./ArtworkTag";

export default function ArtworkTags({ tags }: ArtworkTagsProps) {
    if (!tags || tags.length === 0) {
        return (
            <div className="mt-10">
                <h2 className="text-lg font-semibold mb-3">Tags</h2>
                <p className="text-gray-500">No tags</p>
            </div>
        );
    }

    return (
        <div className="mt-10">
            <h2 className="text-lg font-semibold mb-3">Tags</h2>
            <div className="flex flex-wrap gap-2">
                {tags.map((tag: Tag) => (
                    <ArtworkTag
                        key={tag.aatUrl}
                        tag={tag}
                    />
                ))}
            </div>
        </div>
    );
}

type ArtworkTagsProps = {
    tags?: Tag[];
}