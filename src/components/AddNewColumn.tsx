"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import RawModal from "./RawModal";
import SimpleForm from "./SimpleForm";
import { addColumn } from "~/actions/action";
import { Label } from "./ui/label";
import FormSelect from "./FormSelect";



export default function AddNewColumn({id}: {id: string}) {
  const [isOpen, setIsOpen] = useState(false);
  const handleIsOpen = () => {
    setIsOpen((prev) => !prev);
  };

  const handleCreateNewColumn = async (formData: FormData) => {
     const res = await addColumn(formData, id)
     return res
  }

  return (
    <>
      <Button
        onClick={() => handleIsOpen()}
        className="h-full w-54 bg-secondary/30 text-2xl text-black dark:text-white"
      >
        + Add new column
      </Button>
      {isOpen && (
        <div className="absolute left-0 top-0 h-full w-full">
          <RawModal handleIsOpen={handleIsOpen}>
            <SimpleForm
              buttonName="Add"
              form_action={handleCreateNewColumn}
              header="Add a new column"
              name="Name"
              handleIsOpen={handleIsOpen}
              cancel={false}
            >
              <Label className="font-semibold">Color</Label>
              <FormSelect />
            </SimpleForm>
          </RawModal>
        </div>
      )}
    </>
  );
}
