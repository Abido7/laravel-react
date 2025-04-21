import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import { Navbar, Nav, Container, Badge, NavDropdown } from 'react-bootstrap';

export default function MainNavbar() {
    const { auth, cartCount = 0 } = usePage().props;

    return (
        <Navbar bg="light" expand="lg" className="shadow-sm mb-4">
            <Container>
                <Navbar.Brand as={Link} href="/">AwesomeShop</Navbar.Brand>
                <Navbar.Toggle aria-controls="main-navbar-nav" />
                <Navbar.Collapse id="main-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} href="/products">Products</Nav.Link>
                        <Nav.Link as={Link} href="/categories">Categories</Nav.Link>
                        <Nav.Link as={Link} href="/orders">Orders</Nav.Link>
                    </Nav>
                    <Nav className="ms-auto">
                        <Nav.Link as={Link} href="/cart" className="position-relative">
                            <i className="bi bi-cart me-1"></i>
                            Cart
                            {cartCount > 0 && (
                                <Badge bg="danger" pill className="position-absolute top-0 start-100 translate-middle">
                                    {cartCount}
                                </Badge>
                            )}
                        </Nav.Link>
                        {auth?.user ? (
                            <NavDropdown title={auth.user.name} id="user-nav-dropdown" align="end">
                                <NavDropdown.Item as={Link} href="/profile">Profile</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item as={Link} href="/logout" method="post">Logout</NavDropdown.Item>
                            </NavDropdown>
                        ) : (
                            <>
                                <Nav.Link as={Link} href="/login">Login</Nav.Link>
                                <Nav.Link as={Link} href="/register">Register</Nav.Link>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
