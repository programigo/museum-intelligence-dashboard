import { describe, it, expect } from "vitest";
import { parseYear } from "./year";

describe("parseYear", () => {
    it("extracts year from normal date", () => {
        expect(parseYear("1880")).toBe(1880);
    });

    it("extracts year from complex string", () => {
        expect(parseYear("c. 1905 - 1910")).toBe(1905);
    });

    it("returns null when no year exists", () => {
        expect(parseYear("unknown")).toBeNull();
    });
});