import React from 'react';
import Layout from '../Layouts/Layout';
import { Link } from '@inertiajs/react';
import ProductCard from '../Components/ProductCard';
import styles from '../CategoryShow.module.css';

export default function CategoryShow({ category }) {
  return (
    <Layout>
      <div className="container mt-5">
        <div className="mb-4">
          <h2 className={styles['category-header']}><i className="bi bi-folder2-open me-2"></i>{category.name}</h2>
          <p className={styles['category-desc']}>{category.description}</p>
        </div>
        <h4 className="mb-4 fw-bold">Products in this category</h4>
        <div className="row">
          {category.products && category.products.length > 0 ? (
            category.products.map(product => (
              <div className="col-md-4 mb-4" key={product.id}>
                <ProductCard product={product} />
              </div>
            ))
          ) : (
            <p className="text-muted">No products in this category.</p>
          )}
        </div>
        <div className="mt-4">
          <Link href="/categories" className={styles['back-link']}><i className="bi bi-arrow-left me-1"></i> Back to Categories</Link>
        </div>
      </div>
    </Layout>
  );
}
