import { useState, useEffect, useCallback } from "react";
import {
  getSession,
  saveSession,
  clearSession,
  connectMetamask,
  connectPhantom,
  isMetamaskAvailable,
  isPhantomAvailable,
  type WalletSession,
  type WalletType,
} from "./wallet";
import { useConnectWallet } from "@workspace/api-client-react";

export function useWallet() {
  const [session, setSession] = useState<WalletSession | null>(() => getSession());
  const [connecting, setConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const connectMutation = useConnectWallet();

  useEffect(() => {
    const stored = getSession();
    setSession(stored);
  }, []);

  const connect = useCallback(async (walletType: WalletType) => {
    setConnecting(true);
    setError(null);
    try {
      let walletSession: WalletSession;
      if (walletType === "metamask") {
        walletSession = await connectMetamask();
      } else {
        walletSession = await connectPhantom();
      }
      // Register / login on the server
      try {
        await connectMutation.mutateAsync({
          data: {
            walletAddress: walletSession.walletAddress,
            walletType: walletSession.walletType,
          },
        });
      } catch {
        // Server registration is best-effort; wallet is still connected client-side
      }
      saveSession(walletSession);
      setSession(walletSession);
    } catch (err: any) {
      setError(err?.message ?? "Connection failed");
    } finally {
      setConnecting(false);
    }
  }, [connectMutation]);

  const disconnect = useCallback(() => {
    clearSession();
    setSession(null);
    setError(null);
  }, []);

  return {
    session,
    isConnected: Boolean(session),
    connecting,
    error,
    connect,
    disconnect,
    isMetamaskAvailable: isMetamaskAvailable(),
    isPhantomAvailable: isPhantomAvailable(),
  };
}
