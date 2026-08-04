import { Router } from "express";
import { db } from "@workspace/db";
import { usersTable, userStatsTable } from "@workspace/db";
import { eq, desc } from "drizzle-orm";
import {
  ConnectWalletBody,
  UpdateMeBody,
} from "@workspace/api-zod";

const router = Router();

// POST /users/connect — register or login via wallet
router.post("/connect", async (req, res) => {
  const parsed = ConnectWalletBody.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: "Invalid request body" });
  }
  const { walletAddress, walletType, username } = parsed.data;

  const existing = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.walletAddress, walletAddress))
    .limit(1);

  if (existing.length > 0) {
    // Update last seen
    await db
      .update(usersTable)
      .set({ lastSeenAt: new Date() })
      .where(eq(usersTable.walletAddress, walletAddress));
    return res.json(existing[0]);
  }

  // Create new user
  const [user] = await db
    .insert(usersTable)
    .values({ walletAddress, walletType, username: username ?? null })
    .returning();

  // Create stats row
  await db.insert(userStatsTable).values({ userId: user.id });

  return res.json(user);
});

// GET /users/me — get current user
router.get("/me", async (req, res) => {
  const walletAddress = req.headers["x-wallet-address"] as string | undefined;
  if (!walletAddress) return res.status(401).json({ error: "Wallet not connected" });

  const [user] = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.walletAddress, walletAddress.toLowerCase()))
    .limit(1);

  if (!user) return res.status(401).json({ error: "User not found" });
  return res.json(user);
});

// PATCH /users/me — update profile
router.patch("/me", async (req, res) => {
  const walletAddress = req.headers["x-wallet-address"] as string | undefined;
  if (!walletAddress) return res.status(401).json({ error: "Wallet not connected" });

  const parsed = UpdateMeBody.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: "Invalid body" });

  const [user] = await db
    .update(usersTable)
    .set({ ...parsed.data, lastSeenAt: new Date() })
    .where(eq(usersTable.walletAddress, walletAddress.toLowerCase()))
    .returning();

  if (!user) return res.status(401).json({ error: "User not found" });
  return res.json(user);
});

// GET /users/me/stats — get dashboard stats
router.get("/me/stats", async (req, res) => {
  const walletAddress = req.headers["x-wallet-address"] as string | undefined;
  if (!walletAddress) return res.status(401).json({ error: "Wallet not connected" });

  const [user] = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.walletAddress, walletAddress.toLowerCase()))
    .limit(1);

  if (!user) return res.status(401).json({ error: "User not found" });

  const [stats] = await db
    .select()
    .from(userStatsTable)
    .where(eq(userStatsTable.userId, user.id))
    .limit(1);

  return res.json({
    projectsCount: stats?.projectsCount ?? 0,
    exportsCount: stats?.exportsCount ?? 0,
    totalDurationSeconds: stats?.totalDurationSeconds ?? 0,
    memberSince: user.joinedAt,
  });
});

// GET /users/leaderboard
router.get("/leaderboard", async (req, res) => {
  const rows = await db
    .select({
      walletAddress: usersTable.walletAddress,
      walletType: usersTable.walletType,
      username: usersTable.username,
      avatarUrl: usersTable.avatarUrl,
      exportsCount: userStatsTable.exportsCount,
    })
    .from(usersTable)
    .leftJoin(userStatsTable, eq(usersTable.id, userStatsTable.userId))
    .orderBy(desc(userStatsTable.exportsCount))
    .limit(20);

  return res.json(
    rows.map((r, i) => ({ rank: i + 1, ...r, exportsCount: r.exportsCount ?? 0 }))
  );
});

export default router;
