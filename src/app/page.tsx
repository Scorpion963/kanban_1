import Link from "next/link";
import MainContent from "~/components/MainContent";
import Sidebar from "~/components/Sidebar";
import { SidebarMain } from "~/components/SidebarMain";

export default function Main({
  searchParams,
}: {
  searchParams: Record<string, string> | null | undefined;
}) {
  const showModal = searchParams?.add_board_modal === "true";

  return (
    <div>
      <Sidebar main_page={<MainContent />}>
        <SidebarMain />
      </Sidebar>
      {showModal && (
        <div className="absolute z-10 top-0 h-screen w-full">
          <Link replace href="/" className="absolute h-screen w-full bg-black opacity-50"></Link>
          <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 h-96 w-52 rounded-lg bg-white"></div>
        </div>
      )}
    </div>
  );
}
