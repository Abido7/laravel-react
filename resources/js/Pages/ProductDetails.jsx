import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import Layout from '../Layouts/AuthenticatedLayout';

export default function ProductDetails({ product }) {
    return (
        <Layout>
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-6">
                        <img src={product.image || 'https://via.placeholder.com/400x400'} alt={product.name} className="img-fluid rounded" />
                    </div>
                    <div className="col-md-6">
                        <h2>{product.name}</h2>
                        <p className="text-muted">{product.category?.name}</p>
                        <p>{product.description}</p>
                        <h4>${product.price}</h4>
                        <button className="btn btn-primary">Add to Cart</button>
                        <div className="mt-3">
                            <Link href="/products">Back to products</Link>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
