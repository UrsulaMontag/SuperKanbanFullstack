import {Link} from "react-router-dom";
import "../styles/Header.css"

export default function Header() {
    return (
        <header className="app-heading">
            <h1>My Super Duper Kanban</h1>
            <nav className="nav-container">
                <Link className="nav-link" to="/"><p className="nav-link-text">Home</p></Link>
                <Link className="nav-link" to="/board/todo"><p className="nav-link-text">Todo</p></Link>
                <Link className="nav-link" to="/board/doing"><p className="nav-link-text">Doing</p></Link>
                <Link className="nav-link" to="/board/done"><p className="nav-link-text">Done</p></Link>
            </nav>
        </header>
    )
}