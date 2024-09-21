"use client";
import SimpleForm from "./SimpleForm";
import { addBoard } from "~/actions/action";
import { useState } from "react";
import { Button } from "./ui/button";
import RawModal from "./RawModal";

type ModalType = {
  children?: React.ReactNode;
  name: string;
  buttonName: string;
};

export default function Modal({ children, buttonName, name }: ModalType) {
  const [isOpen, setIsOpen] = useState(false);
  const handleIsOpen = () => {
    setIsOpen((prev) => !prev);
  };
  return (
    <>
      <Button
        onClick={() => handleIsOpen()}
        className="w-full rounded-r-full bg-secondary p-6 text-left text-lg font-medium text-black shadow-lg transition-colors hover:bg-primary/90 dark:text-white"
      >
        + Add Board
      </Button>

      {isOpen && (
        <RawModal handleIsOpen={handleIsOpen}>
          <SimpleForm
          header="Add a new form"
            handleIsOpen={handleIsOpen}
            form_action={addBoard}
            name={name}
            buttonName={buttonName}
          />
        </RawModal>
      )}
    </>
  );
}
