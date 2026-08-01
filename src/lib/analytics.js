export function trackEvent(name, data = {}) {
  // no-op until a real analytics provider (GA4/etc.) is wired in
  if (typeof window !== 'undefined') {
    console.log('[event]', name, data);
  }
}
