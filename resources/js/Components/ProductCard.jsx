import React from 'react';
import { Link, router } from '@inertiajs/react';
import styles from '../Products.module.css';
import toast from '../toast';

export default function ProductCard({ product }) {
  // Determine if product is wished (customize this logic as needed)
  const isWished = product.is_wished || (Array.isArray(product.wishedBy) && product.wishedBy.length > 0);

  const handleToggleWishlist = () => {
    router.post(`/wishlist/toggle/${product.id}`, {}, {
      preserveScroll: true,
      onSuccess: () => {
        toast.success(isWished ? 'تم الحذف من المفضله' : 'تم الاضافه للمفضله');
      },
      onError: () => {
        toast.error('حدث خطأ');
      },
    });
  }
  const handleAddToCart = async () => {
    router.post('/cart', { product_id: product.id, quantity: 1 }, {
      onSuccess: () => {
        toast.success('تم الاضافه للسلة');
      },
      onError: () => {
        toast.error('حدث خطأ');
      },
      preserveScroll: true,
    });
  };

  const hasOffer = product.discounted_price < product.price;
  return hasOffer ? (
    <div className={styles['offer-card']}>
      <span className={styles['offer-badge']}>
        {product.price - product.discounted_price === 0
          ? ''
          : product.price - product.discounted_price > 0 && product.discounted_price !== product.price
            ? (product.price - product.discounted_price) % 1 === 0
              ? `خصم ${product.price - product.discounted_price} جنيه` // Flat discount
              : `% خصم ${Math.round((1 - product.discounted_price / product.price) * 100)} ` // Percentage
            : ''}
        <i className="bi bi-stars" style={{marginRight:'0.5em',fontSize:'1.1em',verticalAlign:'-2px'}}></i>
      </span>
      <img src={product.image || 'https://via.placeholder.com/400x400'} className={styles['product-image']} alt={product.name} />
      <div className="mt-2">
        <div className={styles['product-title']}>{product.name}</div>
        <div className={styles['product-desc']}>{product.description}</div>
        <div className={styles['price-btn-row']}>
            <button
              className={isWished ? 'btn btn-danger btn-sm me-2' : 'btn btn-outline-danger btn-sm me-2'}
              onClick={handleToggleWishlist}
              title={isWished ? 'Remove from wishlist' : 'Add to wishlist'}
              style={{ borderRadius: '50%', width: '2.2em', height: '2.2em', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <i className={isWished ? 'bi bi-heart-fill' : 'bi bi-heart'}></i>
            </button>
          <span className={styles['old-price']}>{product.price} ج.م</span>
          <span className={styles['new-price']}><i className="bi bi-currency-dollar"></i>{product.discounted_price} ج.م</span>
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
  ) : (
    <div className={styles['product-card']}>
      <span className={styles['product-badge']}>جديد</span>
      <img src={product.image || 'https://via.placeholder.com/400x400'} className={styles['product-image']} alt={product.name} />
      <div className="mt-2">
        <div className={styles['product-title']}>{product.name}</div>
        <div className={styles['product-desc']}>{product.description}</div>
        <div className={styles['price-btn-row']}>
            <button
              className={isWished ? 'btn btn-danger btn-sm me-2' : 'btn btn-outline-danger btn-sm me-2'}
              onClick={handleToggleWishlist}
              title={isWished ? 'Remove from wishlist' : 'Add to wishlist'}
              style={{ borderRadius: '50%', width: '2.2em', height: '2.2em', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <i className={isWished ? 'bi bi-heart-fill' : 'bi bi-heart'}></i>
            </button>
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
