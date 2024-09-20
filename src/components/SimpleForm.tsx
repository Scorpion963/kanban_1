import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import CancelButton from "./CancelButton";


type SimpleFormType = {
  label: string,
  name: string,
  buttonName: string,
  form_action: (formData: FormData) => Promise<{ message: string; } | { message: { name?: string[] | undefined; }; } | undefined>
}

export default async function SimpleForm({label,form_action, name, buttonName}: SimpleFormType) {
  return (
    <form className="space-y-3" action={form_action}>
      <h1 className="text-xl font-semibold">Add New Board</h1>
      <div className="space-y-2">
        <Label className="font-semibold" htmlFor={name}>{label}</Label>
        <Input required placeholder="e.g. Web Design" id={name} name={name} />
      </div>

      <div className="flex gap-3">
        <Button className="w-1/2 rounded-full">{buttonName}</Button>
        <CancelButton />
      </div>
    </form>
  );
}
