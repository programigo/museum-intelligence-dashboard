import type { ImgHTMLAttributes, ReactNode } from "react";

export default function ArtworkImageContainer({ children, className }: ArtworkImageContainerProps) {
    return (
        <div className={`relative ${className}`}>
            {children}
        </div>
    )
}

type ArtworkImageContainerProps = {
    children: ReactNode;
} & ImgHTMLAttributes<HTMLImageElement>;