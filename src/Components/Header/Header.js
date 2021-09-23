import React from 'react';
import './Header.css';
import { Navbar, Nav, NavbarBrand, NavItem } from 'reactstrap';
import { NavLink } from 'react-router-dom';

const Header = props => {
    return (
        <div className=".Navigation">
            <Navbar style={{ background: "#D70F64", height: "70px" }}>
                <NavbarBrand href="/" className="mr-auto ml-md-5 Brand">
                    <h4 style={{ fontFamily: "monospace", fontWeight: "bolder" }}>Burger Builder</h4>
                </NavbarBrand>
                <Nav className="mr-md-5">
                    <NavItem className="NavItem">
                        <NavLink to="/" exact className="Navlink">Burger Builder</NavLink>
                    </NavItem>
                    <NavItem className="NavItem">
                        <NavLink to="/orders" exact className="Navlink">Orders</NavLink>
                    </NavItem>
                </Nav>
            </Navbar>
        </div>
    )
}

export default Header;