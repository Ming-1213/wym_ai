export function initRem(base = 375) {
    const setRem = () => {
      const width = document.documentElement.clientWidth;
      const ratio = width / base;
      document.documentElement.style.fontSize = 16 * Math.min(ratio, 2) + 'px';
    };
    window.addEventListener('resize', setRem);
    setRem();
  }
  