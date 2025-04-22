import React from 'react';
import Layout from '../Layouts/Layout';
import styles from '../Orders.module.css';

function statusBadge(status) {
  const s = status.toLowerCase();
  if (s === 'pending') return <span className={`${styles['status-badge']} ${styles['status-pending']}`}>Pending</span>;
  if (s === 'completed') return <span className={`${styles['status-badge']} ${styles['status-completed']}`}>Completed</span>;
  if (s === 'cancelled') return <span className={`${styles['status-badge']} ${styles['status-cancelled']}`}>Cancelled</span>;
  return <span className={styles['status-badge']}>{status}</span>;
}

export default function Orders({ orders = [] }) {
  const [showConfirm, setShowConfirm] = React.useState(null);
  const [loadingId, setLoadingId] = React.useState(null);
  const [errorMsg, setErrorMsg] = React.useState("");
  return (
    <Layout>
      <div className="container mt-5">
        <h2 className={styles['orders-header']}><i className="bi bi-bag-check me-2"></i>Your Orders</h2>
        {orders.length === 0 ? (
          <div className={styles['no-orders']}>
            <i className="bi bi-emoji-frown mb-2" style={{fontSize:'2.2rem'}}></i><br />
            You have no orders yet.
          </div>
        ) : (
          <div className={styles['orders-table'] + ' mt-4'}>
            <table style={{width:'100%'}}>
              <thead>
                <tr>
                  <th>Order #</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Total</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(order => (
                  <React.Fragment key={order.id}>
                    <tr>
                      <td>{order.id}</td>
                      <td>{order.created_at}</td>
                      <td>{statusBadge(order.status)}</td>
                      <td><span className={styles['order-total']}><i className="bi bi-currency-dollar me-1"></i>{order.total}</span></td>
                      <td>
                        {order.status === 'pending' && (
                          showConfirm === order.id ? (
                            <span>
                              <button
                                className="btn btn-secondary btn-sm me-2"
                                onClick={() => setShowConfirm(null)}
                              >
                                No
                              </button>
                              <button
                                className="btn btn-danger btn-sm"
                                onClick={async () => {
                                  setLoadingId(order.id);
                                  setErrorMsg("");
                                  try {
                                    const res = await fetch(`/orders/${order.id}/cancel`, {
                                      method: 'POST',
                                      headers: {
                                        'Content-Type': 'application/json',
                                        'X-Requested-With': 'XMLHttpRequest',
                                        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                                      },
                                    });
                                    if (res.ok) {
                                      window.location.reload();
                                    } else {
                                      const data = await res.json();
                                      setErrorMsg(data.message || 'Failed to cancel order.');
                                    }
                                  } catch (err) {
                                    setErrorMsg('Error: ' + err.message);
                                  }
                                  setLoadingId(null);
                                  setShowConfirm(null);
                                }}
                                disabled={loadingId === order.id}
                              >
                                Yes, Cancel
                              </button>
                              {errorMsg && <div className="text-danger small mt-1">{errorMsg}</div>}
                            </span>
                          ) : (
                            <button
                              className="btn btn-danger btn-sm"
                              onClick={() => setShowConfirm(order.id)}
                            >
                              Cancel
                            </button>
                          )
                        )}
                      </td>
                    </tr>
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </Layout>
  );
}
