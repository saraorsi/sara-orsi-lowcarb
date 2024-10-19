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
          return (
            <Card
              key={i}
              date={item[0]}
              title={item[1]}
              exercept={item[2]}
              type={item[3]}
              categories={item[4]}
              tags={item[5]}
              link={item[6]}
            />
          );
        }
      })}
    </div>
  );
}
