import noImgPlaceholder from "../../assets/no-image-details.svg";

export default function ArtworkImage({ src, alt }: ArtowkrImageProps) {
    return (
        <div className="bg-gray-50 rounded-xl overflow-hidden flex items-center justify-center min-h-[400px]">
            {src ? (
                <img
                    src={src}
                    alt={alt}
                    className="max-h-[500px] w-auto object-contain"
                />
            ) : (
                <img
                    src={noImgPlaceholder}
                    alt="No image available"
                    className="w-full h-full object-contain p-8 opacity-80"
                />
            )}
        </div>
    )
}

type ArtowkrImageProps = {
    src: string | null;
    alt: string;
}