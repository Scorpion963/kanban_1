import Link from "next/link";
import BoardButton from "./BoardButton";
import { db } from "~/server/db";
import { currentUser } from "@clerk/nextjs/server";


export default async function ButtonsContainer() {
  const user = await currentUser()
  if(!user?.id) return <>You must be logged in</>
  const boards = await db.board.findMany({where: {owner: user.id}})
  return (
    <div className="flex flex-col pr-4">
      {boards.map(item => <BoardButton text={item.name} link={`/?id=${item.id}`} key={item.id} />)}
      <Link href={`/?add_board_modal=true`}className="w-full rounded-r-full bg-secondary px-6 py-4 text-left text-lg font-medium dark:text-white shadow-lg transition-colors hover:bg-primary/90">
        + Add Board
      </Link>
    </div>
  );
}
