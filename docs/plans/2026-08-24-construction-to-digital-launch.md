# Construction to Digital Launch Implementation Plan

> **For Hermes:** Execute this plan task-by-task without committing unless the user explicitly asks.

**Goal:** Launch a polished, conversion-focused Construction to Digital website that showcases four construction workflow products, supports future growth, and ships with a complete technical SEO foundation.

**Architecture:** Use Next.js 16 App Router with React Server Components for all indexable content and isolate animation/navigation state in small client components. Keep solution content in a typed data module so the homepage, dynamic solution routes, metadata, schema, sitemap, and navigation all share one source of truth. Use Tailwind CSS v4 plus a focused global component layer for the custom “Living Blueprint” design system.

**Tech Stack:** Next.js 16.3.2, React 19.2.8, TypeScript, Tailwind CSS v4, Motion 13, Phosphor SSR icons, Next Image, Metadata APIs, JSON-LD.

---

### Task 1: Establish typed product content and shared site configuration

**Objective:** Create one structured source for brand metadata, navigation, and the four documented offers.

**Files:**
- Create: `src/lib/site.ts`
- Create: `src/lib/solutions.ts`

**Steps:**
1. Define the canonical `https://constructiontodigital.com` site URL and consistent conversion labels.
2. Model BillingAgent, BoltAgent, Material Intelligence, and The Drafting Table with typed benefits, workflows, integrations, SEO descriptions, and safety language grounded in the provided project documentation.
3. Add lookup helpers and static route parameters.
4. Run `npx tsc --noEmit` and resolve data-shape errors.

### Task 2: Build the visual foundation and reusable interface

**Objective:** Implement the premium dark architectural studio design system with cyan blueprint geometry.

**Files:**
- Modify: `src/app/globals.css`
- Create: `src/components/site-header.tsx`
- Create: `src/components/site-footer.tsx`
- Create: `src/components/reveal.tsx`
- Create: `src/components/blueprint-visual.tsx`
- Create: `src/components/solution-icon.tsx`

**Steps:**
1. Replace starter CSS with brand tokens, responsive type, section layouts, buttons, media frames, focus states, and reduced-motion support.
2. Build semantic header/footer navigation and a mobile menu.
3. Build isolated Motion reveal primitives with reduced-motion behavior.
4. Create the Living Blueprint hero overlay and operational UI motifs without fake metrics or fake dashboard copy.
5. Run lint and TypeScript checks.

### Task 3: Build the marketing homepage

**Objective:** Create a conversion-led homepage with clear product hierarchy and varied, responsive composition.

**Files:**
- Modify: `src/app/page.tsx`

**Steps:**
1. Build the hero with official logo, construction image, exact brand positioning, and primary/secondary CTAs.
2. Add proof-oriented capability strip without inventing customer counts or business metrics.
3. Add a flagship Drafting Table section, interactive solution index, material intelligence feature, human-approval philosophy, implementation process, and final demo CTA.
4. Add visible, naturally written construction AI keywords and descriptive image alt text.
5. Confirm one H1, logical heading order, landmarks, and keyboard-reachable actions.

### Task 4: Create dedicated SEO landing pages

**Objective:** Give each product a focused, indexable page for its own buyer intent.

**Files:**
- Create: `src/app/solutions/[slug]/page.tsx`

**Steps:**
1. Generate static params from typed solution data.
2. Add route-specific title, description, canonical, Open Graph, and Twitter metadata.
3. Build consistent product hero, capabilities, workflow, integrations, safety boundaries, and CTA sections.
4. Return `notFound()` for unknown slugs.
5. Add route-level JSON-LD.

### Task 5: Add complete technical SEO and platform metadata

**Objective:** Make the site crawlable, shareable, and ready for indexing and future advertising attribution.

**Files:**
- Modify: `src/app/layout.tsx`
- Create: `src/components/json-ld.tsx`
- Create: `src/app/robots.ts`
- Create: `src/app/sitemap.ts`
- Create: `src/app/manifest.ts`
- Create: `src/app/opengraph-image.tsx`
- Create: `src/app/icon.tsx`

**Steps:**
1. Add metadata base, title template, canonical, robots, Open Graph, Twitter, category, keywords, and verification placeholders that do not emit invalid tags.
2. Add Organization, WebSite, ItemList, SoftwareApplication, Service, and Breadcrumb structured data as appropriate.
3. Generate robots, image-aware sitemap entries, manifest, site icon, and 1200×630 social image through Next file conventions.
4. Add optional environment-based analytics hooks only when configured.
5. Validate generated routes in the production build.

### Task 6: Verify behavior, accessibility, responsive layouts, and production output

**Objective:** Ship a verified build rather than a static mockup.

**Files:**
- Modify only files identified by verification failures.

**Steps:**
1. Run `npm run lint`.
2. Run `npm run build`.
3. Start the production or development server and verify readiness with an HTTP request.
4. Inspect rendered homepage and one solution page at desktop and mobile viewport widths.
5. Confirm `/robots.txt`, `/sitemap.xml`, `/manifest.webmanifest`, and generated Open Graph image respond successfully.
6. Check anchor targets, no horizontal overflow, reduced-motion behavior, focus visibility, heading hierarchy, image dimensions, and CTA consistency.
7. Fix discovered issues and repeat lint/build plus visual checks.
