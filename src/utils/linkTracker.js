/**
 * Wraps external URLs with the /go tracking route
 * @param {string} url - The original URL
 * @param {string} source - Source identifier (e.g., PDF filename)
 * @returns {string} - Wrapped tracking URL or original URL if internal
 */
export function wrapWithTracking(url, source = 'blake-carter-complete-ats-prepress.pdf') {
  if (!url || (!url.startsWith('http') && !url.startsWith('mailto:'))) {
    return url;
  }

  const today = new Date().toISOString().split('T')[0];
  const encodedUrl = encodeURIComponent(url);
  const encodedFrom = encodeURIComponent(source);
  const encodedDate = encodeURIComponent(today);

  // Use production domain for PDF tracking URLs
  return `https://drksci.com/go?to=${encodedUrl}&from=${encodedFrom}&v=${encodedDate}`;
}