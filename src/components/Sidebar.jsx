import react from "react";
import { Link } from "react-router-dom";
import './Sidebar.css'

function Sidebar() {
    return (
        <aside className="sidebar">
            <h2 className="sidebar-title">Among Us Crewmates</h2>
        
            <nav className="sidebar-nav">
                <Link to="/" className="sidebar-link">Home</Link>
                <Link to="/create" className="sidebar-link">Create Crewmate</Link>
                <Link to="/read" className="sidebar-link">Crewmate Gallery</Link>
            </nav>
            </aside>
        
    )
}

export default Sidebar;

