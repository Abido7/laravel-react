import React, { useState } from 'react';
import Layout from '../Layouts/Layout';
import styles from '../Cart.module.css';
import { router } from '@inertiajs/react';
import toast from '../toast';
import { ToastContainer } from 'react-toastify';
import { Link } from '@inertiajs/react';

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
      <ToastContainer position="bottom-right" autoClose={2000} hideProgressBar={false} newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
      <div className={styles['cart-container']}>
        <div className={styles['cart-title']}>🛒 سلة المشتريات</div>
        {items.length === 0 ? (
          <>
            <p> لا يوجد منتجات في السلة</p>
            <Link href="/products" className={styles['cart-empty-link']}>
              <i className="bi bi-arrow-left me-1"></i>
              اضافة منتجات
            </Link>
          </>
        ) : (
          <>
            <div className={styles['cart-items-list']}>
              {items.map(item => (
                <div className={styles['cart-item-card']} key={item.id}>
                  <img
                    src={item.product.image || 'https://via.placeholder.com/90x90'}
                    alt={item.product.name}
                    className={styles['cart-item-image']}
                  />
                  <div className={styles['cart-item-info']}>
                    <div className={styles['cart-item-title']}>{item.product.name}</div>
                    <div className={styles['cart-item-price']}>${item.product.price}</div>
                    <div className={styles['cart-item-qty']}>
                      <button className="btn btn-light btn-sm" disabled={updating === item.id} onClick={() => handleUpdateQuantity(item, item.quantity - 1)}>-</button>
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        disabled={updating === item.id}
                        onChange={e => handleUpdateQuantity(item, parseInt(e.target.value) || 1)}
                      />
                      <button className="btn btn-light btn-sm" disabled={updating === item.id} onClick={() => handleUpdateQuantity(item, item.quantity + 1)}>+</button>
                      <span style={{ marginLeft: '1.2em', fontWeight: '600', color: '#6f42c1' }}>Total: ${(item.product.price * item.quantity).toFixed(2)}</span>
                    </div>
                  </div>
                  <button className={styles['cart-item-remove']} disabled={updating === item.id} onClick={() => handleRemove(item)}>
                    حذف
                  </button>
                </div>
              ))}
            </div>
            <div className={styles['cart-summary']}>
              <a href="/checkout" className={styles['cart-summary-checkout']}>الانتقال للدفع</a>
              <div className={styles['cart-summary-total']}>الاجمالى: {total.toFixed(2)}</div>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
}
