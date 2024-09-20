import MainContent from "~/components/MainContent";
import Sidebar from "~/components/Sidebar";
import { SidebarMain } from "~/components/SidebarMain";

export default function Main() {
  return (
    <div>
      <Sidebar main_page={<MainContent />}>
        <SidebarMain />
      </Sidebar>
    </div>
  );
}
