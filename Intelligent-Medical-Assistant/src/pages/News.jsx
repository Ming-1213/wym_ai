import React, { useEffect, useState } from 'react';
import { getApiClient } from '../services/apiClient';
import styles from '../styles/News.module.css';
import Skeleton from '../components/Skeleton';

export default function News() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    fetchPage(page);
  }, [page]);

  const fetchPage = async (p) => {
    setLoading(true);
    try {
      const res = await getApiClient().get('/news', {
        params: { page: p, limit: pageSize }
      });
      // 假定后端分页返回 { articles: [...], total: n }
      setArticles((prev) =>
        p === 1 ? res.data.articles : [...prev, ...(res.data.articles || [])]
      );
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const loadMore = () => setPage((v) => v + 1);

  return (
    <div className={styles.page}>
      <h1>医药资讯</h1>
      {loading && page === 1 ? (
        <Skeleton count={5} />
      ) : (
        <div className={styles.grid}>
          {articles.map((a) => (
            <div key={a.id} className={styles.card}>
              <h3>{a.title}</h3>
              <p>{a.summary}</p>
            </div>
          ))}
        </div>
      )}
      <div className={styles.more}>
        <button onClick={loadMore} disabled={loading}>
          {loading ? '加载中...' : '加载更多'}
        </button>
      </div>
    </div>
  );
}
