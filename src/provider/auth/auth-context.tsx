import React, { useContext, createContext } from "react";
import { useProvideAuth } from './provide-auth'
import { AuthContextType } from "../../interface/interfaces";

export const authContext = createContext<AuthContextType | undefined>(undefined);


export const ProvideAuth = ({ children }: any) => {
    const store = useProvideAuth();

    return <authContext.Provider value={store}>{children}</authContext.Provider>

};

export const useProvider = () => {
    return useContext(authContext);
};


