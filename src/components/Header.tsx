"use client";
import PopoverCustom from "./PopoverCustom";
import RawModal from "./RawModal";
import { useEffect, useState } from "react";
import SimpleForm from "./SimpleForm";
import { addTask } from "~/actions/action";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { X } from "lucide-react";
import { v4 as uuidv4 } from "uuid";

export default function Header({ id, text }: { id: string; text: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [subtasks, setSubtasks] = useState<{ name: string; id: string }[]>([]);
  const handleIsOpen = () => {
    setIsOpen((prev) => !prev);
  };
  const handleAddTask = async (formData: FormData) => {
    const res = await addTask(formData, id);
    return res;
  };

  useEffect(() => {
    //console.log(subtasks);
  }, [subtasks]);

  return (
    <div className="flex w-full items-center justify-between bg-secondary/90 p-6">
      <h1 className="text-2xl font-semibold">{text}</h1>

      <div className="flex items-center gap-3">
        <Button onClick={handleIsOpen} className="rounded-full">
          + Add New Task
        </Button>
        {isOpen && (
          <div className="absolute left-0 top-0 h-screen w-full">
            <RawModal handleIsOpen={handleIsOpen}>
              <SimpleForm
                buttonName="Add"
                form_action={handleAddTask}
                header="Add new a task"
                name="Name"
                handleIsOpen={handleIsOpen}
                cancel={false}
              >
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    className="min-h-32"
                    placeholder="Task Description"
                  />
                </div>
                <div>
                  <Label>Subtasks</Label>
                  <ul>
                    {subtasks.map((item) => (
                      <li key={item.id} className="flex gap-3">
                        <Input
                          value={item.name}
                          onChange={(e) => {
                            const itemIndex = subtasks.findIndex(
                              (subtask) => subtask.id === item.id,
                            );
                            const filtered = subtasks.filter(
                              (item) => item.id !== id,
                            );
                            const first_half = [
                              ...subtasks.slice(0, itemIndex),
                            ];
                            const second_half = [
                              ...subtasks.slice(itemIndex + 1),
                            ];
                            const updatedSubtask = {
                              name: e.target.value,
                              id: item.id,
                            };
                            setSubtasks([
                              ...first_half,
                              updatedSubtask,
                              ...second_half,
                            ]);
                          }}
                        />
                        <X className="cursor-pointer" onClick={() => {
                          const itemIndex = subtasks.findIndex(subtask => subtask.id === item.id)
                          const firstHalf = subtasks.slice(0, itemIndex)
                          const secondHalf = subtasks.slice(itemIndex + 1)
                          setSubtasks([...firstHalf, ...secondHalf])
                        }} />
                      </li>
                    ))}
                  </ul>

                  <Button
                    onClick={() =>
                      setSubtasks((prev) => [
                        ...prev,
                        { name: "", id: uuidv4() },
                      ])
                    }
                    className="rounded-full"
                  >
                    Add subtask
                  </Button>
                </div>
              </SimpleForm>
            </RawModal>
          </div>
        )}

        <PopoverCustom id={id} />
      </div>
    </div>
  );
}
