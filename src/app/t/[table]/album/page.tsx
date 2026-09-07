import { parseTableParam } from "@/lib/tableUtils";
import AlbumView from "@/components/AlbumView";
import InvalidTableScreen from "@/components/InvalidTableScreen";

export default async function TableAlbumPage({
  params,
}: {
  params: Promise<{ table: string }>;
}) {
  const { table } = await params;
  const tableNumber = parseTableParam(table);

  if (tableNumber === null) {
    return <InvalidTableScreen />;
  }

  return <AlbumView table={tableNumber} />;
}
