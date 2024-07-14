import {createContext, FC, ReactNode, useState} from "react";
import {Loader} from "../components/Loader.tsx";

type LoaderContext = {
    showLoader: (message: string) => void;
    hideLoader: () => void;
};

type LoaderContextProvider = {
    children: ReactNode;
};

export const LoaderContext = createContext<LoaderContext | undefined>(
    undefined
);

export const LoaderProvider: FC<LoaderContextProvider> = ({children}) => {
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [loaderMessage, setLoaderMessage] = useState<string | undefined>();

    const contextValue: LoaderContext = {
        showLoader: (message) => {
            setLoaderMessage(message);
            setIsVisible(true);
        },
        hideLoader: () => {
            setIsVisible(false);
        }
    };

    return (
        <LoaderContext.Provider value={contextValue}>
            {isVisible && <Loader message={loaderMessage}/>}
            {children}
        </LoaderContext.Provider>
    )
}