# Fermat Òptics · Website

Website for **Fermat Òptics**, an optical and hearing-care centre in Barcelona (since 1998) with two stores.

🔗 **Live demo:** https://fermat-optics.vercel.app

## ✨ Highlights
- **Zero frameworks, zero build step:** pure HTML + CSS, with only a few lines of JavaScript
- **Fast and lightweight:** AVIF images with lazy loading, self-hosted subset font, no analytics or cookies
- **Secure by default:** strict Content-Security-Policy, HSTS, X-Frame-Options and other security headers via `vercel.json`
- **SEO-ready:** structured data (JSON-LD), `sitemap.xml` and `robots.txt`
- **Accessible and responsive:** native mobile menu with `<details>` and smooth page transitions with View Transitions
- **Legal pages:** legal notice and privacy policy

## 🗂️ Structure
```
├── index.html, serveis.html, optica.html, audio.html, contacte.html
├── avis-legal.html, politica-privacitat.html
├── css/          Styles
├── js/           Minimal enhancements
├── fonts/        Bodoni Moda (Latin subset)
├── public/images Images (AVIF)
├── vercel.json   Security and cache headers
├── robots.txt
└── sitemap.xml
```

## 🚀 Deployment
Deployed on **Vercel** as a static site. No build step needed.
