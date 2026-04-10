import { describe, it, expect } from "vitest";
import { filterArtworks } from "./filterArtworks";

const mockArtworks = [
    { id: 1, date: "1800" },
    { id: 2, date: "1850" },
    { id: 3, date: "1900" },
    { id: 4, date: "unknown" },
] as any;

describe("filterArtworks", () => {
    it("filters artworks within year range", () => {
        const result = filterArtworks(mockArtworks, 1800, 1850);

        expect(result.map(a => a.id)).toEqual([1, 2, 4]); 
        // 4 included because unknown year
    });

    it("excludes current artwork when excludeId is provided", () => {
        const result = filterArtworks(mockArtworks, null, null, 2);

        expect(result.find(a => a.id === 2)).toBeUndefined();
    });

    it("returns all when no filters applied", () => {
        const result = filterArtworks(mockArtworks, null, null);

        expect(result.length).toBe(4);
    });
});