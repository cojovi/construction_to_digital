import { ProductPage, productMetadata } from "@/components/product-page";

export const metadata = productMetadata("drafting-table");

export default function Page() {
  return <ProductPage slug="drafting-table" />;
}
