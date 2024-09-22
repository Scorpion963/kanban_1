import { db } from "~/server/db";
import { TaskMain } from "./TaskMain";

type TaskProps = {
  taskId: string;
  name: string;
  colors: {
    id: string;
    status_color: string;
  }[];
  columnId: string;
  taskName: string
};

export default async function Task({ taskId, name, colors, columnId, taskName  }: TaskProps) {
  const subtasks = await db.subtask.findMany({ where: { taskId: taskId } });
  if (!subtasks) return <></>;
  const completed = subtasks.filter((item) => item.completed === true);  

  return <>
    <TaskMain taskId={taskId} subtasks={subtasks} columnId={columnId} colors={colors} name={name} completed={completed.length} total_tasks={subtasks.length} />
  </>;
}


