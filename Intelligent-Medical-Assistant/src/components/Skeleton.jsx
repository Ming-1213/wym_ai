import React from 'react';
import styles from '../styles/Skeleton.module.css';

export default function Skeleton({ count = 1 }) {
  return (
    <div className={styles.wrapper}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className={styles.card}>
          <div className={styles.title} />
          <div className={styles.textLine} />
          <div className={styles.textLineShort} />
        </div>
      ))}
    </div>
  );
}
