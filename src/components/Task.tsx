import { db } from "~/server/db"

type TaskProps = {
    taskId: string,
    name: string
}

export default async function Task ({taskId, name}: TaskProps) {
    const subtasks = await db.subtask.findMany({where: {taskId: taskId}})
    if(!subtasks) return <></>
    const completed = subtasks.filter(item => item.completed === true)
    return <div className="w-54 bg-secondary/90 px-1 py-2">
        <div>{name}</div>
        <small>{completed.length} of {subtasks.length} subtask</small>
    </div>
}