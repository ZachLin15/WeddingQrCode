import { TABLE_COUNT } from "@/lib/config";

export const runtime = "nodejs";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const table = Number(searchParams.get("table"));

  if (!Number.isInteger(table) || table < 1 || table > TABLE_COUNT) {
    return Response.json({ ok: false, error: "Invalid table number." }, { status: 400 });
  }

  const appsScriptUrl = process.env.APPS_SCRIPT_URL;
  if (!appsScriptUrl) {
    return Response.json(
      { ok: false, error: "Album isn't configured yet. Please tell the couple!" },
      { status: 500 },
    );
  }

  try {
    const upstream = await fetch(`${appsScriptUrl}?table=${table}`, {
      method: "GET",
      redirect: "follow",
      cache: "no-store",
    });
    const data = await upstream.json();
    return Response.json(data);
  } catch {
    return Response.json(
      { ok: false, error: "Couldn't load the album. Please try again." },
      { status: 502 },
    );
  }
}
