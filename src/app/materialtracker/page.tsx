import { ProductPage, productMetadata } from "@/components/product-page";

export const metadata = productMetadata("material-intelligence");

export default function Page() {
  return <ProductPage slug="material-intelligence" />;
}
