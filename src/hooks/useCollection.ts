import { useContext } from "react";
import { CollectionContext } from "../store/collection/CollectionContext";
import type { CollectionContextType } from "../store/collection/types";

export function useCollection(): CollectionContextType {
    const context = useContext(CollectionContext);

    if (!context) {
        throw new Error("useCollection must be used within a CollectionProvider");
    }

    return context;
}