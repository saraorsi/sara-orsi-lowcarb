import { getSheetData } from "./action/getSheetData";
import Card from "./components/card";

interface DataItem {
  [key: number]: string;
}

export default async function Page() {
  const data = await getSheetData();

  const sortedData = data.data.slice(1).sort((a: DataItem, b: DataItem) => {
    const dateA = new Date(a[0].split("/").reverse().join("-"));
    const dateB = new Date(b[0].split("/").reverse().join("-"));
    return dateB.getTime() - dateA.getTime();
  });

  return (
    <>
      {sortedData.map((item, i) => {
        return (
          <Card
            key={i}
            date={item[0]}
            title={item[1]}
            excerpt={item[2]}
            types={item[3]}
            categories={item[4]}
            tags={item[5]}
            thumb={item[6]}
            link={item[7]}
          />
        );
      })}
    </>
  );
}
