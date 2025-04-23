import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import { Navbar, Nav, Container, Badge, NavDropdown } from 'react-bootstrap';
import styles from './MainNavbar.module.css';

export default function MainNavbar() {
    const { auth, cartCount = 0 } = usePage().props;

    return (
        <Navbar bg="light" expand="lg" className="shadow-sm mb-4 py-3">
            <Container>
                <Navbar.Brand as={Link} href="/">
                    <img src={usePage().props.logoUrl || '/logo.png'} alt="Logo" className="d-inline-block align-top" />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="main-navbar-nav" />
                <Navbar.Collapse id="main-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} href="/">الرئيسيه</Nav.Link>
                        <Nav.Link as={Link} href="/products">المنتجات</Nav.Link>
                        <Nav.Link as={Link} href="/categories">الاقسام</Nav.Link>
                        <Nav.Link as={Link} href="/offers">العروض</Nav.Link>
                        <Nav.Link as={Link} href="/orders">الطلبات</Nav.Link>
                    </Nav>
                    <Nav className="ms-auto">
                        <Nav.Link as={Link} href="/cart" className="position-relative mx-3">
                           {auth?.user && (
                               <span>السله</span>
                            )}
                            <i className="bi bi-cart me-1"></i>
                            {cartCount > 0 && (
                                
                                <Badge bg="danger" pill className={styles['cart-badge-rtl']}>
                                    {cartCount}
                                </Badge>
                            )}
                        </Nav.Link>
                        {auth?.user ? (
                            <NavDropdown title={auth.user.name} id="user-nav-dropdown" align="end">
                                {/* <NavDropdown.Item as={Link} href="/profile">Profile</NavDropdown.Item> */}
                                {/* <NavDropdown.Divider /> */}
                                <NavDropdown.Item as={Link} href="/logout" method="post">تسجيل الخروج</NavDropdown.Item>
                            </NavDropdown>
                        ) : (
                            <>
                                <Nav.Link as={Link} href="/login">تسجيل الدخول</Nav.Link>
                                <Nav.Link as={Link} href="/register">تسجيل جديد</Nav.Link>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
