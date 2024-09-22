import { db } from "~/server/db";
import AddNewColumn from "./AddNewColumn";
import Column from "./Column";

export default async function ColumnContainer({ id, colors }: { id: string, colors: {
  id: string;
  status_color: string;
}[] }) {
  const columns = await db.column.findMany({ where: { boardId: id }, include: {Task: true} });
  if (!columns) return <></>;
  
  const columnNames = columns.map(item => ({ name: item.name, status_color: item.status_color }));

  return (
    <div className="h-full w-full flex gap-3 p-6">
      {columns.map((item) => (
        <Column columnId={item.id} colors={colors} key={item.id} tasks={item.Task} header={item.name} status_color={item.status_color}  />
      ))}
      <AddNewColumn id={id} />
    </div>
  );
}
