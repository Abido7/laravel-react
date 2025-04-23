import React from 'react';
import Layout from '../Layouts/Layout';
import { Link } from '@inertiajs/react';
import ProductCard from '../Components/ProductCard';
import styles from '../CategoryShow.module.css';

export default function CategoryShow({ category }) {
  return (
    <Layout>
      <div className="container mt-5">
        {/* Products Section */}
        <div className={styles['product-section-title'] + " my-4"}>المنتجات المتوفرة في هذه الفئة</div>
          <div className="row">
            {category.products && category.products.length > 0 ? (
              category.products.map(product => (
                <div className="col-md-4 mb-4" key={product.id}>
                  <ProductCard product={product} />
                </div>
              ))
            ) : (
              <div className={styles['premium-empty']}>لا توجد منتجات في هذه الفئة حالياً.</div>
            )}
          </div>
        <div className="mt-4">
          <Link href="/categories" className={styles['back-link']}><i className="bi bi-arrow-left me-1"></i> العودة للفئات</Link>
        </div>
      </div>
    </Layout>
  );
}
