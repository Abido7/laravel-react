import React, { useState } from 'react';
import Layout from '../Layouts/Layout';
import styles from '../Cart.module.css';
import { router } from '@inertiajs/react';
import toast from '../toast';
import { ToastContainer } from 'react-toastify';
import { Link } from '@inertiajs/react';

export default function Cart({ cart, items = [] }) {
  const [updating, setUpdating] = useState(null);
  // Use discounted price if available
  const total = items.reduce((sum, item) => {
    const p = item.product;
    const price = (p.discounted_price && p.discounted_price < p.price) ? p.discounted_price : p.price;
    return sum + price * item.quantity;
  }, 0);

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
              {items.map(item => {
                const p = item.product;
                const hasOffer = p.discounted_price && p.discounted_price < p.price;
                return (
                  <div className={styles['cart-item-card']} key={item.id} style={hasOffer ? { border: '2px solid #ff4f7a', boxShadow: '0 8px 36px rgba(255,0,80,0.12)' } : {}}>
                    {hasOffer && (
                      <span style={{position:'absolute',top:6,left:12,background:'#ff4f7a',color:'#fff',fontWeight:800,fontSize:'0.98rem',padding:'0.25em 1em',borderRadius:'10px',zIndex:2}}>عرض</span>
                    )}
                    <img
                      src={p.image || 'https://via.placeholder.com/90x90'}
                      alt={p.name}
                      className={styles['cart-item-image']}
                    />
                    <div className={styles['cart-item-info']}>
                      <div className={styles['cart-item-title']}>{p.name}</div>
                      <div className={styles['cart-item-price']}>
                        {hasOffer ? (
                          <>
                            <span style={{textDecoration:'line-through',color:'#aaa',marginRight:8,fontSize:'1.08em'}}>${p.price}</span>
                            <span style={{fontWeight:800,color:'#13b96a',fontSize:'1.13em'}}>${p.discounted_price}</span>
                          </>
                        ) : (
                          <>${p.price}</>
                        )}
                      </div>
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
                        <span style={{ marginLeft: '1.2em', fontWeight: '600', color: hasOffer ? '#13b96a' : '#6f42c1' }}>
                          Total: ${((hasOffer ? p.discounted_price : p.price) * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                    <button className={styles['cart-item-remove']} disabled={updating === item.id} onClick={() => handleRemove(item)}>
                      حذف
                    </button>
                  </div>
                );
              })}
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
