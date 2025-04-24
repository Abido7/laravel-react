import React from 'react';
import '../../css/arabic-fonts.css';
import Layout from '../Layouts/Layout';
import { useState } from 'react';
import { Link } from '@inertiajs/react';
import ProductCard from '../Components/ProductCard';
import { ToastContainer } from 'react-toastify';

export default function Home({ categories = [], products = [], bannerImage, offers = [] }) {
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
      <ToastContainer position="bottom-right" autoClose={2000} hideProgressBar={false} newestOnTop
       closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
      <Layout>
        {/* Clean Card-Style Banner Section */}
        <div className="container my-5 arabic-font">
          <div
            className="position-relative d-flex flex-column justify-content-center align-items-center rounded-4 shadow-lg p-5"
            style={{
              minHeight: 300,
              backgroundImage: `linear-gradient(120deg, rgba(0,0,0,0.45) 40%, rgba(0,0,0,0.15) 100%), url(${bannerImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              overflow: 'hidden',
            }}
          >
            <div className="text-center text-white arabic-font" style={{ zIndex: 2, maxWidth: 700 }}>
              <h1 className="display-4 fw-bold mb-3 arabic-font">مرحبا بكم في متجرنا!</h1>
              <p className="lead mb-4 arabic-font">اكتشف أحدث المنتجات والعروض الحصرية الآن.</p>
              <div>
                <Link href="/products" className="btn btn-warning btn-lg me-2 px-4 shadow">تسوق الآن</Link>
                <Link href="/cart" className="btn btn-outline-light btn-lg px-4 shadow">سلة المشتريات</Link>
              </div>
            </div>
            {/* Optional: Decorative overlay shapes can be added here if desired */}
          </div>
        </div>
     

        {/* Search Bar */}

        <div className="container">

          <div className="row mb-4">
            <div className="col-md-8">
              <input
                type="text"
                className="form-control"
                placeholder="ابحث عن منتج"
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
                <option value="">جميع الفئات</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="row">
            {/* Main Products Section */}
            <section className="col-md-12">
              <h2 className="mb-4">احدث المنتجات</h2>
              <div className="row">
                {filteredProducts.length === 0 ? (
                  <p>لا يوجد منتجات</p>
                ) : (
                  filteredProducts.map(product => (
                    <div className="col-md-4 mb-4" key={product.id}>
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
