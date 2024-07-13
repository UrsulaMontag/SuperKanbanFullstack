import styled from "styled-components";

export const GalleryList = styled.ul`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.6rem;

    @media only screen and (min-width: 1000px) {
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
    }
`;

export const GalleryListItem = styled.li`
    list-style: none;
`;