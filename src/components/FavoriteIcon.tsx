import { Heart } from "lucide-react";
import { useCollection } from "../hooks/useCollection";
import { useState, type MouseEvent } from "react";

export default function FavoriteIcon({ artworkId }: FavoriteIconProps) {
    const [isAnimating, setIsAnimating] = useState(false);

    const { toggleCollect, isCollected } = useCollection();

    function handleClick(e: MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        e.stopPropagation();

        toggleCollect(artworkId);

        // Trigger animation
        setIsAnimating(true);

        setTimeout(() => {
            setIsAnimating(false);
        }, 200);
    }

    return (
        <button
            aria-label={isCollected(artworkId) ? "Remove from collection" : "Add to collection"}
            onClick={handleClick}
        >
            <Heart
                className={`w-5 h-5 transition-all duration-200 hover:scale-110
                    ${isCollected(artworkId) ? "fill-red-500 text-red-500" : "text-gray-400"}
                    ${isAnimating ? "animate-pop" : ""}
                `}
            />
        </button>
    )
}

type FavoriteIconProps = {
    artworkId: number;
}