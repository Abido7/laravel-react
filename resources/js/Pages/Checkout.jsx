import React, { useState } from 'react';
import Layout from '../Layouts/Layout';
import styles from '../Checkout.module.css';

export default function Checkout({ user, cart, total }) {
    const [shipping, setShipping] = useState('');
    const [city, setCity] = useState('');
    const [payment, setPayment] = useState('Cash');
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrors({});
        setSuccess('');
        if (!user || !cart) {
            setErrors({ general: 'يجب تسجيل الدخول اولا' });
            setLoading(false);
            return;
        }
        try {
            const response = await fetch('/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                },
                body: JSON.stringify({
                    user_id: user.id,
                    cart_id: cart.id,
                    total: total,
                    status: 'pending',
                    shipping_address: shipping,
                    city,
                    payment_method: payment,
                }),
            });
            if (response.ok) {
                // Redirect to orders page after successful order
                window.location.href = '/orders';
                return;
            } else {
                const data = await response.json();
                if (data.errors) {
                    setErrors(data.errors);
                } else {
                    setErrors({general: data.message || 'Unknown error'});
                }
            }
        } catch (err) {
            setErrors({general: err.message});
        }
        setLoading(false);
    };



    return (
        <Layout>
            <div className="container mt-5">
                <div className={styles['checkout-card']}>
                    <h2 className={styles['checkout-header']}><i className="bi bi-cart-check me-2"></i>الدفع</h2>
                    {success && (
                        <div style={{color: '#198754', fontWeight: 600, marginBottom: 16, textAlign: 'center'}}>
                            <i className="bi bi-check-circle me-1"></i>{success}
                        </div>
                    )}
                    {errors.general && (
                        <div style={{color: '#dc3545', fontWeight: 500, marginBottom: 12, textAlign: 'center'}}>
                            <i className="bi bi-exclamation-triangle me-1"></i>{errors.general}
                        </div>
                    )}
                    <form className="mt-4" onSubmit={handleSubmit}>
                        <div>
                            <label className={styles['checkout-label']}>العنوان</label>
                            <input
                                type="text"
                                className={styles['checkout-input']}
                                placeholder="123 Main St"
                                value={shipping}
                                onChange={e => setShipping(e.target.value)}
                                required
                            />
                            {errors.shipping_address && (
                                <div style={{color: '#dc3545', fontSize: '0.98rem', marginTop: 2}}>
                                    {errors.shipping_address}
                                </div>
                            )}
                        </div>
                        <div>
                            <label className={styles['checkout-label']}>المدينة</label>
                            <input
                                type="text"
                                className={styles['checkout-input']}
                                placeholder="City"
                                value={city}
                                onChange={e => setCity(e.target.value)}
                                required
                            />
                            {errors.city && (
                                <div style={{color: '#dc3545', fontSize: '0.98rem', marginTop: 2}}>
                                    {errors.city}
                                </div>
                            )}
                        </div>
                        <div>
                            <label className={styles['checkout-label']}>طريقة الدفع</label>
                            <select
                                className={styles['checkout-select']}
                                value={payment}
                                onChange={e => setPayment(e.target.value)}
                            >
                                <option>نقدي</option>
                            </select>
                            {errors.payment_method && (
                                <div style={{color: '#dc3545', fontSize: '0.98rem', marginTop: 2}}>
                                    {errors.payment_method}
                                </div>
                            )}
                        </div>
                        <button
                            type="submit"
                            className={styles['place-order-btn']}
                            disabled={loading}
                        >
                            <i className="bi bi-bag-check me-2"></i>
                            {loading ? 'جاري التسجيل' : 'الدفع'}
                        </button>
                    </form>
                </div>
            </div>
        </Layout>
    );
}

