import {FC} from "react";
import {LoaderMessage, Spinner, SpinnerContainer} from "../styles/SpinnerLoader.styled.ts";

type Loader = {
    message: string | undefined;
};

export const Loader: FC<Loader> = ({message}: Loader) => {
    return (
        <SpinnerContainer className="loader">
            <Spinner className="spinner"></Spinner>
            <LoaderMessage className="loader-message">{message}</LoaderMessage>
        </SpinnerContainer>
    )
}