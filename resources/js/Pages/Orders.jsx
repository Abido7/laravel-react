import React from 'react';
import Layout from '../Layouts/Layout';

const demoOrders = [
    { id: 1, created_at: '2025-04-21', status: 'Pending', total: 50 },
    { id: 2, created_at: '2025-04-20', status: 'Completed', total: 120 },
];

export default function Orders({ orders }) {
  return (
    <Layout>
      <div className="container mt-5">
        <h2>Your Orders</h2>
        {demoOrders.length === 0 ? (
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
              {demoOrders.map(order => (
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
