import { getSheetData } from "./action/getSheetData";
import Table from "./components/table";

export default async function Page() {
  const data = await getSheetData();

  return <Table data={data.data} />;
}
