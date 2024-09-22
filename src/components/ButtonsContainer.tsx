import BoardButton from "./BoardButton";
import { db } from "~/server/db";
import { currentUser } from "@clerk/nextjs/server";
import Modal from "./Modal";

export default async function ButtonsContainer() {
  const user = await currentUser();
  
  const boards = await db.board.findMany({ where: { owner: user?.id } });
  
  return (
    <div className="flex flex-col pr-4">
      {boards.map((item) => (
        <BoardButton text={item.name} link={`/${item.id}`} key={item.id} />
      ))}
      <Modal name="Name" buttonName="Add" />
    </div>
  );
}
