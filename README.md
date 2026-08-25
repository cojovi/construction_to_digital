# Construction to Digital

Premium marketing site for [constructiontodigital.com](https://constructiontodigital.com), built with Next.js 16, React 19, TypeScript, Tailwind CSS v4, and Motion.

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Quality gates

```bash
npm run check
```

This runs ESLint, TypeScript, and the production build.

## Production

```bash
npm run build
npm start
```

The application is compatible with standard Next.js hosts such as Vercel and with self-hosted Node deployments.

## Optional search and marketing configuration

Copy `.env.example` to `.env.local` and add only the services you use:

- `NEXT_PUBLIC_GOOGLE_TAG_ID`: GA4 (`G-...`) or Google Ads (`AW-...`) tag ID
- `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`: Google Search Console verification value
- `NEXT_PUBLIC_BING_SITE_VERIFICATION`: Bing Webmaster Tools verification value

No analytics scripts are emitted when the Google tag ID is unset.

## Content architecture

- `src/lib/solutions.ts`: the shared typed source for product content, metadata, dynamic pages, and sitemap routes
- `src/lib/site.ts`: canonical domain, navigation, contact route, and brand settings
- `src/app/page.tsx`: homepage
- `src/app/solutions/[slug]/page.tsx`: statically generated product landing pages
- `src/app/robots.ts`, `sitemap.ts`, `manifest.ts`: technical SEO and platform metadata
- `src/components/marketing-analytics.tsx`: optional analytics and advertising tag loader
- `design-system/construction-to-digital/MASTER.md`: visual and content rules

## Current solution routes

- `/solutions/drafting-table`
- `/solutions/material-intelligence`
- `/solutions/bolt-agent`
- `/solutions/billing-agent`

Add future products to `src/lib/solutions.ts`; the homepage portfolio, product route generation, related links, structured content, and sitemap derive from that shared data.
