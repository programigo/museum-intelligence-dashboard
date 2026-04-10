import type { ApiArtwork, ApiDepartment, ApiTag } from "../types/apiTypes";
import type { Artwork } from "../types/artwork";
import type { Department } from "../types/department";

export function mapArtwork(apiData: ApiArtwork): Artwork {
    const result: Artwork = {
        id: apiData.objectID,
        title: apiData.title,
        artist: apiData.artistDisplayName || null,
        date: apiData.objectDate || null,
        department: apiData.department,

        images: {
            small: apiData.primaryImageSmall || null,
            large: apiData.primaryImage || null,
        },

        accessionNumber: apiData.accessionNumber,
        medium: apiData.medium,
        dimensions: apiData.dimensions,
        tags: apiData.tags?.map((t: ApiTag) => ({
            term: t.term,
            aatUrl: t.AAT_URL,
            wikidataUrl: t.Wikidata_URL,
        })),
        creditLine: apiData.creditLine,
    };

    return result;
}

export function mapDepartment(apiDepartment: ApiDepartment): Department {
    const result: Department = {
        id: apiDepartment.departmentId,
        name: apiDepartment.displayName,
    };

    return result;
}