import styled from "styled-components";
import {Link} from "react-router-dom";

export const CardContainer = styled.article`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 3.6rem;
    align-items: center;
    width: fit-content;

    border: 1px solid var(--color-dark);
    border-radius: 8px;
    padding: 2.4rem;
`;

export const CardActionContainer = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 1.6rem;
`

export const CardActionLink = styled(Link)`
    border-radius: 8px;
    border: 1px solid var(--color-dark);
    padding: .8rem 1.6rem;
    font-size: 1.4rem;

    cursor: pointer;
    transition: border-color 0.25s;
    background-color: var(--color-light);
    text-decoration: none;
    color: var(--color-dark);
`;