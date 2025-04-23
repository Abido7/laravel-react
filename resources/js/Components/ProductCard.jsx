import React from 'react';
import { Link, router } from '@inertiajs/react';
import styles from '../Products.module.css';
import toast from '../toast';

export default function ProductCard({ product }) {
  const handleAddToCart = async () => {
    router.post('/cart', { product_id: product.id, quantity: 1 }, {
      onSuccess: () => {
        toast.success('Product added to cart!');
      },
      onError: () => {
        toast.error('Failed to add to cart.');
      },
      preserveScroll: true,
    });
  };

  return (
    <div className={styles['product-card']}>
      {/* Creative badge, e.g. 'New' */}
      <span className={styles['product-badge']}>جديد</span>
      <img src={product.image || 'https://via.placeholder.com/400x400'} className={styles['product-image']} alt={product.name} />
      <div className="mt-2">
        <div className={styles['product-title']}>{product.name}</div>
        <div className={styles['product-desc']}>{product.description}</div>
        <div className={styles['price-btn-row']}>
          <div className={styles['product-price']}><i className="bi bi-currency-dollar"></i>{product.price}</div>
          <Link href={`/products/${product.id}`} className={styles['view-btn']}><i className="bi bi-eye me-1"></i> عرض</Link>
        </div>
        <div style={{marginTop: 'auto'}}>
          <button
            className={styles['add-cart-btn'] + " btn btn-success btn-sm"}
            onClick={handleAddToCart}
            title="Add to Cart"
            style={{width: '100%'}}
          >
            <i className="bi bi-cart-plus"></i>
            <span className="mx-1">اضافة الي السله</span>
          </button>
        </div>
      </div>
    </div>
  );
}
