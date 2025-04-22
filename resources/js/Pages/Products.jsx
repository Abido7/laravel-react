import React, { useState } from 'react';
import Layout from '../Layouts/Layout';
import ProductCard from '../Components/ProductCard';
import { ToastContainer } from 'react-toastify';

export default function Products({ products = [], categories = [] }) {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [search, setSearch] = useState('');
  const filteredProducts = products.filter(p =>
    (!selectedCategory || (p.category && p.category.name === selectedCategory)) &&
    (p.name.toLowerCase().includes(search.toLowerCase()) || (p.description && p.description.toLowerCase().includes(search.toLowerCase())))
  );
  return (
    <>
      <ToastContainer position="top-right" autoClose={2000} hideProgressBar={false} newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
      <Layout>
        <div className="container mt-5">
            <div className="row mb-4">
                <div className="col-md-4">
                    <select className="form-select" value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)}>
                        <option value="">All Categories</option>
                        {categories && categories.map(cat => (
                            <option key={cat.id} value={cat.name}>{cat.name}</option>
                        ))} 
                    </select>
                </div>
                <div className="col-md-8">
                    <input className="form-control" placeholder="Search products..." value={search} onChange={e => setSearch(e.target.value)} />
                </div>
            </div>
            <div className="row">
                {filteredProducts.length === 0 ? (
                    <p>No products found.</p>
                ) : (
                    filteredProducts.map(product => (
                        <div className="col-md-4 mb-4" key={product.id}>
                            <ProductCard product={product} />
                        </div>
                    ))
                )}
            </div>
        </div>
    </Layout>
    </>
  );
}
