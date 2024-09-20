import ButtonsContainer from "./ButtonsContainer";
import { Logo } from "./Logo";

export async function SidebarMain() {
  return (
    <div>
      <div className="p-6">
        <Logo />
      </div>

      <div className="px-6 pb-3 text-sm font-medium tracking-wider text-slate-400">
        Boards (4)
      </div>
      <ButtonsContainer />
    </div>
  );
}
