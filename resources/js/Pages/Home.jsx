import React from 'react';

import Layout from '../Layouts/Layout';
import { useState } from 'react';
import { Link } from '@inertiajs/react';
import ProductCard from '../Components/ProductCard';
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
          {/* Main Products Section */}
          <section className="col-md-12">
            <h2 className="mb-4">Latest Products</h2>
            <div className="row">
              {filteredProducts.length === 0 ? (
                <p>No products found.</p>
              ) : (
                filteredProducts.map(product => (
                  <div className="col-md-3 mb-4" key={product.id}>
                    <ProductCard product={product} />
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
