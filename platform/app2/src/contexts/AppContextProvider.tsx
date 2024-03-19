import React, { useState, createContext } from 'react';
enum Apps { 
    Worklist = "worklist",
}

type AppContextValue = {
    darkMode: boolean;
    activeApps: Apps[],
};

type AppContextProviderProps = {
    children?: React.ReactNode;
};

export const AppContext = createContext<AppContextValue>({
    darkMode: true, 
    activeApps: [Apps.Worklist]
});

const AppContextProvider: React.FC<AppContextProviderProps> = ({
    children,
}: AppContextProviderProps) => {
    const [value] = useState<AppContextValue>({
        darkMode: true,
        activeApps: [Apps.Worklist]
    });

    const init = async () => {
        // const contextValue: AppContextValue = {
        //     darkMode: false
        // };
        // setValue(contextValue);
    };

    React.useEffect(() => {
        init();
    }, []);

    return (
        <AppContext.Provider value={value}>
            {value ? children : null}
        </AppContext.Provider>
    );
};

export default AppContextProvider;