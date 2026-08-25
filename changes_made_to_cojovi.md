this is my current website, when i had the intention of building a community for ai stuff and projects. but i want to change to making my website more-so advertising and showcasing the projects ive made that can be offered and sold, there are a handful that i think are very valuble and would gain subscribers if i advertised it right, they range from specific ai agents (custom) and other projects that solve problems.  there are several that are directly specific to the construction industry and i want to especially highlight those.  here at the top 4 i feel will be most sought after:

BillingAgent: a robust ai agent that can be used to query or apply action to your billing platform (quickbooks, netsuite, etc) using natural language or voice. also review [BillingAgent - Project Detail.md](NewDetail/BillingAgent - Project Detail.md)  for more info

BoltAgent: a robust ai agent that can be used to query and apply action to your contractor scheduling system. also review [BoltAgent - Project Detail.md](NewDetail/BoltAgent - Project Detail.md)  for more info

Construction Material Tracker: track pricing changes directly from distributor databases which will offer you "to-the-minute" accurate pricing at all times, no need to find old email, old pricing sheets, etc.  having a system like this also allows for powerful automations that can aide in autonomous workflows to automate reconsiliation and other tedious financial chores.  also review [CMAC Material Tracker - Project Detail.md](NewDetail/CMAC Material Tracker - Project Detail.md)  for more details.

The Drafting Table: a ai agent dedicated to giving you material take offs for all your roofing and gutter jobs via digital blueprints.  you simply email the agent what you need and the plans, and within 10 minutes you recieve your take-off / materials sheet responded to you via email.  can also be done from a chat. or for bulk plans where you have lots of files, dump in a specific folder and the agent with go through them one by one. also review [Hermes Digital Blueprint Estimator - Project Detail.md](NewDetail/Hermes Digital Blueprint Estimator - Project Detail.md) for more info. 

while we  completely change the strategy, i want to make sure we are keeping the website style and theme completely in tact.  so mainly changing context and SOME images. the generic text at the top, ill let you decide what would be strategic there, but leave the hero image alone, i already am working on something for that.  then when we get to the 6 boxes (Ask Anything, Adaptive Features, etc etc) , some of those needs to be changed, but some are still mostly relevent except might need to be reworded, ill let you decide which ones need to be modified or completely changed.  then when we get to "Join our community for seamless collaboration" clearly that isnt really relevent at all.  then we get to "Empower Your Site & Socials With AI — Together" that would still be relevent because i do plan on offering services for SEO and Advertising.  then we get to the section labeled "Mick: The Collaborative AI Coding Assistant" , that is highlighting a specific project i made that isnt really relevent to the new website plan, that might be a good place to replace with one of the main 4 projects. along with the same thing for "Collective Content Creation"
   
use [$ui-ux-pro-max](/Users/cojovi/.codex/skills/ui-ux-pro-max/SKILL.md) to make sure this turns out perfect, and for places you want new images use [$higgsfield-generate](/Users/cojovi/.agents/skills/higgsfield-generate/SKILL.md)

---

I’ll use ui-ux-pro-max for the repositioning/design system pass and higgsfield-generate for image-generation planning, while staying in planning mode so I won’t change files yet. I’m going to inspect the site structure and the project detail docs first so the plan is grounded in what’s actually there.

I found this is a Vite/React/Tailwind site with the homepage split into Hero, Benefits, Collaboration, Services, Pricing, and Roadmap style sections. Next I’m reading the project docs and current section copy so the plan can be specific instead of hand-wavy.

The current copy is strongly community-first, but the component structure can carry the new “AI tools and services you can buy” story without disturbing the visual language. I’m checking the remaining sections and the product docs now, especially where those two older project showcases should become construction-focused offers.

There’s a nice opportunity here: keep the same dark, conic-gradient, orbiting-integration feel, but change the content architecture from “join a community” to “book a workflow audit / buy an automation product.” I’m pulling the detail docs now so the four flagship offers each get the right buyer-facing angle.

The docs make the strongest positioning pretty clear: these are not “AI novelty” projects, they’re workflow products for billing, scheduling, materials, and blueprint takeoffs. I’m checking assets/config next and running the UI skill’s design-system search so the plan preserves the existing theme while sharpening the sales strategy.

The design-system result points toward a premium B2B SaaS/agency posture, but I’ll keep the existing Sora/Source Code Pro, dark background, conic accents, and glassy cards because that’s the site’s current identity. I’m doing one more pass for landing-page structure and React/Tailwind guidance, then I should be able to turn this into a decision-complete implementation plan.

Yes, we can include all three, with a hierarchy so the page doesn’t feel scattered: primary “Request Demo,” secondary “Book Consult,” and a lighter “Join the Build List” for colder visitors. I’ll plan the CTAs that way and keep “Request Demo” as the conversion anchor.

I also found there isn’t a real lead-capture/contact form wired up right now; most CTAs are section anchors or external links. The plan will include a lightweight CTA strip and link targets that can start as anchors/mail links, then be swapped to Calendly/Typeform/CRM when you’re ready.


The only remaining thing that materially affects implementation is CTA routing. I can still plan sane placeholders, but a real destination will make the page feel a lot more finished.

---

# Cojovi Website Repositioning Plan

## Summary
Reposition the homepage from an AI community site into a premium AI systems/product showcase for sellable tools, with construction workflows as the strongest lead. Keep the current dark theme, conic gradients, typography, section rhythm, card styling, parallax/orbit motifs, and hero image intact.

Primary conversion path: `Request Demo`. Secondary paths: `Book Consult` and `Join Build List`, implemented as section anchors for now.

## Key Changes
- Update header navigation to: `Solutions`, `Construction AI`, `AI Marketing`, `Showcase`, `Contact`; replace “New account”/Discord/Rabbit CTAs with `Request Demo`.
- Rewrite hero copy around custom AI agents and workflow products:
- Headline angle: “AI systems for the work your business already runs on.”
- Supporting copy: agents and tools for billing, scheduling, estimating, material pricing, SEO, and advertising.
- CTAs: `Request Demo`, `Book Consult`, `Join Build List`.
- Do not replace `src/assets/hero/robot.jpg` or hero background.
- Rework the six benefits cards into buyer-facing capabilities:
- Natural-language business systems
- Construction workflow agents
- Live pricing intelligence
- Human-approved automation
- Custom web and AI systems
- SEO and advertising automation
- Replace the community collaboration section with an “integrates with your existing stack” section using the same orbit visual, but relabel the orbit around system categories: Accounting, Scheduling, ERP, Supplier Data, Email, Voice, Chat, Blueprints.
- Keep the “Empower Your Site & Socials With AI” section, but rewrite it for SEO, advertising, content systems, and conversion workflows rather than community collaboration.
- Replace the Mick and Collective Content sections with product-focused showcases:
- Large feature: `The Drafting Table`
- Secondary feature: `Construction Material Tracker`
- Compact feature/copy area: `BillingAgent` + `BoltAgent`
- Replace the current website portfolio cards with four flagship product cards:
- `BillingAgent`
- `BoltAgent`
- `Construction Material Tracker`
- `The Drafting Table`
- Rewrite the roadmap section as a productization/process section: `Demo`, `Workflow Map`, `Integration Build`, `Launch + Optimize`.

## Interfaces And Assets
- Update content data in [src/constants/index.js](</Volumes/FastSSD/github/my repos/cojovi-brain/src/constants/index.js>) by replacing community/portfolio arrays with offer-focused data.
- Update section copy/components in [src/components/Hero.jsx](</Volumes/FastSSD/github/my repos/cojovi-brain/src/components/Hero.jsx>), [src/components/Collaboration.jsx](</Volumes/FastSSD/github/my repos/cojovi-brain/src/components/Collaboration.jsx>), and service/showcase components.
- Add CTA anchor sections/IDs: `#request-demo`, `#book-consult`, `#join-list`.
- Use Higgsfield GPT Image 2 for non-hero imagery only:
- Four `4:3` product-card mockups for the flagship cards.
- Two or three larger service visuals for Drafting Table, Material Tracker, and AI marketing.
- Style prompts should specify dark premium SaaS UI, construction/business operations context, purple/cyan/gold accent lighting, no fake brand logos, no unreadable tiny text.

## Test Plan
- Run `npm run build`.
- Run `npm run lint` if the current repo lint config works.
- Visually verify desktop, tablet, and mobile layouts at roughly `375px`, `768px`, `1024px`, and `1440px`.
- Confirm hero image is unchanged.
- Confirm all CTAs land on the intended anchor sections.
- Confirm product cards stay readable with four cards and no mobile horizontal scroll.
- Confirm all generated images have descriptive `alt` text and do not look like unrelated stock art.

## Assumptions
- CTA destinations will be section anchors for this pass, not live forms, Calendly, or email links.
- The four construction/product offers are the top priority and should outrank older projects.
- Pricing remains consultation/demo-driven for now; no fixed subscription tiers will be invented.
- The existing visual theme should be preserved more than modernized.

---

Implemented the repositioning. The homepage now reads as a premium AI systems/product showcase with construction-heavy offers, new CTA hierarchy, updated nav, reworked benefits, integrations, product showcase cards, and a demo/consult/list CTA section.

Key files changed include [src/constants/index.js](</Volumes/FastSSD/github/my repos/cojovi-brain/src/constants/index.js>), [src/components/Hero.jsx](</Volumes/FastSSD/github/my repos/cojovi-brain/src/components/Hero.jsx>), [src/components/Collaboration.jsx](</Volumes/FastSSD/github/my repos/cojovi-brain/src/components/Collaboration.jsx>), [src/components/Services.jsx](</Volumes/FastSSD/github/my repos/cojovi-brain/src/components/Services.jsx>), [src/components/PricingList.jsx](</Volumes/FastSSD/github/my repos/cojovi-brain/src/components/PricingList.jsx>), and [src/components/Roadmap.jsx](</Volumes/FastSSD/github/my repos/cojovi-brain/src/components/Roadmap.jsx>). I also added on-brand fallback visuals in [public/showcase](</Volumes/FastSSD/github/my repos/cojovi-brain/public/showcase>).

Verified:
- `npm run build` passes.
- `npm run lint` passes.
- Checked rendered page in Chrome plus headless screenshots at `375`, `768`, `1024`, and `1440`.
- Hero image was left unchanged.
- CTA anchors are wired: `#request-demo`, `#book-consult`, `#join-list`.

One note: Higgsfield is repaired locally, but the account is not authenticated (`Not authenticated`). I created polished local SVG mockups as fallbacks; after running `higgsfield auth login`, those can be swapped for generated GPT Image 2 assets.

Dev server is still running here: `http://127.0.0.1:5173/`.

---

i love this "Drafting table" part but can we remake the image to put more targeting on roofing take offs instead of gutters [$higgsfield-generate](/Users/cojovi/.agents/skills/higgsfield-generate/SKILL.md)

---

Done. I remade the Drafting Table imagery to focus on **roofing takeoffs** instead of gutters.

Updated:
- [drafting-feature.svg](</Volumes/FastSSD/github/my repos/cojovi-brain/public/showcase/drafting-feature.svg>)
- [drafting-table.svg](</Volumes/FastSSD/github/my repos/cojovi-brain/public/showcase/drafting-table.svg>)

The large image now shows roof planes, ridge/hip/valley markings, roof area in squares, ridge cap, starter, underlayment, and “AI is measuring roof planes.”

Verified:
- `npm run build` passes
- `npm run lint` passes

Higgsfield is still blocked by auth on this machine (`Not authenticated`), so I made the on-brand SVG replacement directly.

---


no need to do any actions, just answer.
if i wanted this hero image to be animated, is it better to use a video file or gif file?  what are my options here?

---

For this hero image, **video is almost always better than GIF**.

**Best Option: MP4/WebM video**
- Smaller file size than GIF for the same visual quality.
- Smoother animation.
- Better color/detail, especially for neon glow, smoke, flicker, particles, subtle camera movement.
- Can autoplay muted/loop inline in the hero.
- Best for production.

Typical setup:
- `hero-video.webm` for modern browsers.
- `hero-video.mp4` as fallback.
- Keep the current JPG as `poster` while the video loads.

**GIF**
- Easy to drop in, but usually a bad web choice.
- Huge file sizes.
- Lower quality.
- No real compression efficiency.
- Can look crunchy with gradients/neon.
- No pause/control semantics.
I’d only use GIF for tiny decorative loops, not a big hero image.

**Other Options**
- **CSS animation over still image:** Keep the JPG and animate overlays like glow pulses, scanlines, particles, floating UI cards, or parallax. Lightweight and sharp.
- **Lottie/Rive:** Good for vector/UI-style motion, not ideal for this raster hero artwork.
- **Canvas/WebGL:** Best for advanced effects like particles, depth, lighting, or interactive motion, but more work.
- **Animated WebP/AVIF:** Better than GIF, but browser/support/workflow is less straightforward than video.

My recommendation: **use a short looping WebM/MP4 video with the current image as the poster**, and optionally keep the floating UI overlays as HTML/CSS on top. That gives you the best quality/performance balance.

---

ok, the old website was "Cojovi Webworx : Your difital Artisans" , whoich was directed towards website building and artisans meaning we are unique or whatever.  ALl we HAVE to keep is the "cojovi" part,  can you help me brain storm better tag lines, and should we get rid of "webworx" all together or replace it with somethign else? your thoughts?  (no actions needed here just conversation between you and I)

---

Yeah, I’d probably move away from **“Webworx”** for this new direction.

It says “website shop” more than “AI systems/products company.” Since you’re now selling operational AI agents, automation, construction workflow tools, and business systems, the name should feel more like: **serious builder of useful AI infrastructure**, not only creative web design.

I’d keep **Cojovi** as the main brand and make the second phrase flexible.

A few directions:

**Clean And Premium**
- **Cojovi AI Systems**
- **Cojovi Automation**
- **Cojovi Applied AI**
- **Cojovi Systems**
- **Cojovi Works**
- **Cojovi Labs**

My strongest pick here is **Cojovi AI Systems**. It’s clear, sellable, and fits BillingAgent, BoltAgent, Drafting Table, marketing automation, and future tools.

**Construction / Operations Lean**
- **Cojovi Field Intelligence**
- **Cojovi Workflow Systems**
- **Cojovi Trade AI**
- **Cojovi BuildOps AI**
- **Cojovi Operator**
- **Cojovi OpsWorks**

I like **Cojovi Workflow Systems** if you want to sound broad but still business-focused.

**Sharper Taglines**
- **AI systems for the work your business already runs on.**
- **Custom AI agents for real business workflows.**
- **Automate the busywork. Keep control of the decisions.**
- **AI agents built for billing, scheduling, estimating, and growth.**
- **Practical AI for construction, operations, and marketing.**
- **Business automation that plugs into the tools you already use.**
- **From blueprint to invoice, AI that moves the work forward.**
- **AI workflow systems for contractors and growing businesses.**

My favorite combo right now:

**Cojovi AI Systems**  
**AI systems for the work your business already runs on.**

That feels like the cleanest pivot. It keeps your identity, drops the website-only vibe, and gives you room to sell both construction-specific agents and broader business/marketing AI.
---

another question, you said higgsfield wasnt authorized (i fixed that) but what did you use for the remade the Drafting Table imagery to focus on roofing takeoffs instead of gutters? no action needed just answer

---

I remade that Drafting Table imagery directly as **SVG code inside the repo**, not through Higgsfield.

Specifically, I edited the existing site assets:
- [drafting-feature.svg](/Volumes/FastSSD/github/my%20repos/cojovi-brain/public/showcase/drafting-feature.svg)
- [drafting-table.svg](/Volumes/FastSSD/github/my%20repos/cojovi-brain/public/showcase/drafting-table.svg)

I kept the same dark SaaS/mockup style, but changed the visual language and labels from gutter takeoffs to roofing takeoffs: roof planes, ridge/hip/valley lines, roof area in squares, ridge cap, starter, valleys, underlayment, etc.

So since Higgsfield wasn’t authenticated at the time, I used a code-native design approach instead of image generation. It’s actually nice for this kind of UI mockup because the text stays crisp and controllable.

Done. I kept the moving notification/parallax behavior the same and swapped the retro arcade images for code-native SVGs that fit the new strategy better:

- Main badge: workflow audit / AI systems checklist
- Mini icons: billing, scheduling, and roofing takeoff/product workflow cues
- Updated the notification card so “Workflow audit ready” stays on one line

Changed files include [src/components/Notification.jsx](/Volumes/FastSSD/github/my%20repos/cojovi-brain/src/components/Notification.jsx:1), [src/components/Hero.jsx](/Volumes/FastSSD/github/my%20repos/cojovi-brain/src/components/Hero.jsx:1), [src/assets/index.js](/Volumes/FastSSD/github/my%20repos/cojovi-brain/src/assets/index.js:1), plus four new SVG assets under `/Volumes/FastSSD/github/my repos/cojovi-brain/src/assets/notification/`.

Verified with:
- `npm run build`
- `npm run lint`
- Chrome screenshot visual check at desktop width.

---

back to my question about "hero image to be animated, is it better to use a video file or gif file" you mentioned WebM video, none of my video converters can convert to that.  but the video is at [cojovi_com_hero_vid.mp4](Updated Images Cojovi/cojovi_com_hero_vid.mp4)  can you review it and you make the best decision as to what format it should be in, i exported it in 1080p but it doesnt need to be that high quality, most of the graphic is retro arcade style so we can lower that if it helps the speed of the website or just help it run easier in general.

---

I reviewed it and made the call: **use an optimized MP4, not GIF**.

Your source video is **38.5s, 1920x1080, 30fps, with audio, 32 MB**. For a website hero, that’s too heavy. I exported web-ready versions and the winner is:

[cojovi-hero-1280-muted.mp4](</Volumes/FastSSD/github/my repos/cojovi-brain/Updated Images Cojovi/optimized/cojovi-hero-1280-muted.mp4>)

That version is:
- **1280x720**
- **24fps**
- **Muted / no audio**
- **Fast-start MP4**
- **4.0 MB instead of 32 MB**

I also tested WebM, but it came out **larger** at 5.6 MB, so I would skip WebM for this specific clip. The 960px MP4 is even lighter at 2.7 MB, but I’d use the 1280 version for the hero because it will hold up better on desktop.

I also made a poster image here:

[cojovi-hero-poster-1280.jpg](</Volumes/FastSSD/github/my repos/cojovi-brain/Updated Images Cojovi/optimized/cojovi-hero-poster-1280.jpg>)

Best implementation later would be:

```jsx
<video
   autoPlay
   muted
   loop
   playsInline
   preload="metadata"
   poster="/path/to/cojovi-hero-poster-1280.jpg"
>
   <source src="/path/to/cojovi-hero-1280-muted.mp4" type="video/mp4" />
</video>
```

So: **MP4 is the right answer here**. GIF would be the worst option. WebM is optional in theory, but for this file it did not beat the optimized MP4.

Not yet. I only reviewed/optimized the video and created the web-ready files in:

`/Volumes/FastSSD/github/my repos/cojovi-brain/Updated Images Cojovi/optimized/`

I did **not** replace the current hero image/video in the website yet.

The recommended file to use is:

[cojovi-hero-1280-muted.mp4](</Volumes/FastSSD/github/my repos/cojovi-brain/Updated Images Cojovi/optimized/cojovi-hero-1280-muted.mp4>)

And the poster image is:

[cojovi-hero-poster-1280.jpg](</Volumes/FastSSD/github/my repos/cojovi-brain/Updated Images Cojovi/optimized/cojovi-hero-poster-1280.jpg>)

Yes, it’s now in the website.

I added the optimized hero video and poster under [public/hero](/Volumes/FastSSD/github/my%20repos/cojovi-brain/public/hero), then updated [Hero.jsx](/Volumes/FastSSD/github/my%20repos/cojovi-brain/src/components/Hero.jsx:64) to use:

- `autoplay`
- `muted`
- `loop`
- `playsInline`
- `preload="metadata"`
- poster fallback image

I also removed the old `robot.jpg` export from [src/assets/index.js](/Volumes/FastSSD/github/my%20repos/cojovi-brain/src/assets/index.js:1), so the old hero image is no longer emitted in the production build.

Verified with:
- `npm run build`
- `npm run lint`
- Chrome screenshot check of the hero video inside the existing frame/overlays.
Yes. A lot, actually.

The big thing: SEO is not just “hide keywords in the site.” The useful version is making the site clearly answer: **what do you sell, who is it for, and what problems do you solve?**

For your site, I’d think in 3 layers:

**1. Embedded Technical SEO**
We should add/update:
- Page title: `Cojovi AI Systems | Custom AI Agents for Construction, Billing, Scheduling, and Marketing`
- Meta description focused on what you offer
- Open Graph image/title/description for social sharing
- Twitter card tags
- Canonical URL
- `robots.txt`
- `sitemap.xml`
- Structured data / JSON-LD for `Organization`, `SoftwareApplication`, maybe `Service`

This helps Google and social platforms understand the site.

**2. Keyword Strategy In The Actual Copy**
We should naturally work these kinds of phrases into headings, section text, card titles, alt text, and product descriptions:

- custom AI agents
- AI workflow automation
- construction AI software
- contractor scheduling automation
- AI billing assistant
- QuickBooks AI agent
- NetSuite AI automation
- roofing takeoff software
- AI blueprint takeoff
- construction material price tracking
- supplier price tracking
- AI marketing automation
- SEO automation for contractors

Not spammy. Just intentional.

**3. Dedicated Product Pages Eventually**
This is the biggest ranking opportunity. A homepage can only rank for so much. If you eventually have pages like:

- `/billing-agent`
- `/bolt-agent`
- `/construction-material-tracker`
- `/drafting-table`
- `/ai-marketing-automation`

Each page can target a specific search intent. For example, **The Drafting Table** page could go hard after “roofing takeoff software,” “AI blueprint takeoff,” and “roof material estimate from plans.”

My recommendation: first pass, we update the homepage SEO metadata and keyword placement. Second pass, create dedicated landing pages for the four flagship products. That would be the strongest long-term SEO move.



Yes, in a good way.

That tagline gives the brand a clearer philosophical position: **Cojovi is not replacing people, it’s removing the tedious work around them.** That’s especially strong for construction, billing, scheduling, estimating, and finance because those buyers may be cautious about “full automation” touching important workflows.

I’d use it as the main supporting brand line:

**Cojovi AI Systems**  
**Automate the busywork. Keep control of the decisions.**

It also sharpens the SEO/copy strategy. We should lean into terms like:

- human-approved AI automation
- AI workflow automation
- business process automation
- AI agents with approval steps
- construction workflow automation
- billing automation
- scheduling automation
- estimating automation

It does slightly change the homepage tone. Instead of sounding like “powerful AI that acts everywhere,” we should sound like:

“AI handles the repetitive steps, drafts the work, gathers the data, and prepares the action. Your team reviews, approves, and stays in command.”

That is probably more sellable than sounding too autonomous too early.


Yes. The **main change we need now** is the site’s SEO foundation still says the old brand. Your `index.html` currently has:

`Cojovi Webworx – Accelerating Productivity Through AI Innovation`  
`Upgrade your productivity with Cojovi Webworx.`

That should be updated immediately to match the new positioning and tagline.

I’d make these first-pass SEO changes:

1. **Update title + meta description**
Example title:
`Cojovi AI Systems | Custom AI Agents for Construction Workflows`

Example description:
`Automate the busywork. Keep control of the decisions. Cojovi builds custom AI agents for billing, scheduling, roofing takeoffs, material pricing, SEO, and advertising workflows.`

Google recommends clear, descriptive page titles and says meta descriptions can be used for search result snippets when they describe the page well. ([developers.google.com](https://developers.google.com/search/docs/appearance/title-link?utm_source=openai))

2. **Add Open Graph + Twitter tags**
This helps when the site is shared on LinkedIn, Facebook, texts, Discord, etc. It is not pure ranking magic, but it makes the brand look right when shared.

3. **Add canonical URL**
Something like:
`https://www.cojovi.com/`

4. **Add structured data**
I’d add JSON-LD for `Organization` and `ProfessionalService` or `SoftwareApplication` style offers. Google says structured data helps it understand page content, and JSON-LD is generally the easiest recommended format. ([developers.google.com](https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data))

5. **Add `robots.txt` and `sitemap.xml`**
Right now I didn’t find either in `public/`. Search Console can use submitted sitemaps to discover and refresh URLs. ([search.google.com](https://search.google.com/search-console/about))

6. **Adjust visible copy slightly**
We should work the tagline into the page and naturally include phrases like:
`custom AI agents`, `construction workflow automation`, `AI billing assistant`, `contractor scheduling automation`, `roofing takeoff software`, and `material price tracking`.

So yes: there are worthwhile changes to make now. The most urgent are **title, description, social preview tags, canonical, schema, robots, and sitemap**.

Done. I added the first-pass SEO foundation and aligned the visible copy with your new tagline.

Changed:
- [index.html](/Volumes/FastSSD/github/my%20repos/cojovi-brain/index.html:1)
- New SEO title and meta description
- Canonical URL
- Robots meta
- Open Graph tags
- Twitter card tags
- JSON-LD structured data for organization, website, services, and flagship offers
- [Hero.jsx](/Volumes/FastSSD/github/my%20repos/cojovi-brain/src/components/Hero.jsx:41)
- Added: “Automate the busywork. Keep control of the decisions.”
- Worked in natural SEO phrases like custom AI agents, contractor scheduling, roofing blueprint takeoffs, construction material price tracking, SEO, and advertising
- [robots.txt](/Volumes/FastSSD/github/my%20repos/cojovi-brain/public/robots.txt:1)
- [sitemap.xml](/Volumes/FastSSD/github/my%20repos/cojovi-brain/public/sitemap.xml:1)

Verified:
- JSON-LD parses correctly
- `npm run build` passed
- `npm run lint` passed
- Confirmed `dist/robots.txt`, `dist/sitemap.xml`, and the new metadata are present in the production build

After this is deployed, the next worthwhile step is submitting `https://www.cojovi.com/sitemap.xml` in Google Search Console.


Yes. Now that the sitemap is submitted, the next move is **not more metadata**. It’s building more indexable, useful pages around each offer.

My recommended order:

1. **Use URL Inspection on the homepage**
In Search Console, inspect `https://www.cojovi.com/`, test the live URL, and request indexing. Google’s URL Inspection tool can show Google’s indexed version, test whether the live page is indexable, and request indexing. ([support.google.com](https://support.google.com/webmasters/answer/9012289?hl=en&utm_source=openai))

2. **Wait for data, then watch queries**
Give Search Console time to collect impressions. Then check the Performance report for queries, pages, countries, clicks, and impressions. That tells us what Google is already starting to associate with the site. ([developers.google.com](https://developers.google.com/search/docs/monitor-debug/search-console-start?utm_source=openai))

3. **Create dedicated landing pages**
This is the biggest SEO opportunity:
- `/billing-agent`
- `/bolt-agent`
- `/construction-material-tracker`
- `/drafting-table`
- `/ai-marketing-automation`

Each page should target one search intent. The homepage can introduce everything, but dedicated pages can rank for specific searches like “roofing takeoff software” or “AI billing assistant.”

4. **Write practical problem-solution content**
Add pages/articles like:
- “How AI roofing takeoffs work from digital blueprints”
- “How contractors can automate scheduling without losing approval control”
- “How construction companies track material price changes”
- “QuickBooks AI agent for billing workflows”
- “Human-approved AI automation for construction operations”

Google’s SEO guidance frames SEO as helping search engines understand your content and helping users decide whether your site answers what they need. ([developers.google.com](https://developers.google.com/search/docs/fundamentals/seo-starter-guide?utm_source=openai))

5. **Improve page experience**
Check Core Web Vitals in Search Console once there’s field data. Google’s Core Web Vitals report shows real-world page experience data and flags poor URLs. ([support.google.com](https://support.google.com/webmasters/answer/9205520?hl=en&utm_source=openai))

6. **Validate structured data**
We added JSON-LD, but after deployment it should be checked with Google’s Rich Results Test. Google recommends validating structured data and says JSON-LD is generally the easiest format to implement and maintain. 

7. **Do not bother with meta keyword stuffing**
Google ignores the old `meta keywords` tag entirely. Better to put keywords naturally into headings, page copy, alt text, product descriptions, and internal links. 

My honest priority: **build the five dedicated landing pages next**. That’s where the SEO visibility will actually start compounding.


