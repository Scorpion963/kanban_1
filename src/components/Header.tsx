"use client";
import PopoverCustom from "./PopoverCustom";
import { useState } from "react";
import { addTask } from "~/actions/action";
import { Button } from "./ui/button";
import TaskForm from "./TaskForm";

export default function Header({
  id,
  text,
  colors,
}: {
  id: string;
  text: string;
  colors: {
    id: string;
    status_color: string;
  }[];
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [subtasks, setSubtasks] = useState<{ name: string; id: string }[]>([]);

  const handleIsOpen = () => {
    setIsOpen((prev) => !prev);
  };
  const handleAddTask = async (formData: FormData) => {
    formData.append('Subtasks', JSON.stringify(subtasks))
    const res = await addTask(formData);
    return res;
  };

  return (
    <div className="flex w-full items-center justify-between bg-secondary/90 p-6">
      <h1 className="text-2xl font-semibold">{text}</h1>

      <div className="flex items-center gap-3">
        <Button onClick={handleIsOpen} className="rounded-full">
          + Add New Task
        </Button>
        <TaskForm
          handleAddTask={handleAddTask}
          handleIsOpen={handleIsOpen}
          isOpen={isOpen}
          subtasks={subtasks}
          setSubtasks={setSubtasks}
          colors={colors}
        />

        <PopoverCustom id={id} />
      </div>
    </div>
  );
}
