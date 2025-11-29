import React from 'react';
import styles from '../styles/WaterfallGrid.module.css';

export default function WaterfallGrid({ items = [] }) {
  return (
    <div className={styles.container}>
      {items.map((it) => (
        <div key={it.id} className={styles.item}>
          <div className={styles.title}>{it.title}</div>
          <p className={styles.summary}>{it.summary}</p>
        </div>
      ))}
    </div>
  );
}
