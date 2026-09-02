const encoder = new TextEncoder();

function toBase64Url(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);

  let binary = "";
  for (const byte of bytes) {
    binary += String.fromCharCode(byte);
  }

  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

async function hmac(value: string): Promise<string> {
  const secret = process.env.GUEST_SESSION_SECRET;

  if (!secret) {
    throw new Error("GUEST_SESSION_SECRET is not set");
  }

  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );

  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(value));

  return toBase64Url(signature);
}

export async function createGuestCookie(): Promise<string> {
  const id = crypto.randomUUID();

  return `${id}.${await hmac(id)}`;
}

export async function readGuestCookie(raw?: string): Promise<string | null> {
  if (!raw) return null;

  const [id, sig] = raw.split(".");
  if (!id || !sig) return null;

  return (await hmac(id)) === sig ? id : null;
}
