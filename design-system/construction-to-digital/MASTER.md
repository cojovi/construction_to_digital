# Construction to Digital Design System

## Design read

A conversion-focused B2B product showcase for construction owners, operations leaders, estimators, and finance teams. The visual language combines premium construction photography with architectural drafting geometry and restrained digital motion.

- Design variance: 8
- Motion intensity: 7
- Visual density: 5
- Theme: locked dark
- Framework: Next.js App Router, React Server Components, Tailwind CSS v4
- Client motion: isolated Motion components only

## Brand idea

**Physical work. Digital leverage.**

The site should feel like a dark architectural studio after hours, not a generic neon SaaS template. Real framing, roof plans, materials, and work-order language ground every digital effect.

## Signature

**The Living Blueprint:** construction photography transitions into clean electric-cyan linework. Drafting grids, plan geometry, and measurement nodes appear only where they explain a workflow or create depth.

## Palette

| Token | Value | Use |
| --- | --- | --- |
| Site | `#03080d` | Primary canvas |
| Site raised | `#07121b` | Elevated surfaces |
| Blueprint surface | `#0b1b27` | Tinted feature areas |
| Ink | `#eff8fc` | Primary text |
| Muted | `#9eb0bc` | Secondary text |
| Quiet | `#607381` | Low-emphasis metadata |
| Line | `#173142` | Borders and drafting rules |
| Cyan | `#16c8f4` | The single saturated accent |
| Cyan strong | `#6ce5ff` | Accent text on dark surfaces |

Cyan tones are one accent family. Do not introduce violet, orange, green status dots, or section-specific accent colors.

## Typography

- Display: Geist Sans, weight 420-560, tight tracking. Scale creates hierarchy.
- Body: Geist Sans, weight 400, 1.6 line height.
- Utility/data: Geist Mono, weight 450-600.
- No serif. No random mixed-family emphasis.
- Display headlines use natural line breaks and never exceed two lines in the hero.

## Shapes

- Cards and media: 24px radius.
- Inputs: 12px radius.
- Buttons: full pill.
- Decorative geometry stays sharp and linear so rounded UI does not become soft or playful.

## Layout

- Max content width: 1440px.
- Responsive gutters: 20px mobile, 32px tablet, 48px desktop.
- Hero: asymmetric split with text on the left and the Living Blueprint visual on the right.
- Mobile: all asymmetric sections collapse to one column below 768px.
- Eight homepage sections must use at least four layout families.
- No three-equal-card feature rows.

## Motion

Every animation must communicate hierarchy, sequence, feedback, or system state.

- Hero: staged opacity/translate reveal and subtle image parallax tied to Motion values.
- Solution index: active visual changes with user selection, using shared layout transitions.
- Section reveals: once-only, 30-50ms stagger.
- Buttons: 150-240ms state transitions, active scale feedback.
- Reduced motion: all parallax, stagger, and ambient loops collapse to static.
- Never attach raw scroll listeners.

## Imagery

- Use the official ConstructionToDigital logo without redrawing it.
- Real or generated construction imagery must contain no fake text, fake logos, or fake dashboard labels.
- Product visuals should depict real plans, materials, framing, and operational artifacts.
- Do not use generic robots, purple AI brains, floating chat bubbles, or stock business meetings.

## Voice

- Direct, concrete, operational.
- Prefer: query, verify, map, price, measure, review, approve, export.
- Avoid: revolutionize, unleash, elevate, seamless, next-gen.
- Do not invent metrics, client counts, savings, or precision claims.
- No em-dashes or en-dash separators in visible copy.

## Conversion

Primary CTA label is **Request a demo** everywhere.
Secondary intent is **Explore solutions** everywhere.
Do not use competing contact labels such as Get in touch, Let's talk, or Start a project.

## Accessibility and performance

- WCAG AA minimum contrast, AAA target for primary body copy.
- Visible 2px cyan focus ring with offset.
- 44px minimum touch targets.
- Semantic headings and landmarks.
- Skip link provided.
- Hero image is priority-loaded with reserved dimensions.
- Below-fold images use Next Image lazy loading.
- Respect reduced motion and forced colors.
- Target LCP under 2.5s, INP under 200ms, CLS under 0.1.
