import {HeaderContainer, HeaderSection} from '../styles/Header.styled';
import NavBar from './NavBar';
import {useLocation, useNavigate} from "react-router-dom";


export default function Header() {
    const navigate = useNavigate();
    const location = useLocation();
    const onButtonClick = () => {
        navigate("/create");
    }


    return (
        <HeaderContainer>
            <HeaderSection>
                <h1>My Super Duper Kanban</h1>
                {location.pathname !== "/create" &&
                    <button type="button" onClick={onButtonClick}>Create Todo</button>}
            </HeaderSection>

            <NavBar/>
        </HeaderContainer>
    );
}
