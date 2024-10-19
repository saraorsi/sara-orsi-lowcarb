import { getSheetData } from "./action/getSheetData";
import Card from "./components/card/card";

export default async function Page() {
  const data = await getSheetData();
  return (
    <div>
      {data.data.map((item, i) => {
        if (i === 0) {
          return <div key={i}></div>;
        } else {
          return <Card key={i} title={item[1]} />;
        }
      })}
    </div>
  );
}
