import styled from 'styled-components';

export const HeaderContainer = styled.header`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    padding: 1rem;
    background-color: #282c34;
    width: 100vw;

    h1 {
        color: aqua;
        font-style: italic;
        text-decoration: underline linen;
    }

    @media (min-width: 768px) {
        justify-content: space-between;
        h1 {
            margin: 0;
        }
    }
`;
