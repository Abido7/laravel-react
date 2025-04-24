import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import { Navbar, Nav, Container, Badge, NavDropdown } from 'react-bootstrap';
import styles from './MainNavbar.module.css';

export default function MainNavbar() {
    const { auth, cartCount = 0 } = usePage().props;
    const [search, setSearch] = React.useState("");

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        // TODO: Implement search logic (e.g., redirect or filter)
        // For now, just log or alert
        if (search.trim()) {
            window.location.href = `/products?search=${encodeURIComponent(search)}`;
        }
    }

    return (
        <Navbar expand="lg" className={styles['creative-navbar']}>
            <div className={styles['creative-gradient-bar']} />
            <Container>
                <Navbar.Brand as={Link} href="/" className={styles['creative-brand']}>
                    <img src={usePage().props.logoUrl || '/logo.png'} alt="Logo" style={{height: 36, marginRight: 8, borderRadius: '10px', boxShadow: '0 2px 12px #a084e833'}} />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="main-navbar-nav" />
                <Navbar.Collapse id="main-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} href="/" className={styles['creative-link']}>الرئيسيه</Nav.Link>
                        <Nav.Link as={Link} href="/products" className={styles['creative-link']}>المنتجات</Nav.Link>
                        <Nav.Link as={Link} href="/categories" className={styles['creative-link']}>الاقسام</Nav.Link>
                        <Nav.Link as={Link} href="/offers" className={styles['creative-link']}>العروض</Nav.Link>
                        <Nav.Link as={Link} href="/orders" className={styles['creative-link']}>الطلبات</Nav.Link>
                    </Nav>
                    {/* Search Bar */}
                    <form className="d-flex mx-3" onSubmit={handleSearchSubmit} style={{ maxWidth: 340, width: '100%' }}>
                        <button className={styles['creative-btn']} type="submit">
                            <i className={`bi bi-search ${styles['creative-icon']}`}></i>
                        </button>
                        <input
                            className={styles['creative-search']}
                            type="search"
                            placeholder="ابحث عن منتج..."
                            aria-label="بحث"
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            style={{ minWidth: 0 }}
                        />
                    </form>
                    <Nav className="ms-auto">
                        <Nav.Link as={Link} href="/cart" className={`position-relative mx-3 ${styles['creative-link']}`}>
                           {auth?.user && (
                               <span>السله</span>
                            )}
                            <i className={`bi bi-cart ${styles['creative-icon']}`}></i>
                            {cartCount > 0 && (
                                <span className={styles['creative-cart-badge']}>
                                    {cartCount}
                                </span>
                            )}
                        </Nav.Link>
                        {auth?.user ? (
                            <NavDropdown title={<span className={styles['creative-link']}>{auth.user.name}</span>} id="user-nav-dropdown" align="end" className={styles['creative-link']} menuVariant="light">
                                <NavDropdown.Item as={Link} href="/logout" method="post" className={styles['creative-link']}>تسجيل الخروج</NavDropdown.Item>
                            </NavDropdown>
                        ) : (
                            <>
                                <Nav.Link as={Link} href="/login" className={styles['creative-link']}>تسجيل الدخول</Nav.Link>
                                <Nav.Link as={Link} href="/register" className={styles['creative-link']}>تسجيل جديد</Nav.Link>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
