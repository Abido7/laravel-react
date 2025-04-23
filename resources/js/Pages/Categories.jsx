import React from 'react';
import Layout from '../Layouts/Layout';
import styles from './Categories.module.css';
import { Link } from '@inertiajs/react';

export default function Categories({ categories = [] }) {
  return (
    <Layout>
        <div className="container mt-5" dir="rtl">
            <div className={styles['categories-header']}>
              <i className="bi bi-grid-3x3-gap me-2"></i>الفئات
            </div>
            <div className={styles['categories-grid']}>
                {categories.length === 0 ? (
                  <div className={styles['categories-empty']}>لا توجد فئات متاحة حالياً.</div>
                ) : categories.map(category => (
                    <div className={styles['category-card']} key={category.id}>
                        <div className={styles['category-title']} dir="rtl">
                          <i className="bi bi-folder2-open me-2"></i>{category.name}
                        </div>
                        <div className={styles['category-desc']} dir="rtl">{category.description}</div>
                        <div className={styles['category-actions']}>
                          <span className={styles['category-badge']}><i className="bi bi-box-seam me-1"></i>{category.products_count ?? 0} منتج</span>
                          <Link href={`/categories/${category.id}`} className={styles['category-link']}>
                            <i className="bi bi-arrow-left-short me-1"></i>
                            عرض المنتجات
                          </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </Layout>
  );
}
