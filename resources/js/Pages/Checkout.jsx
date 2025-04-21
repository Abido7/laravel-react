import React from 'react';
import Layout from '../Layouts/AuthenticatedLayout';

export default function Checkout() {
    return (
        <Layout>
            <div className="container mt-5">
                <h2>Checkout</h2>
                <form className="mt-4">
                    <div className="mb-3">
                        <label className="form-label">Shipping Address</label>
                        <input type="text" className="form-control" placeholder="123 Main St" />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">City</label>
                        <input type="text" className="form-control" placeholder="City" />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Payment Method</label>
                        <select className="form-select">
                            <option>Credit Card</option>
                            <option>PayPal</option>
                        </select>
                    </div>
                    <button type="submit" className="btn btn-success">Place Order</button>
                </form>
            </div>
        </Layout>
    );
}
