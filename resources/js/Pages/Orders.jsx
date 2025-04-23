import React from 'react';
import Layout from '../Layouts/Layout';
import dayjs from 'dayjs';
import styles from '../Orders.module.css';
import { Link } from '@inertiajs/react';

function statusBadge(status) {
  const s = status.toLowerCase();
  if (s === 'pending') return <span className={`${styles['status-badge']} ${styles['status-pending']}`}>قيد الانتظار</span>;
  if (s === 'completed') return <span className={`${styles['status-badge']} ${styles['status-completed']}`}>مكتمل</span>;
  if (s === 'cancelled') return <span className={`${styles['status-badge']} ${styles['status-cancelled']}`}>ملغي</span>;
  return <span className={styles['status-badge']}>{status}</span>;
}

export default function Orders({ orders = [] }) {
  const [showConfirm, setShowConfirm] = React.useState(null);
  const [loadingId, setLoadingId] = React.useState(null);
  const [errorMsg, setErrorMsg] = React.useState("");
  return (
    <Layout>
      <div className="container mt-5">
        <h2 className={styles['orders-header']}><i className="bi bi-bag-check me-2"></i>طلباتك</h2>
        {orders.length === 0 ? (
          <div className={styles['no-orders']}>
            <i className="bi bi-emoji-frown mb-2" style={{fontSize:'2.2rem'}}></i><br />
            لا يوجد طلبات
          </div>
        ) : (
          <div className={styles['orders-table'] + ' mt-4'}>
            <table style={{width:'100%'}}>
              <thead>
                <tr>
                  <th>رقم الطلب #</th>
                  <th>التاريخ</th>
                  <th>الحالة</th>
                  <th>الاجمالى</th>
                  <th>العمليات</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(order => (
                  <React.Fragment key={order.id}>
                    <tr>
                      <td>{order.id}</td>
                      <td>{dayjs(order.created_at).format('YYYY-MM-DD HH:mm')}</td>
                      <td>{statusBadge(order.status)}</td>
                      <td><span className={styles['order-total']}><i className="bi bi-currency-dollar me-1"></i>{order.total}</span></td>
                      <td>
  <Link
    href={`/orders/${order.id}`}
    className="btn btn-primary btn-sm me-2"
    style={{ marginBottom: '4px' }}
  >
    عرض التفاصيل
  </Link>
  {order.status === 'pending' && (
    showConfirm === order.id ? (
      <span>
        <button
          className="btn btn-secondary btn-sm me-2"
          onClick={() => setShowConfirm(null)}
        >
          لا
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
          نعم, الغاء
        </button>
        {errorMsg && <div className="text-danger small mt-1">{errorMsg}</div>}
      </span>
    ) : (
      <button
        className="btn btn-danger btn-sm"
        onClick={() => setShowConfirm(order.id)}
      >
        الغاء
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
