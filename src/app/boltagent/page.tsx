import { ProductPage, productMetadata } from "@/components/product-page";

export const metadata = productMetadata("project-agent");

export default function Page() {
  return <ProductPage slug="project-agent" />;
}
