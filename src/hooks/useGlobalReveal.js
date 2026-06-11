import { useEffect } from 'react';

export default function useGlobalReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    const observeElements = () => {
      const elements = document.querySelectorAll('.reveal:not(.is-visible):not(.observing)');
      elements.forEach((el) => {
        el.classList.add('observing');
        observer.observe(el);
      });
    };

    // Initial check
    observeElements();

    // Watch for DOM changes to automatically observe new elements (e.g. React route changes)
    const mutationObserver = new MutationObserver(() => {
      observeElements();
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, []);
}
