import React, { useState } from 'react';
import Layout from '../Layouts/Layout';
import ProductCard from '../Components/ProductCard';
import { ToastContainer } from 'react-toastify';

export default function Products({ products = [], categories = [] }) {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [search, setSearch] = useState('');
  const [perPage, setPerPage] = useState(12);
  const [currentPage, setCurrentPage] = useState(1);

  // Filter products by category and search
  const filteredProducts = products.filter(p =>
    (!selectedCategory || (p.category && p.category.name === selectedCategory)) &&
    (p.name.toLowerCase().includes(search.toLowerCase()) || (p.description && p.description.toLowerCase().includes(search.toLowerCase())))
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredProducts.length / perPage);
  const paginatedProducts = filteredProducts.slice((currentPage - 1) * perPage, currentPage * perPage);

  // Handlers
  const handlePerPageChange = (e) => {
    setPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to first page
  };
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <ToastContainer position="bottom-right" autoClose={2000} hideProgressBar={false} newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
      <Layout>
        <div className="container mt-5">
            <div className="row mb-4 align-items-end">
                <div className="col-md-4 mb-2 mb-md-0">
                    <select className="form-select" value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)}>
                        <option value="">جميع الفئات</option>
                        {categories && categories.map(cat => (
                            <option key={cat.id} value={cat.name}>{cat.name}</option>
                        ))} 
                    </select>
                </div>
                <div className="col-md-5 mb-2 mb-md-0">
                    <input className="form-control" placeholder="ابحث عن منتج..." value={search} onChange={e => setSearch(e.target.value)} />
                </div>
                <div className="col-md-3">
                    <select className="form-select" value={perPage} onChange={handlePerPageChange}>
                        <option value={6}>6 عرض</option>
                        <option value={12}>12 عرض</option>
                        <option value={24}>24 عرض</option>
                        <option value={48}>48 عرض</option>
                    </select>
                </div>
            </div>
            <div className="row">
                {paginatedProducts.length === 0 ? (
                    <p>لا يوجد منتجات</p>
                ) : (
                    paginatedProducts.map(product => (
                        <div className="col-md-4 mb-4" key={product.id}>
                            <ProductCard product={product} />
                        </div>
                    ))
                )}
            </div>
            {/* Pagination Controls */}
            {totalPages > 1 && (
                <nav className="d-flex justify-content-center mt-4">
                    <ul className="pagination">
                        <li className={`page-item${currentPage === 1 ? ' disabled' : ''}`}>
                            <button className="page-link" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>السابق</button>
                        </li>
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                            <li key={page} className={`page-item${currentPage === page ? ' active' : ''}`}>
                                <button className="page-link" onClick={() => handlePageChange(page)}>{page}</button>
                            </li>
                        ))}
                        <li className={`page-item${currentPage === totalPages ? ' disabled' : ''}`}>
                            <button className="page-link" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>التالي</button>
                        </li>
                    </ul>
                </nav>
            )}
        </div>
    </Layout>
    </>
  );
}
