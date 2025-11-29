import React, { useEffect, useState, useCallback } from 'react';
import styles from '../styles/Home.module.css';
import Skeleton from '../components/Skeleton';
import WaterfallGrid from '../components/WaterfallGrid';
import { debounce } from '../utils/debounce';
import { getApiClient } from '../services/apiClient';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default function Home() {
  const [recommended, setRecommended] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filtered, setFiltered] = useState([]);
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    // 默认轮播图
    const defaultBanners = [
      { id: 'b1', imageUrl: '/images/banner1.jpg', title: '' },
      { id: 'b2', imageUrl: '/images/banner2.jpg', title: '' },
      { id: 'b3', imageUrl: '/images/banner3.jpg', title: '' },
    ];

    getApiClient()
      .get('/news')
      .then((res) => {
        let articles = res.data.articles || [];
        const apiBase = import.meta?.env?.VITE_API_BASE_URL || '';
        articles = articles.map((a) => {
          let imageUrl = a.image || a.imageUrl || '';
          if (!imageUrl) {
            imageUrl = '';
          } else if (!/^https?:\/\//.test(imageUrl)) {
            imageUrl = `${apiBase}${imageUrl}`;
          }
          return { ...a, imageUrl };
        });

        setRecommended(articles);
        setFiltered(articles);

        const articleSlice = articles.slice(0, 3).map((a, idx) => {
          const defaultBanner = defaultBanners[idx];
          const useDefaultImage = !a.imageUrl || a.imageUrl.trim() === '';

          const imageUrl = useDefaultImage ? defaultBanner.imageUrl : a.imageUrl;

          // 只有用接口图片才显示标题，默认图不显示标题
          const title = useDefaultImage ? '' : (a.title || '');

          return {
            id: a.id || `a${idx}`,
            imageUrl,
            title,
          };
        });

        const useBanners = articleSlice.length > 0 ? articleSlice : defaultBanners;
        setBanners(useBanners);
      })
      .catch(() => {
        setBanners(defaultBanners);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleSearch = useCallback(
    debounce((val) => {
      if (!val) {
        setFiltered(recommended);
      } else {
        setFiltered(
          recommended.filter((a) =>
            (a.title || '').toLowerCase().includes(val.toLowerCase())
          )
        );
      }
    }, 300),
    [recommended]
  );

  const onChange = (e) => {
    setSearch(e.target.value);
    handleSearch(e.target.value);
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1>智能医药助手</h1>
        <input
          placeholder="搜索资讯..."
          value={search}
          onChange={onChange}
          className={styles.search}
        />
      </header>

      {/* 轮播图板块 */}
      {!loading && banners.length > 0 && (
        <section className={styles.section}>
          <Slider {...sliderSettings}>
            {banners.map((item, idx) => (
              <div key={item.id || idx} className={styles.bannerSlide}>
                <img
                  src={item.imageUrl}
                  alt={item.title || `banner-${idx}`}
                  className={styles.bannerImage}
                />
                {item.title && <h3 className={styles.bannerTitle}>{item.title}</h3>}
              </div>
            ))}
          </Slider>
        </section>
      )}

      <section className={styles.section}>
        <h2>推荐资讯</h2>
        {loading ? (
          <Skeleton count={3} />
        ) : (
          <div className={styles.recommendList}>
            {filtered.slice(0, 4).map((item, index) => (
              <div key={item.id || index} className={styles.card}>
                <h3>{item.title}</h3>
                <p>{item.summary}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className={styles.section}>
        <h2>更多内容</h2>
        {loading ? (
          <Skeleton count={6} />
        ) : (
          <WaterfallGrid items={recommended} />
        )}
      </section>
    </div>
  );
}
