import { notFound, permanentRedirect } from "next/navigation";
import { getSolution, solutions } from "@/lib/solutions";

export const dynamicParams = false;
export function generateStaticParams() {
  return solutions.map(({ slug }) => ({ slug }));
}

export default async function LegacySolutionPage({ params }: { params: Promise<{ slug: string }> }) {
  const solution = getSolution((await params).slug);
  if (!solution) notFound();
  permanentRedirect(solution.href);
}
