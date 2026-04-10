import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import RelatedArtworks from "./RelatedArtworks";

describe("RelatedArtworks", () => {
    it("renders loading skeleton state", () => {
        const { container } = render(
            <RelatedArtworks artworks={[]} isLoading={true} />
        );

        // skeleton should render a grid container
        expect(container.querySelector(".grid")).toBeInTheDocument();
    });

    it("shows empty state", () => {
        render(<RelatedArtworks artworks={[]} isLoading={false} />);

        expect(screen.getByText(/No related/i)).toBeInTheDocument();
    });
});