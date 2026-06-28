import Image from "next/image";
import Link from "next/link";

interface TopWatchesProps {
  watches: {
    id: string;
    name: string;
    image: string;
    price: number;
    unitsSold: number;
    brand: { name: string };
  }[];
}

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "FRW" }).format(price);
}

export function TopWatches({ watches }: TopWatchesProps) {
  return (
    <div
      className="p-5 rounded-lg"
      style={{ border: "0.5px solid #E8DDD0", backgroundColor: "white" }}
    >
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm font-medium" style={{ color: "#3A2F22" }}>
          Best-selling watches
        </p>
        <Link href="/admin/watches" className="text-xs font-medium" style={{ color: "#745A27" }}>
          View all
        </Link>
      </div>

      {watches.length === 0 ? (
        <p className="text-xs py-6 text-center" style={{ color: "#9E9185" }}>
          No sales yet.
        </p>
      ) : (
        <div className="flex flex-col gap-3">
          {watches.map((watch) => (
            <div key={watch.id} className="flex items-center gap-3">
              <div
                className="relative w-10 h-10 rounded-md overflow-hidden shrink-0"
                style={{ backgroundColor: "#F5EDE3" }}
              >
                <Image src={watch.image} alt={watch.name} fill className="object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate" style={{ color: "#3A2F22" }}>
                  {watch.name}
                </p>
                <p className="text-xs truncate" style={{ color: "#9E9185" }}>
                  {watch.brand.name} · {formatPrice(watch.price)}
                </p>
              </div>
              <p className="text-xs font-medium shrink-0" style={{ color: "#745A27" }}>
                {watch.unitsSold} sold
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}