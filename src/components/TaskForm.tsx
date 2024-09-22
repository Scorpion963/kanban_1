import RawModal from "./RawModal";
import SimpleForm from "./SimpleForm";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";
import { X } from "lucide-react";
import { Button } from "./ui/button";
import FormSelect from "./FormSelect";
import { v4 as uuidv4 } from "uuid";

type TaskFormProps = {
  handleIsOpen: () => void;
  handleAddTask: (formData: FormData) => Promise<
    | {
        message: string;
      }
    | undefined
  >;
  isOpen: boolean;
  subtasks: {
    id: string;
    name: string;
    completed?: boolean;
    taskId?: string | null;
}[];
  setSubtasks: React.Dispatch<React.SetStateAction<{
    id: string;
    name: string;
    completed?: boolean;
    taskId?: string | null;
}[]>>
  colors: {
    status_color: string;
    id: string
  }[];
  defaultColor?: string | undefined
};

export default function TaskForm({
  handleIsOpen,
  handleAddTask,
  isOpen,
  setSubtasks,
  subtasks,
  colors,
  defaultColor
}: TaskFormProps) {
  return (
    <>
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
              <div className="space-y-2">
                <Label className="text-sm font-semibold" htmlFor="description">
                  Description
                </Label>
                <Textarea
                  id="description"
                  name="Description"
                  className="min-h-32"
                  placeholder="Task Description"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-semibold">Subtasks</Label>
                <ul className="scrollbar-none max-h-36 space-y-2 overflow-y-scroll">
                  {subtasks.map((item) => (
                    <li key={item.id} className="flex gap-3">
                      <Input
                        value={item.name}
                        onChange={(e) => {
                          const itemIndex = subtasks.findIndex(
                            (subtask) => subtask.id === item.id,
                          );
                          const first_half = [...subtasks.slice(0, itemIndex)];
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
                      <X
                        className="cursor-pointer"
                        onClick={() => {
                          const itemIndex = subtasks.findIndex(
                            (subtask) => subtask.id === item.id,
                          );
                          const firstHalf = subtasks.slice(0, itemIndex);
                          const secondHalf = subtasks.slice(itemIndex + 1);
                          setSubtasks([...firstHalf, ...secondHalf]);
                        }}
                      />
                    </li>
                  ))}
                </ul>

                <Button
                  type="button"
                  onClick={() =>
                    setSubtasks((prev) => [...prev, { name: "", id: uuidv4() }])
                  }
                  className="w-full rounded-full"
                >
                  Add a new subtask
                </Button>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-semibold">Status</Label>
                <FormSelect defaultColor={defaultColor} colors={colors} />
              </div>
            </SimpleForm>
          </RawModal>
        </div>
      )}
    </>
  );
}
