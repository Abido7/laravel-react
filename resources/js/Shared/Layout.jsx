import React from 'react';
import { Link } from '@inertiajs/inertia-react';

export default function Layout({ children }) {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" href="/">Shop</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" href="/categories">Categories</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="/products">Products</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="/cart">Cart</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="/orders">Orders</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <main>{children}</main>
    </>
  );
}
