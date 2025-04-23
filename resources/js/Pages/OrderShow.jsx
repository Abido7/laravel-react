import React from 'react';
import Layout from '../Layouts/Layout';
import dayjs from 'dayjs';
import { Link, usePage } from '@inertiajs/react';
import styles from '../Orders.module.css';

export default function OrderShow() {
  // Inertia provides the order as a prop via the controller
  const { order } = usePage().props;
  console.log('order:', order);
  console.log('order.order_items:', order.order_items);

  if (!order) {
    return (
      <Layout>
        <div className="container mt-5">
          <div className="alert alert-danger">لا يوجد طلبات</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mt-5">
        <Link href="/orders" className="btn btn-light mb-3">
          &larr; العودة للطلبات
        </Link>
        <div className="card mb-4">
          <div className="card-header d-flex justify-content-between align-items-center">
            <h3 className="mb-0"># {order.id}</h3>
            <span className={styles['status-badge'] + ' ' + styles[`status-${order.status}`]}>
              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
            </span>
          </div>
          <div className="card-body">
            <div className="mb-3">
              <strong>التاريخ:</strong> {dayjs(order.created_at).format('YYYY-MM-DD HH:mm')}
            </div>
            <div className="mb-3">
              <strong>الاجمالى:</strong> ${order.total}
            </div>
            <div className="mb-3">
              <strong>طريقة الدفع:</strong> {order.payment_method}
            </div>
            <div className="mb-3">
              <strong>العنوان:</strong> {order.shipping_address}
            </div>
            <div className="mb-3">
              <strong>المنتجات:</strong>
              <div className="row g-3 mt-2">
                {order.order_items && order.order_items.length > 0 ? (
                  order.order_items.map(item => (
                    <div key={item.id} className="col-12 col-md-6 col-lg-4">
                      <div className="card h-100 shadow-sm order-item-card">
                        {item.product_image && (
                          <img
                            src={item.product_image}
                            alt={item.product_name}
                            className="card-img-top order-item-img"
                            style={{
                              objectFit: 'cover',
                              height: '180px',
                              borderTopLeftRadius: '12px',
                              borderTopRightRadius: '12px'
                            }}
                          />
                        )}
                        <div className="card-body d-flex flex-column justify-content-between">
                          <h5 className="card-title mb-2">{item.product.name}</h5>
                          <div className="mb-1">
                            <span className="badge bg-secondary me-2">الكميه: {item.quantity}</span>
                            <span className="badge bg-light text-dark">السعر: {item.price}</span>
                          </div>
                          <div className="fw-bold text-end mt-2">
                            الاجمالى: <span className="text-success">{(item.price * item.quantity).toFixed(2)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-12">
                    <div className="alert alert-warning">No items found.</div>
                  </div>
                )}
              </div>
              <div className="d-flex justify-content-end mt-4">
                <div className="card p-3 bg-light border-0 shadow-sm" style={{ minWidth: '260px' }}>
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="fw-semibold">Total:</span>
                    <span className="fs-5 text-primary">${order.total}</span>
                  </div>
                </div>
              </div>
            </div>
            {order.notes && (
              <div className="mb-3">
                <strong>Notes:</strong> {order.notes}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
