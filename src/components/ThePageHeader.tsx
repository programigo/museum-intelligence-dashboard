import { Landmark } from "lucide-react";
import { Link, useLocation } from "react-router";

export default function ThePageHeader() {
    const location = useLocation();

    // Preserve query params ONLY if they exist
    const hasQuery = location.search && location.search.length > 0;

    const galleryLink = hasQuery ? `/${location.search}` : "/";

    return (
        <header className="sticky top-0 z-20 bg-white/80 backdrop-blur border-b border-gray-200">
            <div className="px-6 h-16 flex">

                {/* Logo */}
                <Link
                    to={galleryLink}
                    className="flex items-center gap-2 text-gray-900 hover:text-black transition"
                >
                    <Landmark className="w-5 h-5 text-gray-700" />
                    <span className="text-lg font-semibold tracking-tight">
                        Museum Explorer
                    </span>
                </Link>
            </div>
        </header>
    );
}