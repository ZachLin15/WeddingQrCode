export const runtime = "nodejs";

export async function GET() {
  const appsScriptUrl = process.env.APPS_SCRIPT_URL;
  if (!appsScriptUrl) {
    return Response.json(
      { ok: false, error: "Album isn't configured yet. Please tell the couple! | 相册尚未设置，请告诉新人！" },
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
      { ok: false, error: "Couldn't load the album. Please try again. | 无法加载相册，请重试。" },
      { status: 502 },
    );
  }
}
