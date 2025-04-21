import React from 'react';
import { Inertia } from '@inertiajs/inertia';

const categories = [
    { id: 1, name: 'Electronics', description: 'Gadgets and devices.' },
    { id: 2, name: 'Fashion', description: 'Clothing and accessories.' },
    { id: 3, name: 'Home', description: 'Home and living.' },
];

export default function Categories() {
  return (
    <Layout>
        <div className="container mt-5">
            <h2>Categories</h2>
            <div className="row mt-4">
                {categories.map(category => (
                    <div className="col-md-4 mb-4" key={category.id}>
                        <div className="card h-100">
                            <div className="card-body">
                                <h5 className="card-title">{category.name}</h5>
                                <p className="card-text">{category.description}</p>
                                <a href={`/products?category=${category.name}`} className="btn btn-outline-primary">View Products</a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </Layout>
);
}
