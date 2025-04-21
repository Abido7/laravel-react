import React from 'react';
import Layout from '../Layouts/AuthenticatedLayout';

export default function OrderHistory({ orders = [] }) {
    return (
        <Layout>
            <div className="container mt-5">
                <h2>Your Orders</h2>
                {orders.length === 0 ? (
                    <p>You have no orders yet.</p>
                ) : (
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Order #</th>
                                <th>Date</th>
                                <th>Status</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map(order => (
                                <tr key={order.id}>
                                    <td>{order.id}</td>
                                    <td>{order.created_at}</td>
                                    <td>{order.status}</td>
                                    <td>${order.total}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </Layout>
    );
}
