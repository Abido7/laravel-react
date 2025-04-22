import React from 'react';
import Layout from '../Layouts/Layout';
import { Link } from '@inertiajs/react';

export default function Categories({ categories = [] }) {
  return (
    <Layout>
        <div className="container mt-5">
            <h2>Categories</h2>
            <div className="row mt-4">
                {categories.length === 0 ? <p>No categories found.</p> : categories.map(category => (
                    <div className="col-md-4 mb-4" key={category.id}>
                        <div className="card h-100">
                            <div className="card-body">
                                <h5 className="card-title">{category.name}</h5>
                                <p className="card-text">{category.description}</p>
                                <span className="badge bg-secondary mb-2">{category.products_count ?? 0} products</span><br />
                                <Link href={`/categories/${category.id}`} className="btn btn-outline-primary mt-2">View Products</Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </Layout>
  );
}
