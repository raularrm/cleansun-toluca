import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Nav } from './Nav';
import { Footer } from './Footer';
import { CookieConsent } from './CookieConsent';
import { PrivacyTab } from './PrivacyTab';
import { WhatsAppFloat } from './WhatsAppFloat';
import { initSmoothScroll } from '../lib/lenis';
import { PENDING_SECTION_KEY } from '../lib/constants';

export function Layout() {
  const location = useLocation();

  // One Lenis instance for the whole app lifetime (guarded against
  // React 19 StrictMode's dev-only double-invoke of effects).
  useEffect(() => {
    initSmoothScroll();
  }, []);

  // Scroll to top on every route change — except when we just navigated
  // home to finish a pending nav-anchor scroll (Home picks that up itself).
  useEffect(() => {
    if (location.pathname === '/' && sessionStorage.getItem(PENDING_SECTION_KEY)) return;
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-bg text-ink font-body overflow-x-hidden">
      <Nav />
      <main>
        <Outlet />
      </main>
      <Footer />
      {/* Persistent on every page: the "ceja" tab for privacy/cookies,
          and the one-time consent banner. */}
      <PrivacyTab />
      <WhatsAppFloat />
      <CookieConsent />
    </div>
  );
}
