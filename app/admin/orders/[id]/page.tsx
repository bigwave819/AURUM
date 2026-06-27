// app/admin/orders/[id]/page.tsx
import { notFound } from "next/navigation";
import { getOrderById } from "@/actions/admin-actions";
import { OrderDetail } from "@/components/admin/orders/order-detail";

interface OrderDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function OrderDetailPage({ params }: OrderDetailPageProps) {
  const { id } = await params;
  const result = await getOrderById(id);

  if (!result.success || !result.data) {
    notFound();
  }

  return <OrderDetail order={result.data} />;
}