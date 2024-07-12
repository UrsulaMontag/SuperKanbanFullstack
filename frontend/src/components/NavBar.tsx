import {Link} from 'react-router-dom';
import {useState} from 'react';
import {HamburgerMenu, NavContainer, NavList, NavItem} from '../styles/NavBar.styled';

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
                    showNav={showNav}
                    className={showNav ? 'active' : ''}
                    onClick={toggleNav}
                >
                    <span className="hamburger-bar"></span>
                    <span className="hamburger-bar"></span>
                    <span className="hamburger-bar"></span>
                    <span className="close-icon"></span>
                </HamburgerMenu>
                <NavList showNav={showNav}>
                    <NavItem>
                        <Link to="/" onClick={handleLinkClick}>
                            <p className="nav-link-text">Home</p>
                        </Link>
                    </NavItem>
                    <NavItem>
                        <Link to="/board/todo" onClick={handleLinkClick}>
                            <p className="nav-link-text">Todo</p>
                        </Link>
                    </NavItem>
                    <NavItem>
                        <Link to="/board/doing" onClick={handleLinkClick}>
                            <p className="nav-link-text">Doing</p>
                        </Link>
                    </NavItem>
                    <NavItem>
                        <Link to="/board/done" onClick={handleLinkClick}>
                            <p className="nav-link-text">Done</p>
                        </Link>
                    </NavItem>
                </NavList>
            </NavContainer>
        </>
    );
}
