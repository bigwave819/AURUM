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

interface OrderInput {
  watchId: string;
  quantity: number;
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

export async function createOrderFromCart(items: OrderInput[]) {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user) {
    return { success: false as const, error: "Sign in to place an order.", requiresAuth: true as const };
  }

  if (!items.length) {
    return { success: false as const, error: "Your cart is empty." };
  }

  for (const item of items) {
    if (item.quantity < 1 || item.quantity > 10) {
      return { success: false as const, error: "Quantity must be between 1 and 10 for each item." };
    }
  }

  try {
    // Re-fetch current prices server-side — never trust client-sent prices
    const watchIds = items.map((i) => i.watchId);
    const watches = await prisma.watch.findMany({
      where: { id: { in: watchIds } },
      select: { id: true, price: true, name: true },
    });

    if (watches.length !== watchIds.length) {
      return { success: false as const, error: "One or more items in your cart are no longer available." };
    }

    const watchMap = new Map(watches.map((w) => [w.id, w]));

    const totalAmount = items.reduce((sum, item) => {
      const watch = watchMap.get(item.watchId)!;
      return sum + watch.price * item.quantity;
    }, 0);

    const order = await prisma.order.create({
      data: {
        userId: session.user.id,
        totalAmount,
        items: {
          create: items.map((item) => ({
            watchId: item.watchId,
            quantity: item.quantity,
            price: watchMap.get(item.watchId)!.price,
          })),
        },
      },
      include: { items: true },
    });

    revalidatePath("/cart");

    return { success: true as const, data: order };
  } catch (error) {
    console.error("Failed to create order:", error);
    return { success: false as const, error: "Something went wrong while placing your order." };
  }
}