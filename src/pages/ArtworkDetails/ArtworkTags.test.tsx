import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import ArtworkTags from "./ArtworkTags";

describe("ArtworkTags", () => {
    it("renders tags correctly", () => {
        render(
            <ArtworkTags
                tags={[
                    { term: "Impressionism", aatUrl: "1", wikidataUrl: "https://www.wikidata.org/wiki/Q40415" },
                    { term: "Oil Painting", aatUrl: "2", wikidataUrl: "https://www.wikidata.org/wiki/Q296955" },
                ]}
            />
        );

        expect(screen.getByText("Impressionism")).toBeInTheDocument();
        expect(screen.getByText("Oil Painting")).toBeInTheDocument();
    });

    it("shows no tags message when empty", () => {
        render(<ArtworkTags tags={[]} />);

        expect(screen.getByText(/No tags/i)).toBeInTheDocument();
    });
});