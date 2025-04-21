import React, { useState } from 'react';
import Layout from '../Layouts/Layout';
import { router } from '@inertiajs/react';
import toast from '../toast';
import { ToastContainer } from 'react-toastify';

export default function Cart({ cart, items = [] }) {
  const [updating, setUpdating] = useState(null);
  const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const handleUpdateQuantity = (item, newQuantity) => {
    if (newQuantity < 1) return;
    setUpdating(item.id);
    router.put('/cart/' + item.id, { quantity: newQuantity }, {
      onSuccess: () => {
        toast.success('Cart updated!');
        setUpdating(null);
      },
      onError: () => {
        toast.error('Failed to update cart.');
        setUpdating(null);
      },
      preserveScroll: true,
    });
  };

  const handleRemove = (item) => {
    setUpdating(item.id);
    router.delete('/cart/' + item.id, {
      onSuccess: () => {
        toast.success('Item removed!');
        setUpdating(null);
      },
      onError: () => {
        toast.error('Failed to remove item.');
        setUpdating(null);
      },
      preserveScroll: true,
    });
  };

  return (
    <Layout>
      <ToastContainer position="top-right" autoClose={2000} hideProgressBar={false} newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
      <div className="container mt-5">
        <h2>Your Cart</h2>
        {items.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            <table className="table align-middle">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Qty</th>
                  <th>Price</th>
                  <th>Total</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {items.map(item => (
                  <tr key={item.id}>
                    <td>{item.product.name}</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <button className="btn btn-light btn-sm" disabled={updating === item.id} onClick={() => handleUpdateQuantity(item, item.quantity - 1)}>-</button>
                        <input
                          type="number"
                          min="1"
                          value={item.quantity}
                          style={{ width: 50, textAlign: 'center', margin: '0 6px' }}
                          disabled={updating === item.id}
                          onChange={e => handleUpdateQuantity(item, parseInt(e.target.value) || 1)}
                        />
                        <button className="btn btn-light btn-sm" disabled={updating === item.id} onClick={() => handleUpdateQuantity(item, item.quantity + 1)}>+</button>
                      </div>
                    </td>
                    <td>${item.product.price}</td>
                    <td>${(item.product.price * item.quantity).toFixed(2)}</td>
                    <td>
                      <button className="btn btn-danger btn-sm" disabled={updating === item.id} onClick={() => handleRemove(item)}>
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="d-flex justify-content-between align-items-center mt-4">
              <h4>Total: ${total.toFixed(2)}</h4>
              <a href="/checkout" className="btn btn-success btn-lg">Checkout</a>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
}
