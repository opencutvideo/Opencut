/**
 * Wallet integration — Metamask (EVM) and Phantom (Solana)
 * All state is stored in localStorage; no server session needed.
 */

export type WalletType = "metamask" | "phantom";

export interface WalletSession {
  walletAddress: string;
  walletType: WalletType;
}

const SESSION_KEY = "opencut_wallet_session";

export function getSession(): WalletSession | null {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as WalletSession;
  } catch {
    return null;
  }
}

export function saveSession(session: WalletSession) {
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

export function clearSession() {
  localStorage.removeItem(SESSION_KEY);
}

// Shorten address for display: 0x1234...abcd
export function shortAddress(address: string): string {
  if (address.length < 10) return address;
  return address.slice(0, 6) + "..." + address.slice(-4);
}

// ─── Metamask ────────────────────────────────────────────────────────────────

export function isMetamaskAvailable(): boolean {
  return typeof window !== "undefined" && Boolean((window as any).ethereum?.isMetaMask);
}

export async function connectMetamask(): Promise<WalletSession> {
  const ethereum = (window as any).ethereum;
  if (!ethereum) throw new Error("MetaMask not installed. Please install the MetaMask extension.");
  const accounts: string[] = await ethereum.request({ method: "eth_requestAccounts" });
  if (!accounts || accounts.length === 0) throw new Error("No account selected in MetaMask.");
  const walletAddress = accounts[0].toLowerCase();
  const session: WalletSession = { walletAddress, walletType: "metamask" };
  saveSession(session);
  return session;
}

// ─── Phantom (Solana) ────────────────────────────────────────────────────────

export function isPhantomAvailable(): boolean {
  return typeof window !== "undefined" && Boolean((window as any).solana?.isPhantom);
}

export async function connectPhantom(): Promise<WalletSession> {
  const solana = (window as any).solana;
  if (!solana) throw new Error("Phantom not installed. Please install the Phantom wallet extension.");
  const response = await solana.connect();
  const walletAddress: string = response.publicKey.toString();
  const session: WalletSession = { walletAddress, walletType: "phantom" };
  saveSession(session);
  return session;
}
