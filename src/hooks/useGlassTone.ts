import { useEffect, useRef, useState } from 'react';

/** Samples the surface behind a floating control without reading layout on scroll. */
export default function useGlassTone<T extends HTMLElement>(sticky = false) {
  const ref = useRef<T>(null);
  const [tone, setTone] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const enabled = window.matchMedia('(min-width: 0px)');
    let observer: IntersectionObserver | undefined;

    const observe = () => {
      observer?.disconnect();
      setTone('light');
      const control = ref.current;
      if (!control || !enabled.matches) return;

      const rect = control.getBoundingClientRect();
      const header = sticky ? control.closest('header') : null;
      const x = Math.min(innerWidth - 1, Math.max(0, rect.left + rect.width / 2));
      // Use the header's pinned position; its initial position includes the top bar.
      const y = Math.min(innerHeight - 1, Math.max(0,
        rect.top + rect.height / 2 - (header?.getBoundingClientRect().top ?? 0)));
      const intersecting = new Set<Element>();
      observer = new IntersectionObserver(entries => {
        for (const entry of entries) {
          if (entry.isIntersecting) intersecting.add(entry.target);
          else intersecting.delete(entry.target);
        }
        setTone(intersecting.size ? 'dark' : 'light');
      }, {
        rootMargin: `-${y}px -${innerWidth - x - 1}px -${innerHeight - y - 1}px -${x}px`,
        threshold: 0,
      });
      document.querySelectorAll('.about, .expertise-strip, .service-featured, .cost-salary')
        .forEach(section => observer!.observe(section));
    };

    observe();
    enabled.addEventListener('change', observe);
    window.addEventListener('resize', observe);
    return () => {
      observer?.disconnect();
      enabled.removeEventListener('change', observe);
      window.removeEventListener('resize', observe);
    };
  }, [sticky]);

  return { ref, tone };
}
