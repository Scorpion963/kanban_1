"use client";
import { deleteBoard, updateBoard } from "~/actions/action";
import HeaderButton from "./HeaderButton";
import { useState } from "react";
import { EllipsisVertical } from "lucide-react";
import { Button } from "./ui/button";
import RawModal from "./RawModal";
import SimpleForm from "./SimpleForm";

export default function PopoverCustom({ id }: { id: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const handleModalIsOpen = () => {
    setModalIsOpen((prev) => !prev);
  };
  const handleUpdate = async (formData: FormData) => {
    const response = await updateBoard(formData, id);
    return response;
  };
  return (
    <div>
      <Button onClick={() => setIsOpen((prev) => !prev)} className="p-2">
        <EllipsisVertical />
      </Button>
      {isOpen && (
        <div className="absolute flex -translate-x-20 translate-y-2 flex-col rounded-lg">
          <div className="absolute left-0 top-0 z-10 flex flex-col">
            <HeaderButton id={id} onClick={deleteBoard} text="Delete Board" />
            <Button
              className="rounded-b-lg rounded-t-none"
              onClick={() => {
                handleModalIsOpen();
                setIsOpen(false);
              }}
            >
              Edit Board
            </Button>
          </div>
        </div>
      )}
      <div className="absolute left-0 top-0 w-full">
        {modalIsOpen && (
          <RawModal handleIsOpen={handleModalIsOpen}>
            <SimpleForm
            header="Update the form"
              handleIsOpen={handleModalIsOpen}
              form_action={handleUpdate}
              name="Name"
              buttonName="Update"
            />
          </RawModal>
        )}
      </div>
    </div>
  );
}
