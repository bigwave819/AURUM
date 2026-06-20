'use server'

import { headers } from "next/headers";
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma";

interface GetUsersParams {
  page?: number;
  limit?: number;
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