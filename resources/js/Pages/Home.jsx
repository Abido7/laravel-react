import React from 'react';

import Layout from '../Layouts/Layout';
import { useState } from 'react';
import { router, Link } from '@inertiajs/react';
import toast from '../toast';
import { ToastContainer } from 'react-toastify';

export default function Home({ categories = [], products = [] }) {
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  // Filter products by search and category
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === '' || (product.category && product.category.id == categoryFilter);
    return matchesSearch && matchesCategory;
  });

  const handleAddToCart = async (productId) => {
    router.post('/cart', { product_id: productId, quantity: 1 }, {
      onSuccess: () => {
        toast.success('Product added to cart!');
      },
      onError: () => {
        toast.error('Failed to add to cart.');
      },
      preserveScroll: true,
    });
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={2000} hideProgressBar={false} newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
      <Layout>
      {/* Hero/Banner Section */}
      <div className="container mt-4">
        <div className="p-5 mb-4 bg-gradient bg-primary text-white rounded-3 shadow">
          <div className="container-fluid py-3">
            <h1 className="display-4 fw-bold">Welcome to AwesomeShop</h1>
            <p className="lead">Browse the latest products, shop by category, and enjoy a seamless ecommerce experience!</p>
            <Link href="/products" className="btn btn-light btn-lg me-2">Shop Now</Link>
            <Link href="/cart" className="btn btn-outline-light btn-lg">View Cart</Link>
          </div>
        </div>

        {/* Search Bar */}
        <div className="row mb-4">
          <div className="col-md-8">
            <input
              type="text"
              className="form-control"
              placeholder="Search products..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <div className="col-md-4">
            <select
              className="form-select"
              value={categoryFilter}
              onChange={e => setCategoryFilter(e.target.value)}
            >
              <option value="">All Categories</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="row">
          {/* Sidebar Categories */}
          <aside className="col-md-3 mb-4">
            <div className="card">
              <div className="card-header bg-primary text-white">
                <h5 className="mb-0">Categories</h5>
              </div>
              <ul className="list-group list-group-flush">
                {categories.length === 0 ? (
                  <li className="list-group-item">No categories found.</li>
                ) : (
                  categories.map(cat => (
                    <li key={cat.id} className="list-group-item d-flex justify-content-between align-items-center">
                      <Link href={`/categories/${cat.id}`} className="text-decoration-none">{cat.name}</Link>
                      <span className="badge bg-secondary rounded-pill">{cat.products_count}</span>
                    </li>
                  ))
                )}
              </ul>
            </div>
          </aside>

          {/* Main Products Section */}
          <section className="col-md-9">
            <h2 className="mb-4">Latest Products</h2>
            <div className="row">
              {filteredProducts.length === 0 ? (
                <p>No products found.</p>
              ) : (
                filteredProducts.map(product => (
                  <div className="col-md-4 mb-4" key={product.id}>
                    <div className="card h-100">
                      <img src={product.image || 'https://via.placeholder.com/400x400'} className="card-img-top" alt={product.name} />
                      <div className="card-body">
                        <h5 className="card-title">{product.name}</h5>
                        <p className="card-text text-truncate">{product.description}</p>
                        <span className="badge bg-light text-dark mb-2">{product.category?.name}</span>
                        <div className="d-flex justify-content-between align-items-center">
                          <span className="fw-bold">${product.price}</span>
                          <div>
                            <Link href={`/products/${product.id}`} className="btn btn-outline-primary btn-sm me-2">View</Link>
                            <button className="btn btn-success btn-sm" onClick={() => handleAddToCart(product.id)}>
                              Add to Cart
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>
        </div>
      </div>
    </Layout>
    </>
  );
}
