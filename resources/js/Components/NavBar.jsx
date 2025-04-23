import React from 'react';
import { Link } from '@inertiajs/react';
import styles from '../NavBar.module.css';

export default function NavBar() {
  return (
    <nav className={styles.navbar + ' navbar-premium'}>
      <div className={styles.logoSection}>
        <img src="/logo-noon.svg" alt="noon logo" className={styles.logo} />
        <div className={styles.deliverTo}>
          <img src="/flags/eg.svg" alt="Egypt flag" className={styles.flag} />
          <span>Deliver to</span>
          <b>Cairo</b>
          <span className={styles.caret}>▼</span>
        </div>
      </div>
      <input
        className={styles.searchBar}
        type="text"
        placeholder="What are you looking for?"
      />
      <div className={styles.rightSection}>
        <Link href="/ar" className={styles.link}>العربية</Link>
        <span className={styles.separator}>|</span>
        <Link href="/login" className={styles.link}>Log in <i className="bi bi-person"></i></Link>
        <span className={styles.separator}>|</span>
        <Link href="/favorites" className={styles.iconBtn}><i className="bi bi-heart"></i></Link>
        <Link href="/cart" className={styles.iconBtn}><i className="bi bi-cart"></i></Link>
      </div>
    </nav>
  );
}
