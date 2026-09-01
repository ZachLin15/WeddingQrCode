import QRCode from "qrcode";
import fs from "node:fs";
import path from "node:path";

const TABLE_COUNT = 55;
const BASE_URL = (process.env.SITE_URL || "http://localhost:3000").replace(/\/$/, "");
const OUT_DIR = path.join(process.cwd(), "public", "qr");

fs.mkdirSync(OUT_DIR, { recursive: true });

async function run() {
  console.log(`Generating ${TABLE_COUNT} QR codes for ${BASE_URL} ...`);
  for (let table = 1; table <= TABLE_COUNT; table++) {
    const url = `${BASE_URL}/t/${table}`;
    const filePath = path.join(OUT_DIR, `table-${table}.png`);
    await QRCode.toFile(filePath, url, {
      width: 600,
      margin: 2,
      color: { dark: "#4A3F3A", light: "#00000000" },
    });
  }
  console.log(`Done. QR codes written to ${OUT_DIR}`);
  console.log(`If SITE_URL was wrong, re-run with: SITE_URL=https://your-domain.com node scripts/generate-qr-codes.mjs`);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
