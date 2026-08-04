import { createContext, useContext, ReactNode } from "react";
import { useWallet } from "@/lib/useWallet";
import type { WalletSession, WalletType } from "@/lib/wallet";

interface WalletContextValue {
  session: WalletSession | null;
  isConnected: boolean;
  connecting: boolean;
  error: string | null;
  connect: (walletType: WalletType) => Promise<void>;
  disconnect: () => void;
  isMetamaskAvailable: boolean;
  isPhantomAvailable: boolean;
}

const WalletContext = createContext<WalletContextValue | null>(null);

export function WalletProvider({ children }: { children: ReactNode }) {
  const wallet = useWallet();
  return <WalletContext.Provider value={wallet}>{children}</WalletContext.Provider>;
}

export function useWalletContext() {
  const ctx = useContext(WalletContext);
  if (!ctx) throw new Error("useWalletContext must be used inside WalletProvider");
  return ctx;
}
