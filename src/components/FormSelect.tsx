import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { v4 as uuidv4 } from "uuid";

export const tailwindBgColors = [
  "bg-red-500",
  "bg-blue-500",
  "bg-green-500",
  "bg-yellow-500",
  "bg-purple-500",
  "bg-pink-500",
  "bg-indigo-500",
  "bg-teal-500",
  "bg-gray-500",
  "bg-orange-500",
  "bg-lime-500",
  "bg-cyan-500",
  "bg-emerald-500",
  "bg-fuchsia-500",
  "bg-rose-500",
  "bg-violet-500",
  "bg-sky-500",
  "bg-stone-500",
  "bg-neutral-500",
  "bg-red-600",
] as const;

export const tailwindBgColorObjects = tailwindBgColors.map((color) => ({
  status_color: color,
}));

export default function FormSelect({
  colors = tailwindBgColorObjects,
  defaultColor,
}: {
  colors?: {
    status_color: string;
    id?: string;
  }[];
  defaultColor?: string;
}) {
  console.log(defaultColor);
  return (
    <Select defaultValue={defaultColor} name="Color">
      <SelectTrigger>
        <SelectValue placeholder="Select a label..." />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Label</SelectLabel>
          {colors.map((item, index) => {
            console.log(item.id, " ", defaultColor);
            console.log(item.id === defaultColor);
            return (
              <SelectItem
                key={uuidv4()}
                value={item.id ? item.id : item.status_color}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`${item.status_color} size-3 rounded-full`}
                  ></div>
                  <div>Color {index}</div>
                </div>
              </SelectItem>
            );
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
