import BoardButton from "./BoardButton";

export default async function ButtonsContainer() {
  return (
    <div className="flex flex-col pr-4">
      <BoardButton />
      <BoardButton />
      <BoardButton />
      <BoardButton />

      <button className="w-full rounded-r-full bg-secondary px-6 py-4 text-left text-lg font-medium text-white shadow-lg transition-colors hover:bg-primary/90">
        + Add Board
      </button>
    </div>
  );
}
