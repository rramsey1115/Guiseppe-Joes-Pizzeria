import { useState } from "react";
import { NavLink as RRNavLink } from "react-router-dom";
import {
Button,
Collapse,
Nav,
NavLink,
NavItem,
Navbar,
NavbarBrand,
NavbarToggler,
} from "reactstrap";
import { logout } from "../../managers/authManager";
import pizza from "../../images/pizza.png";
import "./NavBar.css";

export default function NavBar({ loggedInUser, setLoggedInUser }) {
const [open, setOpen] = useState(false);

const toggleNavbar = () => setOpen(!open);

return (
    <div>
    <Navbar style={{padding:2}} color="danger" dark fixed="true" expand="sm">
        <NavbarBrand className="mr-auto" tag={RRNavLink} to="/">
            <div style={{display:"flex"}}>
                <img style={{width:30, height:30, marginRight:8}} src={pizza} id="nav-icon" alt="pizza"/>
                <h4>Guiseppe Joe's</h4>
            </div>
        </NavbarBrand>
        {loggedInUser ? (
        <>
            <NavbarToggler onClick={toggleNavbar} />
            <Collapse isOpen={open} navbar>
            <Nav navbar>
                <NavItem onClick={() => setOpen(false)}>
                    <NavLink tag={RRNavLink} to="/orders">
                        View Orders
                    </NavLink>
                </NavItem>
                <NavItem onClick={() => setOpen(false)}>
                    <NavLink tag={RRNavLink} to="/create">
                        Create Order
                    </NavLink>
                </NavItem>
            </Nav>
            </Collapse>
            <Button
            color="success"
            onClick={(e) => {
                e.preventDefault();
                setOpen(false);
                logout().then(() => {
                setLoggedInUser(null);
                setOpen(false);
                });
            }}
            >
            Logout
            </Button>
        </>
        ) : (
        <Nav navbar>
            <NavItem>
            <NavLink tag={RRNavLink} to="/login">
                <Button color="success">Login</Button>
            </NavLink>
            </NavItem>
        </Nav>
        )}
    </Navbar>
    </div>
);
}