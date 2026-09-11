import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { InformationPage } from "@/components/information-page";
import { getInformationPage, informationPages } from "@/lib/information-pages";

type Props = { params: Promise<{ information: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return informationPages.map((page) => ({ information: page.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const page = getInformationPage((await params).information);
  if (!page) notFound();

  return {
    title: page.eyebrow,
    description: page.description,
    alternates: { canonical: `/${page.slug}` },
    openGraph: {
      title: page.eyebrow,
      description: page.description,
      url: `/${page.slug}`,
    },
  };
}

export default async function PublicInformationPage({ params }: Props) {
  const page = getInformationPage((await params).information);
  if (!page) notFound();
  return <InformationPage page={page} />;
}
