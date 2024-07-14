import styled from "styled-components";

export const SpinnerContainer = styled.div`
    position: absolute;
    z-index: 99999;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100vw;
    height: 100vh;
    background-color: white;
    opacity: 0.9;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export const Spinner = styled.span`
    width: 60px;
    height: 60px;
    border: 10px solid #ccc;
    border-top: 10px solid #2F73A3;
    border-radius: 50%;
    animation: spin 1.5s linear infinite;
`;

export const LoaderMessage = styled.span`
    margin-top: 10px;
    font-size: 22px;
    font-weight: 600;
    color: #2F73A3;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
`;