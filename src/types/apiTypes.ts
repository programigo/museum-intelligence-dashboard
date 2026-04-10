export type ApiArtwork = {
    objectID: number;
    title: string;
    artistDisplayName: string;
    objectDate: string;
    department: string;
    primaryImageSmall: string;
    primaryImage: string;
    accessionNumber: string;
    medium: string;
    dimensions: string;
    tags: ApiTag[];
    creditLine: string;
}

export type ApiTag = {
    term: string;
    AAT_URL: string;
    Wikidata_URL: string;
}

export type ApiDepartment = {
    departmentId: number;
    displayName: string;
}