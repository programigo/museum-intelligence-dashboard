import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { describe, it, expect } from "vitest";
import ArtworkCard from "./ArtworkCard";

const mockArtwork = {
    id: 1,
    title: "Mona Lisa",
    artist: "Leonardo",
    date: "1503",
    images: { small: "" },
} as any;

describe("ArtworkCard", () => {
    it("renders artwork title, artist and date", () => {
        render(
            <MemoryRouter>
                <ArtworkCard artwork={mockArtwork} />
            </MemoryRouter>
        );

        expect(screen.getByText("Mona Lisa")).toBeInTheDocument();
        expect(screen.getByText(/Leonardo/)).toBeInTheDocument();
        expect(screen.getByText(/1503/)).toBeInTheDocument();
    });

    it("renders fallback text for missing artist", () => {
        render(
            <MemoryRouter>
                <ArtworkCard
                    artwork={{
                        ...mockArtwork,
                        artist: "",
                    }}
                />
            </MemoryRouter>
        );

        expect(screen.getByText(/Unknown/i)).toBeInTheDocument();
    });
});