import { useCallback, useEffect, useState, type ReactNode } from "react";
import type { CollectionItem, CollectionState } from "./types";
import { CollectionContext } from "./CollectionContext";

const STORAGE_KEY = "collection";

export default function CollectionProvider({ children }: CollectionProviderProps) {
    const [collection, setCollection] = useState<CollectionState>(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored ? JSON.parse(stored) : {};
    });

    const toggleCollect = useCallback((id: number) => {
        setCollection(prev => {
            const exists: CollectionItem = prev[id];

            if (exists) {
                const newState: CollectionState = { ...prev };
                delete newState[id];
                return newState;
            }

            return {
                ...prev,
                [id]: { id, note: "" },
            };
        });
    }, []);

    const updateNote = useCallback((id: number, note: string) => {
        setCollection(prev => ({
            ...prev,
            [id]: {
                ...prev[id],
                note,
            },
        }));
    }, []);

    const isCollected = useCallback((id: number) => {
        return !!collection[id];
    }, [collection]);

    // Persist
    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(collection));
    }, [collection]);

    const contextValue = {
        collection,
        toggleCollect,
        updateNote,
        isCollected,
    };

    return (
        <CollectionContext.Provider value={contextValue}>
        {children}
        </CollectionContext.Provider>
    )
}

type CollectionProviderProps = {
    children: ReactNode;
}