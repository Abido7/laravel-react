import React from 'react';
import Layout from '../Layouts/Layout';
import { Link, usePage } from '@inertiajs/react';


export default function Offers({ offers = [] }) {
  return (
    <Layout>
      <div className="offers-bg py-5">
        <div className="container arabic-font">
          <h1 className="fw-bold mb-5 text-warning text-center" style={{ fontSize: 32 }}>العروض المتاحة</h1>
          {offers.length === 0 ? (
            <p className="text-center">لا يوجد عروض متاحة حاليا.</p>
          ) : (
            <div className="row justify-content-center g-4">
              {offers.map(offer => (
                <div className="col-md-5 col-lg-4" key={offer.id}>
                  <div className="card shadow-lg border-0 h-100" style={{ borderRadius: 24 }}>
                    <div className="card-body position-relative p-4">
                      <span
                        className="badge bg-danger position-absolute"
                        style={{ top: 18, left: 18, fontSize: 18, padding: '0.7em 1.3em', borderRadius: 12 }}
                      >
                        {offer.type === 'percentage'
                          ? `% خصم ${offer.discount}`
                          : `خصم ${offer.discount} جنيه`}
                      </span>
                      <h5 className="card-title fw-bold mt-4 mb-2" style={{ fontSize: 22 }}>{offer.title}</h5>
                      {offer.product && (
                        <div className="mb-2">
                          <span className="fw-bold">المنتج: </span>
                          {offer.product.name}
                        </div>
                      )}
                      <p className="card-text text-muted mb-3">{offer.description}</p>
                      {offer.product && (
                        <div>
                          <span className="text-decoration-line-through text-muted me-2" style={{ fontSize: 15 }}>{offer.product.price} جنيه</span>
                          <span className="fw-bold text-success" style={{ fontSize: 21 }}>{offer.product.discounted_price ?? offer.product.price} جنيه</span>
                        </div>
                      )}
                      {offer.category && (
                        <div className="mt-2">
                          <span className="fw-bold">القسم:</span> {offer.category.name}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
