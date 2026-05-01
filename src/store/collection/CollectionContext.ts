import { createContext } from "react";
import type { CollectionContextType } from "./types";

export const CollectionContext = createContext<CollectionContextType | null>(null);