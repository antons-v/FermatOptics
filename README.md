# Fermat Òptics

Lloc web del centre òptic i auditiu **Fermat Òptics** (Barcelona, des del 1998).
Dues botigues: Ausiàs Marc, 59 i Còrsega, 671.

## Tecnologia

HTML + CSS purs. **Sense frameworks, sense build, 0 JavaScript.**
Pensat per ser lleuger, ràpid i eficient energèticament.

- Fonts del sistema + Bodoni Moda (servida des del propi domini)
- Imatges en AVIF amb càrrega mandrosa (`loading="lazy"`)
- Menú mòbil natiu amb `<details>`, transicions amb `@view-transition`
- Sense analítica ni cookies

## Estructura

```
├── pages/          Pàgines HTML (index, serveis, optica, audio, contacte, legals)
├── css/style.css   Tot el disseny
├── fonts/          Bodoni Moda (subset llatí)
├── public/images/  Imatges (fermat/, logos/, serveis/)
├── robots.txt
└── sitemap.xml
```

## Pendent abans de publicar

- Connectar el formulari de contacte a **Formspree** (falta el correu de destinació)
- Completar les pàgines legals (avís legal i privacitat) amb les dades fiscals
- Confirmar els horaris de les dues botigues
- Substituir les fotos de prova per originals en alta resolució
