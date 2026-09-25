import { TABLE_COUNT } from "@/lib/config";

export const runtime = "nodejs";

type UploadBody = {
  table?: unknown;
  filename?: unknown;
  mimeType?: unknown;
  base64?: unknown;
};

export async function POST(req: Request) {
  let body: UploadBody;
  try {
    body = await req.json();
  } catch {
    return Response.json({ ok: false, error: "Invalid request. | 请求无效。" }, { status: 400 });
  }

  const table = Number(body.table);
  if (!Number.isInteger(table) || table < 1 || table > TABLE_COUNT) {
    return Response.json({ ok: false, error: "Invalid table number. | 桌号无效。" }, { status: 400 });
  }
  if (typeof body.base64 !== "string" || !body.base64 || typeof body.filename !== "string" || !body.filename) {
    return Response.json({ ok: false, error: "Missing photo data. | 缺少照片数据。" }, { status: 400 });
  }

  const appsScriptUrl = process.env.APPS_SCRIPT_URL;
  if (!appsScriptUrl) {
    return Response.json(
      { ok: false, error: "Upload isn't configured yet. Please tell the couple! | 上传功能尚未设置，请告诉新人！" },
      { status: 500 },
    );
  }

  try {
    const upstream = await fetch(appsScriptUrl, {
      method: "POST",
      headers: { "Content-Type": "text/plain" },
      body: JSON.stringify({
        table,
        filename: body.filename,
        mimeType: typeof body.mimeType === "string" && body.mimeType ? body.mimeType : "image/jpeg",
        base64: body.base64,
      }),
      redirect: "follow",
    });
    const data = await upstream.json();
    return Response.json(data);
  } catch {
    return Response.json(
      { ok: false, error: "Upload failed. Please try again. | 上传失败，请重试。" },
      { status: 502 },
    );
  }
}
