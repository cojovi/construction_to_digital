import { ProductPage, productMetadata } from "@/components/product-page";

export const metadata = productMetadata("billing-agent");

export default function Page() {
  return <ProductPage slug="billing-agent" />;
}
