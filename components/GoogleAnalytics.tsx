'use client'

import Script from 'next/script'

export default function GoogleAnalytics() {
  return (
    <>
      {/* Google Analytics (gtag.js) */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-31K0XJ79MR"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-31K0XJ79MR');
        `}
      </Script>

      {/* Google Tag Manager */}
      <Script id="google-tag-manager" strategy="afterInteractive">
        {`
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-T5ZM339M');
        `}
      </Script>
    </>
  )
}

// Google Tag Manager noscript fallback component
export function GoogleTagManagerNoScript() {
  return (
    <noscript>
      <iframe 
        src="https://www.googletagmanager.com/ns.html?id=GTM-T5ZM339M"
        height="0" 
        width="0" 
        style={{display:'none',visibility:'hidden'}}
      />
    </noscript>
  )
} 