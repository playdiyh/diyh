/** Solana mainnet — $DIYH mint (Pump.fun). */
export const DIYH_MINT = '3F1vRd33DHMGT7xLWWLFLJwVaDQoDT3yKuiEaBhCpump';

export const PUMP_FUN_URL = `https://pump.fun/coin/${DIYH_MINT}`;

export const DEXSCREENER_URL = `https://dexscreener.com/solana/${DIYH_MINT}`;

/** @param {string} address @param {number} [chars] */
export function abbreviateAddress(address, chars = 4) {
  if (!address || address.length <= chars * 2 + 1) return address;
  return `${address.slice(0, chars)}…${address.slice(-chars)}`;
}
