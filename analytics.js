/**
 * Analytics bootstrap. Reads IDs from analytics-config.js (loaded first)
 * and loads each provider's script only if its ID is set. This file
 * defines window.gtag, which script.js's track() already calls for
 * every [data-track] click (cv_download, cv_preview, project_demo_click,
 * github_click, linkedin_click) — no changes needed there.
 */
(function () {
  // Google Analytics 4 — session duration, engagement, the events above.
  if (window.GA_MEASUREMENT_ID) {
    var gaScript = document.createElement('script');
    gaScript.async = true;
    gaScript.src = 'https://www.googletagmanager.com/gtag/js?id=' + window.GA_MEASUREMENT_ID;
    document.head.appendChild(gaScript);

    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', window.GA_MEASUREMENT_ID);
  }

  // Cloudflare Web Analytics — cookieless pageviews, visitors, referrers.
  if (window.CLOUDFLARE_BEACON_TOKEN) {
    var cfScript = document.createElement('script');
    cfScript.defer = true;
    cfScript.src = 'https://static.cloudflareinsights.com/beacon.min.js';
    cfScript.setAttribute('data-cf-beacon', JSON.stringify({ token: window.CLOUDFLARE_BEACON_TOKEN }));
    document.head.appendChild(cfScript);
  }
})();
