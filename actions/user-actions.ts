'use server'
import { headers } from "next/headers";
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { Prisma } from "@prisma/client";


interface GetPublicWatchesParams {
  page?: number;
  limit?: number;
  search?: string;
  brandId?: string;
}

export async function getPublicWatches({
  page = 1,
  limit = 12,
  search = "",
  brandId,
}: GetPublicWatchesParams = {}) {
  const safePage = Math.max(1, page);
  const safeLimit = Math.max(1, Math.min(limit, 50));
  const skip = (safePage - 1) * safeLimit;

  const where: Prisma.WatchWhereInput = {
    ...(brandId ? { brandId } : {}),
    ...(search ? { name: { contains: search, mode: "insensitive" } } : {}),
  };

  try {
    const [watches, totalCount] = await Promise.all([
      prisma.watch.findMany({
        where,
        skip,
        take: safeLimit,
        orderBy: { createdAt: "desc" },
        include: { brand: { select: { id: true, name: true } } },
      }),
      prisma.watch.count({ where }),
    ]);

    return {
      success: true as const,
      data: watches,
      pagination: {
        currentPage: safePage,
        totalCount,
        totalPages: Math.ceil(totalCount / safeLimit),
        hasNextPage: safePage * safeLimit < totalCount,
        hasPrevPage: safePage > 1,
      },
    };
  } catch (error) {
    console.error("Failed to fetch public watches:", error);
    return { success: false as const, error: "Something went wrong while loading watches." };
  }
}

export async function createOrder(watchId: string, quantity: number = 1) {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user) {
    return { success: false as const, error: "Sign in to place an order.", requiresAuth: true as const };
  }

  if (quantity < 1 || quantity > 10) {
    return { success: false as const, error: "Quantity must be between 1 and 10." };
  }

  try {
    const watch = await prisma.watch.findUnique({
      where: { id: watchId },
      select: { id: true, price: true, name: true },
    });

    if (!watch) {
      return { success: false as const, error: "This watch is no longer available." };
    }

    const totalAmount = watch.price * quantity;

    const order = await prisma.order.create({
      data: {
        userId: session.user.id,
        totalAmount,
        items: {
          create: {
            watchId: watch.id,
            quantity,
            price: watch.price,
          },
        },
      },
      include: { items: true },
    });

    revalidatePath(`/watch/${watchId}`);

    return { success: true as const, data: order };
  } catch (error) {
    console.error("Failed to create order:", error);
    return { success: false as const, error: "Something went wrong while placing your order." };
  }
}

export async function getWatchById(id: string) {
  try {
    const watch = await prisma.watch.findUnique({
      where: { id },
      include: { brand: { select: { id: true, name: true } } },
    });

    if (!watch) {
      return { success: false as const, error: "Watch not found." };
    }

    return { success: true as const, data: watch };
  } catch (error) {
    console.error("Failed to fetch watch:", error);
    return { success: false as const, error: "Something went wrong while loading this watch." };
  }
}

export async function getRelatedWatches(brandId: string, excludeId: string) {
  try {
    const watches = await prisma.watch.findMany({
      where: { brandId, id: { not: excludeId } },
      take: 4,
      orderBy: { createdAt: "desc" },
      include: { brand: { select: { id: true, name: true } } },
    });

    return { success: true as const, data: watches };
  } catch (error) {
    console.error("Failed to fetch related watches:", error);
    return { success: false as const, data: [] };
  }
}

interface OrderInput {
  watchId: string;
  quantity: number;
}