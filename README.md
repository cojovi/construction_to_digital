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

This runs ESLint, TypeScript, 31 HTTP-negotiation unit tests, the production build,
and the public-endpoint integration suite. The tests use Node's built-in runner;
use Node 22.18+ for native TypeScript stripping in the unit suite.

`npm test` runs the fast unit suite. `npm run test:http` starts an isolated local
production server using the existing build, verifies it, and shuts it down.

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

## Public information and agent access

- `/about`, `/contact`, `/privacy`, `/agents`: statically rendered information pages,
  with shared HTML/Markdown copy in `src/lib/information-pages.ts`.
- `/llms.txt`: generated content index following the [llms.txt format](https://llmstxt.org/).
- `Accept: text/markdown` on any public page: Markdown from the same product sources,
  with quality-value and media-range handling via `negotiator`.
- `/index.md` and page siblings such as `/solutions/bolt-agent.md`: explicit
  Markdown URLs that also work without a special Accept header.
- Nonexistent documents: real 404 status; Markdown requests get a short recovery
  document with index, sitemap, and contact links. Unsupported document formats
  return 406. Explicit Markdown endpoints allow only GET and HEAD.

`src/proxy.ts` negotiates documents before the Next.js page cache. It preserves
Next.js Flight requests, static assets, metadata files, and non-document methods.
Both document variants advertise `Vary: Accept` while retaining Next's RSC cache
tokens. Negotiated Markdown and error responses use `private, no-store` plus
CDN-specific no-store headers; they cannot populate the HTML cache. Normal HTML
keeps the framework's caching. There is no user-agent sniffing, scraping service,
public product API, MCP endpoint, or customer-data access added by this feature.

Next 16.3.4 replaces `Vary` in its App Page response entrypoint, discarding values
set in Proxy and `next.config.ts`. `scripts/patch-next-vary.mjs` is a narrowly
version-checked postinstall compatibility fix: it changes that assignment to an
append in both distributed entrypoint templates. It preserves the framework's
RSC values and our Accept values. Installs fail on an unexpected framework
version or patch target so upgrades cannot silently reintroduce mixed caches.
Reassess/remove this patch when Next preserves existing Vary values upstream.
The HTTP suite verifies the actual emitted headers. `skipProxyUrlNormalize`
keeps Flight headers visible to Proxy so client navigation bypasses negotiation.

Protocol references: [Accept and quality values](https://www.rfc-editor.org/rfc/rfc9110.html#name-accept),
[Markdown negotiation](https://acceptmarkdown.com/), and
[Vercel cache headers](https://vercel.com/docs/caching/cache-control-headers).

### Deployment verification

After deploying this branch, run the same endpoint suite against the deployment:

```bash
C2D_TEST_URL=https://www.constructiontodigital.com npm run test:http
curl -i -H 'Accept: text/markdown' https://www.constructiontodigital.com/
curl -i -H 'Accept: text/markdown' https://www.constructiontodigital.com/audit-missing-page
```

The remote suite uses GET/HEAD only. It verifies all nine public pages and their
Markdown counterparts, status codes, Vary headers, alternating representations,
Flight navigation, trust-page content, JSON-LD, the sitemap, robots.txt, manifest,
llms.txt links, and referenced static assets. Re-run the Is Agentic audit only
after production is serving the new deployment; a local test does not establish
a new live readiness score.

### Business details to maintain

Organization contact and location use the existing public email and Fort Worth,
Texas location. No telephone, street address, postal code, or registration details
are invented. Add these only if the business chooses to publish verified values.
The privacy notice documents observable website behavior, not a certification of
legal compliance. The owner should confirm actual provider retention settings and
analytics/consent requirements before enabling advertising or adding data collection.
The production host currently redirects the apex domain to `www`; canonical URLs
retain the existing apex configuration and follow that redirect.
