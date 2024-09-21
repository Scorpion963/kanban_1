import ColumnContainer from "~/components/ColumnContainer";
import Header from "~/components/Header";
import { db } from "~/server/db";

export default async function TasksSection({params}: {params: {id: string}}) {
  const board = await db.board.findFirst({where: {id: params.id}})
    if(!board) return <></> 
    return <div className="w-full h-screen">
        <Header text={board.name} id={params.id} />
        <ColumnContainer id={params.id} />
    </div>
}
