import { createContext, useContext } from "react";

export const ScrollContext = createContext((_target) => {});

export const useScrollTo = () => useContext(ScrollContext);
