import { addBoard } from "~/actions/action";
import MainContent from "~/components/MainContent";
import Modal from "~/components/Modal";
import Sidebar from "~/components/Sidebar";
import { SidebarMain } from "~/components/SidebarMain";
import SimpleForm from "~/components/SimpleForm";

export type searchParamsType = {
  searchParams: Record<string, string> | null | undefined;
};

export default function Main({ searchParams }: searchParamsType) {
  return (
    <div>
      <Sidebar main_page={<MainContent />}>
        <SidebarMain />
      </Sidebar>
      <Modal searchParams={searchParams} name="add_board_modal">
        <SimpleForm
          form_action={addBoard}
          label="Name"
          name="name"
          buttonName="Add"
        />
      </Modal>
    </div>
  );
}
