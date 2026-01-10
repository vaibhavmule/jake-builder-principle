import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { APP_URL, APP_NAME } from "~/lib/constants";
import { getMiniAppEmbedMetadata } from "~/lib/utils";
import { principles } from "~/lib/principles";
export const revalidate = 300;

// Share page for individual principles for building in crypto
// Sharing this route e.g. example.com/share/1 will generate a share page for principle #1
// with the principle text in the Open Graph metadata
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const principleId = parseInt(id);
  const principle = principles.find(p => p.id === principleId);

  const title = principle
    ? `Principle #${principleId}: ${principle.text}`
    : `${APP_NAME}`;
  const description = principle
    ? `"${principle.text}" - Principles for Building in Crypto by Jake`
    : "44 principles for building in crypto";

  const imageUrl = `${APP_URL}/api/opengraph-image?principle=${principleId}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [imageUrl],
    },
    other: {
      "fc:frame": JSON.stringify(getMiniAppEmbedMetadata(imageUrl)),
    },
  };
}

export default async function SharePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  // Redirect to home page with principle parameter
  redirect(`/?principle=${id}`);
}
