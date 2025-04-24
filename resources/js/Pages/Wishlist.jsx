import React from 'react';
import { Inertia } from '@inertiajs/inertia';
import { usePage } from '@inertiajs/react';
import styles from './Wishlist.module.css';
import Layout from '../Layouts/Layout';

function Wishlist() {
    const { products = [], wishlistCount = 0 } = usePage().props;

    const handleToggleWishlist = (productId) => {
        Inertia.post(`/wishlist/toggle/${productId}`, {}, {
            preserveScroll: true,
            onSuccess: () => Inertia.reload({ only: ['products', 'wishlistCount'] })
        });
    };

    return (
        <div className={styles['wishlist-container']}>
            <div className="container">
                <h2 className={styles['wishlist-title']}>المفضله</h2>
                {products.length === 0 ? (
                    <p style={{color:'#888',fontSize:'1.1rem',textAlign:'center'}}>لا يوجد منتجات في المفضله</p>
                ) : (
                    <div className="row g-4">
                        {products.map(product => (
                            <div className="col-md-4 col-lg-3" key={product.id}>
                                <div className={styles['premium-card']}>
                                    <img src={product.image} className={styles['premium-img']} alt={product.name} />
                                    <div className={styles['premium-card-body']}>
                                        <h5 className={styles['premium-title']}>{product.name}</h5>
                                        <p className={styles['premium-desc']}>{product.description}</p>
                                        <div className="d-flex justify-content-between align-items-center mt-auto">
                                            <span className={styles['premium-price']}>{product.discounted_price} جنيه</span>
                                            <button
                                                className={styles['premium-remove-btn']}
                                                onClick={() => handleToggleWishlist(product.id)}
                                                title="Remove from wishlist"
                                            >
                                                <i className="bi bi-heart-fill"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

Wishlist.layout = page => <Layout>{page}</Layout>;

export default Wishlist;
