import ColumnContainer from "~/components/ColumnContainer";
import Header from "~/components/Header";
import { db } from "~/server/db";

export const dynamic = 'force-dynamic'

export default async function TasksSection({params}: {params: {id: string}}) {
  const board = await db.board.findFirst({where: {id: params.id}})
    if(!board) return <></>
    
    const colors = await db.column.findMany({where: {boardId: board.id}, select: {status_color: true, id: true}})
  if(!colors) return <></>

    return <div className="w-full h-screen">
        <Header colors={colors} text={board.name} id={params.id} />
        <ColumnContainer colors={colors} id={params.id} />
    </div>
}
