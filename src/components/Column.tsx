import Task from "./Task";

type ColumnType = {
  header: string;
  tasks: Task[];
  status_color: string;
  colors: {
    id: string;
    status_color: string;
  }[];
  columnId: string
};

type Task = {
  id: string;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  columnId: string | null;
}


export default async function Column({ header, tasks, status_color, colors,columnId }: ColumnType) {
  return (
    <div className="h-full dark:text-white w-[12%] space-y-3">
      <div className="flex gap-3 items-center">
        <div className={`size-5 ${status_color} rounded-full`}></div>
        <h3 className="text-lg text-slate-400">{header}</h3>
      </div>

      {tasks.map((item) => (
        <Task taskName={item.name} columnId={columnId} key={item.id} name={item.name} colors={colors} taskId={item.id} />
      ))}
    </div>
  );
}
