import styled from 'styled-components';

export const HeaderContainer = styled.header`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    background-color: #282c34;
    width: 100vw;
    margin-bottom: 3.6rem;

    h1 {
        color: aqua;
        font-style: italic;
        margin-top: 4.8rem;
    }

    @media (min-width: 768px) {
        justify-content: space-between;
        h1 {
            margin: 0;
        }
    }
`;
export const HeaderSection = styled.section`
    @media (min-width: 780px) {
        display: flex;
        gap: 4.8rem;
        align-items: baseline;
    }
`
