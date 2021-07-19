import React, { useContext, createContext } from "react";
import { useProvideData } from './provide-data'
import { StoreContextType } from "../../interface/sites";

export const storeContext = createContext<StoreContextType | undefined>(undefined);


export const ProvideData = ({ children }:any) => {
    const store = useProvideData ();

    return <storeContext.Provider value={store}>{children}</storeContext.Provider>

};

export const useProvider = () => {
    return useContext(storeContext);
};


