"use client";
import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { getColumns } from "~/actions/action";

type TaskType = {
    id: string;
    name: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    columnId: string | null;
}[];

type TaskContextType = {
    tasks: TaskType;
    setTasks: React.Dispatch<React.SetStateAction<TaskType>>;
    setBoard: React.Dispatch<React.SetStateAction<string>>;
};

const TaskContext = createContext<TaskContextType | null>(null);

export function TasksProvider({ children }: { children: React.ReactNode }) {
    const [tasks, setTasks] = useState<TaskType>([]);
    const [board, setBoard] = useState<string>("");

    const getTasks = useCallback(async () => {
        try {
            const boards = await getColumns(board);
            const tasks = boards.flatMap(item => item.Task);
            setTasks(tasks);
        } catch (error) {
            console.error("Error fetching tasks:", error);
            setTasks([]); // Handle errors as needed
        }
    }, [board]);

    useEffect(() => {
        getTasks();
    }, [getTasks]);

    return (
        <TaskContext.Provider value={{ setTasks, tasks, setBoard }}>
            {children}
        </TaskContext.Provider>
    );
}

export function useTask() {
    const context = useContext(TaskContext);
    if (context === null) {
        throw new Error("useTask must be used within a TasksProvider");
    }
    return context;
}
