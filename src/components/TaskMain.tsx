"use client";

import { useRef, useState } from "react";
import RawModal from "./RawModal";
import { Button } from "./ui/button";
import { EllipsisVertical } from "lucide-react";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import FormSelect from "./FormSelect";
import { updateTask } from "~/actions/action";

type TaskMainProps = {
  name: string;
  completed: number;
  total_tasks: number;
  colors: {
    id: string;
    status_color: string;
  }[];
  columnId: string;
  subtasks: {
    id: string;
    name: string;
    completed: boolean;
    taskId: string | null;
  }[];
  taskId: string;
};

export function TaskMain({
  name,
  completed,
  total_tasks,
  colors,
  columnId,
  subtasks,
  taskId,
}: TaskMainProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentSubtasks, setCurrentSubtasks] = useState(subtasks);
  const formRef = useRef<HTMLFormElement>(null);
  const handleIsOpen = () => {
    setIsOpen((prev) => !prev);
    formRef.current?.requestSubmit();
  };

  const currentColor = colors.find((item) => item.id === columnId);

  return (
    <>
      <div
        onClick={handleIsOpen}
        className="w-full cursor-pointer rounded-lg bg-secondary/90 px-4 py-5 hover:bg-secondary"
      >
        <div className="font-semibold">{name}</div>
        <small className="font-medium text-slate-400">
          {completed} of {total_tasks} subtask
        </small>
      </div>
      {isOpen && (
        <div className="absolute bottom-0 left-0 h-screen w-full">
          <RawModal handleIsOpen={handleIsOpen}>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <h1 className="text-xl font-semibold">{name}</h1>
                <Button className="bg-transparent px-2 py-4">
                  <EllipsisVertical size={24} />
                </Button>
              </div>
              <div className="space-y-2">
                <div>
                  Subtasks ({completed} of {total_tasks})
                </div>
                {currentSubtasks.map((item) => (
                  <div
                  key={item.id}
                    onClick={() => {
                      const itemIdex = currentSubtasks.findIndex(
                        (task) => item.id === task.id,
                      );
                      const firstHalf = currentSubtasks.slice(0, itemIdex);
                      const secondHalf = currentSubtasks.slice(itemIdex + 1);
                      const newItem = {
                        id: item.id,
                        name: item.name,
                        taskId: item.taskId,
                        completed: !item.completed,
                      };
                      setCurrentSubtasks([
                        ...firstHalf,
                        newItem,
                        ...secondHalf,
                      ]);
                    }}
                    className="flex w-full items-center gap-3 rounded-lg bg-slate-900 p-4 transition-colors hover:bg-primary/30"
                  >
                    <Checkbox
                      type="button"
                      checked={item.completed}
                      id={item.id}
                    />
                    <Label htmlFor={item.id}>{item.name}</Label>
                  </div>
                ))}
              </div>

              <form
                ref={formRef}
                action={async (f: FormData) => {
                  f.append("Subtasks", JSON.stringify(currentSubtasks));
                  const res = await updateTask(f, taskId);
                  console.log(res)
                }}
                className="space-y-2"
              >
                <Label>Current Status</Label>
                <FormSelect
                  defaultColor={currentColor && currentColor.id}
                  colors={colors}
                />
              </form>
            </div>
          </RawModal>
        </div>
      )}
    </>
  );
}
