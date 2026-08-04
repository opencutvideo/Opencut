/**
 * Returns custom headers for API calls that include the wallet address.
 * Import and spread this into tanstack query options when needed.
 */
import { getSession } from "./wallet";

export function walletHeaders(): Record<string, string> {
  const session = getSession();
  if (!session) return {};
  return { "x-wallet-address": session.walletAddress };
}
