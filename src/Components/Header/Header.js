import React from 'react';
import './Header.css';
import { Navbar, Nav, NavbarBrand, NavItem } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

const mapStateToProps = state => {
    return {
        token: state.token
    }
}

const Header = props => {
    let links = null;

    if (props.token === null) {
        links = (
            <Navbar style={{ background: "#D70F64", height: "70px" }}>
                <NavLink to="/" exact>
                    <NavbarBrand className="mr-auto ml-md-5 brand">
                        <h4 style={{ color: "lightcyan", fontFamily: "cursive", fontWeight: "bold" }}>Burger Builder</h4>
                    </NavbarBrand>
                </NavLink>
                <Nav className="mr-md-5">
                    <NavItem className="NavItem">
                        <NavLink to="/login" exact className="Navlink">Log In</NavLink>
                    </NavItem>
                </Nav>
            </Navbar>
        );
    } else {
        links = (
            <Navbar style={{ background: "#D70F64", height: "70px" }}>
                <NavLink to="/" exact>
                    <NavbarBrand className="mr-auto ml-md-5 brand">
                        <h4 style={{ color: "lightcyan", fontFamily: "cursive", fontWeight: "bold" }}>Burger Builder</h4>
                    </NavbarBrand>
                </NavLink>
                <Nav className="mr-md-5">
                    <NavItem className="NavItem">
                        <NavLink to="/" exact className="Navlink ">Burger Builder</NavLink>
                    </NavItem>
                    <NavItem className="NavItem">
                        <NavLink to="/orders" exact className="Navlink">Orders</NavLink>
                    </NavItem>
                    <NavItem className="NavItem">
                        <NavLink to="/logout" exact className="Navlink">Log Out</NavLink>
                    </NavItem>
                </Nav>
            </Navbar>
        )
    }
    return (
        <div className=".Navigation">
            {links}
        </div>
    )
}

export default connect(mapStateToProps)(Header);