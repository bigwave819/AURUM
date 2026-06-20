'use server'

import { headers } from "next/headers";
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";

interface GetUsersParams {
  page?: number;
  limit?: number;
}

const brandSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  description: z.string().max(500).optional(),
});

interface GetBrandsParams {
  page?: number;
  limit?: number;
}

async function requireAdmin() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user || (session.user as any).role !== "admin") {
    throw new Error("Bro you have to be admin");
  }

  return session;
}

export async function getAllUsers({ page = 1, limit = 10 }: GetUsersParams = {}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // 2. Authorization Guard
  if (!session?.user || (session.user as any).role !== "admin") {
    throw new Error("Bro you have to be admin");
  }

  // Ensure safe pagination inputs
  const safePage = Math.max(1, page);
  const safeLimit = Math.max(1, Math.min(limit, 100)); // Cap limit at 100 max for safety
  const skip = (safePage - 1) * safeLimit;

  try {
    const [users, totalCount] = await Promise.all([
      prisma.user.findMany({
        skip: skip,
        take: safeLimit,
        orderBy: {
          createdAt: "desc",
        },
        select: {
          id: true,
          name: true,
          email: true,
          image: true,
          role: true,
          createdAt: true,
        },
      }),
      prisma.user.count(),
    ]);

    const totalPages = Math.ceil(totalCount / safeLimit);

    return {
      success: true,
      data: users,
      pagination: {
        currentPage: safePage,
        limit: safeLimit,
        totalCount,
        totalPages,
        hasNextPage: safePage < totalPages,
        hasPrevPage: safePage > 1,
      },
    };

  } catch (error) {
    console.error("Failed to fetch users:", error);
    return {
      success: false,
      error: "Something went wrong while fetching users.",
    };
  }
}

export async function getAllBrands({ page = 1, limit = 10 }: GetBrandsParams = {}) {
  const safePage = Math.max(1, page);
  const safeLimit = Math.max(1, Math.min(limit, 100));
  const skip = (safePage - 1) * safeLimit;

  try {
    const [brands, totalCount] = await Promise.all([
      prisma.brand.findMany({
        skip,
        take: safeLimit,
        orderBy: { name: "asc" },
        select: {
          id: true,
          name: true,
          description: true,
          createdAt: true,
          _count: {
            select: { watches: true },
          },
        },
      }),
      prisma.brand.count(),
    ]);

    const totalPages = Math.ceil(totalCount / safeLimit);

    return {
      success: true as const,
      data: brands,
      pagination: {
        currentPage: safePage,
        limit: safeLimit,
        totalCount,
        totalPages,
        hasNextPage: safePage < totalPages,
        hasPrevPage: safePage > 1,
      },
    };
  } catch (error) {
    console.error("Failed to fetch brands:", error);
    return {
      success: false as const,
      error: "Something went wrong while fetching brands.",
    };
  }
}

export async function createBrand(input: { name: string; description?: string }) {
  await requireAdmin();

  const parsed = brandSchema.safeParse(input);
  if (!parsed.success) {
    return {
      success: false as const,
      error: parsed.error.issues[0]?.message ?? "Invalid input.",
    };
  }

  try {
    const brand = await prisma.brand.create({
      data: parsed.data,
    });

    revalidatePath("/admin/brands");

    return { success: true as const, data: brand };
  } catch (error: any) {
    if (error.code === "P2002") {
      return {
        success: false as const,
        error: "A brand with this name already exists.",
      };
    }
    console.error("Failed to create brand:", error);
    return {
      success: false as const,
      error: "Something went wrong while creating the brand.",
    };
  }
}

export async function updateBrand(
  id: string,
  input: { name: string; description?: string }
) {
  await requireAdmin();

  const parsed = brandSchema.safeParse(input);
  if (!parsed.success) {
    return {
      success: false as const,
      error: parsed.error.issues[0]?.message ?? "Invalid input.",
    };
  }

  try {
    const brand = await prisma.brand.update({
      where: { id },
      data: parsed.data,
    });

    revalidatePath("/admin/brands");

    return { success: true as const, data: brand };
  } catch (error: any) {
    if (error.code === "P2025") {
      return {
        success: false as const,
        error: "Brand not found.",
      };
    }
    if (error.code === "P2002") {
      return {
        success: false as const,
        error: "A brand with this name already exists.",
      };
    }
    console.error("Failed to update brand:", error);
    return {
      success: false as const,
      error: "Something went wrong while updating the brand.",
    };
  }
}

export async function deleteBrand(id: string) {
  await requireAdmin();

  try {
    const watchCount = await prisma.watch.count({
      where: { brandId: id },
    });

    if (watchCount > 0) {
      return {
        success: false as const,
        error: `Can't delete this brand — ${watchCount} watch${watchCount === 1 ? "" : "es"} still linked to it.`,
      };
    }

    await prisma.brand.delete({
      where: { id },
    });

    revalidatePath("/admin/brands");

    return { success: true as const };
  } catch (error: any) {
    if (error.code === "P2025") {
      return {
        success: false as const,
        error: "Brand not found.",
      };
    }
    console.error("Failed to delete brand:", error);
    return {
      success: false as const,
      error: "Something went wrong while deleting the brand.",
    };
  }
}