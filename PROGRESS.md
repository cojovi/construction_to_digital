# Construction to Digital — Project Progress and Handoff

**Project:** Construction to Digital marketing website  
**Canonical domain:** `https://constructiontodigital.com`  
**Workspace:** `/Volumes/FastSSD/github/my repos/construction_to_digital`  
**Progress snapshot:** 2026-08-24 22:27 CDT  
**Current phase status:** Initial design, implementation, technical SEO, security hardening, and local production verification are complete.  
**Runtime status at handoff:** All task-related local servers and background development processes are stopped. Ports `3000` and `3100` have no listeners. The in-app preview was closed.

---

## 1. Executive Summary

A blank Create Next App project was turned into a complete, production-buildable marketing site for Construction to Digital. The site positions the company at the intersection of construction operations, workflow software, and applied AI. It is designed to market four initial products while preserving a technical foundation that can support additional products, lead capture, authenticated experiences, workflow demos, and future customer-facing tools.

The completed initial scope includes:

- A distinctive dark construction-technology visual system based on architectural drafting, cyan blueprint geometry, and new-home construction imagery.
- A conversion-focused homepage with an asymmetric hero, product storytelling, an interactive product explorer, implementation messaging, human-approval safeguards, and repeated demo calls to action.
- Four statically generated, indexable solution pages.
- Typed shared product content so routes, navigation, metadata, related links, schema, and sitemap entries derive from one source of truth.
- Responsive layouts tested from small mobile widths through large desktop widths.
- Keyboard-operable navigation and solution tabs, visible focus treatments, semantic landmarks, reduced-motion behavior, and accessibility-oriented content structure.
- Complete baseline technical SEO: canonical URLs, product-specific metadata, Open Graph and Twitter images, structured data, robots, sitemap, app manifest, and search verification hooks.
- Advertising and analytics readiness through an optional Google tag integration and `generate_lead` CTA events.
- Production security headers, including CSP and HSTS.
- A custom 404 experience with an unambiguous `noindex` response and no incorrect homepage canonical.
- A verified Next.js production build and zero reported npm vulnerabilities.

No deployment, DNS change, Git initialization, commit, push, production analytics setup, or production lead-form integration has been performed yet.

---

## 2. Original Product and Brand Direction

The site was created for the newly reserved `constructiontodigital.com` domain. Its purpose is to separate construction-industry products from the owner’s personal website and give the construction portfolio a focused commercial home.

The central positioning is:

> **Physical work. Digital leverage.**

The homepage’s supporting promise is intentionally concrete:

> Query billing and work orders, normalize supplier pricing, and move plans toward review-ready takeoffs with human approval where it matters.

The brand presentation was built around the official supplied logo:

- Original logo source: `logo_ideas/constructiontodigital_final.png`
- Production brand assets:
  - `public/brand/construction-to-digital-logo.png`
  - `public/brand/construction-to-digital-mark.png`
  - `public/brand/construction-to-digital-wordmark.png`

The header uses the official standalone mark alongside a clean text lockup because the complete logo becomes visually dense at navigation size. The detailed full logo remains available for larger applications. The footer also uses the official mark.

### Design read

This was treated as a premium B2B construction-technology marketing site for contractor owners, operations leaders, estimators, finance teams, and technology-forward construction organizations. The visual language is dark, precise, architectural, technical, and advanced without drifting into generic purple “AI SaaS” styling.

### Primary visual decisions

- Near-black architectural background: `#03080d`
- Blueprint and raised surfaces: deep blue-black values
- One primary accent: precise cyan
- Geist for primary typography and Geist Mono for technical labels/data
- Asymmetric layouts rather than generic centered sections
- Real construction subject matter rather than robots, abstract AI brains, or generic chat bubbles
- Controlled grid lines, drafting geometry, measurement readouts, and system-flow motifs
- Rounded construction media frames and pill-shaped action controls under a consistent radius system
- Motion focused on reveals and state transitions rather than constant spectacle
- No invented performance metrics, customer counts, percentages, savings claims, or testimonials

Primary design references remain in:

- `design_detail/DESIGN.md`
- `design_detail/theme.css`
- `design_detail/variables.css`
- `design_detail/tokens.json`
- `design-system/construction-to-digital/MASTER.md`

---

## 3. Technology Stack

The final implementation uses:

| Layer | Technology |
|---|---|
| Application framework | Next.js `16.3.2` App Router |
| UI runtime | React `19.2.8` |
| Language | TypeScript `5.x` |
| Styling | Tailwind CSS v4 plus a substantial custom global design layer |
| Motion | Motion `13.1.1` via `motion/react` |
| Icons | Phosphor Icons, including SSR-safe imports where appropriate |
| Validation dependency available | Zod `4.4.3` |
| Images | Next Image with local AVIF/WebP optimization support |
| Metadata | Next.js Metadata and MetadataRoute APIs |
| Structured data | Server-rendered JSON-LD |
| Linting | ESLint 9 with Next.js configuration |

Current package scripts:

```text
npm run dev        # Next.js development server
npm run build      # Production build
npm start          # Production server after build
npm run lint       # ESLint
npm run typecheck  # TypeScript without emit
npm run check      # lint + typecheck + production build
```

### Architectural approach

- Search-critical and product content renders in React Server Components.
- Client-side JavaScript is isolated to components that actually need it:
  - responsive navigation state
  - Motion reveals
  - interactive product selection
  - optional marketing analytics
- Product data is centralized and typed rather than copied between the homepage, solution pages, sitemap, and schema.
- All four product routes are statically generated at build time.
- No database or external CMS is required for the current site.

---

## 4. Current Route Architecture

### Public pages

| Route | Purpose | Rendering |
|---|---|---|
| `/` | Primary marketing homepage | Static |
| `/solutions/drafting-table` | Drafting Table product landing page | Static generation |
| `/solutions/material-intelligence` | Material Intelligence landing page | Static generation |
| `/solutions/bolt-agent` | BoltAgent landing page | Static generation |
| `/solutions/billing-agent` | BillingAgent landing page | Static generation |
| `/_not-found` | Custom not-found output used by Next | Static |

### Search and platform routes

| Route | Purpose |
|---|---|
| `/robots.txt` | Crawl policy and sitemap location |
| `/sitemap.xml` | Canonical page and image sitemap |
| `/manifest.webmanifest` | Application identity and install metadata |
| `/opengraph-image.jpg` | 1200×630 Open Graph preview |
| `/twitter-image.jpg` | 1200×630 Twitter/X preview |
| `/icon.png` | 512×512 application icon |
| `/apple-icon.png` | 180×180 Apple touch icon |
| `/favicon.ico` | Multi-size browser favicon |

### Unknown routes

Unknown paths return HTTP `404` and emit only `noindex`. They do not inherit the homepage canonical. This was explicitly verified after the final metadata hardening pass.

---

## 5. Homepage Work Completed

The homepage is implemented in `src/app/page.tsx` with its layout system in `src/app/globals.css`.

### 5.1 Header and navigation

Implemented in `src/components/site-header.tsx`.

Completed behavior:

- Sticky navigation with translucent architectural surface treatment.
- Official brand mark and readable Construction to Digital text identity.
- Desktop navigation for Solutions, How it works, Build process, and About.
- Repeated “Request a demo” primary CTA.
- Mobile menu with semantic button state, `aria-expanded`, `aria-controls`, and inert hidden navigation.
- No hidden focusable links when the mobile menu is closed.
- Minimum touch-target sizing and visible keyboard focus.

### 5.2 Hero

The final hero headline is:

> **Physical work.**  
> **Digital leverage.**

Desktop behavior:

- Exactly two intentional headline lines.
- Asymmetric text and media composition.
- Primary and secondary CTAs visible inside the initial viewport.
- New-home construction image occupies the stronger right side of the composition.
- Blueprint linework and system readouts align with construction subject matter.

Mobile behavior:

- Copy and actions appear before the image.
- Primary and secondary actions become full-width controls.
- Essential text is never overlaid on the photograph.
- The image is art-directed to retain the house and cyan roof treatment.
- No horizontal page overflow.

Hero visual implementation: `src/components/blueprint-visual.tsx`.

### 5.3 Workflow rail

A visual operating path connects:

1. Plans
2. Quantities
3. Pricing
4. Jobs
5. Billing

This gives immediate context for how the four products fit into one broader construction operating flow.

### 5.4 Operational friction section

The homepage identifies four real handoff problems:

- Plans becoming a measuring queue.
- Supplier data arriving in incompatible formats.
- Job truth being trapped behind software filters.
- Billing context crossing too many systems.

The copy avoids generic “digital transformation” language and stays focused on recognizable construction-office work.

### 5.5 Drafting Table flagship section

The Drafting Table receives the first major product feature treatment.

Current public positioning is deliberately conservative and grounded:

- Status: assisted pilot.
- Focus: residential gutter takeoffs from digital blueprint files.
- Scale checks require manual verification.
- Ambiguous results are held for review.
- Structured spreadsheet, CSV, and JSON output is emphasized.
- The site does not claim complete autonomous roofing takeoff coverage.

### 5.6 Interactive four-product explorer

Implemented in `src/components/solution-explorer.tsx`.

Completed interaction behavior:

- Four substantial product selectors rather than four generic equal cards.
- Shared product visual stage that changes with selection.
- `role="tablist"`, `role="tab"`, and `role="tabpanel"` semantics.
- `aria-selected`, `aria-controls`, and stable IDs.
- Mouse/touch selection.
- Arrow-key navigation.
- Home/End key navigation.
- Focus follows keyboard selection.
- State transitions use Motion and honor reduced-motion settings.

### 5.7 Material Intelligence section

Features supplier-file normalization, historical pricing, review, and downstream exports. It uses a separate visual composition so it does not repeat the Drafting Table layout.

Public claims were tightened to match documentation:

- Supplier CSV/file ingestion rather than direct real-time supplier database access.
- NetSuite-ready output rather than claiming an already completed live synchronization.
- No invented real-time alert or margin-improvement metrics.

### 5.8 Human-approval section

The site explicitly communicates that consequential work remains controlled by people. The visual sequence emphasizes:

- Query
- Verify
- Prepare
- Approve

This is especially important for financial actions, work-order changes, material decisions, and low-confidence plan measurements.

### 5.9 Integration architecture

The architecture section shows how digital products can connect existing construction systems rather than replacing every source of truth. It supports the site’s “focused system at the handoff” positioning.

### 5.10 Implementation process

The build process communicates four operational stages:

- Map the real workflow.
- Connect the source of truth.
- Build the review gate.
- Ship, observe, and improve.

### 5.11 Final CTA and footer

The final call to action asks prospects to bring:

- the current process
- the systems it touches
- the handoff that repeatedly breaks

The footer provides product links, site navigation, company positioning, location context, and a return-to-top link.

---

## 6. Product Data and Solution Pages

The shared product source of truth is `src/lib/solutions.ts`.

Each product record includes:

- slug
- product name and short name
- category
- current status
- icon identity
- eyebrow and headline
- summary and detailed explanation
- proof statement
- optional image and accessible image description
- capabilities
- workflow sequence
- integrations
- safeguards
- SEO title
- SEO description

`src/app/solutions/[slug]/page.tsx` uses this data to generate every solution page, its metadata, JSON-LD, related-product links, and static route parameters.

### 6.1 The Drafting Table

**Route:** `/solutions/drafting-table`  
**Current status:** Assisted pilot  
**Primary public scope:** Reviewable residential gutter takeoffs from digital blueprint files.

Important truth boundaries:

- Scale verification is a review step, not an assumed automatic success.
- Ambiguous results must stop for human review.
- Public copy does not promise fully autonomous takeoffs.
- Public copy does not promise full roofing-scope extraction.
- Public copy does not promise unverified email, folder-watch, or one-click production integrations.

### 6.2 Construction Material Intelligence

**Route:** `/solutions/material-intelligence`  
**Current status:** Active product  
**Primary public scope:** Normalize supplier price files, preserve dated history, compare changes, and prepare clean estimating/ERP data.

Important truth boundaries:

- Freshness depends on imported supplier files.
- No claim of live distributor database access.
- NetSuite language is “NetSuite-ready,” not a completed live synchronization claim.
- No invented margin savings or price-alert metrics.

### 6.3 BoltAgent

**Route:** `/solutions/bolt-agent`  
**Current status:** Deployed workflow  
**Primary public scope:** Conversational access to live ECi Bolt work orders, stages, crew assignments, scheduling gaps, and follow-up context.

Safeguards:

- Job data is pulled live rather than assumed.
- Missing records are reported clearly.
- Rescheduling and work-order closure remain human-confirmed.

### 6.4 BillingAgent

**Route:** `/solutions/billing-agent`  
**Current status:** Deployed workflow  
**Primary public scope:** Invoice status, vendor-bill review, AR aging, payment checks, and reconciliation support.

Safeguards:

- Financial answers come from source-system context.
- Amounts, dates, names, and account context are preserved.
- No payment, approval, or external message occurs without confirmation.
- No claim of universal billing/ERP compatibility.

---

## 7. Reusable Components Created

| File | Responsibility |
|---|---|
| `src/components/site-header.tsx` | Desktop/mobile navigation and brand lockup |
| `src/components/site-footer.tsx` | Footer positioning, links, CTA, and identity |
| `src/components/reveal.tsx` | Isolated Motion reveal behavior with reduced-motion fallback |
| `src/components/blueprint-visual.tsx` | Construction hero media and blueprint/system overlays |
| `src/components/solution-explorer.tsx` | Interactive and keyboard-accessible product selector |
| `src/components/solution-icon.tsx` | Centralized Phosphor product icon mapping |
| `src/components/json-ld.tsx` | Safe JSON-LD output with `<` escaped against script termination |
| `src/components/marketing-analytics.tsx` | Conditional Google tag loading and delegated conversion event tracking |

The client components are intentionally limited. Static marketing copy, metadata, JSON-LD, and product page content remain server rendered.

---

## 8. SEO and Discoverability Completed

### 8.1 Global metadata

`src/app/layout.tsx` defines:

- `metadataBase` for `https://constructiontodigital.com`
- application name
- title template
- global description
- construction-specific keyword set
- author, creator, and publisher identity
- category
- Open Graph site identity
- Twitter/X summary-card defaults
- referrer behavior
- disabled automatic email/address/phone detection
- optional Google and Bing verification values

Index/follow directives and canonicals are set at page level so the 404 page does not inherit homepage indexing metadata.

### 8.2 Solution metadata

Every solution route has:

- unique SEO title
- unique description
- canonical URL
- index/follow directives
- Google image/snippet/video preview directives
- Open Graph title and description
- explicit Open Graph image
- Twitter/X large-card title and description
- explicit Twitter/X image

A previous review caught that route-level Open Graph objects were dropping inherited images. This was fixed and then verified by reading each rendered product page.

### 8.3 Structured data

The site emits server-rendered JSON-LD for:

- Organization
- WebSite
- ItemList
- Service
- BusinessAudience
- BreadcrumbList
- ListItem

Stable organization and website IDs are used so product data can reference the shared provider entity.

No fabricated `Offer`, `Review`, `AggregateRating`, customer count, or pricing data was added.

### 8.4 Sitemap

`src/app/sitemap.ts` currently emits:

- homepage
- all four solution pages
- relevant image sitemap entries
- monthly change-frequency guidance
- homepage and product priorities

The sitemap intentionally does **not** assign a new artificial `lastModified` date on every build. Stable content dates should be added later if a CMS or source-controlled content timestamp is introduced.

### 8.5 Robots

`src/app/robots.ts`:

- allows crawling of the production site
- declares the canonical host
- points crawlers to the sitemap

### 8.6 Social images and icons

Generated platform assets include:

- `src/app/opengraph-image.jpg` — approximately 140 KB
- `src/app/twitter-image.jpg` — approximately 140 KB
- `src/app/icon.png` — 512×512, approximately 164 KB
- `src/app/apple-icon.png` — 180×180, approximately 32 KB
- `src/app/favicon.ico`
- `public/icon-maskable.png` — 512×512, approximately 96 KB
- Open Graph and Twitter alt-text sidecars

The social card uses the official brand mark, construction imagery, blueprint geometry, and the “Physical Work. Digital Leverage.” message.

---

## 9. Marketing and Advertising Readiness

### Current optional environment variables

Defined in `.env.example`:

```text
NEXT_PUBLIC_GOOGLE_TAG_ID=
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=
NEXT_PUBLIC_BING_SITE_VERIFICATION=
```

### Current analytics behavior

`src/components/marketing-analytics.tsx`:

- loads no Google scripts when `NEXT_PUBLIC_GOOGLE_TAG_ID` is unset
- supports a GA4 `G-...` identifier or Google Ads `AW-...` identifier
- loads the Google tag after the page becomes interactive
- uses JSON serialization for the configured tag value
- captures CTA clicks through delegated `data-analytics-*` attributes
- emits `generate_lead` for demo-request actions
- includes CTA location in `event_label`
- includes the product slug on solution-page CTA events

Tracked CTA locations currently include:

- header
- mobile navigation
- homepage hero
- homepage final CTA
- footer
- solution hero
- solution final CTA

### Current lead route

Demo requests currently use a prefilled mail link configured in `src/lib/site.ts`:

- destination: `jarvisstone@agentmail.to`
- subject: Construction to Digital demo request
- prompts for company, current tools, workflow to improve, and preferred contact method

This is functional as a lightweight launch path, but it is not yet a true backend lead pipeline.

---

## 10. Security Hardening Completed

`next.config.ts` applies the following production protections:

### Content Security Policy

Current CSP limits:

- default resources to the same origin
- base URLs to the same origin
- forms to same-origin or `mailto:` actions
- frames through `frame-ancestors 'none'`
- plugins/embedded objects through `object-src 'none'`
- scripts to same-origin plus Google Tag Manager
- styles to same-origin with the inline allowance required by the current Next rendering approach
- images to same-origin/data/blob plus Google analytics/tag domains
- fonts to same-origin/data
- outbound connections to same-origin plus Google analytics/tag domains
- manifests to same-origin
- workers to same-origin/blob
- insecure resource requests are upgraded

Development mode adds `unsafe-eval` only where the Next development toolchain may require it. Production does not.

### Additional headers

- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `Referrer-Policy: strict-origin-when-cross-origin`
- restrictive camera/geolocation/microphone `Permissions-Policy`
- production `Strict-Transport-Security: max-age=31536000`
- Next’s `X-Powered-By` header is disabled

The CSP was tested against the production server. Hydration, Motion reveals, responsive images, and product-tab interaction continued to work.

### Important future security rule

Any future analytics provider, CRM, scheduling embed, video host, CMS image domain, customer portal, form endpoint, captcha provider, or payment service must be explicitly added to CSP. Do not weaken the policy globally to make a new integration work.

---

## 11. Accessibility and Interaction Work Completed

Completed accessibility features include:

- one H1 per public page
- sequential H1/H2/H3 heading structure
- one semantic `<main>` landmark
- labeled navigation landmarks
- breadcrumb navigation on solution pages
- skip link to main content
- descriptive alt text for meaningful images
- empty alt text only for decorative/redundant logo imagery
- visible keyboard focus styles
- 44px or larger key touch targets
- keyboard-operable mobile menu
- keyboard-operable product tabs
- no duplicate element IDs in tested pages
- no unnamed links or buttons in tested pages
- no focusable controls left active inside hidden mobile navigation
- non-color selected state through text and ARIA
- reduced-motion handling for Motion components and CSS animation overrides
- decorative pulse and orbit animations changed from infinite loops to finite runs
- reserved image dimensions to reduce layout shift
- no horizontal overflow at tested viewport widths

Color contrast checks on core palette pairs met WCAG AA. Key checks ranged from approximately 4.88:1 for quiet text on raised surfaces to more than 10:1 for primary text/accent combinations.

---

## 12. Image and Brand Assets

### Production concept images

- `public/images/hero-construction-digital.jpg` — approximately 136 KB
- `public/images/roofing-takeoff.jpg` — approximately 152 KB
- `public/images/material-intelligence.jpg` — approximately 196 KB

These were visually reviewed rather than inferred from filenames. Each image was selected/art-directed for its section and supplied with explicit dimensions and responsive `sizes` behavior.

### Brand assets

- full logo: approximately 1.2 MB
- standalone mark: approximately 724 KB
- prepared wordmark: approximately 260 KB

The mark is the principal in-page asset because it scales more clearly in the navigation. Next Image optimization handles delivered formats and responsive sizes.

### Unused starter assets

The following Create Next App assets remain in `public/` but are not used by the current site:

- `file.svg`
- `globe.svg`
- `next.svg`
- `vercel.svg`
- `window.svg`

They can be safely removed in a later cleanup pass after confirming no new section references them.

---

## 13. Verification Evidence

### 13.1 Final quality command

The final command completed successfully:

```text
npm run check
```

This ran:

1. ESLint
2. TypeScript without emit
3. Next.js production build

### 13.2 Production build result

Next.js successfully generated:

- homepage
- custom not-found output
- Apple icon
- application icon
- web manifest
- Open Graph image
- robots file
- sitemap
- all four statically generated solution routes
- Twitter/X image

### 13.3 Dependency audit

```text
npm audit --audit-level=high
```

Result:

```text
found 0 vulnerabilities
```

### 13.4 Runtime HTTP verification completed before shutdown

Verified results included:

- homepage: HTTP 200
- each solution page: HTTP 200
- robots: HTTP 200
- sitemap: HTTP 200
- manifest: HTTP 200
- Open Graph image: HTTP 200
- icon: HTTP 200
- unknown path: HTTP 404
- `X-Powered-By` absent
- security headers present
- homepage canonical correct
- solution canonicals correct
- unknown-route canonical absent
- unknown route emits only `noindex`
- product `og:image` present
- product `twitter:image` present
- sitemap contains no artificial build-time `lastmod` values

### 13.5 Link and asset crawl

All internal page links and referenced images across the homepage and solution pages were fetched. No broken internal targets were found.

### 13.6 Responsive visual verification

Homepage and Drafting Table route were checked at:

- 320 px
- 360 px
- 390 px
- 768 px
- 1024 px
- 1440 px

No positive horizontal overflow was found.

The final desktop hero was visually confirmed with:

- two headline lines
- both CTAs above the fold
- completed hero image load
- visible Motion content
- five workflow stages

The final mobile hero was confirmed with:

- no horizontal overflow
- visible primary and secondary CTAs
- content-first ordering
- construction media entering the initial viewport

### 13.7 Interaction verification

Verified with real browser input:

- mobile navigation opens and reports correct `aria-expanded` state
- product tab selection updates the active panel
- keyboard ArrowDown navigation moves selection and focus
- product heading and panel ID update after animated transition
- reduced-motion preference returns static reveal content

### 13.8 Independent review

An independent code/security reviewer found:

- no security concerns
- no broken internal navigation
- valid JSON-LD
- correct Next.js build behavior
- no hardcoded secrets
- zero npm vulnerabilities

Its only blocking finding was missing product-page social images caused by route metadata replacement. That issue was fixed and verified afterward.

Its non-blocking recommendations were also addressed:

- added CSP and HSTS
- removed ambiguous 404 canonical/robots inheritance
- removed artificial sitemap modification dates
- changed infinite decorative animations to finite runs

---

## 14. Current Runtime and Process State

At this handoff:

- the Next production preview on port `3100` has been stopped
- a stale Node/Next listener on port `3000` has been stopped
- no listener remains on port `3000`
- no listener remains on port `3100`
- no `next dev`, `next start`, `npm start`, or `npm run dev` process associated with the work remains active
- the in-app localhost preview tab has been closed

System services unrelated to this project were not terminated.

To start work again:

```bash
npm run dev
```

Then open:

```text
http://localhost:3000
```

For a production-mode verification:

```bash
npm run build
npm start
```

---

## 15. Important Limitations and Intentional Non-Work

### 15.1 No Git repository

This directory was not a Git repository during implementation. Therefore:

- no branch exists for this work
- no commit was created
- no push occurred
- there is no diff history or rollback point beyond local files/backups

Initializing Git should be the first infrastructure action before substantial future changes.

### 15.2 No deployment

The site is production-buildable but has not been deployed to Vercel or another host. The following are still pending:

- hosting project creation
- production environment variables
- custom-domain attachment
- DNS records
- apex/www canonical redirect configuration
- production TLS verification
- post-deploy smoke tests

### 15.3 No backend lead form

The current CTA uses a mail link. There is no:

- server action or API route for leads
- database
- CRM write
- webhook delivery
- spam protection
- captcha
- validation/error UI
- lead persistence
- appointment booking integration

### 15.4 Analytics is not configured

The analytics code exists, but `.env.example` values are empty. No analytics scripts are emitted until a tag ID is supplied.

### 15.5 Search tools are not configured

Google Search Console and Bing Webmaster verification placeholders exist but are unset. The sitemap has not been submitted anywhere.

### 15.6 No legal/consent layer

There is currently no privacy policy, terms page, cookie disclosure, or consent manager. If production analytics, remarketing, embedded scheduling, or ad conversion tracking is enabled, legal/consent requirements must be assessed before launch.

### 15.7 No formal browser test suite

The site received extensive real-browser/manual automation checks, but the repository does not yet include:

- Playwright
- Vitest
- Testing Library
- Axe automated checks
- Lighthouse CI

The `npm run check` gate covers lint, types, and production compilation only.

### 15.8 Product proof is intentionally limited

No fabricated metrics, customer logos, or testimonials were added. Stronger proof requires approved real material such as:

- screenshots
- example outputs
- redacted workflow diagrams
- customer permission
- measured before/after results
- testimonials
- case studies

---

## 16. Recommended Next Phase: Launch Infrastructure

This should be the next phase before adding major new functionality.

### Objective

Create a recoverable, deployed, production-observable baseline at the real domain.

### Recommended sequence

#### 16.1 Initialize source control

1. Initialize Git in the project directory.
2. Review `.gitignore` before adding files.
3. Confirm `.next`, `node_modules`, local environment files, caches, and generated development artifacts are ignored.
4. Create an initial baseline commit containing the verified site.
5. Create a remote GitHub repository.
6. Push the baseline to the default branch.

**Acceptance criteria:** A clean working tree, a remote backup, and a reproducible baseline commit.

#### 16.2 Select and configure hosting

Vercel is the simplest fit for this Next.js architecture, but another Node-compatible host can be used.

1. Create the hosting project from the Git repository.
2. Confirm Node and npm versions.
3. Configure the production build command.
4. Deploy a temporary host URL.
5. Verify every route and metadata endpoint on that host.

**Acceptance criteria:** Production build succeeds on the hosting provider and every current route returns the expected status.

#### 16.3 Attach the production domain

1. Add `constructiontodigital.com` to the hosting project.
2. Decide canonical handling for `www.constructiontodigital.com`.
3. Redirect the non-canonical hostname permanently to the apex domain.
4. Update DNS.
5. Wait for TLS issuance.
6. Verify that HTTP upgrades to HTTPS.
7. Verify HSTS only after HTTPS works reliably.

**Acceptance criteria:** One canonical HTTPS host with no duplicate indexable hostname.

#### 16.4 Configure production environment values

Set only the services actually being used:

- Google tag ID
- Google Search Console verification
- Bing Webmaster verification

After adding any external provider, confirm the CSP still allows only required domains.

#### 16.5 Post-deploy verification

Re-run the same production checks against the live domain:

- page status codes
- canonicals
- social metadata
- JSON-LD
- robots
- sitemap
- manifest
- 404 metadata
- CSP/HSTS
- mobile and desktop screenshots
- request-demo mail link

---

## 17. Recommended Future Phase: Lead Capture and Sales Pipeline

The mailto CTA is sufficient for a preview but should evolve before meaningful advertising spend.

### Proposed lead form

Create a dedicated `/request-demo` route or an inline section with fields for:

- name
- work email
- phone, optional
- company
- role
- product interest
- current accounting/job-management/estimating tools
- repetitive workflow or handoff to improve
- preferred contact method
- marketing consent where required

### Technical requirements

- Server-side Zod validation.
- Accessible labels and inline errors.
- Focus first invalid field after submit.
- Loading, success, and recoverable error states.
- Honeypot and rate limiting.
- Captcha only if spam volume requires it.
- UTM source/medium/campaign/content/term preservation.
- Referrer and landing-page preservation.
- Product interest preselected from solution-page CTAs.
- Reliable delivery to a branded business inbox or CRM.
- A persistence strategy so a transient mail/API error does not lose the lead.
- `generate_lead` conversion only after a confirmed server-side success, not merely on button click.

### Possible destinations

Choose one, rather than integrating several prematurely:

- AgentMail webhook/API
- HubSpot
- Airtable
- a lightweight database plus notifications
- a CRM already used by the company

### Strong recommendation

Create a branded address such as `hello@constructiontodigital.com` or `sales@constructiontodigital.com` before public advertising. Keep the current AgentMail address as an automation destination if useful, but avoid making it the visible long-term brand contact unless that is intentional.

---

## 18. Recommended Future Phase: Analytics, Advertising, and Consent

### Baseline measurement plan

Track:

- landing page views
- solution page views
- solution selector engagement
- product detail clicks
- demo CTA clicks
- successful demo form submissions
- email-link fallback clicks
- outbound integration/demo links

### Event properties

Preserve:

- product slug
- CTA location
- page path
- campaign parameters
- referrer
- device category
- form success/failure reason without personal data

### Advertising readiness

Before launching paid ads:

1. Confirm analytics events in provider debug mode.
2. Separate Google Ads conversion configuration from GA4 reporting if appropriate.
3. Add a privacy policy.
4. Decide whether consent management is required for the intended audience/regions.
5. Test consent-denied behavior.
6. Confirm CSP domains remain narrow.
7. Create campaign-specific landing pages only when they contain real differentiated content.

Avoid cloning thin near-duplicate pages solely for keyword stuffing.

---

## 19. Recommended Future Phase: Product Proof and Content Expansion

The user indicated that additional construction products will be added later. The current typed architecture is ready for this.

### Adding a product

Start in `src/lib/solutions.ts` and add a complete typed record. The architecture will then support:

- static route generation
- product explorer inclusion
- related-product links
- sitemap entry
- metadata
- schema

New products should still receive an intentional homepage placement; do not assume an unlimited number of tabs will remain usable.

### Proof assets to prioritize

For each product, collect:

- real screenshots
- redacted input documents
- redacted outputs
- short screen recordings
- workflow diagrams based on real systems
- customer-approved quotes
- implementation boundaries
- measured results with date range and methodology

### Case studies

A robust case study template could include:

1. Operational context
2. Existing workflow
3. Failure point
4. Systems involved
5. Product intervention
6. Human approval boundaries
7. Deployment process
8. Verified outcome
9. What remains manual

Only publish client names, screenshots, or internal system details with permission.

### Content management

Do not add a large CMS immediately. A sensible progression is:

1. typed code data for the first few products
2. MDX for case studies and articles
3. a headless CMS only when non-developers need frequent publishing

---

## 20. Recommended Future Phase: Organic Search Growth

The technical SEO baseline is complete, but ranking will depend on useful content and real authority.

### Suggested content clusters

Potential high-intent topics include:

- AI agents for construction operations
- ECi Bolt work-order automation
- QuickBooks billing workflows for contractors
- construction supplier price-list normalization
- gutter takeoffs from digital blueprints
- human-approved AI in financial operations
- construction workflow handoff audits

### Content quality rules

- Write for actual contractor questions.
- Demonstrate workflows with real examples.
- Avoid generic “AI is revolutionizing construction” articles.
- Do not publish thin location pages.
- Do not fabricate FAQs solely for schema.
- Add Article or SoftwareApplication schema only when page content genuinely supports it.
- Use internal links between articles, products, and case studies.
- Preserve canonical URLs once indexed.

### Launch SEO checklist

- Verify ownership in Google Search Console.
- Verify ownership in Bing Webmaster Tools.
- Submit `https://constructiontodigital.com/sitemap.xml`.
- Inspect all five canonical page URLs.
- Test social cards on major platforms.
- Run Google Rich Results and schema validation.
- Monitor indexing, coverage, Core Web Vitals, and crawl errors.

---

## 21. Recommended Future Phase: Advanced Product Experiences

The current Next.js foundation can support future features without rebuilding the marketing layer.

### Potential advanced features

#### Interactive product demos

- sandboxed BoltAgent query examples
- sample billing question workflows
- supplier CSV normalization demo with synthetic data
- blueprint takeoff review demonstration with a pre-approved sample plan

Do not connect public demos directly to live customer systems.

#### Secure document intake

For Drafting Table:

- authenticated upload
- signed object-storage URLs
- explicit file-size/type limits
- malware scanning
- job status
- human review queue
- structured export download
- retention/deletion controls

This requires a separate security and privacy design before implementation.

#### Customer portal

Possible portal capabilities:

- project status
- submitted files
- reviewed outputs
- comments/approvals
- integration health
- audit history
- billing/subscription state

Keep authenticated application UI separated from the marketing site’s visual density and navigation hierarchy.

#### Workflow assessment or ROI tool

A structured assessment could collect workflow volume, systems, handoffs, review time, and risk. Any output must clearly label assumptions and must not present invented savings as fact.

#### Scheduling

A booking integration can be added after selecting a calendar provider. It must be reviewed against CSP, privacy, consent, and page-performance requirements.

---

## 22. Recommended Future Phase: Testing and Continuous Delivery

### Automated tests to add

#### Unit/data tests

- every solution slug is unique
- required product fields are present
- every image has dimensions/alt behavior
- sitemap includes every solution
- solution lookups return correct data
- demo mailto remains correctly encoded

#### Metadata tests

- every canonical uses the production host
- every product includes Open Graph and Twitter images
- no unknown route inherits a canonical
- valid pages index; 404 pages noindex
- JSON-LD parses successfully

#### Component tests

- mobile menu semantics
- tab ARIA state
- arrow/Home/End keyboard behavior
- reduced-motion render path
- analytics remains absent without configuration

#### End-to-end tests

Use Playwright for:

- homepage smoke test
- every product route
- mobile menu
- product explorer
- CTA destinations
- 404 behavior
- no horizontal overflow
- critical metadata responses

#### Accessibility tests

Add Axe checks, but keep manual keyboard and screen-reader review. Automated accessibility testing will not catch every issue.

### Continuous integration

A future CI workflow should run:

1. dependency install from lockfile
2. lint
3. typecheck
4. unit/component tests
5. production build
6. Playwright smoke tests
7. accessibility checks
8. optional Lighthouse budgets

Prevent deployment when blocking checks fail.

---

## 23. Recommended Future Phase: Observability and Reliability

Before the site handles form submissions or authenticated workflows, add:

- application error reporting
- uptime monitoring
- form-delivery monitoring
- analytics event validation
- structured server logs
- privacy-safe request IDs
- rate-limit metrics
- deployment alerts
- rollback procedure

For a static marketing deployment, start small. Do not add an elaborate observability stack before there is a backend worth monitoring.

---

## 24. Important Design and Content Guardrails for Future Work

Do not regress these decisions without a deliberate redesign:

- Keep the official logo and mark proportions unchanged.
- Keep one primary cyan accent rather than introducing unrelated product colors.
- Avoid generic purple AI gradients, glowing orbs, robot imagery, and chat-bubble clichés.
- Do not add fake dashboards as decoration.
- Do not fabricate metrics, ratings, testimonials, customer counts, savings, or processing-time guarantees.
- Keep Drafting Table claims aligned with demonstrated scope.
- Keep financial actions and consequential work-order changes human-approved.
- Preserve product route slugs after launch unless redirects are planned.
- Maintain one H1 and logical heading order.
- Keep mobile controls keyboard/touch accessible.
- Preserve reduced-motion behavior.
- Update CSP narrowly for every new external service.
- Add product proof before adding marketing superlatives.
- Prefer one decisive “Request a demo” conversion label across the site.

---

## 25. Suggested Next-Session Checklist

Before changing code in the next session:

1. Read `PROGRESS.md` completely.
2. Read `AGENTS.md` and the relevant current Next.js documentation under `node_modules/next/dist/docs/`.
3. Read `design-system/construction-to-digital/MASTER.md`.
4. Read `src/lib/site.ts` and `src/lib/solutions.ts`.
5. Confirm whether the next objective is deployment, lead capture, another product, or a content/case-study addition.
6. Initialize Git before large new work if the directory is still not a repository.
7. Run `npm run check` before edits to establish the baseline.
8. Start the dev server only when visual work begins.
9. Stop all task-related servers when the session ends.
10. Update this file with completed work, decisions, test evidence, blockers, and the next exact step.

---

## 26. Best Immediate Next Move

The strongest next move is:

> **Initialize Git, deploy the verified baseline to a temporary production URL, attach `constructiontodigital.com`, and run the existing verification suite against the real HTTPS host.**

After that baseline is safely deployed, build the real lead-capture pipeline before spending money on advertising or adding major authenticated features.

---

## 27. Final State at This Handoff

### Completed

- Product/document audit
- Design-system definition
- Next.js architecture
- Homepage
- Four product pages
- Responsive implementation
- Mobile navigation
- Product explorer
- Motion and reduced-motion behavior
- Brand/icon/social assets
- Metadata and canonicals
- Open Graph and Twitter images
- JSON-LD
- Robots and sitemap
- Web manifest
- Optional analytics integration
- Lead CTA event instrumentation
- Security headers
- Custom 404
- README
- Implementation plan
- Lint/type/build verification
- Dependency audit
- Runtime HTTP verification
- Desktop/mobile visual verification
- Interaction verification
- Independent code/security review
- Final hardening pass
- Local server and background-process shutdown

### Not completed by design

- Git initialization and commits
- Hosting/deployment
- DNS and domain attachment
- Production analytics credentials
- Search-console verification
- Branded business email
- Backend lead form
- CRM integration
- Legal/consent pages
- Formal automated browser/unit test suite
- Lighthouse CI
- Additional products mentioned for a future phase
- Real customer proof/case studies
- Authenticated product demos or customer portal

### Runtime

**Stopped and clean.** No task-related localhost listener remains on ports `3000` or `3100`.
