export async function Logo() {
    return (
      <div className="flex items-center gap-3">
        <div className="flex gap-[0.15rem]">
          <div className="h-6 w-[0.35rem] rounded-sm bg-indigo-500"></div>
          <div className="h-6 w-[0.35rem] rounded-sm bg-indigo-400"></div>
          <div className="h-6 w-[00.35em] rounded-sm bg-indigo-300"></div>
        </div>
        <h1 className="cursor-default select-none text-3xl font-extrabold">
          Kanban
        </h1>
      </div>
    );
  }
  