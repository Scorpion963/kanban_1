import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

type SimpleFormType = {
  handleIsOpen: () => void;
  header: string;
  name: string;
  buttonName: string;
  form_action: (
    formData: FormData,
  ) => Promise<
    | { message: string }
    | { message: { name?: string[] | undefined } }
    | undefined
  >;
  children?: React.ReactNode;
  cancel?: boolean;
};

export default function SimpleForm({
  form_action,
  header,
  cancel = true,
  name,
  buttonName,
  handleIsOpen,
  children,
}: SimpleFormType) {
  const [error, setError] = useState<
    string | { name?: string[] | undefined }
  >();
  return (
    <form
      className="space-y-3"
      action={async (formData) => {
        const error = await form_action(formData);
        if (error) setError(error.message);
        else handleIsOpen();
      }}
    >
      <h1 className="text-xl font-semibold">{header}</h1>
      <div className="space-y-2">
        <Label className="font-semibold" htmlFor={name}>
          {name}
        </Label>
        <div className="text-red-500">{error?.toString()}</div>

        <Input required placeholder="e.g. Web Design" id={name} name={name} />
      </div>
      <div className="space-y-2">{children}</div>

      <div className="flex gap-3">
        <Button className={`${cancel ? "w-1/2" : "w-full"} rounded-full`}>
          {buttonName}
        </Button>
        {cancel && (
          <Button
            type="button"
            onClick={() => handleIsOpen()}
            className="w-1/2 rounded-full"
          >
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
}
