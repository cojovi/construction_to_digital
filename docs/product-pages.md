# Product pages and color themes

The public product URLs and themes are defined in `src/lib/solutions.ts`:

| Product | URL | Theme | Primary accent |
| --- | --- | --- | --- |
| Drafting Table | `/draftingtable` | cyan | `#17C8F4` |
| Material Tracker | `/materialtracker` | amber | `#FBB224` |
| BoltAgent | `/boltagent` | red | `#ED2C29` |
| BillingAgent | `/billingagent` | green | `#39FF6A` |

The cyan, red, and green colors follow the supplied color atlases. Amber uses the cyan atlas's secondary signal, with matching dark surfaces. Text highlights are lighter where needed for readable contrast.

`src/app/products.css` owns the palette tokens and shared product layouts. A product page's `data-product-theme` applies its palette to the page and shared header/footer. On the homepage, `data-tool-theme` scopes each palette to its row inside the boxed system selector. Keep the rest of the homepage in its existing cyan theme.

To add another product, add its identity, short URL, and theme to `solutions.ts`; add its detailed copy to `src/lib/product-details.ts`; then create a static route rendering `ProductPage` and exporting `productMetadata`. Keep the same restrained dark canvas, typography, grid, and spacing. Reuse an existing palette unless a new product color is explicitly chosen.

The solution list drives sitemap entries, footer links, homepage links, and machine-readable product documents. Original `/solutions/...` links redirect permanently to the short URLs, including `.md` versions and campaign query parameters. Add any other legacy aliases to `solutionRedirects`.

Keep “Explore solutions” linked to the homepage selector. The row button changes the preview; its adjacent arrow opens the dedicated page. Each product page includes a workflow, capabilities, questions, demo link, and related product.
