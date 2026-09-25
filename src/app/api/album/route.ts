export const runtime = "nodejs";

export async function GET() {
  const appsScriptUrl = process.env.APPS_SCRIPT_URL;
  if (!appsScriptUrl) {
    return Response.json(
      { ok: false, error: "Album isn't configured yet. Please tell the couple!" },
      { status: 500 },
    );
  }

  try {
    const upstream = await fetch(appsScriptUrl, {
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
