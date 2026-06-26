// app/(shop)/watch/[id]/page.tsx
import { notFound } from "next/navigation";
import { getWatchById, getRelatedWatches } from "@/actions/user-actions";
import { WatchDetail } from "@/components/watch/watch-detail";
import { RelatedWatches } from "@/components/watch/related-watches";

interface WatchDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function WatchDetailPage({ params }: WatchDetailPageProps) {
  const { id } = await params;

  const result = await getWatchById(id);

  if (!result.success || !result.data) {
    notFound();
  }

  const watch = result.data;
  const relatedResult = await getRelatedWatches(watch.brandId, watch.id);

  return (
    <div style={{ backgroundColor: "#FFF8F3" }} className="min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <WatchDetail watch={watch} />

        {relatedResult.data && relatedResult.data.length > 0 && (
          <RelatedWatches watches={relatedResult.data} />
        )}
      </div>
    </div>
  );
}