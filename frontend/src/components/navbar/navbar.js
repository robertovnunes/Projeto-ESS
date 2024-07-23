import React, {useState} from "react";
import {Link} from "react-router-dom";
import "./Navbar.css"

const Navbar = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };
    return (
        <div className="Navbar">
            <nav>
                <div className="Container">
                    <div className="row">
                        <div className="col-12">
                            <ul className="menu">
                                <li>
                                    <Link to="/">Home</Link>
                                </li>
                                <li className="dropdown"><Link to="#">Reservas</Link>
                                <ul className="submenu">
                                    <li>
                                        <Link to="/reservaEquipamento/equipamento">Criar reserva de equipamento</Link>
                                    </li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar;