import React, { useState } from 'react';
import { Link, router } from '@inertiajs/react';
import Layout from '../Layouts/Layout';
import toast from '../toast';
import { ToastContainer } from 'react-toastify';
import styles from '../ProductDetails.module.css';

export default function ProductDetails({ product }) {
    const [quantity, setQuantity] = useState(1);
    const [adding, setAdding] = useState(false);

    const handleAddToCart = () => {
        setAdding(true);
        router.post('/cart', { product_id: product.id, quantity }, {
            onSuccess: () => {
                toast.success('Product added to cart!');
                setAdding(false);
            },
            onError: () => {
                toast.error('Failed to add to cart.');
                setAdding(false);
            },
            preserveScroll: true,
        });
    };

    return (
        <Layout>
            <ToastContainer position="bottom-right" autoClose={2000} hideProgressBar={false} newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-lg-10">
                        <div className={styles['product-card'] + ' shadow-lg'}>
                            <div className="row align-items-center">
                                <div className="col-md-6 mb-4 mb-md-0">
                                    <img src={product.image || 'https://via.placeholder.com/500x500'} alt={product.name} className={styles['product-image']} />
                                </div>
                                <div className="col-md-6">
                                    <div className="d-flex align-items-center mb-2">
                                        <span className={styles['category-badge']}><i className="bi bi-tag me-2"></i>{product.category?.name || 'Uncategorized'}</span>
                                    </div>
                                    <h2 className="fw-bold mb-2">{product.name}</h2>
                                    <div className={styles['price-badge']}>${product.price}</div>
                                    <p className="text-secondary mb-4" style={{ fontSize: '1.1rem' }}>{product.description}</p>
                                    <div className="d-flex align-items-center mb-3">
                                        <span className="me-2 fw-semibold">Quantity:</span>
                                        <button className="btn btn-light border px-2 py-1" style={{fontSize:'1.2rem'}} disabled={quantity <= 1 || adding} onClick={() => setQuantity(q => Math.max(1, q - 1))}>-</button>
                                        <input
                                            type="number"
                                            min="1"
                                            value={quantity}
                                            onChange={e => setQuantity(Math.max(1, Number(e.target.value)))}
                                            style={{ width: 60, textAlign: 'center', margin: '0 10px' }}
                                            className="form-control d-inline-block"
                                            disabled={adding}
                                        />
                                        <button className="btn btn-light border px-2 py-1" style={{fontSize:'1.2rem'}} disabled={adding} onClick={() => setQuantity(q => q + 1)}>+</button>
                                    </div>
                                    <button className={styles['add-cart-btn']} disabled={adding} onClick={handleAddToCart}>
                                        <i className="bi bi-cart-plus me-2"></i>
                                        {adding ? 'جاري الاضافة...' : 'اضافة الى السله'}
                                    </button>
                                    <div className="mt-4">
                                        <Link href="/products" className={styles['back-link']}>
                                            <i className="bi bi-arrow-left me-1"></i> عودة للمنتجات
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
