import { db } from "~/server/db";
import AddNewColumn from "./AddNewColumn";
import Column from "./Column";

export default async function ColumnContainer({ id }: { id: string }) {
  const columns = await db.column.findMany({ where: { boardId: id }, include: {Task: true} });
  if (!columns) return <></>;
  const columnNames = columns.map(item => {item.name, item.status_color})
  return (
    <div className="h-full w-full flex gap-3">
      {columns.map((item) => (
        <Column key={item.id} tasks={item.Task} header={item.name} status_color={item.status_color}  />
      ))}
      <AddNewColumn id={id} />
    </div>
  );
}
