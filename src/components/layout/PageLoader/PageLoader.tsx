"use client";

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

export default function PageLoader() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    NProgress.configure({ showSpinner: false });

    const handleStart = () => NProgress.start();
    const handleStop = () => NProgress.done();

    // The `useEffect` hook with `pathname` and `searchParams` will trigger `NProgress.done()`
    // when the navigation is complete.
    handleStop();

    // This is a workaround to trigger the loading bar on navigation.
    // We can't directly access `routeChangeStart` in the App Router.
    // Instead, we simulate it by starting the progress on link clicks.
    const handleLinkClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const anchor = target.closest('a');
      if (anchor) {
        const href = anchor.getAttribute('href');
        // Start progress only for internal navigation, not for links opening in a new tab.
        if (href && href.startsWith('/') && anchor.target !== '_blank') {
          handleStart();
        }
      }
    };

    document.addEventListener('click', handleLinkClick);

    return () => {
      document.removeEventListener('click', handleLinkClick);
      handleStop(); // Ensure progress is stopped on cleanup
    };
  }, [pathname, searchParams]);

  return null; // This component does not render anything itself
}
