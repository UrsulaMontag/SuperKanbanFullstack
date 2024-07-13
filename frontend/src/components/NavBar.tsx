import {useState} from 'react';
import {HamburgerMenu, NavContainer, NavList, NavItem} from '../styles/NavBar.styled';
import {StyledLink} from "../styles/Link.styled.ts";

export default function NavBar() {
    const [showNav, setShowNav] = useState(false);

    const toggleNav = () => {
        setShowNav(!showNav);
    };

    const handleLinkClick = () => {
        setShowNav(false);  // Ensure menu closes when a link is clicked
    };

    return (
        <>
            <NavContainer>
                <HamburgerMenu
                    $shownav={showNav}
                    onClick={toggleNav}
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </HamburgerMenu>
                <NavList $shownav={showNav}>
                    <NavItem>
                        <StyledLink to="/" onClick={handleLinkClick}>Home</StyledLink>
                    </NavItem>
                    <NavItem>
                        <StyledLink to="/board/todo" onClick={handleLinkClick}>Todo</StyledLink>
                    </NavItem>
                    <NavItem>
                        <StyledLink to="/board/doing" onClick={handleLinkClick}>Doing</StyledLink>
                    </NavItem>
                    <NavItem>
                        <StyledLink to="/board/done" onClick={handleLinkClick}>Done</StyledLink>
                    </NavItem>
                </NavList>
            </NavContainer>
        </>
    );
}
