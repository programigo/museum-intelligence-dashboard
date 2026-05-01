export type CollectionItem = {
    id: number;
    note: string;
};

export type CollectionState = Record<number, CollectionItem>;

export type CollectionContextType = {
    collection: CollectionState;
    toggleCollect: (id: number) => void;
    updateNote: (id: number, note: string) => void;
    isCollected: (id: number) => boolean;
};