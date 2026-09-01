export type UploadResult = { ok: true; fileUrl?: string } | { ok: false; error: string };

function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      resolve(result.split(",")[1] ?? "");
    };
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(blob);
  });
}

function generateFilename(table: number): string {
  const ts = new Date().toISOString().replace(/[:.]/g, "-");
  const rand = Math.random().toString(36).slice(2, 8);
  return `table${table}-${ts}-${rand}.jpg`;
}

export async function uploadPhoto(table: number, photo: Blob): Promise<UploadResult> {
  const base64 = await blobToBase64(photo);
  const filename = generateFilename(table);

  let res: Response;
  try {
    res = await fetch("/api/upload", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ table, filename, mimeType: "image/jpeg", base64 }),
    });
  } catch {
    return { ok: false, error: "Couldn't reach the server. Please check your connection and try again." };
  }

  let data: unknown;
  try {
    data = await res.json();
  } catch {
    return { ok: false, error: "Something went wrong. Please try again." };
  }

  if (
    typeof data === "object" &&
    data !== null &&
    "ok" in data &&
    (data as { ok: unknown }).ok === true
  ) {
    const fileUrl = "fileUrl" in data ? String((data as { fileUrl?: unknown }).fileUrl ?? "") : undefined;
    return { ok: true, fileUrl };
  }

  const error =
    typeof data === "object" && data !== null && "error" in data
      ? String((data as { error?: unknown }).error ?? "Something went wrong.")
      : "Something went wrong. Please try again.";
  return { ok: false, error };
}
