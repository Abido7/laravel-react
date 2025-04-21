import React, { useState } from 'react';
import Layout from '../Layouts/Layout';

const categories = [
    { id: 1, name: 'Electronics' },
    { id: 2, name: 'Fashion' },
    { id: 3, name: 'Home' },
];
const demoProducts = [
    { id: 1, name: 'Smartphone', description: 'A cool smartphone.', price: 499, image: '', category: categories[0] },
    { id: 2, name: 'T-shirt', description: 'Comfy cotton T-shirt.', price: 19, image: '', category: categories[1] },
    { id: 3, name: 'Sofa', description: 'Modern sofa.', price: 899, image: '', category: categories[2] },
];

export default function Products({ products }) {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [search, setSearch] = useState('');
  const filteredProducts = demoProducts.filter(p =>
    (!selectedCategory || p.category.name === selectedCategory) &&
    (p.name.toLowerCase().includes(search.toLowerCase()) || p.description.toLowerCase().includes(search.toLowerCase()))
  );
  return (
    <Layout>
        <div className="container mt-5">
            <div className="row mb-4">
                <div className="col-md-4">
                    <select className="form-select" value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)}>
                        <option value="">All Categories</option>
                        {categories.map(cat => (
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
                            <div className="card h-100">
                                <img src={product.image || 'https://via.placeholder.com/400x400'} className="card-img-top" alt={product.name} />
                                <div className="card-body">
                                    <h5 className="card-title">{product.name}</h5>
                                    <p className="card-text">{product.description}</p>
                                    <p className="card-text fw-bold">${product.price}</p>
                                    <a href={`/products/${product.id}`} className="btn btn-primary">View</a>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    </Layout>
  );
}
