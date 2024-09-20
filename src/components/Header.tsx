import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { Button } from "./ui/button";
import { EllipsisVertical } from "lucide-react";

export default async function Header() {
  return (
    <div className="flex w-full items-center justify-between bg-secondary/90 p-6">
      <h1 className="text-2xl font-semibold">Platform Launch</h1>
      <div className="flex items-center gap-3">
        <Button className="rounded-full">+ Add New Task</Button>
        <Popover>
          <PopoverTrigger asChild>
            <Button className="p-2">
              <EllipsisVertical />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-36 mr-6 mt-2">
            <div className="flex flex-col overflow-hidden rounded-lg">
              <Button className="justify-start rounded-none">Edit Board</Button>
              <Button className="justify-start rounded-none">
                Delete Board
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
