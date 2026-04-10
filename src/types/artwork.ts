export type Artwork = {
    id: number;
    title: string;
    artist: string | null;
    date: string | null;
    department: string;

    images: {
        small: string | null;
        large: string | null;
    };

    // detail-only fields
    accessionNumber?: string;
    medium?: string;
    dimensions?: string;
    tags?: Tag[];
    creditLine?: string;
}

// export type ArtworkCardModel = {
//     title: string;
//     primaryImageSmall?: string;
//     artistDisplayName?: string;
//     objectDate?: string;
// }

// export type ArtworkDetailModel = {
//     accessionNumber: string;
//     medium: string;
//     dimensions: string;
//     creditLine: string;
//     primaryImage?: string;
//     tags: Tag[] | null;
// }

export type Tag = {
    term: string;
    aatUrl: string;
    wikidataUrl: string;
}