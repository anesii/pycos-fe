import React, { createContext, useContext, useState } from 'react';

const LoaderContext = createContext({
    isLoading: false,
    setLoading: (loading: boolean) => {},
});

export const LoaderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isLoading, setLoading] = useState(false);

    return (
        <LoaderContext.Provider value={{ isLoading, setLoading }}>
            {children}
        </LoaderContext.Provider>
    );
};

export const useLoader = () => useContext(LoaderContext);