import Task from "./Task";

type ColumnType = {
  header: string;
  tasks: Task[];
  status_color: string
};

type Task = {
  id: string;
  name: string;
  description: string;
  Status: string;
  createdAt: Date;
  updatedAt: Date;
  columnId: string | null;
};

export default async function Column({ header, tasks, status_color }: ColumnType) {
  return (
    <div className="h-full text-black dark:text-white">
      <div className="flex gap-3 items-center">
        <div className={`size-5 ${status_color} rounded-full`}></div>
        <h3 className="text-lg text-slate-400">{header}</h3>
      </div>

      {tasks.map((item) => (
        <Task name={item.name} taskId={item.id} />
      ))}
    </div>
  );
}
