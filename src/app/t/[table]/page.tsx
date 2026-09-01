import { parseTableParam } from "@/lib/tableUtils";
import TableExperience from "@/components/TableExperience";
import InvalidTableScreen from "@/components/InvalidTableScreen";

export default async function TablePage({
  params,
}: {
  params: Promise<{ table: string }>;
}) {
  const { table } = await params;
  const tableNumber = parseTableParam(table);

  if (tableNumber === null) {
    return <InvalidTableScreen />;
  }

  return <TableExperience table={tableNumber} />;
}
